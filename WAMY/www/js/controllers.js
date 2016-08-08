angular.module('starter.controllers', [])

.controller('MapCtrl', function($scope) {})

.controller('ContactsCtrl', function($scope, Chats) {
  //TODO en la descripcion de la card poner la ultima posicion conocida del contacto.
  //TODO conectar con cuenta de correo ? vs identificador unico ( todos los identificadores guardados en una base de datos )

  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
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
