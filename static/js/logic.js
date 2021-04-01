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
  //center: [0, 0],
  center:[37.0, -100.0],
  zoom: 3,
  layers: [lightmap, quakesLayer]
});

d3.json(url_usgs, function (response) {
    console.log(response);

    // Pull Quate Spots from Features of our data pull 
    var qSpots = response.features;
  
    // Loop through the quakes array
    var QuakeSpots=[];
    for (var index = 0; index < qSpots.length; index++) {
     // var qSpot = qSpots[index].geometry.coordinates;
      var qSpotLon = qSpots[index].geometry.coordinates[1];
      var qSpotLat = qSpots[index].geometry.coordinates[0];
      
      var coordinates = L.latLng(qSpotLon, qSpotLat);
      var qDepth = qSpots[index].geometry.coordinates[2];
     // console.log(coordinates);
      
      // console.log(qDepth);
      
      var qMagnitude = qSpots[index].properties.mag;
      var qPlace = qSpots[index].properties.place;
      var qId = qSpots[index].properties.ids;
  
      L.circleMarker(coordinates, {
        color: magnitudColor(qDepth),
        fillcolor: "grey",
        stroke: true,
        weight:0.9,  //0-2
        radius: magnitudSize(qMagnitude)


        
      }).bindPopup(`<h1> ${qMagnitude} Quake Magnitude</h1>
      <ul>
        <li>Depth: ${qDepth}</li>
        <li>Place: ${qPlace}</li>
        <li>Coordinates: ${coordinates}</li>
        <li>ID: ${qId}</li>
      </ul>`
      ).addTo(quakesLayer);
      quakesLayer.addTo(xMap);

    }
  //Map
    
  // create legend
    var legendPosition = L.control({position:'bottomleft'});
    legendPosition.onAdd = function(xMap) {
      //create div to insert Legend section
      var div = L.DomUtil.create("div","Legend");

      var scale = [0,20,30,40,50,60,70,85]; //Depth scale 
      var color = ["grey","yellow","blue","green","red" ] //depth color

      div.innerHTML ="<h2>Depth Scale </h2>"
      for  (var l=0; l< scale.length; l++) {
            div.innerHTML += scale[l] + (scale[l + 1]? '&ndash;' + scale[l + 1] + '<br>' : '+');
      }

      return div;
      console.log(div);
    };
      legendPosition.addTo(xMap);
  }

);

function magnitudSize(magnitude){
    var radius = 0;
    var color = "white";
    if (magnitude > 5.1) {
      // radius = magnitude * 51000;  
        radius = magnitude * 8 ;
    }
    else if (magnitude > 4.0){
       // radius = magnitude * 40000;  
        radius = magnitude * 7;  
    }
    else if (magnitude > 3.0){
      //radius = magnitude * 30000;  
      radius = magnitude * 6 ;
    }
    else if (magnitude > 2.0){
      //radius = magnitude * 20000;  
      radius = magnitude * 5;
    }
    else {
      //radius = magnitude * 1000000;  
      radius = magnitude * 3;
    }
    return radius ;
};
function magnitudColor(depth){
  var radius = 0;
  var color = "white";
  if (depth > 85) {
      color = "red";
  }
  else if (depth > 70){
      color = "lightpink";
  }
  else if (depth > 60){
    color = "orange";
  }
  else if (depth > 50){
    color = "yellow";
  }
  else if (depth > 40){
    color = "lightyellow";
  }
  else if (depth > 30){
    color = "green";
  }
  else if (depth > 20){
    color = "purple";
  }
  else {
    color = "lightgreen";  }
  return color;
};


