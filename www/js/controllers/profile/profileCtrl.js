vendorApp.controller('ProfileCtrl',
    function(allVendorService,$scope, $ionicSlideBoxDelegate, $ionicModal,$stateParams,$state
        ,$ionicLoading,$rootScope,$cordovaToast,$timeout){

        $scope.vendorId = '-KXBKtCXAxgRK0uUs-TG';
        $scope.images =[];
        $scope.dataLoaded = false;
        $scope.reviewerName = '';
        $scope.reviewerImage = '';
        $scope.selectedServices = {};
        $scope.menu_button = true;
        $scope.more = false;
        $scope.days = [];
        $scope.review_info = [];
        $scope.currentValue = 0;
        $scope.liked = false;
        var d = new Date();
        var weekday = new Array(7);
        weekday[0]=  "sunday";
        weekday[1] = "monday";
        weekday[2] = "tuesday";
        weekday[3] = "wednesday";
        weekday[4] = "thursday";
        weekday[5] = "friday";
        weekday[6] = "saturday";
        var n = weekday[d.getDay()];
        // $scope.location = JSON.parse(window.localStorage['selectedLocation']);

        $timeout(function () {
            $ionicLoading.hide();
        }, 10000);


        $scope.backButton = function () {
           $state.go('tab.menu')
        }

        ///////////////////////////////////////////////////////////////////////////////////

        ////////////////////// To update slide number ////////////////////////////////////////
        $scope.next = function() {
            $ionicSlideBoxDelegate.next();
        };
        $scope.previous = function() {
            $ionicSlideBoxDelegate.previous();
        };
        $scope.changeSlide = function(val){
            $scope.currentValue = val;
            $ionicSlideBoxDelegate.$getByHandle('vendorMainDetails').slide(val);
        };

        //////////////////////////Get vendor detail  /////////////////////////////////////
        getVendorDetail();

        function getVendorDetail() {
            $ionicLoading.show();
            allVendorService.getVendorInfo('-KXBFZKi4ut7e1WTt1x0',$scope.vendorId).then(function (result) {
                console.log("result",result)
                if(result){
                    $scope.vendor_detail = result;
                   // getDistance($scope.location.latitude,$scope.location.longitude,$scope.vendor_detail.address.latitude,$scope.vendor_detail.address.longitude,'km');
                    $ionicLoading.hide();
                    if($scope.vendor_detail.images){
                        if($scope.vendor_detail.images.gallery){
                            angular.forEach($scope.vendor_detail.images.gallery, function (value, key) {
                                $scope.images.push({id: key, src: value.url})
                            });
                        }
                        else{
                            $scope.images.push({id: 'dummy', src: 'img/vendorMain.jpg'})
                        }

                    }
                    else{
                        $scope.images.push({id: 'dummy', src: 'img/vendorMain.jpg'})
                    }
                }
                else{
                    $scope.vendor_detail = '';
                    $ionicLoading.hide();
                }
            })
        }

        /////////////////////get distance ////////////////////////////////
        function getDistance(latitude1,longitude1,latitude2,longitude2,units) {
            var p = 0.017453292519943295;    //This is  Math.PI / 180
            var c = Math.cos;
            var a = 0.5 - c((latitude2 - latitude1) * p)/2 +
                c(latitude1 * p) * c(latitude2 * p) *
                (1 - c((longitude2 - longitude1) * p))/2;
            var R = 6371; //  Earth distance in km so it will return the distance in km
            $scope.dist = Math.round(2 * R * Math.asin(Math.sqrt(a)));
            if($scope.dist){
                return true;
            }
            else{
                return false;
            }

        }
        ///////////////////////ratings         /////////////////////////////
        $scope.starrating=function(rating) {
            console.log("rating",rating)
            if(rating){
                var newRating = Math.round(rating)
                return new Array(newRating);
            }
            // return new Array(rating);   //ng-repeat will run as many times as size of array
        };


        //////////////////////////vendor service timings   //////////////////////
        $scope.showVendorTiming = function(time_info){
            angular.forEach(time_info, function(value, key) {
                if(key == n){
                    $scope.today_end_time = value.pm;
                }
                $scope.days.push({name : key,Times:value})
            });
            $scope.more = !$scope.more;
        };

        ////////////////////Gallery image show up and down   ///////////////////
        $ionicModal.fromTemplateUrl('templates/profile/image.html', {
            scope: $scope,
            animation: 'slide-in-up'
        }).then(function(modal) {
            $scope.modal = modal;
        });

        $scope.openModal = function() {
            $ionicSlideBoxDelegate.$getByHandle('ImgGallery').slide(0);
            $scope.modal.show();
        };

        $scope.closeModal = function() {
            $scope.modal.hide();
        };

        $scope.goToSlide = function(value){
            $ionicSlideBoxDelegate.$getByHandle('ImgGallery').slide(value);
            $scope.modal.show();
        };

        ///////////////////to check active function  ////////////////////////
        $scope.slideHasChanged = function(value){
            if(value == 2){
                getReviewList();
            }
            else{
                $scope.review_info = [];
            }
            $scope.currentValue = value;
        };

        $rootScope.$on('reviewList', function (event, args) {
            getReviewList();
        });
        /////////////////////////////////////////////////////////////////////////

        ///////// To get review for a particular vendor ////////////////////////

        function getReviewList() {
            $ionicLoading.show();
            allVendorService.getAllReview('-KXBFZKi4ut7e1WTt1x0', $scope.vendorId).then(function (result) {
                if (result) {
                    $scope.reviews = result;
                    for (key in $scope.reviews) {
                        $scope.review_info.push($scope.reviews[key]);
                    }
                    $scope.dataLoaded = true;
                    $ionicLoading.hide();
                }
                else {
                    $scope.dataLoaded = true;
                    $scope.reviews = '';
                    $ionicLoading.hide();
                }
            })
        }

        $scope.open_map = function(latitude,longitude,line1,line2,vendorName){
            $state.go('map',{
                'lat': latitude,
                'lng': longitude,
                'add1': line1,
                'add2': line2,
                'name': vendorName
            });
        };


    });