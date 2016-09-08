 var starships = [];

// Filter Above Certain Price
function abovePrice(instance) {
  return instance.cost >= 150000;
}

// Filter Below Certain Price
function belowPrice(instance) {
  return instance.cost <= 150000;
}

// Filter Between Two Prices
function twoPrices(instance) {
  return instance.cost <= 150000 && instance.cost > 100000;
}

// Filter Ascending Price
function ascendingPrice(a, b) {
  return a.cost - b.cost;
}
// Filter Descending Price
function descendingPrice(a, b) {
  return b.cost - a.cost;
}

// Filter Alphabetical Order
function alphabeticalOrder(a,b) {
  if (a.productName < b.productName)
    return -1;
  if (a.productName > b.productName)
    return 1;
  return 0;
}

// Filter Alphabetical Order in Reverse
function reverseAlphabeticalOrder(a,b) {
  if (a.productName > b.productName)
    return -1;
  if (a.productName < b.productName)
    return 1;
  return 0;
}

function starshipData(data) {

  //Set Up Starship Object Protoype
  function starship(productName, model, manufacturer, cost, productLength, maxspeed, crew, passengers, cargocapacity, consumables, hyperdriverating, mglt, productClass) {
    this.productName = productName;
    this.model = model;
    this.manufacturer = manufacturer;
    this.cost = cost;
    this.productLength = productLength;
    this.maxspeed = maxspeed;
    this.crew = crew;
    this.passengers = passengers;
    this.cargocapacity = cargocapacity;
    this.consumables = consumables;
    this.hyperdriverating = hyperdriverating;
    this.mglt = mglt;
    this.productClass = productClass;
  }

  // Push Data to Starships Array
  for (i = 0; i < data.results.length; i++) {
    var results = data.results[i];
    starships.push(new starship(results["name"], results["model"], results["manufacturer"], parseFloat(results["cost_in_credits"]), parseFloat(results["length"]), parseFloat(results["max_atmosphering_speed"]), parseFloat(results["crew"]), parseFloat(results["passengers"]), parseFloat(results["cargo_capacity"]), results["consumables"], parseFloat(results["hyperdrive_rating"]), results["mglt"], results["starship_class"]));
  }

  // Remove Starships without a Price
  for (k=0; k < starships.length; k++) {
    if (isNaN(starships[k].cost)) {
      starships.splice(k, 1);
    }
  }

  starships.sort(alphabeticalOrder);
}

var container = document.querySelector('#container');
var shop = document.querySelector('#shop main section');
var productCard = '';


function logProduct(array){
  for(s=0;s<array.length;s++) {

    productCard += '<div class="product"><div class="img-container"><img src="http://courses.cs.washington.edu/courses/cse455/08wi/projects/project3/web/artifacts/jonobird-ncall/artifact/xw1.jpg" alt="" /></div>';
    productCard += '<figcaption><h3>' + array[s].productName + '</h3>';
    productCard += '<p>' + array[s].manufacturer + '</p>';
    productCard += '<div class="price">' + array[s].cost + '</div></figcaption></div>';
    //$('.img-container').height($('.img-container img').height());
  }
  $(shop).append(productCard);
  console.log(starships.length);
}

$.when(
  $.getJSON('https://swapi.co/api/starships/', function(data) {
    starshipData(data);
  }),
  $.getJSON('https://swapi.co/api/starships/?page=2', function(data) {
    starshipData(data);
  }),
  $.getJSON('https://swapi.co/api/starships/?page=3', function(data) {
    starshipData(data);
  }),
  $.getJSON('https://swapi.co/api/starships/?page=4', function(data) {
    starshipData(data);
  })
).then(function() {
  logProduct(starships);
});

var select = document.querySelector('header span select');
var current = '';

function filterProducts() {
  current = select.value;
  switch (select.value) {
    case 'ascendingPrice':
      starships.sort(ascendingPrice);
      //shop.innerHTML = '';
      //logProduct(starships);
      console.log(starships.length);
      break;
    case 'descendingPrice':
      starships.sort(descendingPrice);
      //shop.innerHTML = '';
      //logProduct(starships);
      console.log(starships.length);
      break;
    case 'alphabeticalOrder':
      starships.sort(alphabeticalOrder);
      //shop.innerHTML = '';
      console.log(starships.length);
      break;
  }
}

select.addEventListener("change", filterProducts);
