

app.constant("gadgetsUrl", "http://localhost:63066/api/Gadget")
    .constant("categoryUrl", "http://localhost:63066/api/Category")
    .constant("orderUrl", "http://localhost:63066/api/Order")
    .controller("mainCtrl", function ($scope, cart) {
        $scope.addProductToCart = function (product) {
            debugger;
            cart.addproduct(product.GadgetId, product.Name, product.Price, product.CategoryId);
        }
    })

