(function () {
    'use strict';

    angular
        .module('app')
        .config(routeConfig);

    routeConfig.$inject = ['$stateProvider', '$urlRouterProvider'];

    function routeConfig($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('root', {
                url: '/root',
                abstract: true,
                templateUrl: 'app/root.html'
            })

            .state('root.home', {
                url: '/home',
                data: {
                    requireLogin: true
                },
                views: {
                    'root-home': {
                        templateUrl: 'app/home.html'
                    }
                }
            })
			
            .state('root.movies', {
                url: '/movies',
                data: {
                    requireLogin: true
                },
                views: {
                    'root-movies': {
                        templateUrl: 'movies/movies.html',
                        controller: 'MoviesCtrl',
                        controllerAs: 'moviesCtrl'
                    }
                }
            })
			
			.state('root.movies-details', {
                url: '/movies-details',
                data: {
                    requireLogin: true
                },
                params: {item: {}},
                views: {
                    'root-movies': {
                        templateUrl: 'movies/movies-details.html',
                        controller: 'MoviesDetailsCtrl',
                        controllerAs: 'moviesDetailsCtrl'
                    }
                }
            })
			
            .state('root.movies-search', {
                url: '/movies-search',
                data: {
                    requireLogin: true
                },
                views: {
                    'root-movies': {
                        templateUrl: 'movies/movies-search.html',
                        controller: 'MoviesSearchCtrl',
                        controllerAs: 'moviesSearchCtrl'
                    }
                }
            })
			
            .state('root.movies-search-results', {
                url: '/movies-search-results?name?search',
				data: {
                    requireLogin: true
                },
				views: {
                    'root-movies': {
						templateUrl: 'movies/movies-search-results.html',
						controller: 'MoviesSearchResultsCtrl',
						controllerAs: 'moviesResultsCtrl'
					}
				},
                resolve: {
                    items: ['$http', '$stateParams', '$rootScope', '$ionicLoading',
                        function ($http, $stateParams, $rootScope, $ionicLoading) {
                            var webUrl;
                            var name = $stateParams.name;
                            var type = $stateParams.search;
							
                            if (type == 'title') {
                                webUrl = 'http://www.omdbapi.com/?t=';
                            } else {
                                webUrl = 'http://www.omdbapi.com/?i=';
                            }
                            return $http.get(webUrl + name + '&plot=full')
                                .then(function (data) {
									$ionicLoading.hide();
                                    return data.data;
                                })
                                .catch(function () {
									$rootScope.raisedError = true;
									$ionicLoading.hide();
                                    return [];
                                });
                        }]
                }
            })
	
        $urlRouterProvider.otherwise('root.home');
    }

})
();