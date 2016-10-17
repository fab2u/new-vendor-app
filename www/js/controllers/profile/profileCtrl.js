/**
 * Created by sonam on 15/10/16.
 */
vendorApp.controller('ProfileCtrl', function($scope) {
    $scope.selected_1 = true;
    $scope.selected_2 = false;
    $scope.selected_3 = false;

    //////////// To check active button for profile information  /////////////
    $scope.profile_status = function (id) {
        if(id == 1){
            $scope.selected_1 = true;
            $scope.selected_2 = false;
            $scope.selected_3 = false;
        }
        else if(id == 2){
            $scope.selected_1 = false;
            $scope.selected_2 = true;
            $scope.selected_3 = false;
        }
        else if(id == 3){
            $scope.selected_1 = false;
            $scope.selected_2 = false;
            $scope.selected_3 = true;
        }
    };

    ///////// By default overview button is active /////////////

    $scope.profile_status(1);

});
