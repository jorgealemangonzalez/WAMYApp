angular.module('starter.controllers', [])
//TODO inicializar $localStorage.contacts
//TODO conectar con socket al servidor proveedor de sockets y devolver a cada usuario una referencia al socket del otro.
//TODO pagar google maps https://developers.google.com/maps/documentation/geocoding/usage-limits
//TODO que te coja los contactos del telefono o de google ( telefono mejor ?)
//TODO iconos de persanajes distintos.
// TODO sistemas de pedir la posicion que si no te la devuelve cada vez lo pidas cada mas tiempo
  //TODO desactivar todo para dejar luego solo unos pocos activados.
  //TODO feedback de que el otro contacto no le tiene habilitada la localización . Mensaje en la pantalla al otro usuario de que debe activar la localización.
  //TODO actualizar contactos que tengan la app
//TODO obtener prefijo de un numero para realizar la consulta sobre el numero especifico de localizacion especiifica.
.controller('MapCtrl', function($scope,$ionicLoading,$cordovaGeolocation,$location , $localStorage , Contacts) {
  var posOptions = {timeout: 5000, enableHighAccuracy: true};
  var myPosition;
  var mymarker;

  $scope.initMap = function () {
    console.log("Iniciando mapa");
    $scope.loading = $ionicLoading.show({
      content: 'Obteniendo datos',
      showBackdrop: false
    });


    //Get my position
    $cordovaGeolocation
      .getCurrentPosition(posOptions)
      .then(function (position) {
        myPosition = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
      }, function (err) {
        console.log("GeolocationErr: " + err);
      });


    // Init the map
    $scope.map = new google.maps.Map(document.getElementById('map'), {
      zoom: 13,
      center: myPosition,
      disableDefaultUI: false,//Si lo ponemos a true desactivamos la interfaz grafica del mapa para poder poner los trozos uno a uno
      streetViewControl: true // TRIUE : ponemos el personajito del street view
    });
    console.log("Mapa iniciado");
    //My marker
    mymarker = new google.maps.Marker({
      position: myPosition,
      map: $scope.map,
      icon: "./img/point_me.png"
    });
    //My contacts markers
    console.log(Contacts.all());
    angular.forEach(Contacts.all(), function(contact){
      console.log(contact);
      if(contact.available){
        //Put a mark in the map.
        console.log("mark in "+contact.position);
        var marker = new google.maps.Marker({
          position: contact.position,
          map: $scope.map,
          title: contact.name
        });

      }
    });
    $ionicLoading.hide();
  }

  $scope.posMe = function (){
    $cordovaGeolocation
      .getCurrentPosition(posOptions)
      .then(function (position) {
        $scope.mypos = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        }
        mymarker.setPosition( new google.maps.LatLng( $scope.mypos.lat, $scope.mypos.lng ) );
        $scope.map.setZoom(18);
        $scope.map.setCenter( new google.maps.LatLng($scope.mypos.lat,$scope.mypos.lng));

      }, function(err) {
        console.log("GeolocationErr: "+err);
      });
  }
  $scope.posMe();
})

.controller('ContactsCtrl', function($scope, Contacts , socket , $localStorage,$rootScope) {
  //TODO en la descripcion de la card poner la ultima posicion conocida del contacto.
  //TODO conectar con cuenta de correo ? vs identificador unico ( todos los identificadores guardados en una base de datos )
  $rootScope.$emit('loadContacts');
  $scope.contacts = Contacts.all();

})
.controller('AccountCtrl', function($scope) {
  //TODO foto , nombre que ven los contactos ( empieza con el mail sin @ ) , posicion establecida automaticamente o manual ( la de la descripcion )
  $scope.settings = {
    enableFriends: true
  };
});
