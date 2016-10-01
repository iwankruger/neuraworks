angular
    .module('app')
    .controller('homeCtrl', ['$scope','$http','server_url', function($scope,$http,server_url) {
        var server_address = server_url;
        console.log("Hello world from controller server url = "+server_address);
        
        // get users from database update view
        var refresh = function() {
            console.log("refresh items");
            //console.log(getServerUrl());

            $http.get(server_address+'/users').success(function(response){
                console.log("I got the data that I requested");
                console.log(response);
                // store users in an object
                $scope.user_list = response;
                // clear input boxes
                $scope.form_user = ""; 
            });
        };

        refresh(); // get data when we load the page

        // add user to database
        $scope.add_user = function() {
            console.log($scope.form_user);
            $http.post(server_address+'/users', $scope.form_user).success(function(response) {
                console.log(response);
                refresh();
            });
        };

        // clear input form
        $scope.cancel = function() {
            // clear input boxes
            $scope.form_user = "";
        };

  }]);

