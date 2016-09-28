var cartapp = angular.module("cartApp", []);

var cartdata = [];
debugger;
cartapp.service("cart", function () {
    this.addproduct = function (id, name, price, category) {
        var addedtoexistingItems = false;

        for (var i = 0; i < cartdata.length; i++) {
            if (cartdata[i].GadgetId == id) {
                cartdata[i].count++;
                addedtoexistingItems = true;
                break;
            }
        }

        if (!addedtoexistingItems) {
            cartdata.push({
                count: 1,
                GadgetId: id,
                Name: name,
                Price: price,
                Category: category
            });
        }
    };

    this.removeProduct = function (id) {
        for (var i = 0; i < cartdata.length; i++) {
            if (cartdata[i].GadgetId == id) {
                cartdata.splice(i, 1);
                break;
            }
        }
    };


    this.getProducts = function () {
        return cartdata;
    }
});


cartapp.directive("cartDetails", function (cart) {
    return {
        restrict: "E",
        templateUrl: "app/component/cartdetails.html",
        controller: function ($scope) {
            var vartData = cart.getProducts();

            $scope.total = function () {
                var total = 0;

                for (var i = 0; i < vartData.length; i++) {
                    total += (vartData[i].Price * vartData[i].count);
                }
                return total;
            }

            $scope.itemCount = function () {
                var total = 0;

                for (var i = 0; i < vartData.length; i++) {
                    total += vartData[i].count;
                }
                return total;
            }
        }
    }
});