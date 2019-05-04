# bidbuysell
E-bidding Platform

Check the Wiki for minutes.

# Getting Started
```
$ npm install 
```
This command will start the React app (port 3000), node server (port 5000) and json-server (port 8080)
```
$ npx run dev
```
Go to the login route to login using any user info from the json-server. Right now error handling needs some tweaking. If you try something incorret it'll crash the node server. 
```
localhost:3000/Login
```
This an example of a protected route. If you try to access without a session token you will be directed to login. To delete token go to Inspector > Storage/Memory > Local Storage > delete cool-jwt
```
localhost:3000/Protected
```
