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
        if ($scope.roll == 2 && $scope.round < 13) {
            $scope.roll = -1;
            $scope.round += 1;
            $scope.deselectAll();
            setScore();

        } else if ($scope.roll == 3 && $scope.round >= 12) {
            restart();
        }

        console.log();
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
            console.log(response.data);
            for (var i = 0; i < response.data.length; i++) {
                $scope.die[i].src = response.data[i].src;
                $scope.die[i].roll = response.data[i].roll;
            }

            console.log($scope.die);

        }, function errorCallback(response) {
            // called asynchronously if an error occurs
            // or server returns response with an error status.
        });
    }

    $scope.toggleRoll = function(id) {
        console.log(id);
        console.log($scope.die[id].roll);
        if ($scope.die[id].roll === 'true') {
            $scope.die[id].roll = 'false';
            $('#' + id).css({'border': 'dotted yellow'});
        } else {
            $scope.die[id].roll = 'true';
            $('#' + id).css({'border': 'none'});
        }
        console.log($scope.die[id].roll);
    }

    $scope.deselectAll = function() {
        for (var i = 0; i < 5; i++) {
            $('#' + i).css({'border': 'none'});
        }

        for (var i = 0; i < $scope.die.length; i++) {
            $scope.die[i].roll = "true";
        }
    }

    function restart() {
        $scope.score = 0;
        $scope.round = 0;
        $scope.roll = -1;
    }

    function setScore() {
        for (var i = 0; i < $scope.die.length; i++) {
            var score = $scope.die[i].src.substring(7, 8);
            console.log(score);
            $scope.score += parseInt(score);
        }
    }
});