app
    .constant("gadgetsUrl", "http://localhost:63066/api/Gadget")
    .constant("catesUrl", "http://localhost:63066/api/Category")
    .constant("catesUrlsss", "http://localhost:63066/api/Gadget/")
    .controller("Ctrl", function ($scope, $http, gadgetsUrl, catesUrl,catesUrlsss) {
        $scope.lobbyid = 1;
        $scope.checkLobbyID = function (lobby) {
            //alert(lobby);
            return lobby.CategoryId == $scope.lobbyid;
        }
        $http.get(gadgetsUrl)
            .success(function (data) {
                $scope.data.gadgets = data;
            })
            .error(function (error) {
                $scope.data.error = error;
            });

        $http.get(catesUrl)
            .success(function(data) {
                $scope.data.cata = data;
            })
            .error(function(error) {
                }
            );

        $scope.sss = function (id) {
            //alert(id);
            //$scope.lobbyid = id;
            $http.get(gadgetsUrl+"/"+id)
                .success(function (data) {
                    $scope.data.gadgets = data;
                })
            .error(function (error) {
            }
            );
        }
        $scope.lobbies = [
            {
                "isglobal": true,
                "lobbyid": 1,
                "name": "GLOBAL"
            }, {
                "isglobal": false,
                "lobbyid": 2,
                "name": "stackoverflow rules"
            }, {
                "isglobal": false,
                "lobbyid": 3,
                "name": "sdadadad"
            }
        ];
    });