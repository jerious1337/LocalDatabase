# LocalDatabase
"database" made in typescript, used in my main project (Opencord)
features:
- search for queries
- edit queries
- delete queries
- add queries

how it works:
- can search for objects, edit objects, etc (with json objects), using a .json file as a database (all locally)

- example:

#json object (representation)
-------------------------------------
| e_mail: "agoogleemail@gmail.com"  | 
| password: "auserpassoword123"     |
| user_name: "username123"          |
-------------------------------------

#getting object from query
`Database.get_from_query({ e_mail: "agoogleemail@gmail.com", password: "auserpassoword123" })`
returns `{ e_mail: "agoogleemail@gmail.com", password: "auserpassoword123", user_name: "username123" }` # json object

#updating object from query
`Database.update_from_query({ e_mail: "agoogleemail@gmail.com", password: "auserpassoword123" }, { user_name: "usernameupdated", new_key: "astringvalue" })`
updated object `{ e_mail: "agoogleemail@gmail.com", password: "auserpassoword123", user_name: "usernameupdated", new_key: "astringvalue" }`

#checking if database contains query
`Database.contains_query({ e_mail: "agoogleemail@gmail.com", password: "auserpassoword123" })`
returns true

- how to setup in node:
importing:
`import * as Database from './path/to/the/database/main/file'`

initing:
`const a_db = new Database.Database('path/to/your/database/json/file')` # local database

