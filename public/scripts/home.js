angular.module('caceMusic', ['ngRoute'])

.run(['$rootScope', '$location', function ($rootScope, $location) {
    
    $rootScope.$on('$routeChangeStart', function (event, next, current) {

    	if (next.$$route.controller == "")
    	{
    		$location.path("/");	
    	}
        
    });
}])

.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/', {
			controller: 'artistsCtrl',
			templateUrl: '/views/ArtistMenu.html'
		});

	$routeProvider.when('/SavageNomads', {
			controller: 'SavageNomadsCtrl',
			templateUrl: '/views/SavageNomads.html'
		});

	$routeProvider.when('/MSet', {
			controller: 'MSetCtrl',
			templateUrl: '/views/MSet.html'
		});
}]) 

.controller('artistsCtrl', ['$scope', '$location', function($scope, $location) {
	
	function Artist(artistName, imageUrl) {
		this.name = artistName,
		this.imageUrl = imageUrl
	};

	$scope.artists = [
		new Artist("SavageNomads", "images/SavageNomads.png"),
		new Artist("MSet", "images/MSet.png"),
		new Artist("", "images/comingsoon.png")
	];

	$scope.switchImage = function(artist) {
		if (artist.name != "" && artist.imageUrl.indexOf("_Rollover") == -1)
		{
			artist.imageUrl = artist.imageUrl.split(".")[0];
			artist.imageUrl += "_Rollover.png";	
		}
	};

	$scope.switchImageBack = function(artist) {
		if (artist.name != "" && artist.imageUrl.indexOf("_Rollover") > -1)
		{
			artist.imageUrl = artist.imageUrl.split("_")[0];
			artist.imageUrl += ".png";	
		}
	};
	
	$scope.artistClick = function(artist) {
		if (artist.name != "")
		{
			var artistLocation = "/" + artist.name;
			$location.path(artistLocation);
		}
	};	
}])

.controller('SavageNomadsCtrl', ['$scope', '$location', function($scope, $location) {
	
}])

.controller('MSetCtrl', ['$scope', '$location', function($scope, $location) {
	
 }]);