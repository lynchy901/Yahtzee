var yahtzee = angular.module('yahtzee', []);

yahtzee.controller('game_cntl', function($scope, $http) {
    $scope.die = [
        {"src":"images/none.png", "id": "0", "roll": "true"},
        {"src":"images/none.png", "id": "1", "roll": "true"},
        {"src":"images/none.png", "id": "2", "roll": "true"},
        {"src":"images/none.png", "id": "3", "roll": "true"},
        {"src":"images/none.png", "id": "4", "roll": "true"}
    ];
    $scope.score = 0;
    $scope.roll = 0;
    $scope.round = 0;

    $scope.rollDice = function() {

         if ($scope.roll >= 3 && $scope.round < 13) {
            $scope.roll = -1;
            $scope.round += 1;
             setScore();



        } else if ($scope.roll == 3 && $scope.round >= 12) {
             alert('Game Over! Your score is: ' + $scope.score);
            restart();
             $scope.deselectAll();

        } else {
             $http({
                 method: 'POST',
                 url: '/test',
                 dataType: "json",
                 data: $scope.die,
                 headers: {
                     "Content-Type": "application/json"
                 }
             }).then(function successCallback(response) {
                 //$scope.die = response;
                 for (var i = 0; i < response.data.length; i++) {
                     $scope.die[i].src = response.data[i].src;

                 }


             }, function errorCallback(response) {
                 // called asynchronously if an error occurs
                 // or server returns response with an error status.
             });
         }

    }

    $scope.toggleRoll = function(id) {
        if ($scope.die[id].roll === 'true') {
            $scope.die[id].roll = 'false';
            $('#' + id).css({'border': 'dotted yellow'});
        } else {
            $scope.die[id].roll = 'true';
            $('#' + id).css({'border': 'none'});
        }
    }

    $scope.deselectAll = function() {

        for (var i = 0; i < 5; i++) {
            $('#' + i).css({'border': 'none'});
        }
        for (var i = 0; i < $scope.die.length; i++) {
            $scope.die[i].roll = "true";
            $scope.die[i].src = "images/none.png";
            console.log($scope.die[i].src);
        }
        console.log($scope.die);
    }

    function restart() {
        $scope.score = 0;
        $scope.round = 0;
        $scope.roll = -1;
    }

    function setScore() {
    //<button type="button" class="btn btn-info btn-lg" data-toggle="modal" data-target="#myModal">Open Modal</button>
        var el = '<button id="ones" type="button" ng-click="deselectAll()" class="btn btn-default" data-dismiss="modal">Ones</button>';
        el += '<button id="twos" type="button" ng-click="deselectAll()" class="btn btn-default" data-dismiss="modal">Twos</button>';
        el +='<button id="threes" type="button" ng-click="deselectAll()" class="btn btn-default" data-dismiss="modal">Threes</button>';
        el +='<button id="fours" type="button" ng-click="deselectAll()" class="btn btn-default" data-dismiss="modal">Fours</button>';
        el +='<button id="fives" type="button" ng-click="deselectAll()" class="btn btn-default" data-dismiss="modal">Fives</button>';
        el +='<button id="sixes" type="button" ng-click="deselectAll()" class="btn btn-default" data-dismiss="modal">Sixes</button>';

        if (getScoringOpportunities().yahtzee($scope.die)) {
            console.log("yahtzee");
            el += '<button id="yahtzee" type="button" ng-click="deselectAll()" class="btn btn-default" data-dismiss="modal">Yahtzee</button>';
        }
        if (getScoringOpportunities().threeOfKind($scope.die)) {
            console.log("threeOfKind");
            el += '<button id="threeOfKind" type="button" ng-click="deselectAll()" class="btn btn-default" data-dismiss="modal">3 of a Kind</button>';
        }
        if (getScoringOpportunities().fourOfKind($scope.die)) {
            console.log("fourOfKind");
            el += '<button id="fourOfKind" type="button" ng-click="deselectAll()" class="btn btn-default" data-dismiss="modal">4 Of A Kind</button>';
        }
        if (getScoringOpportunities().smallStraight($scope.die)) {
            console.log("smallStraight");
            el += '<button id="smallStraight" type="button" ng-click="deselectAll()" class="btn btn-default" data-dismiss="modal">Small Stright</button>';
        }
        if (getScoringOpportunities().largeStraight($scope.die)) {
            console.log("largeStraight");
            el += '<button id="largeStraight" type="button" ng-click="deselectAll()" class="btn btn-default" data-dismiss="modal">Large Straight</button>';
        }
        document.getElementById("modalBody").innerHTML = el;
        $('#ones').click(function() {
            $scope.score += getScoringOpportunities().lowScore('1');
        });
        $('#twos').click(function() {
            $scope.$apply(function(){

                $scope.score += getScoringOpportunities().lowScore('2');

            });

        });
        $('#threes').click(function() {
            $scope.$apply(function(){

                $scope.score += getScoringOpportunities().lowScore('3');

            });
        });
        $('#fours').click(function() {
            $scope.$apply(function(){

                $scope.score += getScoringOpportunities().lowScore('4');

            });
        });
        $('#fives').click(function() {
            $scope.$apply(function(){

                $scope.score += getScoringOpportunities().lowScore('5');

            });
        });
        $('#sixes').click(function() {
            $scope.$apply(function(){

                $scope.score += getScoringOpportunities().lowScore('6');

            });
        });
        $('#yahtzee').click(function() {
            $scope.$apply(function(){

                $scope.score += getScoringOpportunities().yahtzee($scope.die);

            });
        });
        $('#threeOfKind').click(function() {
            $scope.$apply(function(){

                $scope.score += parseInt(getScoringOpportunities().threeOfKind($scope.die).score);

            });
        });
        $('#fourOfKind').click(function() {
            $scope.$apply(function(){

                $scope.score += getScoringOpportunities().fourOfKind($scope.die).score;

            });
        });
        $('#smallStraight').click(function() {
            $scope.$apply(function(){

                $scope.score += getScoringOpportunities().smallStraight($scope.die);

            });
        });
        $('#largeStraight').click(function() {
            $scope.$apply(function(){

                $scope.score += getScoringOpportunities().largeStraight($scope.die);

            });
            console.log($scope.score);
        });
        $('#myModal').modal({show: false});
        $('#myModal').modal('show');

        el = "";
    }

    function getScoringOpportunities() {
        return {
            yahtzee: function(dice) {
                if (dice[0].src == dice[1].src && dice[0].src == dice[2].src && dice[0].src == dice[3].src && dice[0].src == dice[4].src) {
                    return 50;
                } else {
                    return false;
                }
            },
            threeOfKind: function(dice) {
                var count = [0, 0, 0, 0, 0, 0];
                var score = 0;
                for (var i = 0; i < 5; i++) {
                    for (var y = 1; y < 7; y++ ) {
                        console.log(dice[i].src + " ---- " + y);
                        if (getNumber(dice[i].src) == y) {
                            count[y]++
                            console.log("count" + y + "++");
                        }
                    }
                }
                 for (var i = 0; i < count.length; i++) {
                     if (count[i] >= 3) {
                         for (var i = 0; i < dice.length; i++) {
                             score += parseInt(getNumber(dice[i].src));
                         }
                         return {"id": i, "score": score};
                     }
                 }
                return false;
            },
            fourOfKind: function(dice) {
                var count = [0, 0, 0, 0, 0, 0];
                var score = 0;
                for (var i = 0; i < 5; i++) {
                    for (var y = 1; y < 7; y++ ) {
                        if (getNumber(dice[i].src) == y) {
                            count[y]++;
                            console.log("count" + y + "++");
                        }
                    }
                }
                for (var i = 0; i < count.length; i++) {
                    console.log(count[i]);
                    if (count[i] >= 4) {
                        for (var i = 0; i < dice.length; i++) {
                            score += parseInt(getNumber(dice[i].src));
                        }
                        return {"id": i, "score": score};
                    }
                }
                return false;
            },
            smallStraight: function(dice) {
                var obj = {
                    one: false,
                    two: false,
                    three: false,
                    four: false,
                    five: false,
                    six: false
                };
                for (var i = 0; i < dice.length; i++) {
                    if (getNumber(dice[i].src) == "1") {
                        obj.one = true;
                    } else if (getNumber(dice[i].src) == "2") {
                        obj.two = true;
                    } else if (getNumber(dice[i].src) == "3") {
                        obj.three = true;
                    } else if (getNumber(dice[i].src) == "4") {
                        obj.four = true;
                    } else if (getNumber(dice[i].src) == "5") {
                        obj.five = true;
                    } else if (getNumber(dice[i].src) == "6") {
                        obj.six = true;
                    }
                }

                if ((obj.one && obj.two && obj.three && obj.four) || (obj.two && obj.three && obj.four && obj.five) || (obj.three && obj.four && obj.five && obj.six) ) {
                    return 30;
                } else {
                    return false;
                }
            },
            largeStraight: function(dice) {
                var obj = {
                    one: false,
                    two: false,
                    three: false,
                    four: false,
                    five: false,
                    six: false
                };
                for (var i = 0; i < dice.length; i++) {
                    if (getNumber(dice[i].src) == "1") {
                        obj.one = true;
                    } else if (getNumber(dice[i].src) == "2") {
                        obj.two = true;
                    } else if (getNumber(dice[i].src) == "3") {
                        obj.three = true;
                    } else if (getNumber(dice[i].src) == "4") {
                        obj.four = true;
                    } else if (getNumber(dice[i].src) == "5") {
                        obj.five = true;
                    } else if (getNumber(dice[i].src) == "6") {
                        obj.six = true;
                    }
                }


                if ((obj.one && obj.two && obj.three && obj.four && obj.five) || (obj.two && obj.three & obj.four && obj.five && obj.six)) {
                    return 40;
                } else {
                    return false;
                }
            },
            lowScore: function(dieNum) {
                var score = 0;
                for (var i = 0; i < $scope.die.length; i++) {
                    if (getNumber($scope.die[i].src) == dieNum) {
                        score += parseInt(getNumber($scope.die[i].src));
                    }
                }
                console.log(score);
                return score;
            }
        }
    }

    function getNumber(val) {
        return val.substring(7, 8);
    }

    $('#myModal').on('hidden.bs.modal', function () {
        $scope.$apply(function(){
            for (var i = 0; i < $scope.die.length; i++) {
                $scope.die[i].src = 'images/none.png';
                $('#' + $scope.die[i].id).css({'border': 'none'});
                $scope.die[i].roll = "true";
            }
        });
    });

});