
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


        // generate a random date of birth
        var generate_date_of_birth = function(){
            var start_date = new Date(1940,1,1);
            //console.log("start date ",start_date);
            var end_date = new Date();
            //console.log("start date ",end_date);
            var random_date = new Date(start_date.getTime() + Math.random() * (end_date.getTime() - start_date.getTime()));
            //console.log("random date ",random_date);
            return random_date;
        }

        // calculate age relative to the date now
        var calculate_age = function(birth_date){
            // calculate age
            var age = new Date() - birth_date;
            age = Math.floor(age / (365 * 24 * 60 * 60 * 1000));
            return age;
        }

        $scope.generate_csv_data = function(number_of_records_string){
            var random_records = [];//[{a: 1, b:2}, {a:3, b:4}];

            // convert the sting to a integer
            var number_of_records_int = parseInt(number_of_records_string); 

            for(var i=0;i<number_of_records_int;i++) {
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
                random_records.push(record); 
                //console.log(record);      
            }
            

            $scope.array_to_write_to_csv = random_records;
            //console.log($scope.array_to_write_to_csv);
        }

       


        

  }]);
  

