'use strict';

angular
    .module('app')
    .config(config);

function config($stateProvider, $urlRouterProvider) {

    //
    // For any unmatched url, redirect to /state1
    $urlRouterProvider.otherwise("/forms");
    //
    // Now set up the states
    $stateProvider
        .state('forms', {
            url: "/forms",
            templateUrl: "app/forms/view/forms.html"
        });
}
