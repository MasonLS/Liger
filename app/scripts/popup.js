'use strict';

const app =	angular.module('popup', [])
			
			.controller('PopupCtrl', function ($scope, FriendsService) {

				function submitFriend () {
					$scope.friend.divisor = +$scope.friend.divisor || 1
					$scope.friend.counter = 0
					FriendsService.addFriend($scope.friend)
					$scope.friends.push($scope.friend)
					$scope.friend = null
				}

				function untrackFriend (friend) {
					FriendsService.removeFriend(friend)
					let friends = $scope.friends
					friends.splice(friends.indexOf(friend), 1)
				}

				chrome.storage.sync.get('friends', result => {
					$scope.friends = result.friends
				})

				$scope.submitFriend = submitFriend
				$scope.untrackFriend = untrackFriend
			})