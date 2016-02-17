(function(angular) {
    'use strict';

    function MirrorCtrl(AnnyangService, WeatherService, $scope, $timeout, $interval, $location) {
        var _this = this;
		var DEFAULT_COMMAND_TEXT = 'Says "Mirror" to see all commands';
		
		
		$scope.listening = false;
        $scope.debug = false;
        $scope.focus = "default";
        $scope.user = {};
        $scope.interimResult = DEFAULT_COMMAND_TEXT;

        //$scope.colors=["#6ed3cf", "#9068be", "#e1e8f0", "#e62739"];


		/** HOME functions **/
        // Update the time
        function updateTime(){
            $scope.date = new Date();
			getGreeting($scope.date.getHours());
        }
		
		//Greeting based on the time of the day
		function getGreeting(hour){
			if (hour < 12) $scope.greeting = 'Good morning';
			else if (hour >= 12 && hour <= 17) $scope.greeting = 'Good afternoon';
			else if (hour > 17 && hour <= 24) $scope.greeting = 'Good evening';
			
			if ($scope.user.name != null) $scope.greeting += ', ' + $scope.user.name;
		}

		/*
		* Navigate the html pages.
		*/
		function navigatePage(url){
			if (url == "home") $location.path("/");
			else if (url == "weather") $location.path("/"+url);
			else if (url == null) $location.path("/");
		}
		/***** End of Home Page functions ******/
		
		
		
		
		
		
		

        // Reset the command text
        var restCommand = function(){
          $scope.finalResult = DEFAULT_COMMAND_TEXT;
		  $scope.interimResult = '';
        }
		
        var defaultView = function() {
            $scope.focus = "default";
			navigatePage("home");
        }

        _this.init = function() {
            var tick = $interval(updateTime, 1000);
            updateTime();
			fetchWeather("Singapore");

            _this.clearResults();
            restCommand();

            // List commands
			AnnyangService.addCommand('Mirror (*args)', function(args) {
				if (args == undefined) $scope.finalResult = "Mirror";
				$scope.focus = "commands";
			});
			
			AnnyangService.addCommand('Go home', defaultView);
			AnnyangService.addCommand('Exit', defaultView);
            AnnyangService.addCommand('My (name is)(name\'s) *name', function(name) {
                $scope.focus = "default";
                $scope.user.name = name;
				getGreeting($scope.date.getHours());
            });
            AnnyangService.addCommand('weather', function() {
				$scope.focus = "default";
				fetchWeather("Singapore");
                navigatePage("weather");
            });
            AnnyangService.addCommand('weather (in)(at) *city', function(cityName) {
				fetchWeather(cityName);
                navigatePage("weather");
            });

			
			
            // AnnyangService.addCommand('Mirror', function() {
            //     console.debug("Here is a list of commands...");
            //     console.log(AnnyangService.commands);
            //     $scope.focus = "commands";
            // });

            // Go back to default view
            

            // Hide everything and "sleep"
            // AnnyangService.addCommand('Go to sleep', function() {
            //     console.debug("Ok, going to sleep...");
            //     $scope.focus = "sleep";
            // });
			
            // Change name
            
			
			
			// I want weather
            

            // Hide everything and "sleep"
            // AnnyangService.addCommand('debug information', function() {
            //     console.debug("Boop Boop. Showing debug info...");
            //     $scope.debug = true;
            // });

            // Hide everything and "sleep"
            // AnnyangService.addCommand('Show map', function() {
            //     console.debug("Going on an adventure?");
            //     $scope.focus = "map";
            // });

            // Hide everything and "sleep"
            // AnnyangService.addCommand('Show (me a) map of *location', function(location) {
            //     console.debug("Getting map of", location);
            //     $scope.map = MapService.generateMap(location);
            //     $scope.focus = "map";
            // });

            // Zoom in map
            // AnnyangService.addCommand('(map) zoom in', function() {
            //     console.debug("Zoooooooom!!!");
            //     $scope.map = MapService.zoomIn();
            // });

            // AnnyangService.addCommand('(map) zoom out', function() {
            //     console.debug("Moooooooooz!!!");
            //     $scope.map = MapService.zoomOut();
            // });

            // AnnyangService.addCommand('(map) zoom (to) *value', function(value) {
            //     console.debug("Moooop!!!", value);
            //     //$scope.map = MapService.zoomTo(value);
            // });

            // AnnyangService.addCommand('(map) reset zoom', function() {
            //     console.debug("Zoooommmmmzzz00000!!!");
            //     $scope.map = MapService.reset();
            //     $scope.focus = "map";
            // });

            // Search images
            // AnnyangService.addCommand('Show me *term', function(term) {
            //     console.debug("Showing", term);
            // });

            


            // Clear log of commands
            // AnnyangService.addCommand('Clear results', function(task) {
            //      console.debug("Clearing results");
            //      _this.clearResults()
            // });

            // Check the time
            // AnnyangService.addCommand('what time is it', function(task) {
           //       console.debug("It is", moment().format('h:mm:ss a'));
           //       _this.clearResults();
           //  });


            // Fallback for all commands
            // AnnyangService.addCommand('*allSpeech', function(allSpeech) {
            //     console.debug(allSpeech);
            //     _this.addResult(allSpeech);
            // });
			

            var resetCommandTimeout;
            //Track when the Annyang is listening to us
            AnnyangService.start(
			function(listening){
                $scope.listening = listening;
            }, 
			function(interimResult){
				$scope.isTalking = true;

				$scope.interimResult = interimResult;
				$scope.finalResult = ''; 
				
				// var res = interimResult.split(" ");
				// $scope.interimResult = res[res.length-1];
				// $scope.finalResult = interimResult.replace($scope.interimResult,'');
				
				// console.debug("interimResult: " + interimResult);
				// console.debug("controller interimResult:" + $scope.interimResult);
				// console.debug("controller finalResult:" + $scope.finalResult);
                $timeout.cancel(resetCommandTimeout);
				
            }, 
			function(result){
				$scope.isTalking = false;
				$scope.finalResult = result[0];
				$scope.interimResult = '';
                resetCommandTimeout = $timeout(restCommand, 5000);
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
		
		
		
		/** WEATHER functions **/
		
		function fetchWeather(cityName) {
  	    	WeatherService.getWeather(cityName).then(function(data){
  	      		$scope.place = data;
				$scope.todayWeatherIcon = WeatherService.setWeatherIcon(data.item.condition.code);
				$scope.day1Icon = WeatherService.setWeatherIcon(data.item.forecast[1].code);
				$scope.day2Icon = WeatherService.setWeatherIcon(data.item.forecast[2].code);
				$scope.day3Icon = WeatherService.setWeatherIcon(data.item.forecast[3].code);
				$scope.day4Icon = WeatherService.setWeatherIcon(data.item.forecast[4].code);
  	    	});
		}
		
		/** End of WEATHER functions **/
    }

    angular.module('SmartMirror')
        .controller('MirrorCtrl', MirrorCtrl);

}(window.angular));
