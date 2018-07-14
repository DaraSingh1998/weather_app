const request=require('request');
var getWeather=(lat,long,callback)=>{
	request({
	url:`https://api.darksky.net/forecast/4246be1204c8e498391a37410539e297/${lat},${long}`,
	json:true
},(error,reponse,body)=>{
	if(!error &&reponse.statusCode===200){
		callback(undefined,{
			temp:body.currently.temperature,
			apptemp:body.currently.apparentTemperature
		});
	}else{
		callback("Unable to find that address");
	}
});
}
module.exports.getWeather=getWeather;