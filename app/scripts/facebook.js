'use strict';


chrome.storage.sync.get(['friends', 'processedLikes'], result => {

	const processedLikes = result.processedLikes || []
    const friends = result.friends
    const friendNamesPosts = friends.filter(friend => friend.posts).map(friend => friend.name)
    const friendNamesComments = friends.filter(friend => friend.comments).map(friend => friend.name)

    $(window).on('scrollstop', () => {

    	$('.profileLink').each(function () {
    		
    		let $profileLink = $(this)
    		let friendName = $profileLink.text()
    		let $mutualParentDiv = $(this).parents('.userContentWrapper')
    		let like = $mutualParentDiv.find('.UFILikeLink')[0]
    		let timestamp = $mutualParentDiv.find('.timestampContent').parent().data('utime')

    		if (friendNamesPosts.includes(friendName) && !processedLikes.includes(timestamp)) {

				like.addEventListener('click', function (e) { e.preventDefault()})
				like.click()
				
				console.log('liked ' + friendName + 's' + ' post!')
				processedLikes.push(timestamp)
    		}
    	})

        $('.UFICommentContentBlock').each(function () {
            
            let friendName = $(this).find('.UFICommentActorName').text()
            let timestamp = $(this).find('.livetimestamp').data('utime')

            if (friendNamesComments.includes(friendName) && !processedLikes.includes(timestamp)) {
                
                let like = $(this).find('.UFILikeLink')[0]
                like.addEventListener('click', function (e) { e.preventDefault()})
                like.click()

                console.log('liked ' + friendName + 's' + ' comment!')
                processedLikes.push(timestamp)
            }
        })

    	chrome.storage.sync.set({'processedLikes': processedLikes})
    	
    })

})