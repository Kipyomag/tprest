
var url_meteo = 'http://api.openweathermap.org/data/2.5/weather?q=London,uk&units=metric&appid=a3573dcb30e93ad67687f4fb70aa87c6'

var query = {
	url: url_meteo,
	type: 'GET',
	timeout: 1000,
	error: function(){
		console.log('erreur');
		},
	success: function(result){
		console.dir(result.main.temp);
		// traitement des données
	}
}

$.ajax(query);
