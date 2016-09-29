'use strict';

const app =	angular.module('popup', [])
			
			.controller('PopupCtrl', function ($scope, FriendsService) {

				function submitFriend () {
					let friend = $scope.friend
					friend.divisor = +friend.divisor || 1
					friend.counter = 0
					FriendsService.addFriend(friend)
					$scope.friends.push(friend)
					$scope.friend = null
					$scope.showFriendsTracked = true
					chrome.runtime.sendMessage({ 'message': 'friendAdded'})
				}

				function untrackFriend (friend) {
					FriendsService.removeFriend(friend)
					let friends = $scope.friends
					friends.splice(friends.indexOf(friend), 1)
					chrome.runtime.sendMessage({ 'message': 'friendRemoved'})
				}


				chrome.storage.sync.get('friends', result => {
					$scope.friends = result.friends
				})

				$scope.submitFriend = submitFriend
				$scope.untrackFriend = untrackFriend
			})