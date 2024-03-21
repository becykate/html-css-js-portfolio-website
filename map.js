import { checkpoints } from './checkpoints.js';

var map = L.map('map');
L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}&lang=en', {
    attribution: '&copy; <a href="https://www.mapbox.com/">Mapbox</a> contributors',
    id: 'mapbox/streets-v11', 
    accessToken: 'pk.eyJ1IjoiYmVjeWthdGUiLCJhIjoiY2x0emFvZ2E2MG4xZzJscWZwOHcyYXdkdSJ9.5FYtw-BGKC4sTTHPOpL_pA', 
}).addTo(map);
map.getContainer().classList.add('mapboxgl-locale-en');

var checkpointCoordinates = [];
// Add markers to the map and store their coordinates
checkpoints.forEach(function(checkpoint) {
  var marker = L.marker([checkpoint.Latitude, checkpoint.Longitude]).addTo(map);
  marker.bindPopup(`<b>${checkpoint.CheckpointName}</b><br>${checkpoint.CheckpointDescription}`).openPopup();
  checkpointCoordinates.push([checkpoint.Latitude, checkpoint.Longitude]); // Store coordinates
});

// Calculate the average latitude and longitude for the center of the map
var center = checkpointCoordinates.reduce(function(acc, coord) {
    return [acc[0] + coord[0] / checkpointCoordinates.length, acc[1] + coord[1] / checkpointCoordinates.length];
}, [0, 0]);

// Set the map's initial view to the calculated center
map.setView(center, 7);
