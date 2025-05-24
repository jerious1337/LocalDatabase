# LocalDatabase
### "database" made in typescript, used in my main project (Opencord)

## Dependencies:
- fs
---

## Features:
- search for queries
- edit queries
- delete queries
- add queries
---

### How it works:
- can search for objects, edit objects, etc (with json objects), using a .json file as a database (all locally)
---

## Usage example:<br>
> json object (representation)<br>

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
returns 
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
updated object 
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
returns 
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
adds the object to the database
---

## How to setup in node:<br>
- importing:
```ts
import * as Database from './path/to/the/database/main/file'
```

- initing:<br>
```ts
const a_db = new Database.Database('path/to/your/database/json/file')
```


database file example:<br>
![Captura de tela de 2025-05-24 15-46-27](https://github.com/user-attachments/assets/55c6dbc1-3cc4-40f9-84b1-c5ddffdb3f77)



