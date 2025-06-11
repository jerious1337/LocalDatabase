# LocalDatabase
### A Local Database made with typescript

## Dependencies:
```ts
import fs from 'fs'
```

## NPM Dependency:
```ts
import * as Database from 'jerious-local-database'
```

## Features:
- Search for queries
- Edit queries
- Delete queries
- Add queries

## How it works:
Can search for objects, edit objects, etc (with json objects), using a .json file as a database (all locally)

## Usage example:<br>
> JSON Object (representation)<br>

| Key  | Value |
| ------------- | ------------- |
| password:  | "auserpassoword123"  |
| e_mail:  | "agoogleemail@gmail.com"  |
| user_name:  | "username123"  |

### Getting object from query<br>
```ts
Database.get_from_query({
  e_mail: "agoogleemail@gmail.com",
  password: "auserpassoword123"
})
```
returns:
```ts
{
  e_mail: "agoogleemail@gmail.com",
  password: "auserpassoword123",
  user_name: "username123"
}
```

### Updating object from query
```ts
Database.update_from_query({
  e_mail: "agoogleemail@gmail.com",
  password: "auserpassoword123"
}, {
  user_name: "usernameupdated",
  new_key: "astringvalue"
})
```
updated object:
```ts
{
  e_mail: "agoogleemail@gmail.com",
  password: "auserpassoword123",
  user_name: "usernameupdated",
  new_key: "astringvalue"
}
```

### Checking if database contains query<br>
```ts
Database.contains_query({
  e_mail: "agoogleemail@gmail.com",
  password: "auserpassoword123"
})
```
returns:
```ts
true
```

### Adding object to database<br>
```ts
Database.add_object({
  e_mail: "aoutlookemail@outlook.com",
  password: "aoutlookuserpassoword123"
})
```
adds the object to the database.

## How to setup in node:<br>
Importing
```ts
import * as Database from './path/to/the/database/main/file'
```

Initing<br>
```ts
const a_db = new Database.Database('path/to/your/database/json/file')
```

## Database file example:
![Captura de tela de 2025-05-24 15-46-27](https://github.com/user-attachments/assets/55c6dbc1-3cc4-40f9-84b1-c5ddffdb3f77)