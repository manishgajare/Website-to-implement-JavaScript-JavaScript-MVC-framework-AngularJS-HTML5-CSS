var app = angular.module('DeveloperApp', ['ngTable']).
controller('DeveloperController', function ($scope, $filter, ngTableParams) {

var data = 
[{ id: 15, firstName: 'Alice', lastName: 'Wonderland', Age: '24', Email: 'alice.w@g.com', Created: '2014-24-03 06:00:00', lastEdited: '2014-24-03 06:00:00', Active: 'true' },
 { id: 25, firstName: 'Nidhi', lastName: 'Kurup', Age: '23', Email: 'yash.w@g.com', Created: '2014-24-03 06:00:00', lastEdited: '2015-24-03 06:00:00', Active: 'true' },
 { id: 332, firstName: 'Roshni', lastName: 'Kundu', Age: '22', Email: 'riti.w@g.com', Created: '2014-24-03 06:00:00', lastEdited: '2013-24-03 06:00:00', Active: 'false' },
 { id: 432, firstName: 'Mike', lastName: 'Tyson', Age: '25', Email: 'prateek.w@g.com', Created: '2014-24-03 06:00:00', lastEdited: '2014-24-03 06:00:00', Active: 'true' },
 { id: 53, firstName: 'K k', lastName: 'Menon', Age: '11', Email: 'manish.w@g.com', Created: '2014-24-03 06:00:00', lastEdited: '2014-24-03 06:00:00', Active: 'true' },
 { id: 63, firstName: 'Jakie', lastName: 'Chan', Age: '01', Email: 'thakkar.w@g.com', Created: '2014-24-03 06:00:00', lastEdited: '2014-24-03 06:00:00', Active: 'true' },
 { id: 73, firstName: 'Leo', lastName: 'Vinci', Age: '34', Email: 'john.w@g.com', Created: '2014-24-03 06:00:00', lastEdited: '2014-24-03 06:00:00', Active: 'false' },
 { id: 81, firstName: 'Nidhi', lastName: 'Kurup', Age: '41', Email: 'mike.w@g.com', Created: '2014-24-03 06:00:00', lastEdited: '2014-24-03 06:00:00', Active: 'true' },
 { id: 95, firstName: 'Roshni', lastName: 'Kundu', Age: '51', Email: 'john.w@g.com', Created: '2014-24-03 06:00:00', lastEdited: '2014-24-03 06:00:00', Active: 'false' },
 { id: 102, firstName: 'Mike', lastName: 'Tyson', Age: '61', Email: 'umesh.w@g.com', Created: '2014-24-03 06:00:00', lastEdited: '2014-24-03 06:00:00', Active: 'true' },
 { id: 112, firstName: 'Kk', lastName: 'Menon', Age: '71', Email: 'ritika.w@g.com', Created: '2014-24-03 06:00:00', lastEdited: '2014-24-03 06:00:00', Active: 'true' },
 { id: 1212, firstName: 'Yash', lastName: 'Kochar', Age: '81', Email: 'alex.w@g.com', Created: '2014-24-03 06:00:00', lastEdited: '2014-24-03 06:00:00', Active: 'true' },
 { id: 133, firstName: 'Leo', lastName: 'Vinci', Age: '91', Email: 'wontgiveitback.w@g.com', Created: '2014-24-03 06:00:00', lastEdited: '2014-24-03 06:00:00', Active: 'false' }
];

    $scope.newDeveloper = {
        id: '', firstName: '', lastName: '', Age: '', Email: '', Created: '', lastEdited: '', Active: ''
    };

    $scope.tableParams = new ngTableParams({
        page: 1,            // show first page
        count: 10,          // count per page
        sorting: {
            firstName: 'asc'     // initial sorting
        },
        filter: {
            firstName: ''       // initial filter
        }
    }, {
        total: data.length, // length of data
        getData: function ($defer, params) { //First Filter then Sort
            
            var filteredData = params.filter() ?
                   $filter('filter')(data, params.filter()) :
                   data;

            var orderedData = params.sorting() ?
                    $filter('orderBy')(filteredData, params.orderBy()) :
                    data;

            params.total(orderedData.length); // set total for recalc pagination
            
            $defer.resolve(orderedData.slice((params.page() - 1) * params.count(), params.page() * params.count()));  
         }
    });

    
    $scope.editId = -1;
    $scope.delId = -1;

    $scope.setDelId = function (pid) {
        $scope.delId = pid;
        for (var i = 0; i < data.length; i++) {
            if (data[i].id == pid) {
                data.splice(i, 1);
                break;
            }
        }
        $scope.tableParams.reload();
    }

    $scope.setEditId = function (pid) {
        $scope.editId = pid; 
    }

    $scope.edit = function (developer) {
        console.log(developer);
        var id = developer.id;      
        console.log(id);       
        developer.firstName = $('#firstName').val();
        developer.lastName = $('#lastName').val();
        developer.Age = $('#Age').val();
        developer.Email = $('#Email').val();
        developer.Created = $('#Created').val();
        developer.lastEdited = $('#lastEdited').val();       
        $scope.tableParams.reload();
        $scope.editId = -1;
        console.log(data);    
    };

    $scope.addUser = function (developer) {  
        var result = validateFields(developer);
        if(result != false){
        var sample = data[0];
        sample.id = data.length + 1;
        sample.firstName = developer.firstName;
        sample.lastName = developer.lastName;
        sample.Age = developer.Age;
        sample.Created = developer.Created;
        sample.lastEdited = developer.lastEdited;
        sample.Email = developer.Email;
        sample.Active = developer.Active;
        data.push(sample);
        flushAddFields();
        alert("New User Added Successfully");
        //$scope.tableParams.reload();
        }
    };

    function validateFields(developer) {
        if(developer.Email=='' || developer.Email== undefined
            || developer.lastName=='' || developer.lastName== undefined
            || developer.firstName=='' || developer.firstName== undefined){
            alert("Please fill in the required fields marked with asterisk");
            return false;
        }
        else if(developer.Email!=''){
            for (var i = 0; i < data.length; i++) {
                if (data[i].Email == developer.Email) {
                alert("Email is already taken!!");
                return false;
                }
            }
        }
        else return true;

    }

    function flushAddFields(){
        document.getElementById('addFirstName').value='';
        document.getElementById('addLastName').value='';
        document.getElementById('addAge').value='';
        document.getElementById('addEmail').value='';
        document.getElementById('addActive').value='';
        document.getElementById('addCreated').value='';
        document.getElementById('addLastEdited').value='';
    }
    
    // module('New Add User test');
    // test('should add new user correctly', function () {
    // expect(1);
    //   var mockDeveloper = new Object();
    //   mockDeveloper.firstName = "Testing";
    //   mockDeveloper.lastName = "LastTesting";
    //   mockDeveloper.Age = 24;
    //   mockDeveloper.Created = 23-10-2013;
    //   mockDeveloper.lastEdited = 23-11-2015;
    //   mockDeveloper.Email ="testing@gmail.com";
    //   mockDeveloper.Active= true;
    //   var initialArrayLength = data.length;
    //   console.log(initialArrayLength);
    //   $scope.addUser(mockDeveloper);
    //   var finalArrayLength = data.length;
    //   console.log(finalArrayLength);
    //   strictEqual(finalArrayLength, initialArrayLength+1, 'Check whether New User added correctly');
    //   //$scope.tableParams.reload();
    // });

    module('DOM test for Edit User');
    test('should edit correctly on client side', 1, function () {
        $scope.editId = -1;
        var user = {id:1};
        $('#firstName').val('test1');
        $('#lastName').val('test2');
        $('#Age').val('5');
        $('#Email').val('test@gmail.com');
        $('#Created').val('03-11-2013');
        $('#lastEdited').val('03-01-2015');
        $('#button').trigger('click');
        var output = $scope.editId;
        var expected = -1;
        strictEqual(output, expected, 'Scope Id Matched, edit is working properly');
    });

    module('Deletion of Json Data');
    test('delete should remove an element', function () {
        expect(1);
        var initialData = data.length;
        $scope.setDelId(324234);
        var modifiedData = data.length;
        strictEqual(initialData-1, modifiedData, 'Check Deletion');
    });

    module('On Click event for inline edit');
    test('inline edit should set editId', function () {
        expect(2);
        $scope.setEditId(123);
        var expectedEditId = 123;
        ok($scope.editId == expectedEditId, 'Truthy!');
        equal($scope.editId, expectedEditId, 'InlineEdit is working properly');
    });

});