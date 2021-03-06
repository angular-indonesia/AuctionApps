AuctionApp.service('auctionDataService',  function($http, $rootScope) {

  var urlServer = $rootScope.baseUrlApi;
  var online = navigator.onLine;
  this.getDetailAuction = function (callback, uniqueKey) {
    var url = urlServer + 'get-auction/' + uniqueKey;
    if ('caches' in window) {
      caches.match(url).then(function(response) {
        if (response) {
          response.json().then(function(json) {
            if (!online) {
              var results = json;
              callback(results);
            } else {
              $http.get( urlServer + 'get-auction/' + uniqueKey).then(function(response) {
                callback(response.data);
              });
            }
          });
        } else {
          $http.get( urlServer + 'get-auction/' + uniqueKey).then(function(response) {
            callback(response.data);
          });
        }
      });
    } else {
      $http.get( urlServer + 'get-auction/' + uniqueKey).then(function(response) {
        callback(response.data);
      });
    }
  }

});
