var app = angular.module("myapp", []);
app.controller('AppCtrl', function ($scope, $http){
  console.log("controller start");

    var refresh = function () {
      $http.get('/api/products').success(function (response) {
        console.log("data put in");
        $scope.bookList = response;
      });
    };

    refresh();

    $scope.delete = function (id) {
      $http.delete('/api/products/'+id).success(function (response) {
          console.log("delete "+ id);
          refresh();
      });
    };

    $scope.add = function(){
      $http.post('/api/products', $scope.p).success(function(response) {
        console.log(response);
        $scope.id = "";
        refresh();
        $scope.p ="";
      });
    };

    $scope.edit = function (id) {
      console.log("edit " +id);
      $http.get('/api/products/'+id).success(function(response){
          $scope.p = response;
          $scope.id = id;
        });
      };
      
    $scope.update = function (id) {
      console.log("update "+id);
      $http.put('/api/products/' +id, $scope.p).success(function(response)
        { 
          refresh();
          $scope.id = "";
          $scope.p ="";
        });
       };
});
