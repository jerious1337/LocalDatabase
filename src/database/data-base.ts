
import fs from 'fs'

export class Database<T extends Record<string, any>> {
    DB_FILE_PATH: string // .json file path.
    indent_spaces: number = 4
    data_base_cache: T[] | null = null
    watching_file = false
    
    constructor(file_path: string, indent_spaces?: number) {
        this.DB_FILE_PATH = file_path

        if (!this.fileCheck()) {
            throw new Error('[Error] File not found, file path: ' + file_path)
        }

        this.watchFile()

        if (!indent_spaces) {
            return
        }

        this.indent_spaces = indent_spaces
    }

    public async addObject(data: T) {
        try {
            const db = await this.loadCache()
            
            if (!db) {
                console.log("[Error] Actual Data is null / undefined...")
                return undefined
            }
            await this.saveCacheWithUpdate(() => {
                db.push(data)
            })
        } catch (ex) {
            console.log('[Error] Exception while writing...')
            console.log('[Info] Details: ' + ex)
        }
    }

    private updateObjectFromQuery(object: T, query: T) {
        if (!object || !query) {
            console.log("[Error] Object / Query is undefined...")
            return
        }
        
        Object.assign(object, query)
    }
    
    public async updateFromQuery(query: T, new_query: T) {
        if (!query || !new_query) {
            console.log("[Error] Query / New Query is undefined...")
            return
        }
        
        const db = await this.loadCache()
        
        if (!db) {
            console.log("[Error] Actual Data is null / undefined...")
            return false
        }

        const queried_object = await this.getObjectFromQueryFromData(query, db)
        
        if (!queried_object) {
            return false
        }

        await this.saveCacheWithUpdate(() => {
            this.updateObjectFromQuery(queried_object, new_query)
        })
        return true
    }

    public async removeFromQuery(query: T, remove_all?: boolean) {
        const db = await this.loadCache()
        
        if (!db) {
            return false
        }

        if (remove_all) {
            const length = db.length
            await this.saveCacheWithUpdate(() => {
                this.data_base_cache = db.filter(obj => !this.matchesQuery(obj, query))
            })
            if (!this.data_base_cache) {
                return false
            }
            return this.data_base_cache.length > length
        } else {
            for (const obj of db) {
                if (this.matchesQuery(obj, query)) {
                    const index = db.indexOf(obj)
                    await this.saveCacheWithUpdate(() => {
                        db.splice(index, 1)
                    })
                    return true
                }
            }
        }
        console.log('[Error] Failed to remove object (object not found)...')
        return false
    }

    public async containsQuery(query: T) {
        try {
            if (!this.fileCheck()) {
                return false
            }
            const actual_data = await this.loadCache()
            
            if (!actual_data) {
                console.log("[Error] Actual Data is null / undefined...")
                return false
            }
            try {
                return actual_data.some(data => this.matchesQuery(data, query))
            } catch (ex) {
                console.log('[Error] Exception while running matchesQuery()...')
                console.log('[Info] Details: ' + ex)
            }
        } catch (ex) {
            console.log('[Error] Exception while examining file...')
            console.log('[Info] Details: ' + ex)
        }
    }

    public async readDatabase() {
        try {
            if (!this.fileCheck()) {
                return undefined
            }
            const result = await fs.promises.readFile(this.DB_FILE_PATH, 'utf-8')
            return JSON.parse(result)
        } catch (ex) {
            console.log('[Error] Exception while reading file...')
            console.log('[Info] Details: ' + ex)
            return undefined
        }
    }

    public async rewriteDatabase(array: T[]) {
        try {
            if (!this.fileCheck()) {
                return
            }

            await fs.promises.writeFile(this.DB_FILE_PATH, JSON.stringify(array, null, this.indent_spaces), 'utf-8')
            console.log('[Success] File rewritten sucessfully...')
        } catch (ex) {
            console.log('[Error] Exception while rewriting file...')
            console.log('[Info] Details: ' + ex)
        }
    }

    public async getObjectFromQuery(query: T) {
        try { 
            const actual_data = await this.loadCache()
            
            if (!actual_data) {
                console.log("[Error] Actual Data is null / undefined...")
                return undefined
            }
            try {
                for (let data of actual_data) {
                    if (this.matchesQuery(data, query)) {
                        return data
                    }
                }
                return undefined
            } catch (ex) {
                console.log('[Error] Exception while running matchesQuery()...')
                console.log('[Info] Details: ' + ex)
            }
        } catch (ex) {
            console.log('[Error] Exception while examining file...')
            console.log('[Info] Details: ' + ex)
        }
    }
    
    public async getObjectFromQueryFromData(query: T, data: T[]) {
        try {
            for (const obj of data) {
                if (this.matchesQuery(obj, query)) {
                    return obj
                }
            }
            return undefined
        } catch (ex) {
            console.log('[Error] Exception while running matchesQuery()...')
            console.log('[Info] Details: ' + ex)
        }
    }

    private matchesQuery(json: T, query: T) {
        if (!json || !query) {
            return false
        }
        
        return Object.entries(query).every(([key, value]) => json[key] === value);
    }

    private async loadCache(): Promise<T[]> {
        if (!this.fileCheck()) {
            return []
        }

        if (!this.data_base_cache) {
            try {
                let data = await fs.promises.readFile(this.DB_FILE_PATH, 'utf-8')
                this.data_base_cache = JSON.parse(data) as T[]
            } catch (err) {
                console.log('[Error] Failed to read file...')
                console.log('[Info] Error details: ' + err)
                this.data_base_cache = []
            }
        }
        return this.data_base_cache
    }

    private async saveCache() {
        try {
            if (!this.fileCheck() || !this.data_base_cache) {
                return
            }

            await fs.promises.writeFile(this.DB_FILE_PATH, JSON.stringify(this.data_base_cache, null, this.indent_spaces), 'utf-8')
        } catch (err) {
            console.log('[Error] Failed to write file...')
            console.log('[Info] Error details: ' + err)
        }
    }

    private clearCache() {
        this.data_base_cache = null
    }

    private async saveCacheWithUpdate(task: () => void | Promise<void>) {
        try {
            this.unwatchFile()
            await task()
            await this.saveCache()
            this.watchFile()
        } catch (err) {
            console.log('[Error] Failed to save cache with update...')
            console.log('[Info] Error details: ' + err)
        }
    }

    private watchFile() {
        if (this.watching_file) {
            return
        }
        
        fs.watchFile(this.DB_FILE_PATH, (curr, prev) => {
            if (curr.mtimeMs !== prev.mtimeMs) {
                console.log('[Info] File changed on disk, clearing cache...')
                this.clearCache()
            }
        })
        this.watching_file = true
    }

    private unwatchFile() {
        if (!this.watching_file) {
            return
        }
        
        fs.unwatchFile(this.DB_FILE_PATH)
        this.watching_file = false
    }

    private fileCheck() {
        if (!fs.existsSync(this.DB_FILE_PATH)) {
            console.log('[Error] File doesn\'t exist')
            return false
        }
        return true
    }
}