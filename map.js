mapboxgl.accessToken = 'pk.eyJ1IjoiamJsYWVzZXIiLCJhIjoiY2t4OGVtY3FmMTh6YTJ4cXU1NWY5aXUxMiJ9.DJNRPOrzDpL4YDzTQXxaCQ';
var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/jblaeser/cl4lqdgsm000j14m1qtpzum5d',
    projection: 'naturalEarth',
    zoom: 1,
    maxZoom: 9,
    minZoom: 0,
    center: [0,0]

});

map.on("load", function () {
    // this is the funciton that finds the first sympbol layer
    let layers = map.getStyle().layers;
    for(var i = 0; i <layers.length; i++) {
        console.log(layers[i].id);
    }



    map.addLayer(
        {
          id: "pmExposure",
          type: "fill",
          source: {
            type: "geojson",
            data: "data/exposureSeven.geojson",
          },
          minzoom: 0,

          paint: {
            'fill-color': [
            //'rgba(61,153,80,0.55)'
      

                 'interpolate',
                ['linear'],
              ["get", "exposure_perc_diff"],
              -100,
              "#018571",
              -50,
              "#80cdc1",
              0,
              "#f5f5f5",
              50,
              "#dfc27d",
              100,
              "#a6611a",
              101,
              "#ffffff"],
          
           "fill-outline-color": "#ffffff",
            
    
        }
      
        },
        "waterway-label"
      );
     

  });

 // Create the popup
map.on('click', 'pmExposure', function (e) {
    var firstMeasure = e.features[0].properties['1990'];
    var lastMeasure =  e.features[0].properties['2019'];
   // var pctDiff =  absoluteValue(e.features[0].properties['exposure_perc_diff']);
    var pctDiff =  e.features[0].properties['exposure_perc_diff'];
    var country =  e.features[0].properties['ADMIN_x'];
    var rank = e.features[0].properties['rank'];
    var direction = isItIncreasing(e.features[0].properties['exposure_perc_diff']);
    var arrow = arrowUp(e.features[0].properties['exposure_perc_diff']);
    
    firstMeasure = firstMeasure;
    lastMeasure = lastMeasure;
    country = country;
    pctDiff = pctDiff.toFixed(0);
    rank = rank;
    direction = direction
    arrow = arrow
    new mapboxgl.Popup()
        .setLngLat(e.lngLat)
        .setHTML('<h2>'+country+'</h2>'
            + '<p>'+arrow+pctDiff+direction+'</p>'
            +'<h4>'+'1990: '+firstMeasure+' micrograms per cubic metre'+'</h4>'
            +'<h4>'+'2019: '+lastMeasure+' micrograms per cubic metre'+'</h4>'
            )
        .addTo(map);
});
// Change the cursor to a pointer when the mouse is over the us_states_elections layer.
map.on('mouseenter', 'pmExposure', function () {
    map.getCanvas().style.cursor = 'pointer';
});
// Change it back to a pointer when it leaves.
map.on('mouseleave', 'pmExposure', function () {
    map.getCanvas().style.cursor = '';
});

function isItIncreasing(d) {
  if (d > 0) {
      return " percent increase since 1990"
  }
  if (d = 0) {
    return "  percent - No change in PM2.5 concentration since 1990"
  }
  else {
      return " percent decrease since 1990"

  }
}

// function absoluteValue(d){
//   if (d < 0) {
//     pctDiff = Math.abs(pctDiff.toFixed(0))
//   }
//   else{
//     pctDiff = pctDiff.toFixed(0)
//   }
// }

function arrowUp(d) {
  if (d > 0) {
      return "<i class='arrow up'></i>"
  }
  else {
      return "<i class='arrow down'></i>"
  }
}

//Map 2
mapboxgl.accessToken = 'pk.eyJ1IjoiamJsYWVzZXIiLCJhIjoiY2t4OGVtY3FmMTh6YTJ4cXU1NWY5aXUxMiJ9.DJNRPOrzDpL4YDzTQXxaCQ';
var map2 = new mapboxgl.Map({
  container: 'map2',
    style: 'mapbox://styles/jblaeser/cl4lqdgsm000j14m1qtpzum5d',
    projection: 'naturalEarth',
    zoom: 1,
    maxZoom: 9,
    minZoom: 0,
    center: [0,0]
});

map2.on("load", function () {
    // this is the funciton that finds the first sympbol layer
    let layers = map2.getStyle().layers;
    for(var i = 0; i <layers.length; i++) {
        console.log(layers[i].id);
    }

    
    map2.addLayer(
      {
        id: "pm2019",
        type: "fill",
        source: {
          type: "geojson",
          data: "data/exposureSeven.geojson",
        },
        minzoom: 0,

        paint: {
          'fill-color': [
          //'rgba(61,153,80,0.55)'
    

            //    'interpolate',
            //   ['linear'],
            // ["get", "2019"],
            // 0,
            // "#CCEDCC",
            // 20,
            // "#99D89D",
            // 40,
            // "#66BF85",
            // 60,
            // "#33A477",
            // 85,
            // "#018571",
            // 100,
            // "#2EAA2F"],

            'interpolate', 
              ['linear'],
            ["get", "2019"],
              0,
              "#fffbc3",
              100,
              "#850026"],
          
            "fill-outline-color": "#ffffff",
          
  
      }
      },
      "waterway-label"
    );

     // Create the popup
map2.on('click', 'pm2019', function (e) {
  var lastMeasure =  e.features[0].properties['2019'];
  var country =  e.features[0].properties['ADMIN_x'];
  var rank = e.features[0].properties['rank'];
  
  lastMeasure = lastMeasure;
  country = country;
  rank = rank;
  new mapboxgl.Popup()
      .setLngLat(e.lngLat)
      .setHTML('<h2>'+country+'</h2>'
          +'<h4>'+'2019: '+lastMeasure+' micrograms per cubic metre'+'</h4>'
          + '<p>'+'Rank: '+rank+' in the world'+'</p>')
      .addTo(map2);
});
// Change the cursor to a pointer when the mouse is over the us_states_elections layer.
map2.on('mouseenter', 'pm2019', function () {
  map2.getCanvas().style.cursor = 'pointer';
});
// Change it back to a pointer when it leaves.
map2.on('mouseleave', 'pm2019', function () {
  map2.getCanvas().style.cursor = '';
});
})