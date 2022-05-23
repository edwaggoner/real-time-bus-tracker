//pass access token to mapbox.com
mapboxgl.accessToken = 'pk.eyJ1Ijoic2xpdmVyMTAiLCJhIjoiY2wydzhreWY2MGM3azNxbGZtczVzMWMwciJ9.dnemmICAVgbnQZLPOkoBMw';

// declare map variable outside of all functions, so it can be used inside any/all functions
let mapobj;

async function centerTheMap() {
	// obtain current location of bus
	let initiallocation = await getBusLocations();

	// display Boston map centered on that location
	mapobj = new mapboxgl.Map({
	container: 'map',
	style: 'mapbox://styles/mapbox/streets-v11',
	center: [initiallocation[0].attributes.longitude, initiallocation[0].attributes.latitude],
	zoom: 15,
	});
}

let centerTheMapPromise = centerTheMap();

var dt = new Date();
	document.getElementById('date-time').innerHTML=dt;

new Date();

async function run(){
	// ensure that Boston map is properly centered BEFORE the bus marker is plotted (by button-click)
	await centerTheMapPromise;

	// get real-time bus data
	const locations = await getBusLocations();

	// place marker at current location of bus
	var marker = new mapboxgl.Marker()
		.setLngLat([locations[0].attributes.longitude, locations[0].attributes.latitude])
		.addTo(mapobj);

	// timer to refresh data
	setTimeout(run, 12000);
}

// Request real-time bus data from MBTA
async function getBusLocations(){
	const url = 'https://api-v3.mbta.com/vehicles?filter[route]=1&include=trip';
	const response = await fetch(url);
	const json = await response.json();
	return json.data;
}
