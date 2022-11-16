let map, heatmap, cluster;
var points = [];
var markers = [], markers1 = [], markers2 = [];
var k = 1;

// Map initialization
function initMap() {
    //Get the crime Data
    $.getJSON("c.json", function (json1) {
        $.each(json1, function (key, data) {
            //Get the latitude and longitude
            var latLng = new google.maps.LatLng(data.latitude, data.longitude);
            points.push(latLng)
            // Creating a marker and putting it on the map 
            return {
                points
            }
        });
    });
    //ini
    map = new google.maps.Map(document.getElementById("map-container"), {
        center: new google.maps.LatLng(41.8781, -87.6298),
        zoom: 10.5,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    });
    heatmap = new google.maps.visualization.HeatmapLayer({
        data: points,
        map: null,
    });


    document
        .getElementById("toggle-heatmap")
        .addEventListener("click", toggleHeatmap);
    document
        .getElementById("change-gradient")
        .addEventListener("click", changeGradient);
    document
        .getElementById("change-opacity")
        .addEventListener("click", changeOpacity);
    document
        .getElementById("change-radius")
        .addEventListener("click", changeRadius);
function addMarkers(){
    $.getJSON("http://localhost:3000/sendjson", function (data) {
        //iterate through each data in the file
        data.forEach(el => {
            var latLng = new google.maps.LatLng(el.Latitude, el.Longitude);
            //create marker with properties
            var marker = new google.maps.Marker({
                position: latLng,
                title: el.ID,
                type: el.Primary_Type,
                map: null
            })
            // add information window to the marker
            var infoWindow = new google.maps.InfoWindow()
            //link click handler to open the window
            marker.addListener('click', function () {
                infoWindow.open(map, marker);
            });
            //push in data content
            var arrayTest = ["ID:" + el.ID, "Date:" + el.Date, "Type:" + el.Primary_Type];
            infoWindow.setContent("<p>Crime Case:</p>" + arrayTest.map(function (val) { return "<p>" + val + "</p>" }).join(""));

            //push marker to array
            markers.push(marker);

        });
    });
}
addMarkers(markers);

    //set the array to clear
function clearOverlays() {
    for (var i = 0; i < markers.length; i++) {
        markers[i].setMap(null);
    }
    markers = [];
    cluster.clearMarkers();
  }
  
  
  //remove duplicated elements in the array
  function removeDuplicates(array){
    return array.filter((value, index) => array.indexOf(value) === index);
  }
  

//filter button for offense type
$(document).on('click', '#o-filter', function(){
  
    $.each(markers, function(i, v) {
      if(v.type.indexOf("OFFENSE")!= -1)
      {
        //add elements of required type to the markers array
        markers.push(v);
      }
      else
        markers1.push(v);
        //filter the markers array with the elements in markers1 array
      for(let k of markers1){
        markers = markers.filter(items => items !== k);
       }
       markers = removeDuplicates(markers);
  
  });
    //make cluster of the markers in the markers array
      cluster = new markerClusterer.MarkerClusterer({map, markers});
  
    });
              
     //filter button for battery type         
      $(document).on('click', '#b-filter', function(){
        $.each(markers, function(i, v) {
          if(v.type.indexOf("BATTERY")!= -1)
            markers.push(v);
          else
            markers1.push(v);
          for(let k of markers1){
            markers=markers.filter(items => items !== k);
        }
          markers = removeDuplicates(markers);
      });
          cluster = new markerClusterer.MarkerClusterer({map, markers});
        });
  
  
        //filter button for criminal damage type
        $(document).on('click', '#c-filter', function(){
          $.each(markers, function(i, v) {
            if(v.type.indexOf("CRIMINAL DAMAGE")!= -1)
            {
              markers.push(v);
              //console.log(markers)
            }
          
              else
              markers1.push(v);
            for(let k of markers1){
              markers=markers.filter(items => items !== k);
          }
            markers = removeDuplicates(markers);
        });
            cluster = new markerClusterer.MarkerClusterer({map, markers});
          });
  
          //filter button for assult type
          $(document).on('click', '#as-filter', function(){
            $.each(markers, function(i, v) {
              if(v.type.indexOf("ASSAULT")!= -1)
              {
                markers.push(v);
              }
            
                else
                markers1.push(v);
              for(let k of markers1){
                markers=markers.filter(items => items !== k);
            }
              markers = removeDuplicates(markers);
          });
              cluster = new markerClusterer.MarkerClusterer({map, markers});
  
            });
  
      //filter button for theft type
      $(document).on('click', '#t-filter', function(){
        $.each(markers, function(i, v) {
          if(v.type.indexOf("THEFT")!= -1)
          {
            markers.push(v);
          }
        
            else
            markers1.push(v);
          for(let k of markers1){
            markers=markers.filter(items => items !== k);
        }
          markers = removeDuplicates(markers);
      });
          cluster = new markerClusterer.MarkerClusterer({map, markers});
      
        });
  
        //button for all types
        $(document).on('click', '#a-filter', function(){
          $.each(markers, function(i, v) {        
            if(i==i)
          {
            markers.push(v);
            markers = removeDuplicates(markers);
          }
      });
          cluster = new markerClusterer.MarkerClusterer({map, markers});
        });
  
        //button for clear all markers on the map
          $(document).on('click', '#cl-filter', function(){
            
            
            if(markers.length!=0){
              clearOverlays(markers);
            }
            addMarkers(markers);
            });
}
function toggleHeatmap() {
    heatmap.setMap(heatmap.getMap() ? null : map);
}

function changeGradient() {
    const gradient = [
        "rgba(0, 255, 255, 0)",
        "rgba(0, 255, 255, 1)",
        "rgba(0, 191, 255, 1)",
        "rgba(0, 127, 255, 1)",
        "rgba(0, 63, 255, 1)",
        "rgba(0, 0, 255, 1)",
        "rgba(0, 0, 223, 1)",
        "rgba(0, 0, 191, 1)",
        "rgba(0, 0, 159, 1)",
        "rgba(0, 0, 127, 1)",
        "rgba(63, 0, 91, 1)",
        "rgba(127, 0, 63, 1)",
        "rgba(191, 0, 31, 1)",
        "rgba(255, 0, 0, 1)",
    ];

    heatmap.set("gradient", heatmap.get("gradient") ? null : gradient);
}

function changeRadius() {
    heatmap.set("radius", heatmap.get("radius") ? null : 3);
}

function changeOpacity() {
    heatmap.set("opacity", heatmap.get("opacity") ? null : 0.2);
}

function showfilter() {
    $('[href="#filter"]').tab('show');
}
function showHeatmap() {
    $('[href="#AirbnbHeat"]').tab('show');
}



// Initialize maps

window.initMap = initMap;