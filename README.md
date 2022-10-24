# E-Commerce REST API

An open-source RESTful API developed using NodeJS, ExpressJS and MongoDB that helps client to integrate User Authentication and ... in their application.

## Setup

- Create account on [MongoDB](https://www.mongodb.com/cloud/atlas/register), create project and set up database cluster
- Set up .env file using .env.example file
- Navigate to root and install dependencies with `npm install`
- Server is running on http://localhost:1234

## Create a New User

### Request

`POST /api/auth/register`

    curl -d '{"username":"Bob", "email":"test@gmail.com", "password":"123456"}' -H "Content-Type: application/json" -X POST "http://localhost:1234/api/auth/register"

### Response

    HTTP/1.1 201 Created
    Date: Mon, 24 Oct 2022 16:12:41 GMT
    Status: 201 Created
    Connection: close
    Content-Type: application/json

    {"username":"Bob","email":"test@gmail.com","isAdmin":false,"_id":"6356b979f3aaf8b96623774d","createdAt":"2022-10-24T16:12:41.452Z","updatedAt":"2022-10-24T16:12:41.452Z","__v":0}

## Login

### Request

`POST /api/auth/login`

    curl -d '{"username":"Bob", "email":"test@gmail.com", "password":"123456"}' -H "Content-Type: application/json" -X POST "http://localhost:1234/api/auth/login"

### Response

    HTTP/1.1 200 OK
    Date: Mon, 24 Oct 2022 16:12:41 GMT
    Status: 200 OK
    Connection: close
    Content-Type: application/json

    {"_id":"6356b979f3aaf8b96623774d","username":"Bob","email":"test@gmail.com","isAdmin":false,"createdAt":"2022-10-24T16:12:41.452Z","updatedAt":"2022-10-24T16:12:41.452Z","__v":0,"accessToken":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzNTZiOTc5ZjNhYWY4Yjk2NjIzNzc0ZCIsImlzQWRtaW4iOmZhbHNlLCJpYXQiOjE2NjY2MjgwMzEsImV4cCI6MTY2Njg4NzIzMX0.ynXxe34J7UddTZcBqiD7s04pmm7q_yYHenpdJkSmSpU"}

## Update User

### Request

`PUT /api/users/:id`

    curl -d '{"password":"1234567"}' -H "Content-Type: application/json" -H "token: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzNTZiOTc5ZjNhYWY4Yjk2NjIzNzc0ZCIsImlzQWRtaW4iOmZhbHNlLCJpYXQiOjE2NjY2MjgwMzEsImV4cCI6MTY2Njg4NzIzMX0.ynXxe34J7UddTZcBqiD7s04pmm7q_yYHenpdJkSmSpU" -X PUT "http://localhost:1234/api/users/6356b979f3aaf8b96623774d"

### Response

    HTTP/1.1 200 OK
    Date: Mon, 24 Oct 2022 16:12:41 GMT
    Status: 200 OK
    Connection: close
    Content-Type: application/json

    {"_id":"6356b979f3aaf8b96623774d","username":"Bob","email":"test@gmail.com","isAdmin":false,"createdAt":"2022-10-24T16:12:41.452Z","updatedAt":"2022-10-24T16:20:45.330Z","__v":0}

## Delete User

### Request

`DELETE /api/users/:id`

    curl -H "Content-Type: application/json" -H "token: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzNTZiOTc5ZjNhYWY4Yjk2NjIzNzc0ZCIsImlzQWRtaW4iOmZhbHNlLCJpYXQiOjE2NjY2MjgwMzEsImV4cCI6MTY2Njg4NzIzMX0.ynXxe34J7UddTZcBqiD7s04pmm7q_yYHenpdJkSmSpU" -X DELETE "http://localhost:1234/api/users/6356b979f3aaf8b96623774d"

### Response

    HTTP/1.1 200 OK
    Date: Thu, 15 Oct 2022 16:26:24 GMT
    Status: 200 OK
    Connection: close
    Content-Type: application/json

    "user deleted"

## Get Single User (admin)

### Request

`GET /api/users/find/:id`

    curl -H "Content-Type: application/json" -H "token: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzNTY5YzA2YmE5NzJkMTg3OTU3NjI2NiIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY2NjYyMDQzNCwiZXhwIjoxNjY2ODc5NjM0fQ.WUkFRIvU8vJ1zrAKtsxBBvY8tPg_B2tmMJJkPLwoFMg" -X GET "http://localhost:1234/api/users/find/63569bf5ba972d1879576264"

### Response

    HTTP/1.1 200 OK
    Date: Mon, 24 Oct 2022 14:06:45 GMT
    Status: 200 OK
    Connection: close
    Content-Type: application/json

    {"_id":"63569bf5ba972d1879576264","username":"gloria","email":"gloria@gmail.com","isAdmin":false,"createdAt":"2022-10-24T14:06:45.655Z","updatedAt":"2022-10-24T14:06:45.655Z","__v":0}

## Get All Users (admin)

### Request

`GET /api/users/`

    curl -H "Content-Type: application/json" -H "token: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzNTY5YzA2YmE5NzJkMTg3OTU3NjI2NiIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY2NjYyMDQzNCwiZXhwIjoxNjY2ODc5NjM0fQ.WUkFRIvU8vJ1zrAKtsxBBvY8tPg_B2tmMJJkPLwoFMg" -X GET "http://localhost:1234/api/users/?new=true"

### Response

    HTTP/1.1 200 OK
    Date: Mon, 24 Oct 2022 16:26:24 GMT
    Status: 200 OK
    Connection: close
    Content-Type: application/json

    [{"_id":"6356a7b6310ce435cffd9b62","username":"jake","email":"jake@gmail.com","isAdmin":false,"createdAt":"2022-10-24T14:56:54.883Z","updatedAt":"2022-10-24T14:56:54.883Z","__v":0},{"_id":"6356a7a9310ce435cffd9b60","username":"shirley","email":"shirley@gmail.com","isAdmin":false,"createdAt":"2022-10-24T14:56:41.805Z","updatedAt":"2022-10-24T14:56:41.805Z","__v":0},
    ...]

## Get User Stats (admin)

### Request

`GET /api/users/stats`

    curl -H "Content-Type: application/json" -H "token: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzNTY5YzA2YmE5NzJkMTg3OTU3NjI2NiIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY2NjYyMDQzNCwiZXhwIjoxNjY2ODc5NjM0fQ.WUkFRIvU8vJ1zrAKtsxBBvY8tPg_B2tmMJJkPLwoFMg" -X GET "http://localhost:1234/api/users/stats"

### Response

    HTTP/1.1 200 OK
    Date: Mon, 24 Oct 2022 16:26:24 GMT
    Status: 200 OK
    Connection: close
    Content-Type: application/json

    [{"_id":10,"total":7},
    {"_id":9,"total":1}]

## Create a New Product (admin)

### Request

`POST /api/products/`

    curl -d '{"title":"pantstest", "desc":"cool pants", "img":"fakeimg"}' -H "token: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzNTY5YzA2YmE5NzJkMTg3OTU3NjI2NiIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY2NjYyMDQzNCwiZXhwIjoxNjY2ODc5NjM0fQ.WUkFRIvU8vJ1zrAKtsxBBvY8tPg_B2tmMJJkPLwoFMg" -H "Content-Type: application/json" -X POST "http://localhost:1234/api/products/"

### Response

    HTTP/1.1 201 Created
    Date: Mon, 24 Oct 2022 16:12:41 GMT
    Status: 201 Created
    Connection: close
    Content-Type: application/json

    {"title":"pantstest","desc":"cool pants","img":"fakeimg","categories":[],"_id":"6356bec0f3aaf8b966237756","createdAt":"2022-10-24T16:35:12.349Z","updatedAt":"2022-10-24T16:35:12.349Z","__v":0}

## Update Product (admin)

### Request

`PUT /api/products/:id`

    curl -d '{"desc":"very cool pants"}' -H "token: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzNTY5YzA2YmE5NzJkMTg3OTU3NjI2NiIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY2NjYyMDQzNCwiZXhwIjoxNjY2ODc5NjM0fQ.WUkFRIvU8vJ1zrAKtsxBBvY8tPg_B2tmMJJkPLwoFMg" -H "Content-Type: application/json" -X PUT "http://localhost:1234/api/products/6356bec0f3aaf8b966237756"

### Response

    HTTP/1.1 200 OK
    Date: Mon, 24 Oct 2022 16:12:41 GMT
    Status: 200 OK
    Connection: close
    Content-Type: application/json

    {"_id":"6356bec0f3aaf8b966237756","title":"pantstest","desc":"very cool pants","img":"fakeimg","categories":[],"createdAt":"2022-10-24T16:35:12.349Z","updatedAt":"2022-10-24T16:36:25.379Z","__v":0}

## Delete Product (admin)

### Request

`DELETE /api/products/:id`

    curl -H "token: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzNTY5YzA2YmE5NzJkMTg3OTU3NjI2NiIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY2NjYyMDQzNCwiZXhwIjoxNjY2ODc5NjM0fQ.WUkFRIvU8vJ1zrAKtsxBBvY8tPg_B2tmMJJkPLwoFMg" -H "Content-Type: application/json" -X DELETE "http://localhost:1234/api/products/6356bec0f3aaf8b966237756"

### Response

    HTTP/1.1 200 OK
    Date: Thu, 15 Oct 2022 16:26:24 GMT
    Status: 200 OK
    Connection: close
    Content-Type: application/json

    "product deleted"

## Get Single Product

### Request

`GET /api/products/:id`

    curl -H "Content-Type: application/json" -X GET "http://localhost:1234/api/products/6356b52fb4fda0fe2be02f8a"

### Response

    HTTP/1.1 200 OK
    Date: Mon, 24 Oct 2022 14:06:45 GMT
    Status: 200 OK
    Connection: close
    Content-Type: application/json

    {"_id":"6356b52fb4fda0fe2be02f8a","title":"pants","desc":"cool pants","img":"www.pantsimg.com","categories":["bottoms"],"createdAt":"2022-10-24T15:54:23.979Z","updatedAt":"2022-10-24T15:54:23.979Z","__v":0}

## Get All Products

### Request

`GET /api/products/?new=true&category=bottoms`

    curl -H "Content-Type: application/json" -X GET "http://localhost:1234/api/products/?new=true&category=bottoms"

### Response

    HTTP/1.1 200 OK
    Date: Mon, 24 Oct 2022 16:26:24 GMT
    Status: 200 OK
    Connection: close
    Content-Type: application/json

    [{"_id":"6356b7e4d16e7bdbcbd8be7f","title":"pants6","desc":"cool pants","img":"www.pantsimg.com","categories":["bottoms","men"],"createdAt":"2022-10-24T16:05:56.679Z","updatedAt":"2022-10-24T16:05:56.679Z","__v":0},
    {"_id":"6356b7e1d16e7bdbcbd8be7d","title":"pants5","desc":"cool pants","img":"www.pantsimg.com","categories":["bottoms","men"],"createdAt":"2022-10-24T16:05:53.142Z","updatedAt":"2022-10-24T16:05:53.142Z","__v":0},
    ...]

## Project Stack

- Back-End: Express, Node.js, MongoDB, Mongoose

## Dependencies

- express
- mongoose
- bcrypt
- dotenv
- helmet
- morgan
- nodemon
- jsonwebtoken

## Connect With Me

[Github](https://github.com/gloria-cheung)
-- [Linkedin](http://www.linkedin.com/in/gloria-cheung) --
[Portfolio](http://www.gloria-cheung.com)
