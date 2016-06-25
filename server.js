// Dependencies
// =============================================================
var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var table_data = require('./app/data/table-data.js');
var waiting_list = require('./app/data/waitinglist-data.js');
var fs = require('fs');

// Sets up the Express App
// =============================================================
var app = express();
var PORT = 3000;

require('/app/routing/html-routes.js')(app);
require('/app/routing/api-routes.js')(app);

// Sets up the Express app to handle data parsing 
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.text());
app.use(bodyParser.json({type:'application/vnd.api+json'}));

// Star Wars Characters (DATA)
// =============================================================
var characters = [

	{
		routeName: "yoda",
		name: "Yoda",
		role: "Jedi Master",
		age: 900,
		forcePoints: 2000		
	},

	{
		routeName: "darthmaul",
		name: "Darth Maul",
		role: "Sith Lord",
		age: 200,
		forcePoints: 1200		
	},

	{
		routeName: "obiwankenobi",
		name: "Obi Wan Kenobi",
		role: "Jedi Master",
		age: 55,
		forcePoints: 1350
	}
]

// Routes
// =============================================================

// Basic route that sends the user first to the AJAX Page
app.get('/', function(req, res){
	//res.send("Welcome to the Star Wars Page!")
	res.sendFile(path.join(__dirname + '/app/public/home.html'));
})

app.get('/tables', function(req, res){
	//res.send("Welcome to the Star Wars Page!")
	res.sendFile(path.join(__dirname + '/app/public/tables.html'));
})


app.get('/reserve', function(req, res){
	//res.send("Welcome to the Star Wars Page!")
	res.sendFile(path.join(__dirname + '/app/public/reserve.html'));
})


// Search for Specific Character (or all characters) - provides JSON
app.get('/data', function(req, res){

	// var chosen = req.params.characters;

	// if(chosen){
	// 	console.log(chosen);

	// 	for (var i=0; i <characters.length; i++){

	// 		if (chosen == characters[i].routeName){
	// 			res.json(characters[i]);
	// 			return;
	// 		}
	// 	}

	// 	res.json(false);
	// }

	// else{
	// 	res.json(waiting_list);
	// }

	res.json(waiting_list, table_data);
})

// Starts the server to begin listening 
// =============================================================
app.listen(PORT, function(){
	console.log('App listening on PORT ' + PORT);
})