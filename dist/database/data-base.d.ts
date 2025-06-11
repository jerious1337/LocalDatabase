declare module 'jerious-local-database' {
    export class Database {
        /** 
        * Database JSON file path e.g: 'C:\users\user\Documents\my-project\databases\users-database.json'
        */
        DB_PATH: string;

        constructor(file_path: string);

        /**
         * * Adds a object to database json object file
         * @param data: object
         */
        add_object(data: any): void;

        /**
         * * Adds a object to database json object file
         * @param query: query
         * @param new_query: new query that will be assigned to the object returned from the @query
         */
        update_from_query(query: any, new_query: any): Promise<0 | 1>;

        /**
         * * Checks if a object with query exists
         * @param query: query (JSON Object)
         */
        contains_query(query: any): boolean | undefined;

        /**
         * * Returns the entire database as a JSON Array
         */
        read_data_base(): Promise<any>;

        /**
         * * Rewrites the entire database
         * @param arr: content that will be overwritted
         */
        rewrite_data_base(arr: any): Promise<void>;

        /**
         * * Returns a object that contains query
         * @param query: query (JSON Object)
         */
        get_object_from_query(query: any): Promise<any>;

        /**
         * * Returns a object that contains query from data
         * @param query: query (JSON Object)
         */
        get_object_from_query_from_data(query: any, data: any): Promise<any>;
    }
}