var app = angular.module("app", ["ionic"]);

app.service("GameService", ["$http", "$log", GameService]);
app.controller("MovieInfoCtrl", ["$scope", "$log", "GameService", MovieInfoCtrl]);
app.filter('reverse', function() {
	return function(items) {
		return items.slice().reverse();
	};
});

function MovieInfoCtrl($scope, $log, GameService) {
	$scope.movies = [];
	$scope.searchForMovie = function () {
		var movie_input = $('.search-box').val();
		$log.info(movie_input);
		GameService.getMovieTitles($scope, movie_input, "t");
	}

	$scope.randomMovie = function () {
		var randomDigit = Math.random();
		var testNumber = randomDigit.toString();
		randomDigit = testNumber.slice(2);
		if(randomDigit.length > 7) {
			var finalNumber = randomDigit.substring(0,7);
			finalNumber = "tt" + finalNumber;
			$log.info(finalNumber);
		}
		else {
	
		}
		
		GameService.getMovieTitles($scope, finalNumber, "i")
	}
}

function GameService($http, $log) {
	this.getMovieTitles = function ($scope, searchItem, queryParameter) {
		$http({
			url: 'https://www.omdbapi.com/?' + queryParameter + '=' + searchItem + '&type=movie',
			method: 'GET'
		}).then(function (response) {
			if (!response.data.Error) {
				$scope.movies.push(response.data);
				$log.info({title: response.data.Title, imdbId: response.data.imdbID, obj: $scope.movies});
			}
			else {
				alert("That movie doesn't exist. Try again");
				$log.info(response.data);
			}
			
		}, function (error) {
			$log.info(error);
		});
	};
}