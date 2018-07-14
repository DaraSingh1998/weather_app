const yargs=require('yargs');
const axios=require('axios');
const argv=yargs
	.options({
		a:{
			demand:true,
			alias:'address',
			describe:'Give Address',
			string:true
		}
	})
	.help()
	.argv;
var encodeAddress=encodeURIComponent(argv.address);
var geocodeUrl=`https://maps.googleapis.com/maps/api/geocode/json?address=${encodeAddress}`;
axios.get(geocodeUrl).then((response)=>{
	if(response.data.status==="ZERO_RESULTS"){
		throw new Error("Unable to find the address");
	}
	var lat=response.data.results[0].geometry.location.lat;
	var long=response.data.results[0].geometry.location.lng;
	var weatherUrl=`https://api.darksky.net/forecast/4246be1204c8e498391a37410539e297/${lat},${long}`;
	console.log(response.data.results[0].formatted_address);
	return axios.get(weatherUrl);
}).then((response)=>{
var temp=response.data.currently.temperature;
var apptemp=response.data.currently.apparentTemperature;
console.log(`It is ${temp}. But it feels like ${apptemp}`);
}).catch((e)=>{
	if(e.code==='ENOTFOUND'){
		console.log("Unable to connect to API");
	}
	else{
		console.log(e.message);
	}
});