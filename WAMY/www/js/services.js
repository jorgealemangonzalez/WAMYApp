angular.module('starter.services', ['ngCordova'])

.factory('Contacts', function($localStorage,$cordovaContacts) {
  //TODO obtener contactos del movil o de una cuenta de google ( en tabletas a lo mejor no hay contactos de movil )
  //TODO https://www.thepolyglotdeveloper.com/2014/11/create-delete-search-contacts-ionic-framework/
  //TODO https://developers.google.com/google-apps/contacts/v3/

  var findOptions = {
    filter:"",
    multiple:true,
    desiredFields:["Nombre","displayName","movil"],
    hasPhoneNumber:true
  };
  var movileContacts;
  $cordovaContacts.find(findOptions).then(function (result){
    Console.log("Contactos en el telefono: ");
    Console.log(result);
    movileContacts = result;
  });

  // Some fake testing data
  var contacts = [{
    id: 0,
    name: 'Ben Sparrow',
    lastText: 'You on your way?',
    face: 'img/ben.png'
  }, {
    id: 1,
    name: 'Max Lynx',
    lastText: 'Hey, it\'s me',
    face: 'img/max.png'
  }, {
    id: 2,
    name: 'Adam Bradleyson',
    lastText: 'I should buy a boat',
    face: 'img/adam.jpg'
  }, {
    id: 3,
    name: 'Perry Governor',
    lastText: 'Look at my mukluks!',
    face: 'img/perry.png'
  }, {
    id: 4,
    name: 'Mike Harrington',
    lastText: 'This is wicked good ice cream.',
    face: 'img/mike.png'
  }];

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
