const staticFlights = [
    
    {
      flightID: "BA0007",
      description: "London Heathrow to Tokyo Haneda",
      scheduledDeparture: "2025-02-04T09:05:00Z",
      scheduledArrival: "2025-02-05T07:35:00Z",
    },
    {
      flightID: "JL2806",
      description: "Aomori to Sapporo",
      scheduledDeparture: "2025-02-26T14:35:00Z",
      scheduledArrival: "2025-02-26T15:25:00Z",
    },
    {
      flightID: "MM112",
      description: "Sapporo to Osaka Kansai",
      scheduledDeparture: "2025-03-01T16:55:00Z",
      scheduledArrival: "2025-03-01T19:20:00Z",
    },
    {
      flightID: "BA0006",
      description: "Tokyo Haneda to London Heathrow",
      scheduledDeparture: "2025-04-02T13:05:00Z",
      scheduledArrival: "2025-04-02T19:55:00Z",
    },
  ];
  
  const API_KEY = "5c2b862aff3ee8a3f4e4fd941e4a02f9"; 
  const API_URL = "https://aviationstack.com/v1/flights";
  
  async function fetchFlights() {
    try {
      const response = await fetch(`${API_URL}?access_key=${API_KEY}&flight_iata=BA0007,MM112,JL2806,BA0006`);
      const data = await response.json();
      if (!data || !data.data) throw new Error("Invalid API response");
      return data.data.map(flight => ({
        flightID: flight.flight.iata,
        description: `${flight.departure.airport} to ${flight.arrival.airport}`,
        scheduledDeparture: flight.departure.estimated || flight.departure.scheduled,
        scheduledArrival: flight.arrival.estimated || flight.arrival.scheduled,
      }));
    } catch (error) {
      console.error("Error fetching flight data:", error);
      return staticFlights; // Use static flights as a fallback
    }
  }
  
  async function updateFlightTracker() {
    const flights = await fetchFlights();
    const now = new Date();
    const upcomingList = document.querySelector("#upcoming-flights ul");
    const liveList = document.querySelector("#live-flights ul");
  
    // Clear previous entries
    upcomingList.innerHTML = "";
    liveList.innerHTML = "";
  
    flights.forEach((flight) => {
      const depTime = new Date(flight.scheduledDeparture);
      const arrTime = new Date(flight.scheduledArrival);
  
      if (now < depTime) {
        // Upcoming Flights
        const listItem = document.createElement("li");
        listItem.innerHTML = `
          <b>${flight.flightID}</b> - ${flight.description}<br>
          <small>Departure: ${depTime.toLocaleString()}</small><br>
          <small>Arrival: ${arrTime.toLocaleString()}</small>
        `;
        upcomingList.appendChild(listItem);
      } else if (now >= depTime && now <= arrTime) {
        // Live Flights with Progress Bar
        const totalTime = arrTime - depTime;
        const elapsedTime = now - depTime;
        const progress = Math.min((elapsedTime / totalTime) * 100, 100);
  
        const listItem = document.createElement("li");
        listItem.innerHTML = `
          <b>${flight.flightID}</b> - ${flight.description}<br>
          <small>Departure: ${depTime.toLocaleString()}</small><br>
          <small>Arrival: ${arrTime.toLocaleString()}</small><br>
          <div class="progress-container">
            <div class="progress-bar" style="width: ${progress}%;">
              ${Math.round(progress)}%
            </div>
          </div>
        `;
        liveList.appendChild(listItem);
      }
    });
  }
  
  // Initialize and refresh every 5 minutes
  updateFlightTracker();
  setInterval(updateFlightTracker, 300000);
  