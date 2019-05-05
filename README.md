# MERN-boilerplate

This is a boilerplate project using the following technologies:
- [React](https://facebook.github.io/react/) and [React Router](https://reacttraining.com/react-router/) for the frontend
- [Express](http://expressjs.com/) and [Mongoose](http://mongoosejs.com/) for the backend
- [Sass](http://sass-lang.com/) for styles (using the SCSS syntax)
- [Webpack](https://webpack.github.io/) for compilation


## Requirements

- [Node.js](https://nodejs.org/en/) 6+

```shell
npm install
```


## Running
Development (Webpack dev server) mode:

```shell
npm run start:dev
```

To make sure everything is installed you should be able to open up `localhost:8080` and play around with the counters. If that is not working, something is wrong with your MongoDB installation or it's not running. Also consider installing MongoDB Compass Community edition. 

## Explanation
- In the `server\models` folders you will find schemas of the entities using Mongoose. 
- In the `routes\api` folders you will find the CRUD operations for each entity. You can look up the MongoDB CRUD functions and see how the api calls are created.
- So far I have User signup/login implemented. You can download a REST client such as Advanced Rest Client or use curl to make api calls. 
