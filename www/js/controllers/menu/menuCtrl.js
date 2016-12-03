// vendorApp.controller('ProfileCtrl', function($scope, $ionicSlideBoxDelegate,
//                                              $ionicModal,$stateParams,$state,$ionicLoading,
//                                              $rootScope,$cordovaToast,$timeout) {
//     $scope.selected_1 = true;
//     $scope.selected_2 = false;
//
//     //////////// To check active button for menu information  /////////////
//     $scope.profile_status = function (id) {
//         if(id == 1){
//             $scope.selected_1 = true;
//             $scope.selected_2 = false;
//         }
//         else if(id == 2){
//             $scope.selected_1 = false;
//             $scope.selected_2 = true;
//         }
//     };
//     // allVendorService,
//     ///////// By default overview button is active /////////////
//
//     $scope.profile_status(1);
//
//
//
// });


vendorApp.controller('MenuCtrl',function($scope, $ionicSlideBoxDelegate, $ionicScrollDelegate,
                                                 $timeout,$stateParams,$rootScope,$state,$ionicLoading,
                                                 $ionicHistory,$cordovaToast,allVendorService) {


    $scope.menu = [];
    $scope.catName = [];
    $scope.currSlide = 0; // Current slide index
    $scope.vendorId = '-KXBKtCXAxgRK0uUs-TG';
    // $scope.cityId = JSON.parse(window.localStorage['selectedLocation']).cityId;

    $scope.services = {
        "1001":{
            "serviceName": "Beard Styling",
            "serviceid": "1001"
        },
        "1002":{
            "serviceName": "Blow Dry",
            "serviceid": "1002"
        },
        "1003":{
            "serviceName": "Hair Coloring",
            "serviceid": "1003"
        },
        "1004":{
            "serviceName": "Hair Consulting",
            "serviceid": "1004"
        },
        "1005":{
            "serviceName": "Hair Cut & Styling",
            "serviceid": "1005"
        },
        "1006":{
            "serviceName": "Hair Extension",
            "serviceid": "1006"
        },
        "1007":{
            "serviceName": "Head Massage",
            "serviceid": "1007"
        },
        "1008":{
            "serviceName": "Hair Spa",
            "serviceid": "1008"
        },
        "1009":{
            "serviceName": "Hair Transplant",
            "serviceid": "1009"
        },
        "1010":{
            "serviceName": "Hair Wash",
            "serviceid": "1010"
        },
        "1011":{
            "serviceName": "Other Hair Treatments",
            "serviceid": "1011"
        },
        "1012":{
            "serviceName": "Straightening/Perming",
            "serviceid": "1012"
        },
        "1013":{
            "serviceName": "Anti HairFall Treatment",
            "serviceid": "1013"
        },
        "2001":{
            "serviceName": "Face Bleach",
            "serviceid": "2001"
        },
        "2002":{
            "serviceName": "Eyebrow/Eyelash",
            "serviceid": "2002"
        },
        "2003":{
            "serviceName": "Face Threading",
            "serviceid": "2003"
        },
        "2004":{
            "serviceName": "Face Waxing",
            "serviceid": "2004"
        },
        "2005":{
            "serviceName": "Facials",
            "serviceid": "2005"
        },
        "2006":{
            "serviceName": "Clean-up",
            "serviceid": "2006"
        },
        "2007":{
            "serviceName": "Laser Treatment",
            "serviceid": "2007"
        },
        "2008":{
            "serviceName": "Shaving",
            "serviceid": "2008"
        },
        "2009":{
            "serviceName": "Skin Treatments",
            "serviceid": "2009"
        },
        "2010":{
            "serviceName": "Skincare Consultations",
            "serviceid": "2010"
        },
        "3001":{
            "serviceName": "Underarms",
            "serviceid": "3001"
        },
        "3002":{
            "serviceName": "Arms",
            "serviceid": "3002"
        },
        "3003":{
            "serviceName": "Legs",
            "serviceid": "3003"
        },
        "3004":{
            "serviceName": "Full Body",
            "serviceid": "3004"
        },
        "3005":{
            "serviceName": "Full Back",
            "serviceid": "3005"
        },
        "3006":{
            "serviceName": "Midriff",
            "serviceid": "3006"
        },
        "3007":{
            "serviceName": "Bikini",
            "serviceid": "3007"
        },
        "3008":{
            "serviceName": "Side Locks",
            "serviceid": "3008"
        },
        "3009":{
            "serviceName": "Laser Hair Removal",
            "serviceid": "3009"
        },
        "4001":{
            "serviceName": "Body Polishing",
            "serviceid": "4001"
        },
        "4002":{
            "serviceName": "Body Toning",
            "serviceid": "4002"
        },
        "4003":{
            "serviceName": "Body Bleach",
            "serviceid": "4003"
        },
        "4004":{
            "serviceName": "Body Scrub",
            "serviceid": "4004"
        },
        "4005":{
            "serviceName": "Body Wrap",
            "serviceid": "4005"
        },
        "4006":{
            "serviceName": "Body Treatments",
            "serviceid": "4006"
        },
        "4007":{
            "serviceName": "Botox Treatment",
            "serviceid": "4007"
        },
        "4008":{
            "serviceName": "Body Shaping and Contouring",
            "serviceid": "4008"
        },
        "4009":{
            "serviceName": "Tanning",
            "serviceid": "4009"
        },
        "5001":{
            "serviceName": "Pedicure",
            "serviceid": "5001"
        },
        "5002":{
            "serviceName": "Manicure",
            "serviceid": "5002"
        },
        "5003":{
            "serviceName": "Cleanings",
            "serviceid": "5003"
        },
        "6001":{
            "serviceName": "Nail Art",
            "serviceid": "6001"
        },
        "6002":{
            "serviceName": "Nail Extension/ Bar",
            "serviceid": "6002"
        },
        "7001":{
            "serviceName": "Packages",
            "serviceid": "7001"
        },
        "8001":{
            "serviceName": "Spa & Massages",
            "serviceid": "8001"
        },
        "9001":{
            "serviceName": "Fitness",
            "serviceid": "9001"
        },
        "1101":{
            "serviceName": "Wedding & Party",
            "serviceid": "1101"
        },
        "1201":{
            "serviceName": "Tattoo",
            "serviceid": "1201"
        }
    };


    $timeout(function () {
        $ionicLoading.hide();
    }, 10000);

    getVendorMenu();

    function getVendorMenu() {
        $ionicLoading.show();
        allVendorService.getMenu($scope.vendorId).then(function (result) {
            if(result){
                $scope.menuInfo = result.services;
                window.localStorage.setItem("vendorName",result.vendorName);
                angular.forEach($scope.menuInfo, function(value, key) {
                    if(key == 'cat-01'){
                        $scope.catName.push("HAIR");
                        $scope.menu.push(value)
                    }
                    else if(key =='cat-02'){
                        $scope.catName.push("FACE");
                        $scope.menu.push(value)
                    }
                    else if(key =='cat-03'){
                        $scope.catName.push("HAIR REMOVAL");
                        $scope.menu.push(value)
                    }
                    else if(key =='cat-04'){
                        $scope.catName.push("BODY");
                        $scope.menu.push(value)
                    }
                    else if(key =='cat-05'){
                        $scope.catName.push("HANDS & FEETS");
                        $scope.menu.push(value)
                    }
                    else if(key =='cat-06'){
                        $scope.catName.push("NAILS");
                        $scope.menu.push(value)
                    }
                    else if(key =='cat-07'){
                        $scope.catName.push("PACKAGES");
                        $scope.menu.push(value)
                    }
                    else if(key =='cat-08'){
                        $scope.catName.push("SPA & MASSAGES");
                        $scope.menu.push(value)
                    }
                    else if(key =='cat-09'){
                        $scope.catName.push("FITNESS");
                        $scope.menu.push(value)
                    }
                    else if(key =='cat-11'){
                        $scope.catName.push("WEDDING & PARTY");
                        $scope.menu.push(value)
                    }
                    else if(key =='cat-12'){
                        $scope.catName.push("TATTOO");
                        $scope.menu.push(value)
                    }
                });
                $timeout( function() {
                    $ionicSlideBoxDelegate.update();
                    $scope.dataLoaded = true;
                    $ionicLoading.hide();
                },5000);
            }
            else{
                $ionicLoading.hide();
                $scope.dataLoaded = true;
                $cordovaToast
                    .show('No,menu found for this vendor,please select another vendor!', 'long', 'center')
                    .then(function(success) {
                        // success
                    }, function (error) {
                        // error
                });
            }
        })
    }

    // Notify slide change
    // @param (int) slide index
    $scope.slideHasChanged = function(index) {
        tabPositionCenter(index);
        $scope.currSlide = $ionicSlideBoxDelegate.currentIndex();
        console.log("currSlide :",$scope.currSlide)
        $timeout( function() {
            $ionicSlideBoxDelegate.update();
            $ionicScrollDelegate.$getByHandle('mainScroll').resize();
        },100);
    };

    // notify tab change
    //@param (int) tab click index
    $scope.tabHasChanged = function(index) {
        $ionicSlideBoxDelegate.slide(index);
        tabPositionCenter(index);
    };

    // Scroll the tab to the center position
    // @param (int) tab index
    function tabPositionCenter(index){
        var currentIndex = index;
        var tabElements = $(".tab"); // get all the tabs elements
        activeTab(tabElements, currentIndex);
        var totalTabs = tabElements.length;
        var windowWidth = window.innerWidth -20; // -20 to clear padding
        var halfWindowWidth = windowWidth/2;
        // totalTabs-1 because the last tab does not have next element/tab
        if(index < totalTabs-1) {
            var obj = $(tabElements[currentIndex]);
            var childPos = obj.offset();
            var parentPos = obj.parent().offset();
            var childOffset = {
                top: childPos.top - parentPos.top,
                left: childPos.left - parentPos.left
            }
            var nextObj = obj.next();
            var nextchildPos = nextObj.offset();
            var nextparentPos = nextObj.parent().offset();
            var nextchildOffset = {
                top: nextchildPos.top - nextparentPos.top,
                left: nextchildPos.left - nextparentPos.left
            }
            var scrollValue =   childOffset.left -halfWindowWidth
                + ((nextchildOffset.left - childOffset.left )/2) ;

            $ionicScrollDelegate.$getByHandle('myhandel').scrollTo(scrollValue, 0, true);


        }

        // set active tab to different color
        //@param1 (element) click tab element
        //@param2 (int) click tab index
        function activeTab(tabElements, index){
            for(var i=0; i<tabElements.length; i++){
                if(i==index){ // set active to the click tab
                    $(tabElements[i]).addClass("active");
                }else{
                    $(tabElements[i]).removeClass("active");
                }
            }
        }// activeTab

    }//tabPositionCenter

    // Scroll tabs to right/left
    // @param (element) button element
    $scope.scrollToRight = function($event) {
        $($event.currentTarget).toggleClass("ion-chevron-right ion-chevron-left");
        if($($event.currentTarget).hasClass("ion-chevron-right")){
            $ionicScrollDelegate.$getByHandle('myhandel').scrollTo(0, 0, true);
        }else{
            $ionicScrollDelegate.$getByHandle('myhandel').scrollTo(500, 0, true);
        }
    };

})

