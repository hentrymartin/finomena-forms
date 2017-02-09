'use strict';

angular
    .module('app.forms')
    .factory('formsService', formsService);

formsService.$inject = ['$http'];

function formsService($http) {

    var service = {
        'getListOfQuestions' : getListOfQuestions,
        'answeredQuestions' : []
    };

    return service;
    
    function getListOfQuestions() {
        return $http.get('assets/data/questions.json');
    }
}