
app.controller("gadgetctrl", function ($scope, myservice, $http) {
    
    $http.get("http://localhost:63066/api/Category")
            .success(function (data) {
                $scope.data.categories = data;
            })
            .error(function (error) {
                $scope.data.error = error;
            });

    //$scope.selectedcategory = 1;

    $scope.data = {};
    $scope.totalItems = 0;
    $scope.pagination = {
        currentPage: 1
    };
    //$scope.currentPage = 1;
    $scope.numberOfPageButtons = 5;
    $scope.recordsPerPage = 2;
    $scope.cate = 0;
    GetGadgetByPagging($scope, $scope.pagination, myservice, $scope.cate);
    $scope.pageChanged = function() {
        //alert($scope.pagination.currentPage);
        GetGadgetByPagging($scope, $scope.pagination, myservice, $scope.cate);
    }


    $scope.selectedcate = function(category) {
        $scope.pagination.currentPage = 1;
        $scope.cate = category;
        GetGadgetByPagging($scope, $scope.pagination, myservice, $scope.cate);
    }
})

var GetGadgetByPagging = function ($scope, pagination, myservice, cate) {
    var option = {};
    option.currentPage = pagination.currentPage;
    option.recordsPerPage = $scope.recordsPerPage;
    $scope.cate = cate;
    option.cate = $scope.cate;
    var GetGadged = myservice.GetGadgetByPag(option);

    GetGadged.then(function (res) {
        //debugger;
        $scope.data.gadgets = res.data.Gadgets;
        $scope.totalItems = res.data.TotalGadgets;
    }, function () {
        alert("unable to load data");
    })
}


