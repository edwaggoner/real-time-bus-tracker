// pass access token to mapbox.com
mapboxgl.accessToken = 'pk.eyJ1Ijoic2xpdmVyMTAiLCJhIjoiY2wydzhreWY2MGM3azNxbGZtczVzMWMwciJ9.dnemmICAVgbnQZLPOkoBMw';

// acquire map
let map = new mapboxgl.Map({
container: 'map',
style: 'mapbox://styles/mapbox/streets-v11',
center: [-71.104081, 42.365554],
zoom: 14,
});

async function run(){
	// get real-time bus data
	const locations = await getBusLocations();

	// place marker at current location of bus
	var marker = new mapboxgl.Marker()
		.setLngLat([locations[0].attributes.longitude, locations[0].attributes.latitude])
		.addTo(map);

	// timer
	setTimeout(run, 15000);
}


// assign different color markers to each of the four buses


// Request real-time bus data from MBTA
async function getBusLocations(){
	const url = 'https://api-v3.mbta.com/vehicles?filter[route]=1&include=trip';
	// const url = 'https://api-v3.mbta.com/vehicles?filter[vehicles]';
	const response = await fetch(url);
	const json     = await response.json();
	return json.data;
}
