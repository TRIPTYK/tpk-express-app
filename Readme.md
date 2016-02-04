# TPK-EXPRESS-APP
This is the base of our application made with the expressjs framework.
Use it at your own risk.


##Installation

###Requirements
* Nodejs v4
* TSD command line for visual studio code 

###Commands
To use the project you need to launch these commands

* npm install
* tsd install

To launch server just launch npm start
To launch the tests jsut launch npm test



##Securisation
Passport + jwt

Les routes sont sécurisées par le requireLogin: server/api.js
EX: router.use('/users', requireLogin, require('./user/routes'));

On check si on a bien reçu le token par une des trois manière suivante:

req.body.token //POST
req.query.token  //GET
req.headers['x-access-token']; //HEADER


Récupération du token:

1: POST sur /getToken => username + password
2: On récupère un JSON

SUCCESS:
{
  "success": true,
  "token": "ey..."
} 

FAIL EXEMPLE:
{
  "message": "Your username or password is invalid. Please try again.",
  "error": "Error"
}