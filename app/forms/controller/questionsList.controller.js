'use strict';

angular
    .module('app.forms')
    .controller('ListOfQuestionsController', listOfQuestionsController);

/*
 * This controller do functionality to show the list of questions
 */

listOfQuestionsController.$inject = ['formsService', '$rootScope'];

function listOfQuestionsController(formsService, $rootScope) {

    var vm = this;
    vm.getListOfQuestions = getListOfQuestions;
    vm.lisOfQuestions = [];
    vm.selectedQuestion = {};
    vm.currentQuestionNumber = 0;


    //This is to get the list of questions
    function getListOfQuestions() {

        formsService.getListOfQuestions().then(function (data) {
            vm.lisOfQuestions = data.data;
            vm.selectedQuestion = vm.lisOfQuestions[vm.currentQuestionNumber];
        });
    }

    function bindEvents() {

        $rootScope.$on('changeQuestion', function () {
            vm.currentQuestionNumber = vm.currentQuestionNumber + 1;
            if (vm.currentQuestionNumber < vm.lisOfQuestions.length) {
                vm.selectedQuestion = vm.lisOfQuestions[vm.currentQuestionNumber];
            } else {
                $rootScope.$emit('showResult');
            }
        });
    }

    function activate() {
        vm.isNameEntered = false;
        bindEvents();
        getListOfQuestions();
    }

    activate();
}