
$('#saisie').change(function(){
	console.log("entrée dans la fonction change");
	this.value = this.value.toUpperCase();
	var ville = this.value ; // <--JS
	// en JQ : $(this).val();
	var url = 'https://api.jcdecaux.com/vls/v1/stations?contract=Nantes&apiKey=be1621b218560de8939025e4cda0ccb124f77597='+ville;

		success  : function(result) {
			if (result.cod != 404) {
				var temperature = result.main.temp;
				// $('p').text(temperature);
				$('p').text(temperature).append(' °C à ').append(ville);
				// JS : p.innerTEXT = temperature ;
				// JS : p.innerHTML = temperature ;

				// JS : p.innerTEXT += temperature ;
				// JQ : $(p).append(temperature).append(' °C à ').append(ville) ;
			} else {
				$('p').text(ville  + " non trouvée, veuillez vérifier votre saisie")
			}
		}
	} ;
	$.ajax(requete) ;

});
