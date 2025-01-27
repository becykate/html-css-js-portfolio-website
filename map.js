import { checkpoints } from './checkpoints.js';

// Initialize the Map
var map = L.map('map');
L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
  attribution: '&copy; <a href="https://www.mapbox.com/">Mapbox</a> contributors',
  id: 'mapbox/streets-v11',
  accessToken: 'pk.eyJ1IjoiYmVjeWthdGUiLCJhIjoiY2x0emFvZ2E2MG4xZzJscWZwOHcyYXdkdSJ9.5FYtw-BGKC4sTTHPOpL_pA',
}).addTo(map);

// Define category colors
const categoryColors = {
  Hotel: "rgb(121, 39, 228)", // Purple for hotels
  Activity: "rgb(24, 92, 180)", // Blue for activities
  Restaurant: "orange", // Orange for restaurants
  Default: "gray" // Default grey for others
};

// Add markers to the map
checkpoints.forEach(function (checkpoint) {
  // Create custom icon with dynamically set background color
  const icon = L.divIcon({
    className: 'custom-icon',
    html: `<div class="leaflet-marker-pin" style="background-color: ${categoryColors[checkpoint.Category]}"></div>`,
    iconSize: [10, 10],    // Size of the marker (adjusted to 10px x 10px)
    iconAnchor: [5, 5],    // Set the anchor to the center of the pin (half the size)
    popupAnchor: [0, -8],  // Adjust position of the popup (above the marker)
  });

  // Create marker with custom icon and bind popup
  const marker = L.marker([checkpoint.Latitude, checkpoint.Longitude], { icon })
    .addTo(map)
    .bindPopup(`
      <b>${checkpoint.CheckpointName}</b><br>
      ${checkpoint.CheckpointDescription}<br>
      <small>Category: ${checkpoint.Category}</small>
    `);
});

// Auto-center map to include all checkpoints
const bounds = L.latLngBounds(checkpoints.map(cp => [cp.Latitude, cp.Longitude]));
map.fitBounds(bounds);
