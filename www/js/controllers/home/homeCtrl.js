vendorApp.controller('HomeCtrl', function ($scope,$ionicLoading,$rootScope,$state) {
    $scope.help = function () {
        alert('Coming soon!');
    };
    $scope.selected_1 = true;
    $scope.selected_2 = false;
    $scope.selected_3 = false;
    $scope.selected_4 = false;

    var vendor_id = '-KRcADAY15KKRRrKE4hu';
    var db = firebase.database();
    $scope.Bookings = [];
    $scope.keys = [];

    ////////////////// To get all booking keys for a particular vendor /////////////////


    function vendorAllBooking(){
        $ionicLoading.show();
        $scope.Bookings = [];
        db.ref("vendorBookings/"+vendor_id).on("value", function(snapshot){
            if(snapshot.val()){
                angular.forEach(snapshot.val(),function (value,key) {
                    $scope.keys.push(key);
                })
                $ionicLoading.hide();
                console.log($scope.keys);
            }

            if($scope.keys) {
                for (var i = 0; i < $scope.keys.length; i++) {
                    firebase.database().ref('bookings/' + $scope.keys[i]).once('value', function (response) {
                        if(response.val()){
                            if (((response.val().userStatus == 'upComing') ||(response.val().vendorStatus == 'upComing'))
                                && ((response.val().userStatus != 'cancelled')&&(response.val().vendorStatus != 'notAvailed')
                                &&(response.val().vendorStatus != 'Availed'))) {
                                response.val().active = true;
                                $scope.Bookings.push(response.val())
                                $ionicLoading.hide();
                            }
                            else{
                                $ionicLoading.hide();
                            }
                        }
                        else{
                            $ionicLoading.hide();
                        }
                    });
                }
            }
            else{
                $ionicLoading.hide();
            }
        });
    }
    vendorAllBooking();
    $rootScope.$on('booking', function (event, args) {
        vendorAllBooking();
    });


//////////// To check active button for booking information  /////////////
    $scope.booking_status = function (id) {
        if(id == 1){
            $ionicLoading.show();
            $scope.selected_1 = true;
            $scope.selected_2 = false;
            $scope.selected_3 = false;
            $scope.selected_4 = false;
            $scope.Bookings = [];
            if($scope.keys) {
                for (var i = 0; i < $scope.keys.length; i++) {
                    firebase.database().ref('bookings/' + $scope.keys[i]).once('value', function (response) {
                        if(response.val()){
                            if (((response.val().userStatus == 'upComing') ||(response.val().vendorStatus == 'upComing'))
                                && ((response.val().userStatus != 'cancelled')&&(response.val().vendorStatus != 'notAvailed')
                                &&(response.val().vendorStatus != 'Availed'))) {
                                response.val().active = true;
                                $scope.Bookings.push(response.val())
                                $ionicLoading.hide();
                            }
                            else{
                                $ionicLoading.hide();
                            }
                        }
                        else{
                            $ionicLoading.hide();
                        }
                    });
                }
            }
            else{
                $ionicLoading.hide();
            }
        }
        else if(id == 2){
            $ionicLoading.show();
            $scope.selected_1 = false;
            $scope.selected_2 = true;
            $scope.selected_3 = false;
            $scope.selected_4 = false;
            $scope.Bookings = [];
            if($scope.keys) {
                for (var i = 0; i < $scope.keys.length; i++) {
                    firebase.database().ref('bookings/' + $scope.keys[i]).once('value', function (response) {
                        if(response.val()){
                            if ((response.val().userStatus == 'Availed')&&(response.val().vendorStatus == 'Availed')) {
                                $scope.Bookings.push(response.val())
                                $ionicLoading.hide();
                            }
                            else{
                                $ionicLoading.hide();
                            }
                        }
                        else{
                            $ionicLoading.hide();
                        }
                    });
                }
            }
            else{
                $ionicLoading.hide();
            }
        }
        else if(id == 3){
            $ionicLoading.show();
            $scope.selected_1 = false;
            $scope.selected_2 = false;
            $scope.selected_3 = true;
            $scope.selected_4 = false;
            $scope.Bookings = [];
            if($scope.keys) {
                for (var i = 0; i < $scope.keys.length; i++) {
                    firebase.database().ref('bookings/' + $scope.keys[i]).once('value', function (response) {
                       if(response.val()){
                           if ((response.val().userStatus == 'notAvailed')&&(response.val().vendorStatus == 'notAvailed')) {
                               $scope.Bookings.push(response.val())
                               $ionicLoading.hide();
                           }
                           else{
                               $ionicLoading.hide();
                           }
                       }
                       else{
                           $ionicLoading.hide();
                       }
                    });
                }
            }
            else{
                $ionicLoading.hide();
            }
        }
        else if(id == 4){
            $ionicLoading.show();
            $scope.selected_1 = false;
            $scope.selected_2 = false;
            $scope.selected_3 = false;
            $scope.selected_4 = true;
            $scope.Bookings = [];
            if($scope.keys) {
                for (var i = 0; i < $scope.keys.length; i++) {
                    firebase.database().ref('bookings/' + $scope.keys[i]).once('value', function (response) {
                        if(response.val()){
                            if ((response.val().userStatus == 'cancelled') ||
                                ((response.val().userStatus == 'Availed') &&(response.val().vendorStatus == 'notAvailed'))||
                                ((response.val().userStatus == 'notAvailed') &&(response.val().vendorStatus == 'Availed'))||
                                ((response.val().userStatus == 'upComing') &&(response.val().vendorStatus == 'notAvailed'))||
                                ((response.val().userStatus == 'upComing') &&(response.val().vendorStatus == 'Availed'))) {
                                $scope.Bookings.push(response.val())
                                $ionicLoading.hide();
                            }
                            else{
                                $ionicLoading.hide();
                            }
                        }
                        else{
                            $ionicLoading.hide();
                        }
                    });
                }
            }
            else{
                $ionicLoading.hide();
            }
        }
    };

    ///////// By default Upcoming booking button is active /////////////

    $scope.booking_status(1);


    //////////////         Mark a service availed by vendor   ///////////////////////////

    $scope.availed = function(booking){
        console.log("booking",JSON.stringify(booking))
        $ionicLoading.show();
        var updates = {};
        updates['bookings/'+booking.bookingId+'/'+'vendorStatus'] = 'Availed';
        db.ref().update(updates).then(function(){
            $state.go('tab.home');
            $ionicLoading.hide();
            alert('Thank you for updating your booking status!');
            $rootScope.$broadcast('booking', { message: 'booking changed' });
        });
    };
//////////////         Mark a service notAvailed by vendor   ///////////////////////////

    $scope.notAvailed = function(booking){
        console.log("booking",JSON.stringify(booking))
        $ionicLoading.show();
        var updates = {};
        updates['bookings/'+booking.bookingId+'/'+'vendorStatus'] = 'notAvailed';
             db.ref().update(updates).then(function(){
            $ionicLoading.hide();
            alert('Thank you for updating your booking status!');
            $rootScope.$broadcast('booking', { message: 'booking changed' });
        });
    };

});
