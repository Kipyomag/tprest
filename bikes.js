
//initialisation de l variable map pour google map
var map;
var markers = [];
var infowindow;

$(function(){
    // clé de l'api JCDecaux
    var apiKey = "be1621b218560de8939025e4cda0ccb124f77597";

    // liste des villes
    var listContainer = $('#city');

    $.ajax({
        url:"https://api.jcdecaux.com/vls/v1/contracts?apiKey="+apiKey // la ressource ciblée
    }).done(function(contracts){
        // initalise un tableau pour les contracts
        var tableContracts = new Array();

        // pour chaque contracts on récupère le nom de la ville qu'on stock dans tableContracts
        for(var i in contracts){
            if(contracts[i].country_code === "FR"){ //
                tableContracts.push(contracts[i].name);
            }
        }
        tableContracts.sort();

        // ajout Choix ville par défaut dans la liste déroulante
        listContainer.append('<option value="">Choix ville</option>');

            // pour chaque valeur récupérées dans tableContracts
            // on lui ajoute une balise option pour créer la liste déroulante
            for (var j in tableContracts) {
                var option = $('<option>');
                option.html(tableContracts[j]);
                option.attr('value',tableContracts[j]);

                listContainer.append(option);

            }


    }).fail(function(jqXHR, textStatus, errorThrown){
        dataContainer.append('Pas de données.');
    });

    // a chaque changement du select dans la liste des ville on exécute showStations
    $('#city').change(showStations);




    // fonction pour afficher les stations en fonction de la ville passé dans le select
    function showStations(){
        // permet de vider l'affichage des stations lors d'un changement de ville
        $('#viz').empty();
        clearMarkers();
        // renvoi la valeur du nom de la ville dans le select
        var contractName = $(this).val();

        // affiche la liste des stations
        var listStations = $('#viz');


        // on récupère de l'api les infos pour les stations
        $.ajax({url:"https://api.jcdecaux.com/vls/v1/stations?contract="+contractName+"&apiKey="+apiKey
            }).done(function(stations){
                //
                var cord = stations[0].position;
                map.panTo(cord);
                map.setZoom(12);

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

                    
                    infowindow = new google.maps.InfoWindow({
                       content: div.html()
                     });

                // on ajoute la latitude et longitude a addMarker pour aficher dans google map
                addMarker(stations[i].position.lat, stations[i].position.lng, stations[i].name, infowindow);

                listStations.append(div);

                }




            }).fail(function(jqXHR, textStatus, errorThrown){
                dataContainer.append('Pas de données.');
        });
    };
});



    // Fonction pour ajouter un Marker sur google map en fonction de la ville
    // Adds a marker to the map and push to the array.
    function addMarker(lat, lng, name, infowindow) {

        var myLatLng = {lat: lat, lng: lng};
        var marker=new google.maps.Marker({
            position:myLatLng,
            map: map,
            title: name
         });
         markers.push(marker);

         marker.addListener('click', function() {

             infowindow.open(map, marker);
            });

        }

    // Sets the map on all markers in the array.
    function setMapOnAll(map) {
      for (var i = 0; i < markers.length; i++) {
        markers[i].setMap(map);
      }
    }


    // Removes the markers from the map, but keeps them in the array.
    function clearMarkers() {
      setMapOnAll(null);
    }


    // afficher la google map
    function initialize() {
        var mapProp = {
            center:new google.maps.LatLng(48.86471,2.2851),
            zoom:5,
            mapTypeId:google.maps.MapTypeId.ROADMAP
        };
        map = new google.maps.Map(document.getElementById("map"),mapProp);

    }
    google.maps.event.addDomListener(window, 'load', initialize);
