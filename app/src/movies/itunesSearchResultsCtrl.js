(function () {
    'use strict';

    angular
        .module('app')
        .controller('ItunesSearchResultsCtrl', ItunesSearchResultsCtrl);

    ItunesSearchResultsCtrl.$inject = ['$scope', '$rootScope', '$state', 'items',
        '$ionicLoading', '$ionicPopup', '$ionicListDelegate'];

    function ItunesSearchResultsCtrl($scope, $rootScope, $state, items,
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

        function moviesDetails(item) {
            $state.go('root.movies-details', {item: item}, {reload: true});
        }


        function moviesSearch() {
            $state.go('root.movies-search', {}, {reload: true});
        }
    }
})();