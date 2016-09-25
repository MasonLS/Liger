'use strict';


app.service('FriendsService', function () {

		this.addFriend = function (friend) {
			// friend.name = new RegExp(friend.name)

			chrome.storage.sync.get('friends', (result) => {
				let friends = result.friends
				
				if (friends.every((friendObj) => friendObj.name !== friend.name)) friends.push(friend) 
				console.log(friends)
				chrome.storage.sync.set({ 'friends': friends })
			})
		}

		this.removeFriend = function (friendName) {
			// let friendNameRegex = new RegExp(friendName)

			chrome.storage.sync.get('friends', (result) => {
				let friends = result.friends
				
				for (let i = 0; i < friends.length; i++) {
					if (friends[i].name === friendName) {
						friends.splice(i, 1)
						break
					}
				}
				
				chrome.storage.sync.set({ 'friends': friends })
			})
		}
	})