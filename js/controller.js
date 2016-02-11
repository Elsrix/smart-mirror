(function(angular) {
    'use strict';

    function MirrorCtrl(AnnyangService, GeolocationService, WeatherService, MapService, HueService, CalendarService, $scope, $timeout, $interval) {
        var _this = this;
        var DEFAULT_COMMAND_TEXT = 'Says "Mirror" to see all commands';
		
		
		$scope.listening = false;
        $scope.debug = false;
        $scope.focus = "default";
        $scope.user = {};
        $scope.interimResult = DEFAULT_COMMAND_TEXT;

        $scope.colors=["#6ed3cf", "#9068be", "#e1e8f0", "#e62739"];

        //Update the time
        function updateTime(){
            $scope.date = new Date();
        }
		
		//Greeting based on the time of the day
		function getGreeting(hour){
			if (hour < 12) $scope.greeting = 'Good morning';
			else if (hour >= 12 && hour <= 17) $scope.greeting = 'Good afternoon';
			else if (hour > 17 && hour <= 24) $scope.greeting = 'Good evening';
			
			if ($scope.user.name != null) $scope.greeting += ', ' + $scope.user.name;
		}


        // Reset the command text
        var restCommand = function(){
          $scope.interimResult = DEFAULT_COMMAND_TEXT;
        }

        _this.init = function() {
            var tick = $interval(updateTime, 1000);
            updateTime();
			getGreeting($scope.date.getHours());
			
            $scope.map = MapService.generateMap("Seattle,WA");
            _this.clearResults();
            restCommand();

            // var refreshMirrorData = function() {
            //     //Get our location and then get the weather for our location
            //     GeolocationService.getLocation({enableHighAccuracy: true}).then(function(geoposition){
            //         console.log("Geoposition", geoposition);
            //         WeatherService.init(geoposition).then(function(){
            //             $scope.currentForcast = WeatherService.currentForcast();
            //             $scope.weeklyForcast = WeatherService.weeklyForcast();
            //             console.log("Current", $scope.currentForcast);
            //             console.log("Weekly", $scope.weeklyForcast);
            //         });
            //     });
            //
            //     var promise = CalendarService.renderAppointments();
            //     promise.then(function(response) {
            //         $scope.calendar = CalendarService.getFutureEvents();
            //     }, function(error) {
            //         console.log(error);
            //     });
            // };

            // $timeout(refreshMirrorData(), 3600000);

            //Initiate Hue communication
            //HueService.init();

            var defaultView = function() {
                console.debug("Ok, going to default view...");
                $scope.focus = "default";
            }

            // List commands
            AnnyangService.addCommand('Mirror', function() {
                console.debug("Here is a list of commands...");
                console.log(AnnyangService.commands);
                $scope.focus = "commands";
				//DEFAULT_COMMAND_TEXT = 'Says your "command" when you see the bars moving';
            });

            // Go back to default view
            AnnyangService.addCommand('Go home', defaultView);

            // Hide everything and "sleep"
            AnnyangService.addCommand('Go to sleep', function() {
                console.debug("Ok, going to sleep...");
                $scope.focus = "sleep";
            });

            // Go back to default view
            AnnyangService.addCommand('Exit', defaultView);

            // Hide everything and "sleep"
            AnnyangService.addCommand('debug information', function() {
                console.debug("Boop Boop. Showing debug info...");
                $scope.debug = true;
            });

            // Hide everything and "sleep"
            AnnyangService.addCommand('Show map', function() {
                console.debug("Going on an adventure?");
                $scope.focus = "map";
            });

            // Hide everything and "sleep"
            AnnyangService.addCommand('Show (me a) map of *location', function(location) {
                console.debug("Getting map of", location);
                $scope.map = MapService.generateMap(location);
                $scope.focus = "map";
            });

            // Zoom in map
            AnnyangService.addCommand('(map) zoom in', function() {
                console.debug("Zoooooooom!!!");
                $scope.map = MapService.zoomIn();
            });

            AnnyangService.addCommand('(map) zoom out', function() {
                console.debug("Moooooooooz!!!");
                $scope.map = MapService.zoomOut();
            });

            AnnyangService.addCommand('(map) zoom (to) *value', function(value) {
                console.debug("Moooop!!!", value);
                $scope.map = MapService.zoomTo(value);
            });

            AnnyangService.addCommand('(map) reset zoom', function() {
                console.debug("Zoooommmmmzzz00000!!!");
                $scope.map = MapService.reset();
                $scope.focus = "map";
            });

            // Search images
            AnnyangService.addCommand('Show me *term', function(term) {
                console.debug("Showing", term);
            });

            // Change name
            AnnyangService.addCommand('My (name is)(name\'s) *name', function(name) {
                console.debug("Hi", name, "nice to meet you");
                $scope.user.name = name;
				getGreeting($scope.date.getHours());
            });


            // Clear log of commands
            AnnyangService.addCommand('Clear results', function(task) {
                 console.debug("Clearing results");
                 _this.clearResults()
            });

            // Check the time
            AnnyangService.addCommand('what time is it', function(task) {
                 console.debug("It is", moment().format('h:mm:ss a'));
                 _this.clearResults();
            });

            // Turn lights off
            // AnnyangService.addCommand('(turn) (the) :state (the) light(s) *action', function(state, action) {
            //     HueService.performUpdate(state + " " + action);
            // });

            // Fallback for all commands
            AnnyangService.addCommand('*allSpeech', function(allSpeech) {
                console.debug(allSpeech);
                _this.addResult(allSpeech);
            });

            var resetCommandTimeout;
            //Track when the Annyang is listening to us
            AnnyangService.start(function(listening){
                $scope.listening = listening;
				console.debug("listening");
            }, function(interimResult){
                $scope.interimResult = interimResult;
                $timeout.cancel(resetCommandTimeout);
            }, function(result){
                $scope.interimResult = result[0];
                resetCommandTimeout = $timeout(restCommand, 3000);
            });
        };

        _this.addResult = function(result) {
            _this.results.push({
                content: result,
                date: new Date()
            });
        };

        _this.clearResults = function() {
            _this.results = [];
        };

        _this.init();
    }

    angular.module('SmartMirror')
        .controller('MirrorCtrl', MirrorCtrl);

}(window.angular));
