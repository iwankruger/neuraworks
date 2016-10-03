
angular
    .module('app')
    .controller('csv_testCtrl', ['$scope','$http','server_url','$filter', function($scope,$http,server_url,$filter) {
        var server_address = server_url;
        console.log("Hello world from csv controller server url = "+server_address);
        
        $scope.csv_header = ['Id', 'Name', 'Surname', 'Initials', 'Age', 'DateOfBirth'];
        $scope.array_to_write_to_csv = []; 
        $scope.names =[
                        "Noah",
                        "Liam",
                        "Mason", 
                        "Jacob", 
                        "William", 
                        "Ethan", 
                        "James", 
                        "Alexander", 
                        "Michael", 
                        "Benjamin", 
                        "Emma",
                        "Olivia", 
                        "Sophia",
                        "Ava", 
                        "Isabella",
                        "Mia", 
                        "Abigail",
                        "Emily",
                        "Charlotte", 
                        "Harper"
                        ];
        $scope.surnames =[
                        "Smith",
                        "Johnson",
                        "Williams", 
                        "Jones", 
                        "Brown", 
                        "Davis", 
                        "Miller", 
                        "Wilson", 
                        "Moore", 
                        "Taylor", 
                        "Anderson",
                        "Jackson", 
                        "White",
                        "Harris", 
                        "Robinson",
                        "King", 
                        "Hill",
                        "Green",
                        "Yellow", 
                        "Blue"
                        ];
        // number of items to display on screen
        $scope.limit_number_of_elements = 11;








        var refresh = function(){
            $scope.generate_success = false;
            $scope.form_record ={number:''};
            $scope.limit_end = 11;
            $scope.limit_begin = 0;
            $scope.loading_file = false;
            $scope.generate_records = false;
            $scope.record_count = 0;

        }

        refresh();
        
        // generate a random date of birth
        var generate_date_of_birth = function(){
            var start_date = new Date(1920,1,1);
            //console.log("start date ",start_date);
            var end_date = new Date();
            //console.log("start date ",end_date);
            var random_date = new Date(start_date.getTime() + Math.random() * (end_date.getTime() - start_date.getTime()));
            //console.log("random date ",random_date);
            //var random_year = Math.floor((Math.random() * 100) + 1915);
            //var random_month = Math.floor((Math.random() * 11) + 0);
            //var random_day = Math.floor((Math.random() * 31) + 1);
            //var random_date = new Date(random_year,random_month,random_day);
            return random_date;
        }

        // calculate age relative to the date now
        var calculate_age = function(birth_date){
            // calculate age
            var age = new Date() - birth_date;
            age = Math.floor(age / (365 * 24 * 60 * 60 * 1000));
            return age;
        }


        // check if there is a duplicate record in array
        var duplicate_record = function(records_to_check,record){
            for(var i=0;i<records_to_check.length;i++) {
                if(records_to_check[i].Name == record.Name &&
                   records_to_check[i].Surname == record.Surname &&
                   records_to_check[i].DateOfBirth == record.DateOfBirth
                   ) {
                    //console.log("duplicate record position ",i);
                    //console.log("record in db ",records_to_check[i]);
                    //console.log("duplicate record ",record);
                    // duplicate record 
                    return true;
                }
            }
            // not a duplicate record 
            return false;

        }

        // generate records with random data for a csv file
        $scope.generate_csv_data = function(number_of_records_string){
            var random_records = [];
            $scope.generate_records = true;
            //$scope.$apply();

            // convert the sting to a integer
            var number_of_records_int = parseInt(number_of_records_string); 
            $scope.generate_success = false;
            console.log("Generating csv file ...");

            



            // generate random records
            for(var i=0;i<number_of_records_int;i++) {
            
                (function (i) {
                    setTimeout(function () {
                        //console.log(i);
                    
                        do{
                            var record = {Id:'', Name:'', Surname:'', Initials:'', Age:'', DateOfBirth:''};
                            // record id
                            record.Id = i;
                            // slect a random name
                            record.Name = $scope.names[Math.floor(Math.random() * $scope.names.length)];
                            // select a random surname
                            record.Surname = $scope.surnames[Math.floor(Math.random() * $scope.surnames.length)];
                            // get initials
                            var initials = record.Name.match(/\b\w/g);
                            record.Initials = initials.join('');
                            // generate a random birthday
                            var birthday = generate_date_of_birth();
                            record.DateOfBirth = $filter('date')(birthday, "dd/MM/yyyy");
                            // calculate age
                            record.Age = calculate_age(birthday);
                            duplicate_record(random_records,record);
                            //console.log(record);      
                        }while (duplicate_record(random_records,record));

                        
                        
                        // record not a duplicate add to array
                        random_records.push(record); 
                            
                        // update view to indicate progress
                        if(i-$scope.record_count > 1000) {
                            $scope.record_count = i;
                            $scope.$apply();
                        }

                           
                        // upate view when finished
                        if(i>=number_of_records_int-1) {
                            $scope.array_to_write_to_csv = random_records;
                            $scope.generate_success = true;
                            $scope.generate_records = false;
                            console.log("finished generating csv file");
                            $scope.$apply();
                        }
                   
                            return i;
                    }, 0)
                })(i)




            }//for
            
            
            

            //duplicate_record(random_records,random_records[10]);


        }


        // upload csv file and store data in an array
        $scope.uploadFile = function(){
            var file = $scope.myFile;
            
            // indicate that the file is uploading
            $scope.loading_file = true;

            // Parse local CSV file
            Papa.parse(file, {
                complete: function(results) {
                    //console.log("Finished:", results.data);
                    //console.log("Finished:", results);
                    $scope.file2 = results.data;
                    console.log("Finished:");
                    $scope.limit_begin = 0;
                    $scope.loading_file = false;
                    $scope.$apply();
                }
            });     
        };

        // load next items on page
        $scope.load_next_data = function(){
            if($scope.limit_begin + $scope.limit_number_of_elements  < $scope.file2.length) {
                $scope.limit_begin = $scope.limit_begin + $scope.limit_number_of_elements;
            } 
        };

        // load prevous items on page
        $scope.load_prev_data = function(){

            $scope.limit_begin = $scope.limit_begin - $scope.limit_number_of_elements;
            if($scope.limit_begin < 0) {
                $scope.limit_begin = 0;
            }
             
        };
        

  }])
  .directive('fileModel', ['$parse', function ($parse) {
      return {
          restrict: 'A',
          link: function(scope, element, attrs) {
              var model = $parse(attrs.fileModel);
              var modelSetter = model.assign;
            
              element.bind('change', function(){
                  scope.$apply(function(){
                      modelSetter(scope, element[0].files[0]);
                  });
              });
          }
      };
}]);

  

