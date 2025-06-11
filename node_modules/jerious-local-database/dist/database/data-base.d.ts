declare module 'jerious-local-database' {
    export class Database<T extends Record<string, any> = Record<string, any>> {
        /**
         * Database JSON file path e.g: 'C:\\users\\user\\Documents\\my-project\\databases\\users-database.json'
         */
        DB_FILE_PATH: string;

        /**
         * Number of spaces for JSON indentation
         */
        indent_spaces: number;

        constructor(file_path: string, indent_spaces?: number);

        /**
         * Adds an object to the database JSON file
         * @param data Object of type T
         */
        addObject(data: T): Promise<void | undefined>;

        /**
         * Updates the first object matching the query with new values
         * @param query Query object to find the record
         * @param new_query Object with new values to assign
         * @returns Promise resolving to boolean (true if update succeeded)
         */
        updateFromQuery(query: T, new_query: T): Promise<boolean | undefined>;

        /**
         * Removes objects matching the query
         * @param query Query object to match
         * @param remove_all If true, removes all matches, otherwise removes first match
         * @returns Promise resolving to boolean indicating if removal happened
         */
        removeFromQuery(query: T, remove_all?: boolean): Promise<boolean>;

        /**
         * Checks if any object matches the query
         * @param query Query object
         * @returns Promise resolving to boolean or undefined if error
         */
        containsQuery(query: T): Promise<boolean | undefined>;

        /**
         * Reads and returns the entire database as an array of T
         */
        readDatabase(): Promise<T[] | undefined>;

        /**
         * Overwrites the entire database with the given array
         * @param array Array of objects to write
         */
        rewriteDatabase(array: T[]): Promise<void>;

        /**
         * Gets the first object matching the query
         * @param query Query object
         * @returns Promise resolving to object of type T or undefined
         */
        getObjectFromQuery(query: T): Promise<T | undefined>;

        /**
         * Gets the first object matching the query from provided data array
         * @param query Query object
         * @param data Array of objects of type T to search
         * @returns Promise resolving to object of type T or undefined
         */
        getObjectFromQueryFromData(query: T, data: T[]): Promise<T | undefined>;
    }
}