'use strict';


app.service('FriendsService', function () {

		this.addFriend = function (friend) {

			chrome.storage.sync.get('friends', (result) => {
				let friends = result.friends
				
				if (friends.every((friendObj) => friendObj.name !== friend.name)) friends.push(friend) 
				console.log(friends)
				chrome.storage.sync.set({ 'friends': friends })
			})
		}

		this.removeFriend = function (friend) {

			chrome.storage.sync.get('friends', (result) => {
				let friends = result.friends
				
				for (let i = 0; i < friends.length; i++) {
					if (friends[i].name.toUpperCase() === friend.name.toUpperCase()) {
						friends.splice(i, 1)
						console.log('FRIEND REMOVED')
						break
					}
				}
				
				chrome.storage.sync.set({ 'friends': friends })
			})
		}
	})