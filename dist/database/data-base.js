"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Database = void 0;
const fs_1 = __importDefault(require("fs"));
class Database {
    DB_PATH;
    constructor(file_path) {
        this.DB_PATH = file_path;
    }
    add_object(data) {
        try {
            let logs = [];
            if (fs_1.default.existsSync(this.DB_PATH)) {
                const actual_data = fs_1.default.readFileSync(this.DB_PATH, 'utf-8');
                logs = JSON.parse(actual_data);
            }
            logs.push(data);
            fs_1.default.writeFileSync(this.DB_PATH, JSON.stringify(logs, null, 4), 'utf-8');
            console.log('[Success] Sucessfully writed...');
        }
        catch (ex) {
            console.log('[Error] Exception while writing...');
            console.log('[Info] Details: ' + ex);
        }
    }
    async update_object_from_query(object, query) {
        for (let key in query) {
            if (query.hasOwnProperty(key)) {
                object[key] = query[key];
            }
        }
    }
    async update_from_query(query, new_query) {
        const data_base = await this.read_data_base();
        const queried_object = await this.get_object_from_query_from_data(query, data_base);
        if (!queried_object) {
            return 0;
        }
        await this.update_object_from_query(queried_object, new_query);
        await this.rewrite_data_base(data_base);
        return 1;
    }
    contains_query(query) {
        try {
            if (!fs_1.default.existsSync(this.DB_PATH)) {
                console.log('[Error] File don\'t exist\'s');
                return false;
            }
            const actual_data = JSON.parse(fs_1.default.readFileSync(this.DB_PATH, 'utf-8'));
            try {
                for (let data of actual_data) {
                    if (this.matches_query(data, query)) {
                        return true;
                    }
                }
                return false;
            }
            catch (ex) {
                console.log('[Error] Exception while running matchesQuery()...');
                console.log('[Info] Details: ' + ex);
            }
        }
        catch (ex) {
            console.log('[Error] Exception while examining file...');
            console.log('[Info] Details: ' + ex);
        }
    }
    async read_data_base() {
        try {
            if (!fs_1.default.existsSync(this.DB_PATH)) {
                console.log('[Error] File don\'t exist\'s');
                return undefined;
            }
            const result = fs_1.default.readFileSync(this.DB_PATH, 'utf-8');
            return JSON.parse(result);
        }
        catch (ex) {
            console.log('[Error] Exception while reading file...');
            console.log('[Info] Details: ' + ex);
            return undefined;
        }
    }
    async rewrite_data_base(arr) {
        try {
            if (!fs_1.default.existsSync(this.DB_PATH)) {
                console.log('[Error] File don\'t exist\'s');
                return;
            }
            fs_1.default.writeFileSync(this.DB_PATH, JSON.stringify(arr, null, 4), 'utf-8');
            console.log('[Success] Rewrited file sucessfully...');
        }
        catch (ex) {
            console.log('[Error] Exception while rewriting file...');
            console.log('[Info] Details: ' + ex);
        }
    }
    async get_object_from_query(query) {
        try {
            if (!fs_1.default.existsSync(this.DB_PATH)) {
                console.log('[Error] File don\'t exist\'s');
                return false;
            }
            const actual_data = JSON.parse(fs_1.default.readFileSync(this.DB_PATH, 'utf-8'));
            try {
                for (let data of actual_data) {
                    if (this.matches_query(data, query)) {
                        return data;
                    }
                }
                return undefined;
            }
            catch (ex) {
                console.log('[Error] Exception while running matchesQuery()...');
                console.log('[Info] Details: ' + ex);
            }
        }
        catch (ex) {
            console.log('[Error] Exception while examining file...');
            console.log('[Info] Details: ' + ex);
        }
    }
    async get_object_from_query_from_data(query, data) {
        try {
            for (const obj of data) {
                if (this.matches_query(obj, query)) {
                    return obj;
                }
            }
            return undefined;
        }
        catch (ex) {
            console.log('[Error] Exception while running matchesQuery()...');
            console.log('[Info] Details: ' + ex);
        }
    }
    matches_query(json, query) {
        return Object.entries(query).every(([key, value]) => json[key] === value);
    }
}
exports.Database = Database;
