'use strict';


chrome.storage.sync.get(['friends', 'processedPosts'], result => {

	const processedPosts = result.processedPosts || []
	console.log(processedPosts)
    const friends = result.friends
    const friendNames = friends.map(friend => friend.name) 

    $(window).on('scrollstop', () => {

    	$('.profileLink').each(function () {
    		
    		let $profileLink = $(this)
    		let friendName = $profileLink.text()
    		let $mutualParentDiv = $(this).parents('.userContentWrapper')
    		let like = $mutualParentDiv.find('.UFILikeLink')[0]
    		let timestamp = $mutualParentDiv.find('.timestampContent').parent().data('utime')

    		if (friendNames.includes(friendName) && !processedPosts.includes(timestamp)) {

				like.addEventListener('click', function (e) { e.preventDefault()})
				like.click()
				
				console.log('liked' + friendName + 's' + 'post!')
				processedPosts.push(timestamp)
    		}
    	})

    	chrome.storage.sync.set({'processedPosts': processedPosts})
    	
    })

})