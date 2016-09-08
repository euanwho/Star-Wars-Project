// Starship Array

var starships = [];

function starship(starshipName, model, manufacturer/*, cost, length, maxspeed, crew, passengers, cargocapacity, consumables, hyperdriverating, mglt, starshipclass*/) {
  this.starshipName = starshipName;
  this.model = model;
  this.manufacturer = manufacturer;
/*  this.cost = cost;
  this.length = length;
  this.maxspeed = maxspeed;
  this.crew = crew;
  this.passengers = passengers;
  this.cargocapacity = cargocapacity;
  this.consumables = consumables;
  this.hyperdriverating = hyperdriverating;
  this.mglt = mglt;
  this.starshipclass = starshipclass;*/
}

function starshipData(data) {
  for (i = 0; i < data.results.length; i++) {
    var results = data.results[i];
    starships.push(new starship(results["name"], results["model"], results["manufacturer"]/*, parseInt(results["cost_in_credits"]), parseInt(results["length"]), parseInt(results["max_atmosphering_speed"]), parseInt(results["crew"]), parseInt(results["passengers"]), parseInt(results["cargo_capacity"]), results["consumables"], parseFloat(results["hyperdrive_rating"]), results["mglt"], results["starship_class"]*/));
  }
}

for (i=0; i<starships.length; i++){
  console.log(starships[i].name);
}
// Vehicles Array

var vehicles = [];

function vehicle(){
  new starship();
}


function vehicleData(data) {
  for (i = 0; i < data.results.length; i++) {
    var results = data.results[i];
    vehicles.push(new vehicle(results["name"], results["model"], results["manufacturer"], parseInt(results["cost_in_credits"]), parseInt(results["length"]), parseInt(results["max_atmosphering_speed"]), parseInt(results["crew"]), parseInt(results["passengers"]), results["cargo_capacity"], results["consumables"], results["vehicle_class"]));
  }
}

//console.log(vehicles);

// Starship Requests

$.getJSON('https://swapi.co/api/starships/', function(data) {
  starshipData(data);
});
$.getJSON('https://swapi.co/api/starships/?page=2', function(data) {
  starshipData(data);
});

// Vehicle Requests

$.getJSON('https://swapi.co/api/vehicles/', function(data) {
  vehicleData(data);
});
$.getJSON('https://swapi.co/api/vehicles/?page=2', function(data) {
  vehicleData(data);
});
