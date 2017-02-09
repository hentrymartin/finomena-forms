'use strict';

angular
    .module('app.forms')
    .directive('formWidget', formWidget)
    .directive('listQuestions', listQuestions)
    .directive('selectedQuestion', selectedQuestion)
    .directive('resultGraph', resultGraph);

/*
* This directive is used to create the pie chart to show the section of correct vs wrong data
 */

resultGraph.$inject = ['formsService'];

function resultGraph(formsService) {
    var directive = {
        restrict : 'E',
        replace : true,
        link : link,
        templateUrl : 'app/forms/view/resultGraph.html'
    };

    return directive;

    function link(scope, elem, attr) {
        
        function getNumberOfCorrectAnswers(data) {

            var result = [], counter = 0;
            for (var index = 0; index < data.length; index++) {
                var item = data[index];
                if (item.selectedOption.id == item.correctOption) {
                    counter = counter + 1;
                }
            }

            result = result.concat([counter, data.length - counter]);

            return result;
        }
        
        function getGraphData() {

            var data = formsService.answeredQuestions;
            var options = {
                labels : ['No. of correct answers', 'No. of wrong answers'],
                datasets: [
                    {
                        data: getNumberOfCorrectAnswers(data),
                        backgroundColor: [
                            "#098609",
                            "#ef4242"
                        ],
                        hoverBackgroundColor: [
                            "#098609",
                            "#ef4242"
                        ]
                    }]
            }

            return options;
        }

        function activate() {
            var graphData = getGraphData();
            var context = $(elem).find('#pie-graph')[0].getContext('2d');
            // For a pie chart
            var myPieChart = new Chart(context,{
                type: 'pie',
                data: graphData,
                options: {
                    animation : {
                        animateRotate : true
                    }
                }
            });
        }

        activate();
    }
}

/*
 * This directive is for choosing the option in any question. It basically add the ripple effects in the options
 */

selectedQuestion.$inject = ['$rootScope', '$timeout', 'formsService'];

function selectedQuestion($rootScope, $timeout, formsService) {

    var directive = {
        restrict : 'AE',
        replace : true,
        scope : {
            question : '='
        },
        link : link,
        templateUrl : 'app/forms/view/selectedQuestion.html'
    };

    return directive;

    function link(scope, elem, attr) {

        scope.selectThisOption = selectThisOption;
        scope.currentQuestion = {};

        //This makes the selection of option also adds the ripple bubble ob click
        function selectThisOption(option, event) {

            var selectedDom = $('.choice-' + option.id),
                bubble = '<div class="bubble"></div>';
            selectedDom.append($(bubble));
            $('.bubble').css({
                top : event.offsetY + 'px',
                left : event.offsetX + 'px',
                position : 'absolute',
                transform : 'scale3d(3, 3, 3)',
                height : selectedDom.outerWidth(),
                width : selectedDom.outerWidth()
            });

            formsService.answeredQuestions.push($.extend(scope.currentQuestion, {selectedOption : option}));
            console.log(formsService.answeredQuestions);
            
            $timeout(function () {
                $rootScope.$emit('changeQuestion');
            }, 2000);

        }

        function makeNumberColumnEqualHeight() {
            var column = $(elem).find('.question-number');
            console.log(column);
            column.height($(elem).find('.item').outerHeight()).css({'line-height' : $(elem).find('.item').outerHeight() + 'px'});
        }

        scope.$watch('question', function (newVal, oldVal) {
            if (oldVal == newVal) return;
            scope.currentQuestion = newVal;
            $timeout(function () {
                makeNumberColumnEqualHeight();
            });

        });
    }
}

/*
 * This directive covers the whole form as one directive, the logics for this directive is handled in FormsController
 */

formWidget.$inject = [];

function formWidget() {

    var directive = {
        restrict : 'AE',
        link : link,
        replace : true,
        templateUrl : 'app/forms/view/formWidget.html',
        controller : 'FormsController',
        controllerAs : 'vm'
    };

    return directive;

    function link(scope, elem, attr) {
    }
}

/*
 * This directive covers the question lists functionality which include moving to next question, getting the list of all questions
 *
 */

listQuestions.$inject = [];

function listQuestions() {

    var directive = {
        restrict : 'AE',
        link : link,
        replace : true,
        templateUrl : 'app/forms/view/listQuestions.html',
        controller : 'ListOfQuestionsController',
        controllerAs : 'vm'
    };

    return directive;
    
    function link(scope, elem, attr) {
        
        function activate() {
            
        }

        activate();
    }
}

