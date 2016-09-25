'use strict';

const app =	angular.module('popup', [])
			
			.controller('PopupCtrl', function ($scope, FriendsService) {

				function submitFriend () {
					FriendsService.addFriend($scope.friend)
					$scope.friend = null
				}

				function untrackFriend () {
					FriendsService.removeFriend($scope.friend.name)
					$scope.friend = null
				}

				$scope.submitFriend = submitFriend
				$scope.untrackFriend = untrackFriend

			})



// $(document).ready(() => {
// 	$('#increase-frequency').click(_ => {
// 		$('.progress').val((index, value) => {
// 			return value + 10;
// 		});
// 	});

// 	$('#decrease-frequency').click(_ => {
// 		$('.progress').val((index, value) => {
// 			return value - 10;
// 		});
// 	});

// 	$('form').submit(_ => {
// 		event.preventDefault();
// 		let name = $('input').val();
// 		let nameRegex = new RegExp(name);
// 		let frequency = $('.progress').val();

// 		chrome.storage.sync.get('friends', (result) => {
// 			if (!Object.keys(result).includes('friends')) {
// 				chrome.storage.sync.set({ 'friends': [{ name: nameRegex, frequency: frequency }] }, (result) => {
// 					chrome.storage.sync.get('friends', (result) => console.log('SUCCESS!', result))
// 				})
// 			} else {
// 				chrome.storage.sync.get('friends', (result) => {
// 					let friends = result.friends;
// 					result.friends.push({ name: nameRegex, frequency: frequency });
// 					chrome.storage.sync.set({ 'friends': friends }, (result) => {
// 						chrome.storage.sync.get('friends', (result) => {
// 							console.log(result.friends);
// 							console.log(result.friends[0].name);
// 						});
// 					});
// 				})
// 			}
			
// 		});
// 	});
// });