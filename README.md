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

    HTTP/1.1 200 OK
    Date: Thu, 15 Oct 2022 16:26:24 GMT
    Status: 200 OK
    Connection: close
    Content-Type: application/json

    {"username":"Bob","email":"test@gmail.com","password":"$2b$10$4L3h3js3IivRgfaSTrUyiOh/GuiO3Rc3L9J4QBdB/dXLVtfLeIvn6","profilePicture":"","coverPicture":"","followers":[],"followings":[],"isAdmin":false,"_id":"634adf302e71b8012bf86578","createdAt":"2022-10-15T16:26:24.509Z","updatedAt":"2022-10-15T16:26:24.509Z","__v":0}

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

## Connect With Me

[Github](https://github.com/gloria-cheung)
-- [Linkedin](http://www.linkedin.com/in/gloria-cheung) --
[Portfolio](http://www.gloria-cheung.com)
