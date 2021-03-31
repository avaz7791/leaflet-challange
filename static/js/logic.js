/*
Initialize Global Variables
*/
var url_usgs = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_month.geojson"

function createMap(quakes) {

    // Create the tile layer that will be the background of our map
    var lightmap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
      attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
      maxZoom: 18,
      id: "light-v10",
      accessToken: API_KEY
    });
  
    // Create a baseMaps object to hold the lightmap layer
    var baseMaps = {
      "Light Map": lightmap
    };
  
    // Create an overlayMaps object to hold the quakes layer
    var overlayMaps = {
      "Bike Stations": quakes
    };
  
    // Create the map object with options Los Angeles, CA
    var Map = L.map("mapid", {
      center: [34.0522, 118.2437],
      zoom: 12,
      layers: [lightmap, quakes]
    });
  
    // Create a layer control, pass in the baseMaps and overlayMaps. Add the layer control to the map
    L.control.layers(baseMaps, overlayMaps, {
      collapsed: false
    }).addTo(Map);
  }

function createQuakeSpots(response) {
      console.log(response);

    // Pull Quate Spots from Features of our data pull 
    var qSpots = response.features;
  
    // Loop through the quakes array
    for (var index = 0; index < qSpots.length; index++) {
      var qSpot = qSpots[index].geometry.coordinates;
      //console.log(qSpot);

      var qMagnitude = qSpots[index].properties.mag;
      var qPlace = qSpots[index].properties.place;
      var qId = qSpots[index].properties.ids;
  
      L.circle(qSpot, {
          color:"white",
          fillcolor: "#FF0000",
          radius: qMagnitude * 1000

      }).bindPopup(`<center><h1> ${qMagnitude} Quake Magnitud</h1></center>
      <ul>
        <li>Place: ${qPlace}</li>
        <li>Coordinates: ${qSpot}</li>
        <li>ID: ${qId}</li>
      </ul>`

      ).addTo(Map);
  
    }
  
    createMap(L.layerGroup(qSpots));
  }

  



  //d3.json(url_usgs, function (response){     console.log(response);  })

  d3.json(url_usgs,createQuakeSpots);