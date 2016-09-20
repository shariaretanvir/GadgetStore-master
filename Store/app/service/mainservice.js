

app.service("myservice", function($http) {
    this.getGadgetData = function(category) {
        return $http.get("http://localhost:63066/api/Gadget/" + category);
    }

    this.GetGadgetByPag = function (opt) {
        //debugger;
        return $http.get("http://localhost:63066/api/Gadget/" + "?currentPage=" + opt.currentPage + "&" + "recordsPerPage=" + opt.recordsPerPage + "&" + "category=" + opt.cate);
    }
})