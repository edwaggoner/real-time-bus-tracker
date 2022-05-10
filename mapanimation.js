async function run(){
    // get real-time bus data
	const locations = await getBusLocations();
	console.log(new Date());
	console.log(locations);

	// timer
	setTimeout(run, 15000);
}

// Request real-time bus data from MBTA
async function getBusLocations(){
	const url = 'https://api-v3.mbta.com/vehicles?filter[route]=1&include=trip';
	const response = await fetch(url);
	const json     = await response.json();
	return json.data;
}

run ();

// // give mapbox access token
// mapboxgl.accessToken = 'pk.eyJ1Ijoic2xpdmVyMTAiLCJhIjoiY2wydzhreWY2MGM3azNxbGZtczVzMWMwciJ9.dnemmICAVgbnQZLPOkoBMw';

// // acquire Boston map from mapbox
// let map = new mapboxgl.Map({
// container: 'map',
// style: 'mapbox://styles/mapbox/streets-v11',
// center: [-71.104081, 42.365554],
// zoom: 14,
// });

// // TODO: add a marker to the map at the first coordinates in the array busStops. The marker variable should be named "marker"
// var marker = new mapboxgl.Marker()
// 	.setLngLat([-71.093729, 42.359244])
// 	.addTo(map);
// // counter here represents the index of the current bus stop
// let counter = 0;
// function move() {
// // TODO: move the marker on the map every 1000ms. Use the function marker.setLngLat() to update the marker coordinates
// // Use counter to access bus stops in the array busStops
// // Make sure you call move() after you increment the counter.
// setTimeout(() =>{
// 	if (counter >= busStops.length) return;
// 	marker.setLngLat(busStops[counter]);
// 	counter++;
// 	move();
// }, 1000);
// }