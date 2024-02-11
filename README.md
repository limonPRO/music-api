create a .env file in root and add 
```bash
PORT = 3000
HOST = "localhost"
DATABASE= "musicdb"
USER = "root"
PASSWORD = ""

JWT_SECRET = "secret"
```
 to install all dependency 
 ```bash
npm i
```
to run the project 

```bash
npm run start 
``` 
for registration ( http://localhost:3000/users/registration  )
```bash

## in body 
{
    "name":"test",
    "email":"test@gmail.com",
    "password":"123456"
}
```
