vendorApp.controller('appLandingCtrl', function($scope, $timeout, $ionicHistory, $ionicLoading, $state,
                                          $cordovaDevice) {


    $ionicHistory.clearHistory();
    $ionicHistory.clearCache();
    $ionicLoading.show();

    var appVersion = 1; ///////version increase when upload over play store //////////
    var appInfoNew = {};
    var updates = {};

    function checkAppStatus() {
        firebase.database().ref('vendorAppStatus').once('value', function (snapshot) {
            var newStatus = snapshot.val();
            if (newStatus.live == true) {
                if (newStatus.version > appVersion) {
                    $ionicLoading.hide();
                    $state.go('updateApp');
                }
                else {
                        //    New user
                        //    Check if first time user
                        var firstTimeUser = !checkLocalStorage("appInfoNew");
                        if(firstTimeUser){
                            //    first time user
                            initialiseAppInfo();
                        }
                        else{
                            //    Not first time user
                            //    Check if user is logged in
                            checkLoginStatus();
                        }
                }

            }
            else {
                $ionicLoading.hide();
                $state.go('under-construction');
            }
        });
    };
    checkAppStatus();

    function initialiseAppInfo() {
        var date = new Date();
        var currTimeStamp = date.getTime();
        appInfoNew = {
            udid: '',
            uuid: '',
            os: '',
            platform: '',
            version: '',
            model: '',
            manufacture: '',
            deviceToken: 0,
            error: null,
            device: null,
            timeStamp: currTimeStamp
        };
        initialiseLocation();
    }
    function initialiseLocation(){
        db.ref('defaultLocation').once('value', function (snapshot) {
            $timeout(function(){
                var locationInfo = snapshot.val();
                window.localStorage['selectedLocation'] = JSON.stringify(locationInfo);
                    registerDevice();
            },200);
        });
    }

    function registerDevice() {
        if (window.cordova) {
            try {
                var deviceInformation = $cordovaDevice.getDevice();
                appInfoNew.udid = deviceInformation.serial;
                appInfoNew.uuid = deviceInformation.uuid;
                appInfoNew.os = "1";
                appInfoNew.platform = deviceInformation.platform;
                appInfoNew.version = deviceInformation.version;
                appInfoNew.model = deviceInformation.model;
                appInfoNew.manufacture = deviceInformation.manufacturer;
                appInfoNew.device = "cordova";
            } catch (e) {
                console.log("error",e.message);
                appInfoNew.error = e.message;
                appInfoNew.device = "errorCordova";
            };
        } else {
            appInfoNew.device = "notCordova";
            appInfoNew.error = "not cordova";
        };
        window.localStorage['appInfoNew'] = JSON.stringify(appInfoNew);
            $ionicLoading.hide();
            $state.go('intro-slider');
    }


    function checkLoginStatus() {
        var user = firebase.auth().currentUser;
        if(user){
                $ionicLoading.hide();
                $state.go('tab.home');
        }
        else{
            $ionicLoading.hide();
            $state.go('login');
        }
    }

});
