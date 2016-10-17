/**
 * Created by sonam on 14/10/16.
 */
vendorApp.controller('loginCtrl', function ($scope,$ionicPopup,$ionicLoading,$rootScope,$state) {

    $scope.user = {
        user_email: '',
        user_password: '',
    };
    var db = firebase.database();
    $scope.showPopup = function() {
        $scope.data = {}
        // Custom popup
        var myPopup = $ionicPopup.show({
            template: '<input type = "text" ng-model = "data.model">',
            title: 'Reset Password',
            subTitle: 'Enter your email address',
            scope: $scope,

            buttons: [
                { text: 'Cancel' }, {
                    text: '<b>Send Link</b>',
                    type: 'pinkcolor',
                    onTap: function(e) {

                        if (!$scope.data.model) {
                            //don't allow the user to close unless he enters model...
                            e.preventDefault();
                        } else {
                            var auth = firebase.auth();
                            var emailAddress = $scope.data.model;
                            auth.sendPasswordResetEmail(emailAddress).then(function() {
                                sentPopup();
                            }, function(error) {
                                console.log(error);
                            });
                            return $scope.data.model;
                        }
                    }
                }
            ]
        });
    };

    function sentPopup(){
        $ionicPopup.alert({
            title: 'Reset Link sent to your email address!',
            //  template: 'It might taste good'
        });
    };


    $scope.loginEmail = function(){
        $ionicLoading.show();
        firebase.auth().signInWithEmailAndPassword($scope.user.user_email, $scope.user.user_password).then(function(response){
            window.localStorage.setItem("email", response.email);
            window.localStorage.setItem("uid", response.uid);
            if(response.uid){
                db.ref("users/vendors/"+response.uid).on("value", function(snapshot){
                    window.localStorage.setItem("name", snapshot.val().name);
                    window.localStorage.setItem("mobileNumber", snapshot.val().mobile.mobileNum);
                });
                    alert("Logged in successfully!");
                    $rootScope.$broadcast('logged_in', { message: 'usr logged in' });
                    $state.go('tab.home');
                $ionicLoading.hide();
            }
        })
            .catch(function(error) {
                var errorCode = error.code;
                var errorMessage = error.message;
                $ionicLoading.hide();
                alert(errorMessage);
            });
    }

});
