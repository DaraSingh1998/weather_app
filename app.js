const yargs=require('yargs');
const weather=require('./weather');
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
const geocode=require('./geocode.js');
geocode.geocodeAddress(argv.address,(error,result)=>{
	if(error){
		console.log(error);
	}
	else{
		console.log(result.address);
		weather.getWeather(result.latitude,result.longitude,(error,wresult)=>{
		if(error){
			console.log(error);
		}
		else{
			console.log(`The current temperature is ${wresult.temp}. The apparent temperature is ${wresult.apptemp}`);
	}
});
	}
});
