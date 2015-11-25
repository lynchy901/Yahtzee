var yahtzee = angular.module('yahtzee', []);

yahtzee.controller('game_cntl', function($scope, $http) {
    $scope.die = [
        {"src":"images/1.png", "id": "0", "roll": "false"},
        {"src":"images/1.png", "id": "1", "roll": "false"},
        {"src":"images/1.png", "id": "2", "roll": "false"},
        {"src":"images/1.png", "id": "3", "roll": "false"},
        {"src":"images/1.png", "id": "4", "roll": "false"}
    ];

    $scope.rollDice = function(test) {
        var scope = test;

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
            $('#' + id).css({'border': 'none'});
        } else {
            $scope.die[id].roll = 'true';
            $('#' + id).css({'border': 'dotted yellow'});
        }
        console.log($scope.die[id].roll);
    }

    $scope.deselectAll = function() {
        for (var i = 0; i < 5; i++) {
            $('#' + i).css({'border': 'none'});
        }
    }

});