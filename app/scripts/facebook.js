'use strict';


chrome.storage.sync.get(['friends', 'processedLikes'], result => {

	const processedLikes = result.processedLikes || []
    const friends = result.friends

    console.log(friends)
    const friendNamesPosts = friends.filter(friend => friend.posts).map(friend => friend.name)
    const friendNamesComments = friends.filter(friend => friend.comments).map(friend => friend.name)

    function clickLike (like) {
        like.addEventListener('click', function (e) { e.preventDefault()})
        like.click()
    }


    $(window).on('scrollstop', () => {

        $('.userContentWrapper').each(function () {
            
            let friendName = $(this).find('.fwb a').text()
            let timestamp = $(this).find('.timestampContent').parent().data('utime')

            if (friendNamesPosts.includes(friendName) && !processedLikes.includes(timestamp)) {
                
                let friendObj = friends.find(friend => friend.name === friendName);

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
            
            let friendName = $(this).find('.UFICommentActorName').text()
            let timestamp = $(this).find('.livetimestamp').data('utime')

            if (friendNamesComments.includes(friendName) && !processedLikes.includes(timestamp)) {
                
                let friendObj = friends.find(friend => friend.name === friendName);

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