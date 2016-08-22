(function () {
    'use strict';

    angular
        .module('app')
        .controller('ItunesSearchResultsCtrl', ItunesSearchResultsCtrl);

    ItunesSearchResultsCtrl.$inject = ['$filter', '$rootScope', '$state', 'items',
        '$ionicLoading', '$ionicPopup', '$ionicListDelegate'];

    function ItunesSearchResultsCtrl($filter, $rootScope, $state, items,
		$ionicLoading, $ionicPopup, $ionicListDelegate) {
        var vm = this;

        angular.extend(vm, {
            init: init,
            queryChanged: queryChanged,
            queryClear: queryClear,
            moviesDetails: moviesDetails,
            moviesSearch: moviesSearch
        });

        init();

        function init() {
			vm.movies = items;
            vm.moviesFilter = items;
            vm.clear = false;
        }

        function queryChanged() {
            if (vm.query != '') {
                vm.clear = true;
            }
        }

        function queryClear() {
            vm.query = '';
            vm.clear = false;
        }

        function moviesDetails(items) {
            var item = {
                plot: items.longDescription,
                name: items.trackName,
                year: $filter('date')(items.releaseDate, 'yyyy'),
                pic: items.artworkUrl100.replace('100x100bb.jpg', '500x500bb.jpg'),
                genre: items.primaryGenreName,
                country: items.country,
                director: items.artistName,
                actors: 'n/a',
                runtime: 'n/a',
                type: 'n/a',
                imdbID: 'n/a',
                imdbRating: items.contentAdvisoryRating
            };


            $state.go('root.movies-details', {item: item}, {reload: true});
        }


        function moviesSearch() {
            $state.go('root.movies-search', {}, {reload: true});
        }
    }
})();