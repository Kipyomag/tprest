$(function(){
  var apiKey = "be1621b218560de8939025e4cda0ccb124f77597";

  var listContainer = $('#city');

  $.ajax({
    url:"https://api.jcdecaux.com/vls/v1/contracts?apiKey="+apiKey // la ressource ciblée
  }).done(function(contracts){

    var tableContracts = new Array(); // create array with contracts

    for(var i in contracts){
      if(contracts[i].country_code === "FR"){ //
        tableContracts.push(contracts[i].name);
      }
    }


    tableContracts.sort();
    listContainer.append('<option value="">Choix ville</option>');
    for (var j in tableContracts) {
      var option = $('<option>');
      option.html(tableContracts[j]);
      option.attr('value',tableContracts[j]);

      listContainer.append(option);

    }


  }).fail(function(jqXHR, textStatus, errorThrown){
    dataContainer.append('Pas de données.');
  });

  $('#city').change(showStations);
var map;


  function showStations(){
    $('#viz').empty();
    var contractName = $(this).val();
    var listStations = $('#viz');


    $.ajax({
      url:"https://api.jcdecaux.com/vls/v1/stations?contract="+contractName+"&apiKey="+apiKey
    }).done(function(stations){

      for(var i in stations){
        var div = $('<div class="selected">');
        div.html(stations[i].number+'<br>'
                +stations[i].name+'<br>'
                +stations[i].address+'<br>'
                +'Carte Bancaire: '+stations[i].banking+'<br>'
                +'Status: '+stations[i].status+'<br>'
                +'Nombre de place: '+stations[i].bike_stands+'<br>'
                +'Nombre de place restante: '+stations[i].available_bike_stands+'<br>'
                +'Vélo(s) disponible: '+stations[i].available_bikes+'<br><br>'
              );



        listStations.append(div);

      }




    }).fail(function(jqXHR, textStatus, errorThrown){
      dataContainer.append('Pas de données.');
    });



  };



});
