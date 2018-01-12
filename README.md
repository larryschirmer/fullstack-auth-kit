# Fullstack Authentication Kit

### Install

Each project (`server`, `client`) has its own package. To install all of the dependencies, run `npm install` in both directories.

### Server Configuration

Within the server directory add `config.js`

```text
server
 |
 +-- config.js
```

and create a salt key

```javascript
module.exports = {
  secret: 'secretkeysecretkeysecretkeysecretkey',
};
```

This file is already added to the `.gitignore` file.

### Docker Mongo Database

The server makes requests to mongoDB on 27017. To build a new mongo database with docker run:

`docker run --name mongo-auth-kit -it -d -p 27017:27017 mongo`
