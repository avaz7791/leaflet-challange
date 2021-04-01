/*
Amir Vazquez 
Initialize Global Variables
*/
// URL
var url_usgs = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_month.geojson" //More data

//var url_usgs = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson" //less data

// Create lakers for Map and Quakes
var quakesLayer = L.layerGroup();
var lightmap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
  attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
  maxZoom: 18,
  id: "light-v10",
  accessToken: API_KEY
});

// Create the map object with options Los Angeles, CA
var xMap = L.map("mapid", {
  center: [34.0522, 118.2437],
  zoom: 5,
  layers: [lightmap, quakesLayer]
});

d3.json(url_usgs, function (response) {
     // console.log(response);

    // Pull Quate Spots from Features of our data pull 
    var qSpots = response.features;
  
    // Loop through the quakes array
    var QuakeSpots=[];
    for (var index = 0; index < qSpots.length; index++) {
      var qSpot = qSpots[index].geometry.coordinates;
      //console.log(qSpot);
      QuakeSpots.push(qSpot);
      var qMagnitude = qSpots[index].properties.mag;
      var qPlace = qSpots[index].properties.place;
      var qId = qSpots[index].properties.ids;
  
      L.circle(qSpot, {
          color: magnitudColor(qMagnitude),
          fillcolor: "#FF0000",
          radius: magnitudSize(qMagnitude)

      }).bindPopup(`<h1> ${qMagnitude} Quake Magnitud</h1>
      <ul>
        <li>Place: ${qPlace}</li>
        <li>Coordinates: ${qSpot}</li>
        <li>ID: ${qId}</li>
      </ul>`

      ).addTo(quakesLayer);
      quakesLayer.addTo(xMap);
    }
  //Map
    
    console.log(QuakeSpots);
  }

  //d3.json(url_usgs, function (response){     console.log(response);  })

);

function magnitudSize(magnitude){
    var radius = 0;
    var color = "white";
    if (magnitude > 5.1) {
        radius = magnitude * 51000;  
    }
    else if (magnitude > 4.0){
        radius = magnitude * 40000;  
    }
    else if (magnitude > 3.0){
      radius = magnitude * 30000;  
    }
    else if (magnitude > 2.0){
      radius = magnitude * 20000;  
    }
    else {
      radius = magnitude * 10000;  
    }
    return radius;
};
function magnitudColor(magnitude){
  var radius = 0;
  var color = "white";
  if (magnitude > 5.1) {
      color = "red";
  }
  else if (magnitude > 4.0){
      color = "green";
  }
  else if (magnitude > 3.0){
    color = "blue";
  }
  else if (magnitude > 2.0){
    color = "beige";
  }
  else {
    color = "white";  }
  return color;
};


