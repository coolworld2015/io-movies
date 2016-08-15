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
            toggleChanged: toggleChanged,
            doSearch: doSearch
        });

        init();

        function init() {
            vm.finds = true;
            vm.search = 'title';
        }

        function change() {
            vm.error = false;
            vm.minLengthError = false;
        }

        function toggleChanged() {
            if (vm.finds) {
                vm.search = 'title';
            } else {
				vm.search = 'IMDB-ID';
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
            $state.go('root.movies-search-results', {name: vm.name, search: vm.search, finds: true});
        }
    }
})();