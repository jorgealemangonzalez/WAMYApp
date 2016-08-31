angular.module('starter.controllers', [])
//TODO inicializar $localStorage.contacts
//TODO conectar con socket al servidor proveedor de sockets y devolver a cada usuario una referencia al socket del otro.
//TODO pagar google maps https://developers.google.com/maps/documentation/geocoding/usage-limits
//TODO que te coja los contactos del telefono o de google ( telefono mejor ?)

.controller('MapCtrl', function($scope,$ionicLoading,$cordovaGeolocation,$location , $localStorage) {
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

.controller('ContactsCtrl', function($scope, Contacts , socket , $localStorage) {
  //TODO en la descripcion de la card poner la ultima posicion conocida del contacto.
  //TODO conectar con cuenta de correo ? vs identificador unico ( todos los identificadores guardados en una base de datos )

  $scope.chats = Contacts.all();
  $scope.remove = function(chat) {
    Contacts.remove(chat);
  };
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('AccountCtrl', function($scope) {
  //TODO foto , nombre que ven los contactos ( empieza con el mail sin @ ) , posicion establecida automaticamente o manual ( la de la descripcion )
  $scope.settings = {
    enableFriends: true
  };
});
