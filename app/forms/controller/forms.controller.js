'use strict';

angular
    .module('app.forms')
    .controller('FormsController', FormsController);

/*
 * This controller do functionality to show the list of questions(which comes under the child controller(List Controller)) and the final result of it
 */

FormsController.$inject = ['$rootScope', 'formsService'];

function FormsController($rootScope, formsService) {

    //Variable declarations
    var vm = this;
    vm.proceedNext = proceedNext;
    vm.isNameEntered = false;
    vm.showResult = false;
    vm.userName = '';

    function proceedNext() {
        if (!vm.userName) return;
        vm.isNameEntered = true;
    }
    
    function getCorrectAnswer(options, correctAnswerId) {

        var correctAnswer = '';
        for (var index = 0; index < options.length; index++) {
            var option = options[index];

            if (option.id == correctAnswerId) {
                correctAnswer = option.option;
                break;
            }
        }

        return correctAnswer;
    }

    function prepareResults(result) {

        for (var index = 0; index < result.length; index++) {

            var item = result[index];
            item.selectedAnswer = item.selectedOption.option;
            item.correctAnswer = getCorrectAnswer(item.choices, item.correctOption);
            if (item.selectedOption.id == item.correctOption) {
                item.isAnswerRight = true;
            }
        }
    }
    
    function bindEvents() {
        $rootScope.$on('showResult', function () {
            vm.showResult = true;
            vm.result = formsService.answeredQuestions;
            prepareResults(vm.result);
        });
    }
    
    function activate() {
        bindEvents();
    }

    activate();
}