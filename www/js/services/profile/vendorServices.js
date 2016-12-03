vendorApp.factory('allVendorService', function ($q) {
    return {
        getVendorInfo: function (cityId,vendorId) {
            console.log(cityId,vendorId)
            return $q(function (resolve, reject) {
                firebase.database().ref('vendors/' + cityId +'/vendors/'+vendorId)
                    .once('value').then(function (snapshot) {
                        console.log(snapshot.val())
                    resolve(snapshot.val());
                }, function (error) {
                    reject(error);
                });
            });
        },
        getMenu: function (vendorId) {
            return $q(function (resolve, reject) {
                firebase.database().ref('menu/'+ vendorId)
                    .once('value').then(function (snapshot) {
                    resolve(snapshot.val());
                }, function (error) {
                    reject(error);
                });
            });
        },
        getAllReview: function (cityId,vendorId) {
            return $q(function (resolve, reject) {
                firebase.database().ref('reviews/'+ cityId+'/'+ vendorId+'/Reviews')
                    .once('value').then(function (snapshot) {
                    resolve(snapshot.val());
                }, function (error) {
                    reject(error);
                });
            });
        }
    }
});