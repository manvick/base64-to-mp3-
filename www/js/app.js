// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic','ngCordova'])

.run(function($ionicPlatform,$rootScope) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
  $rootScope.myFirebaseRef = new Firebase("https://glaring-inferno-2375.firebaseio.com/mp3");
})

.controller('FileManager', function($window, $scope, $cordovaMedia, $cordovaFile,$timeout,$cordovaFileTransfer,$rootScope){


$scope.call = function(){
  console.log('call function called');
 
    
    //ileSystem.root.getFile("mp3/Passenger - Let Her Go [Official Video]-RBumgq5yVrA.mp3", null, gotFileEntry, fail);
      
        window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, gotFS, fail);
    

    function gotFS(fileSystem) {
        fileSystem.root.getFile("mp3/Over_the_horizon.mp3", null, gotFileEntry, fail);
    }

    function gotFileEntry(fileEntry) {
        fileEntry.file(gotFile, fail);
    }

    function gotFile(file){
        readDataUrl(file);
      //  readAsText(file);
    }
    function resOnError(error) {
      console.log('resOnError Called ');
      console.log(JSON.stringify(error));
    }

    function dataURItoBlob(dataURI) {
    // convert base64 to raw binary data held in a string
    // doesn't handle URLEncoded DataURIs - see SO answer #6850276 for code that does this
    var byteString = atob(dataURI.split(',')[1]);

    // separate out the mime component
    var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];

    // write the bytes of the string to an ArrayBuffer
    var ab = new ArrayBuffer(byteString.length);
    var ia = new Uint8Array(ab);
    for (var i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
    }

    // write the ArrayBuffer to a blob, and you're done
    console.log('Inside data dataURI');
    //console.log(ia.length );
    var blob =  new Blob([ia], {type: mimeString});
    
    return blob;
    }

    function readDataUrl(file) {
      console.log('reading as url called');
        var reader = new FileReader();
        reader.onloadend = function(evt) {
            console.log("Read as data URL");
          //  console.log(evt.target.result);
            var mp3 = evt.target.result;
            //console.log('mp3 data = ' + mp3.data);

            //Here is the code to play mp3
           


     
        // $rootScope.myFirebaseRef.set({name: 'This is an mp3 file', mp3: mp3
         //console.log("mp3 is " + mp3);

          // Below is the code to write file from blob / base64 string
          
          // In place of name we will have to provide full path and name
         console.log('file = '+ JSON.stringify(file));
        
         //Sample Code
         //new file name
          var newFileName = "new-audio.mp3";
          var myFolderApp = "tupeUpData";
          console.log("Requesting File System");
          window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function(fileSys) {      
          //The folder is created if doesn't exist
          fileSys.root.getDirectory( myFolderApp,
                    {create:true, exclusive: false},
                    function(directory) {
                        directory.getFile("new-audop.mp3", {create: true}, function(fileEntry) {

                          fileEntry.createWriter(function(fileWriter) {
                            fileWriter.seek(fileWriter.length);
                            var blob = dataURItoBlob(mp3);
                            fileWriter.write(blob);
                          });

                         
                         
                        });

                        
                    },
                    resOnError);
                    },
        resOnError);

         
         console.log('done');



        };


        var a = file;
        a.name = "new-audio.mp3";
       //console.log('a = ' + JSON.stringify(a));
        reader.readAsDataURL(file);

    }

    function readAsText(file) {
        var reader = new FileReader();
        reader.onloadend = function(evt) {
            console.log("Read as text");
            console.log(evt.target.result);
        };
        reader.readAsText(file);
    }

    function fail(evt) {
        console.log(evt.target.error.code);
    }
    

            
}



    
  $scope.toggle = function(){
    console.log("File manager called!");

    window.requestFileSystem(
         LocalFileSystem.PERSISTENT,
         0,
         function(fileSystem){
            var root = fileSystem.root;
          console.log("Success = " + JSON.stringify(root));
          collectMedia(root.fullPath, true);
          //  AppFile.deleteFiles();
          //  Application.collectMedia(root.fullPath, true);
         },
         function(error){
            console.log('File System Error: ' + error.code);
         }
      );




    var collectMedia = function(path, recursive ,level){
      console.log("Collect Media Called");
      if(level === undefined)
        level = 0;
     // var paths = '/mp3'
      var directoryEntry = new DirectoryEntry('', path);

      if(!directoryEntry.isDirectory){
        console.log('The Provided path is not a dir');
        return;
      }
      
var directoryReader = directoryEntry.createReader();

directoryReader.readEntries(
      function(entries){
        console.log('Success = ' + entries);
      }, function(error){
        console.log('Error = ' + JSON.stringify(error));
      });


    }















































/*
    var url = "http://www.guitarmerijaan.com/imok/landingpage/img/ios.png";
    var targetPath = "android_asset/ios.png";
    var trustHosts = true;
    
var options = {};

    $cordovaFileTransfer.download( url , targetPath , options ,trustHosts)
          .then(function(result){
            console.log("Success = " + result);
            alert("Success = " + result)
          }, function(err){
            console.log("Error = "+ JSON.stringify(err));
            alert("Error = "+ JSON.stringify(err));
          }, function(progress){
            $timeout(function(){
              $scope.progress = (progress.loaded / progress.total) * 100;
            })
           // console.log("Progress = "+progress);
            //$scope.progress = progress;
          });
*/


    /*
fileSys.root.getDirectory( myFolderApp,
                   {create:true, exclusive: false},
                   function(directory) {
                       entry.moveTo(directory, newFileName,  successMove, resOnError);
                   },
                   resOnError);
                   },
   resOnError);
fileSys.root.getDirectory( myFolderApp,
                   {create:true, exclusive: false},
                   function(directory) {
                       entry.moveTo(directory, newFileName,  successMove, resOnError);
                   },
                   resOnError);
                   },
   resOnError);*/
  }

});
