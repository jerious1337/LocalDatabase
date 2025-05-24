import fs from 'fs'

export class Database {
    DB_PATH
    
    constructor(file_path: string) {
        this.DB_PATH = file_path
    }

    public add_object(data: any) {
        try {
            let logs = []
        
            if (fs.existsSync(this.DB_PATH)) {
                const actual_data = fs.readFileSync(this.DB_PATH, 'utf-8')
                logs = JSON.parse(actual_data)
            }

            logs.push(data)
            fs.writeFileSync(this.DB_PATH, JSON.stringify(logs, null, 4), 'utf-8')
            console.log('[Success] Sucessfully writed...')
        } catch (ex) {
            console.log('[Error] Exception while writing...')
            console.log('[Info] Details: ' + ex)
        }
    }

    private async update_object_from_query(object: any, query: any) {
        for (let key in query) {
            if (query.hasOwnProperty(key)) {
                object[key] = query[key];
            }
        }
    }
    
    public async update_from_query(query: any, new_query: any) {
        const data_base = await this.read_data_base()
        const queried_object = await this.get_object_from_query_from_data(query, data_base)
        
        if (!queried_object) {
            return 0
        }

        await this.update_object_from_query(queried_object, new_query)
        await this.rewrite_data_base(data_base)
        return 1
    }

    public contains_query(query: any) {
        try {
            if (!fs.existsSync(this.DB_PATH)) {
                console.log('[Error] File don\'t exist\'s')
                return false
            }
            const actual_data = JSON.parse(fs.readFileSync(this.DB_PATH, 'utf-8'))
            try {
                for (let data of actual_data) {
                    if (this.matches_query(data, query)) {
                        return true
                    }
                }
                return false
            } catch (ex) {
                console.log('[Error] Exception while running matchesQuery()...')
                console.log('[Info] Details: ' + ex)
            }
        } catch (ex) {
            console.log('[Error] Exception while examining file...')
            console.log('[Info] Details: ' + ex)
        }
    }

    public async read_data_base() {
        try {
            if (!fs.existsSync(this.DB_PATH)) {
                console.log('[Error] File don\'t exist\'s')
                return undefined
            }
            const result = fs.readFileSync(this.DB_PATH, 'utf-8')
            return JSON.parse(result)
        } catch (ex) {
            console.log('[Error] Exception while reading file...')
            console.log('[Info] Details: ' + ex)
            return undefined
        }
    }

    public async rewrite_data_base(arr: any) {
        try {
            if (!fs.existsSync(this.DB_PATH)) {
                console.log('[Error] File don\'t exist\'s')
                return
            }

            fs.writeFileSync(this.DB_PATH, JSON.stringify(arr, null, 4), 'utf-8')
            console.log('[Success] Rewrited file sucessfully...')
        } catch (ex) {
            console.log('[Error] Exception while rewriting file...')
            console.log('[Info] Details: ' + ex)
        }
    }

    public async get_object_from_query(query: any) {
        try {
            if (!fs.existsSync(this.DB_PATH)) {
                console.log('[Error] File don\'t exist\'s')
                return false
            }
            const actual_data = JSON.parse(fs.readFileSync(this.DB_PATH, 'utf-8'))
            try {
                for (let data of actual_data) {
                    if (this.matches_query(data, query)) {
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
    
    public async get_object_from_query_from_data(query: any, data: any) {
        try {
            for (const obj of data) {
                if (this.matches_query(obj, query)) {
                    return obj
                }
            }
            return undefined
        } catch (ex) {
            console.log('[Error] Exception while running matchesQuery()...')
            console.log('[Info] Details: ' + ex)
        }
    }

    private matches_query(json: Record<string, any>, query: Record<string, any>) {
        return Object.entries(query).every(([key, value]) => json[key] === value);
    }
}