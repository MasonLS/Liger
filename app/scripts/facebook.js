'use strict';

chrome.storage.sync.get(['friends', 'processedLikes'], result => {

	const processedLikes = result.processedLikes || []
    //use of var is important here!
    var friends, friendNamesPosts, friendNamesComments;

    updateFriends(result)

    function updateFriends (getResult) {
        friends = getResult.friends
        friendNamesPosts = friends.filter(friend => friend.posts).map(friend => friend.name.toUpperCase())
        friendNamesComments = friends.filter(friend => friend.comments).map(friend => friend.name.toUpperCase())
    }

    chrome.runtime.onMessage.addListener(
        function (request, sender, sendMessage) {
            if (request.message === 'friendAdded' || request.message === 'friendRemoved') {
                chrome.storage.sync.get('friends', result => updateFriends(result))
            }
        }
    )


    function clickLike (like) {
        like.addEventListener('click', function (e) { e.preventDefault()})
        like.click()
    }


    $(window).on('scrollstop', () => {

        $('.userContentWrapper').each(function () {
            
            let friendName = $(this).find('.fwb a').text().toUpperCase()
            let timestamp = $(this).find('.timestampContent').parent().data('utime')

            if (friendNamesPosts.includes(friendName) && !processedLikes.includes(timestamp)) {
                
                let friendObj = friends.find(friend => friend.name.toUpperCase() === friendName);

                friendObj.counter += 1

                if (friendObj.counter % friendObj.divisor === 0) {
                    
                    let like = $(this).find('.UFILikeLink')[0]
                    
                    clickLike(like)
                    console.log('liked ' + friendName + 's' + ' post!')
                    
                }

                processedLikes.push(timestamp)
            }

        })

        $('.UFICommentContentBlock').each(function () {
            
            let friendName = $(this).find('.UFICommentActorName').text().toUpperCase()
            let timestamp = $(this).find('.livetimestamp').data('utime')

            if (friendNamesComments.includes(friendName) && !processedLikes.includes(timestamp)) {
                
                let friendObj = friends.find(friend => friend.name.toUpperCase() === friendName);

                friendObj.counter += 1

                if (friendObj.counter % friendObj.divisor === 0) {
                    
                    let like = $(this).find('.UFILikeLink')[0]
                    
                    clickLike(like)
                    console.log('liked ' + friendName + 's' + ' comment!')
                    
                }
                
                processedLikes.push(timestamp)
            }
        })

    	chrome.storage.sync.set({'processedLikes': processedLikes})
    	
    })

})