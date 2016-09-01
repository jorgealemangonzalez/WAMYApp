angular.module('starter.services', ['ngCordova'])

.factory('Contacts', function($localStorage,$cordovaContacts,$rootScope) {
  //TODO obtener contactos del movil o de una cuenta de google ( en tabletas a lo mejor no hay contactos de movil )
  //TODO https://www.thepolyglotdeveloper.com/2014/11/create-delete-search-contacts-ionic-framework/
  //TODO https://developers.google.com/google-apps/contacts/v3/
  //TODO comprobar si los contactos al descheckear se cambia el campo available o hay que llamar a una funcion pasandole el objeto del contacto.
  //TODO para poder tener la ultima ubicacion el servidor tiene que guardar las posiciones de las personas. ( O que la guarde cada uno para evitar problemas de derechos)
  var findOptions = {
    filter:"",
    multiple:true,
    desiredFields:["Nombre","displayName","movil"],
    hasPhoneNumber:true
  };
  var movileContacts;



  // Some fake testing data
  var contacts = [{
    id: 0,
    name: 'Ben Sparrow',
    lastText: 'You on your way?',
    face: 'img/ben.png',
    available: true,
    position: new google.maps.LatLng(38.088782,-1.156794)
  }, {
    id: 1,
    name: 'Max Lynx',
    lastText: 'Hey, it\'s me',
    face: 'img/max.png',
    available: false,
    position: new google.maps.LatLng(38.087782,-1.156994)
  }, {
    id: 2,
    name: 'Adam Bradleyson',
    lastText: 'I should buy a boat',
    face: 'img/adam.jpg',
    available: true,
    position: new google.maps.LatLng(38.089782,-1.146794)
  }, {
    id: 3,
    name: 'Perry Governor',
    lastText: 'Look at my mukluks!',
    face: 'img/perry.png',
    available: false,
    position: new google.maps.LatLng(38.089982,-1.156794)
  }, {
    id: 4,
    name: 'Mike Harrington',
    lastText: 'This is wicked good ice cream.',
    face: 'img/mike.png',
    available: false,
    position: new google.maps.LatLng(38.088982,-1.196794)
  }];

  $rootScope.$on('loadContacts', function () {
      console.log("Se van a buscar contactos en el telefono");

      console.log("DEBUG: cordovacontacts");
      console.log($cordovaContacts);
      console.log("DEBUG: navigator");
      console.log(navigator);
      console.log("DEBUG: navigator.contacts");
      console.log(navigator.contacts);
      console.log("DEBUG: navigator.CordovaNavigator");
      console.log(navigator.CordovaNavigator);
      //console.log("DEBUG: navigator.CordovaNavigator.contacts");
      //console.log(navigator.CordovaNavigator.contacts);
      console.log("DEBUG navigator.app");
      console.log(navigator.app);
      console.log("DEBUG: navigator.appCodeName()");
      console.log(navigator.appCodeName());

      $cordovaContacts.pickContact();
      $cordovaContacts.find(findOptions).then(function (result) {
          console.log("Contactos en el telefono: ");
          console.log(result);
          movileContacts = result;
          contacts.add(movileContacts); //ERROR DE FORMATO CON LOS NOMBRES DE LOS CAMPOS A IMPRIMIR
      });
  });

  return {
    all: function() {
      return contacts;
    },
    remove: function(contact) {
      contacts.splice(contacts.indexOf(contact), 1);
    },
    get: function(contactId) {
      for (var i = 0; i < contacts.length; i++) {
        if (contacts[i].id === parseInt(contactId)) {
          return contacts[i];
        }
      }
      return null;
    }
  };
})

.factory('socket',function(socketFactory){

  var myIoSocket = io.connect('http://localhost:8080/');

  mySocket = socketFactory({
    ioSocket: myIoSocket
  });

  return mySocket;
})
;
