vendorApp.controller('SignUpCtrl', function ($scope,$ionicLoading,$http,$ionicPopup,$rootScope,$timeout,
                                             $state) {

    $scope.user = {
        name: '',
        email: '',
        mobile_num: '',
        gender: '',
        password:''
    };

    $scope.loginPage = function(){
        $state.go('login');
    };

    $scope.showMobileVerify = false;
    $scope.showOTPfield = false;

    $scope.newOtp= {
        code: ''
    };
    var storedOTP = [];

    //localStorage.removeItem('previousOtp');

    if(checkLocalStorage('previousOtp')){
        console.log('otp exists');
        $scope.showOTPfield = true;
        $scope.showMobileVerify = true;
        storedOTP = JSON.parse(window.localStorage['previousOtp'] || {});
    } else {
        console.log('otp not exists');
    }


    $scope.signup = function(){
        $ionicLoading.show();
        firebase.auth().createUserWithEmailAndPassword($scope.user.email, $scope.user.password).then(function(data){
            $scope.uid = data.uid;
            if($scope.uid){
                $scope.sendVerification();
                $ionicLoading.hide();
            }
        })
            .catch(function(error) {
                // Handle Errors here.
                var errorCode = error.code;
                var errorMessage = error.message;
                alert(errorMessage)
                $ionicLoading.hide();

                console.log("errorCode",errorCode,errorMessage)
            })
    };

    $scope.generateVerificationCode = function(){
        var a = Math.floor(100000 + Math.random() * 900000)
        $scope.generatedCode= a.toString().substring(0, 4);
        console.log("number",$scope.generatedCode)  ;
    };

    $scope.sendVerification = function(){
        $scope.generateVerificationCode();
        $ionicLoading.show();
        $http({
            url: 'http://139.162.27.64/api/send-otp?otp='+$scope.generatedCode+'&mobile='+$scope.user.mobile_num,
            method: 'POST',
            "async": true,
            "crossDomain": true
        }) .success(function (data, status, headers, config) {
            if(status == 200){
                $ionicLoading.hide();
                $scope.otp = $scope.generatedCode;
                storedOTP.push($scope.otp);
                window.localStorage['previousOtp'] = JSON.stringify(storedOTP);
                $ionicPopup.alert({
                    title: 'Verification Code Sent',
                    template: 'We have sent a verification code to your registered mobile number'
                }).then(function(){
                    $scope.showOTPfield = true;
                    $scope.showPopup();
                })
            }
        })
            .error(function (data, status, header, config) {
                $ionicLoading.hide();
                console.log(status,data)
                alert(data.msg);

            });

    };
    $scope.reSendVerification = function(){
        $scope.generateVerificationCode();
        $ionicLoading.show();
        $http({
            method: 'POST',
            url:'http://139.162.27.64/api/send-otp?otp='+$scope.generatedCode+'&mobile='+$scope.user.mobile_num
        }) .success(function (data, status, headers, config) {
            if(status == 200){
                $ionicLoading.hide();
                $scope.otp = $scope.generatedCode;
                storedOTP.push($scope.otp);
                window.localStorage['previousOtp'] = JSON.stringify(storedOTP);
                $ionicPopup.alert({
                    title: 'Verification Code Sent',
                    template: 'We have sent a verification code to your registered mobile number'
                }).then(function(){
                    $scope.showOTPfield = true;
                    $scope.showPopup();
                })
            }
        })
            .error(function (data, status, header, config) {
                $ionicLoading.hide();
                alert(data.msg)
            });

    };
    $scope.showPopup = function() {
        $scope.data = {};
        $ionicPopup.show({
            template: '<input type="tel" ng-model="data.otp">',
            title: 'Please, enter otp',
            scope: $scope,
            buttons: [
                { text: 'Resend' ,
                    onTap:function () {
                        $scope.reSendVerification();
                    }
                },
                {
                    text: '<b>Verify</b>',
                    type: 'button-positive',
                    onTap: function(e) {
                        if (!$scope.data.otp) {
                            //don't allow the user to close unless he enters otp
                            e.preventDefault();
                        } else {
                            $scope.verifyOTP($scope.data.otp);
                            // return $scope.data.otp;
                        }
                    }
                }
            ]
        });
    };

    $scope.verifyOTP = function(verify_otp){
        $scope.newOtp.code = verify_otp;
        console.log($scope.newOtp.code);
        console.log(storedOTP);
        var verified = false;
        for(var i = 0; i < storedOTP.length; i++){
            console.log($scope.newOtp.code, parseInt(storedOTP[i]));

            if($scope.newOtp.code == parseInt(storedOTP[i])){
                verified = true;
                $ionicPopup.alert({
                    title: 'Mobile Number Verified'
                }).then(function(){
                    window.localStorage.setItem('mobile_verify','true');
                    var vendorData = {
                        activeFlag:true,
                        createdTime:new Date().getTime(),
                        // deviceId: $cordovaDevice.getDevice().uuid,
                        // deviceName:$cordovaDevice.getDevice().manufacturer,/
                       deviceId: '123456',
                       deviceName:'samsung',
                        email:{
                            userEmail:$scope.user.email,
                            verifiedTime:'',
                            emailFlag:false
                        },
                        mobile:{
                            mobileNum: $scope.user.mobile_num,
                            mobileFlag:true
                        },
                        name: $scope.user.name,
                        userId:$scope.uid,
                        gender: $scope.user.gender,
                    };
                    firebase.database().ref('users/vendors/'+$scope.uid)
                        .set(vendorData,function(response) {
                            if(response == null){
                                window.localStorage.setItem("uid", $scope.uid);
                                $rootScope.$broadcast('logged_in', { message: 'usr logged in' });
                                $state.go('tab.home');
                                alert('Your profile is successfully created.');
                            }
                            else{
                                alert('Try again!');
                            }
                        })
                })

            }
        }
        $timeout(function(){
            if(i == storedOTP.length && !verified){
                $ionicPopup.alert({
                    title: 'Incorrect Code'
                }).then(function(){
                    $scope.newOtp = {
                        code: ''
                    };
                    $scope.showPopup();
                })
            }
        }, 1000);
    }
});