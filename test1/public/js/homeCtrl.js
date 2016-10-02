angular
    .module('app')
    .controller('homeCtrl', ['$scope','$http','server_url','$filter', function($scope,$http,server_url,$filter) {
        var server_address = server_url;
        console.log("Hello world from controller server url = "+server_address);
        

        // date picker
        var date_input=$('input[name="picker_date_of_birth"]'); //our date input has the name "picker_date_of_birth"
		var container=$('.bootstrap-iso form').length>0 ? $('.bootstrap-iso form').parent() : "body";
		date_input.datepicker({
			format: 'dd/mm/yyyy',
			container: container,
			todayHighlight: true,
			autoclose: true,
		});       


        var clear_user_input_box = function(){
            // clear input boxes
            $scope.form_user = {
                name:"",
                surname:"",
                id:"",
                date_of_birth:""
            };
            
            // clear date picker
            $('#picker_date_of_birth').val('');

            // id number in database check reset variables
            $scope.id_number_in_db = false;
            $scope.id_number_that_is_in_db = '';

        }

        // get users from database update view
        var refresh = function() {
            console.log("refresh items");
            //console.log(getServerUrl());

            $http.get(server_address+'/users').success(function(response){
                console.log("I got the data that I requested");
                console.log(response);
                // store users in an object
                $scope.user_list = response;
                // clear input box
                clear_user_input_box();
            });
        };

        refresh(); // get data when we load the page

        // return true if the form is not valid or if the
        // date of birth dos not match the id number
        $scope.check_to_disable_submit_button = function(valid){
            return (!valid || !$scope.id_and_date_of_birth_match());
        }

        // return true if id and date of birth match
        $scope.id_and_date_of_birth_match = function(){

            var date_string = $filter('date')($scope.form_user.date_of_birth, "yyyy-MM-dd");
            date_string =   date_string.charAt(2)+date_string.charAt(3)+
                            date_string.charAt(5)+date_string.charAt(6)+
                            date_string.charAt(8)+date_string.charAt(9);

            var id_str = $scope.form_user.id;
            var id_date_string =    id_str.charAt(0)+id_str.charAt(1)+
                                    id_str.charAt(2)+id_str.charAt(3)+
                                    id_str.charAt(4)+id_str.charAt(5);

            if(date_string != id_date_string) {
                //console.log("id and date does not match");
                $scope.id_and_date_of_birth_does_not_match = true;
                return false;
            }
            return true;

        }

        // add user to database
        $scope.add_user = function() {
            console.log($scope.form_user);

            // return if id is already in database
            for(var item of $scope.user_list) {
                console.log(item['id']);
                if($scope.form_user.id == item['id']){
                    console.log("id already in database");
                    $scope.id_number_in_db = true;
                    $scope.id_number_that_is_in_db = $scope.form_user.id;
                    return false;
                }
            }  


            // post data
            $http.post(server_address+'/users', $scope.form_user).success(function(response) {
                console.log(response);
                refresh();
            });

        };

        // clear input form
        $scope.cancel = function() { 
            // clear input boxes    
            clear_user_input_box();   
        };

        // delete a specific user from the database
        $scope.delete_user = function(id) {
            console.log("delete user:"+id);
            $http.delete(server_address+'/users/' + id).success(function(response) {
                refresh();
            });
        };

        // fetch user info for editing
        $scope.edit_user = function(id) {
            console.log("edit user:"+id);
            $http.get(server_address+'/users/' + id).success(function(response) {
                $scope.form_user = response; // put response into input box
            });
        };

  }])
  .directive('myDirective', function() {
      return {
          require: 'ngModel',
          link: function(scope, element, attr, mCtrl) {
              function myValidation(value) {
                  
                  // check id number for a 13 digit number
                  var isnum = /^\d+$/.test(value); 
                  mCtrl.$setValidity('only_digits', isnum);
                  
                  // check id number ia a number
                  var isnum = /^\d+$/.test(value);
                  mCtrl.$setValidity('only_digits', isnum);
                  //console.log("test: "+value+" is number = "+isnum);
            

                  //console.log("id length ",value.length);
                  // return if the id is not 13 digits long
                  if(value.length != 13) {
                      mCtrl.$setValidity('id_length', false);
                  }else{
                      mCtrl.$setValidity('id_length', true);
                  }

                  return value;
              }
              mCtrl.$parsers.push(myValidation);
          }
      };
  });

