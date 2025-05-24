# LocalDatabase
"database" made in typescript, used in my main project (Opencord)

features:
- search for queries
- edit queries
- delete queries
- add queries

how it works:
- can search for objects, edit objects, etc (with json objects), using a .json file as a database (all locally)

example:<br>
#json object (representation)<br>
| Key  | Value |
| ------------- | ------------- |
| password:  | "auserpassoword123"  |
| e_mail:  | "agoogleemail@gmail.com"  |
| user_name:  | "username123"  |

- getting object from query<br>
`Database.get_from_query({ e_mail: "agoogleemail@gmail.com", password: "auserpassoword123" })`<br>

returns `{ e_mail: "agoogleemail@gmail.com", password: "auserpassoword123", user_name: "username123" }` # json object<br>

- updating object from query<br>
`Database.update_from_query({ e_mail: "agoogleemail@gmail.com", password: "auserpassoword123" }, { user_name: "usernameupdated", new_key: "astringvalue" })`<br>

updated object `{ e_mail: "agoogleemail@gmail.com", password: "auserpassoword123", user_name: "usernameupdated", new_key: "astringvalue" }`<br>

- checking if database contains query<br>
`Database.contains_query({ e_mail: "agoogleemail@gmail.com", password: "auserpassoword123" })`<br>

returns true<br>

- adding object to database<br>
`Database.add_object({ e_mail: "aoutlookemail@outlook.com", password: "aoutlookuserpassoword123" })`<br>

adds the object to the database

how to setup in node:<br>
- importing:<br>
`import * as Database from './path/to/the/database/main/file'`<br>

- initing:<br>
`const a_db = new Database.Database('path/to/your/database/json/file')` # local database<br>

