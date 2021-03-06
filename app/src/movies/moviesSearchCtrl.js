(function () {
    'use strict';

    angular
        .module('app')
        .controller('MoviesSearchCtrl', MoviesSearchCtrl);

    MoviesSearchCtrl.$inject = ['$state', '$ionicLoading'];

    function MoviesSearchCtrl($state, $ionicLoading) {
        var vm = this;

        angular.extend(vm, {
            init: init,
            change: change,
            toggleTypeChanged: toggleTypeChanged,
            toggleChanged: toggleChanged,
            doSearch: doSearch
        });

        init();

        function init() {
            vm.finds = true;
            vm.findsType = true;
            vm.search = 'title';
            vm.searchType = 'iTunes';
        }

        function change() {
            vm.error = false;
            vm.minLengthError = false;
        }

        function toggleTypeChanged() {
            if (vm.findsType) {
                vm.searchType = 'iTunes';
            } else {
                vm.searchType = 'IMDB';
            }
        }

        function toggleChanged() {
            if (vm.searchType == 'IMDB') {
                if (vm.finds) {
                    vm.search = 'title';
                } else {
                    vm.search = 'IMDB-ID';
                }
            }
        }

        function doSearch() {
            if (vm.form.$invalid) {
                return;
            }

            if (vm.name.length < 3) {
                vm.minLengthError = true;
                return;
            }

            $ionicLoading.show({
                template: '<ion-spinner></ion-spinner>'
            });
            if (vm.searchType == 'IMDB') {
                $state.go('root.movies-search-results', {name: vm.name, search: vm.search, finds: true}, {reload: true});
            } else {
                $state.go('root.itunes-search-results', {name: vm.name}, {reload: true});
            }
        }
    }
})();