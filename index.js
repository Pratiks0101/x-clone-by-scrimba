// Imports of data

import { tweetsData } from './data.js'
import { v4 as uuidv4 } from 'https://jspm.dev/uuid';

// logic for local storage to check if data already present if not take from tweetsData

const storeData = localStorage.getItem('myTweets')
let tweets = storeData ? JSON.parse(storeData) : tweetsData

// eventListener on documents including like, retweet, reply, delete and tweet button

document.addEventListener('click', function(e){
    if(e.target.dataset.like){
        handleLikeClick(e.target.dataset.like) 
    }
    else if(e.target.dataset.retweet){
        handleRetweetClick(e.target.dataset.retweet)
    }
    else if(e.target.dataset.reply){
        handleReplyClick(e.target.dataset.reply)
    }
    else if(e.target.id === 'tweet-btn'){
        handleTweetBtnClick()
    }
    else if(e.target.dataset.submitReply){
        const tweetId = e.target.dataset.submitReply
        const inputField = document.getElementById(`input-${tweetId}`)
        submitReply(inputField.value, tweetId)
        inputField.value = ''

    }
    else if(e.target.dataset.delete ){
        handleDeleteClick(e.target.dataset.delete)
    }
})

// function calls for all the click handler example :- like,retweet, reply, delete and tweet button

function handleLikeClick(tweetId){ 
    const targetTweetObj = tweets.filter(function(tweet){
        return tweet.uuid === tweetId
    })[0]

    if (targetTweetObj.isLiked){
        targetTweetObj.likes--
    }
    else{
        targetTweetObj.likes++ 
    }
    targetTweetObj.isLiked = !targetTweetObj.isLiked
    render()
    saveToStorage()
}

function handleRetweetClick(tweetId){
    const targetTweetObj = tweets.filter(function(tweet){
        return tweet.uuid === tweetId
    })[0]
    
    if(targetTweetObj.isRetweeted){
        targetTweetObj.retweets--
    }
    else{
        targetTweetObj.retweets++
    }
    targetTweetObj.isRetweeted = !targetTweetObj.isRetweeted
    render() 
    saveToStorage()
}

function handleReplyClick(replyId){
    document.getElementById(`replies-${replyId}`).classList.toggle('hidden')
}

function handleTweetBtnClick(){
    const tweetInput = document.getElementById('tweet-input')

    if(tweetInput.value){
        tweets.unshift({
            handle: `@Scrimba`,
            profilePic: `images/scrimbalogo.png`,
            likes: 0,
            retweets: 0,
            tweetText: tweetInput.value,
            replies: [],
            isLiked: false,
            isRetweeted: false,
            uuid: uuidv4()
        })
    render()
    saveToStorage()
    tweetInput.value = ''
    }

}

function handleDeleteClick(tweetId){
    const updatedTweet = tweets.findIndex(function(tweet){
        return tweet.uuid === tweetId
    })
    if(updatedTweet > -1){
        tweets.splice(updatedTweet, 1)
    }
    render()
    saveToStorage()
}

// function for feed and it's HTML logic

function getFeedHtml(){
    let feedHtml = ''
    
    tweets.forEach(function(tweet){
        
        let likeIconClass = ''
        
        if (tweet.isLiked){
            likeIconClass = 'liked'
        }
        
        let retweetIconClass = ''
        
        if (tweet.isRetweeted){
            retweetIconClass = 'retweeted'
        }
        
        let repliesHtml = ''
        
        if(tweet.replies.length > 0){
            tweet.replies.forEach(function(reply){
                repliesHtml+=`
<div class="tweet-reply">
    <div class="tweet-inner">
        <img src="${reply.profilePic}" class="profile-pic">
            <div>
                <p class="handle">${reply.handle}</p>
                <p class="tweet-text">${reply.tweetText}</p>
            </div>
        </div>
</div>
`
            })
        }
        
        feedHtml += `
<div class="tweet">
    <div class="tweet-inner">
        <img src="${tweet.profilePic}" class="profile-pic">
        <div>
            <p class="handle">${tweet.handle}</p>
            <p class="tweet-text">${tweet.tweetText}</p>
            <div class="tweet-details">
                <span class="tweet-detail">
                    <i class="fa-regular fa-comment-dots"
                    data-reply="${tweet.uuid}"
                    ></i>
                    ${tweet.replies.length}
                </span>
                <span class="tweet-detail">
                    <i class="fa-solid fa-heart ${likeIconClass}"
                    data-like="${tweet.uuid}"
                    ></i>
                    ${tweet.likes}
                </span>
                <span class="tweet-detail">
                    <i class="fa-solid fa-retweet ${retweetIconClass}"
                    data-retweet="${tweet.uuid}"
                    ></i>
                    ${tweet.retweets}
                </span>
                <span class="tweet-detail">
                    <i class="fa-solid fa-trash" 
                    data-delete="${tweet.uuid}" 
                    ></i>
                </span>
            </div>   
        </div>            
    </div>
    <div class="hidden" id="replies-${tweet.uuid}">
    <div class="reply-input-area">
        <textarea placeholder="Post your reply" id="input-${tweet.uuid}"></textarea>
        <button  class="reply-btn" data-submit-reply="${tweet.uuid}">Reply</button>
    </div>
        ${repliesHtml}
    </div>   
</div>
`
    })
    return feedHtml 
}

// function for submitting reply

function submitReply(replyText, tweetId){
    if(replyText.trim() !== ''){
        const targetTweetObj = tweets.filter(function(tweet){
            return tweet.uuid === tweetId
        })[0]
        
        targetTweetObj.replies.unshift({
            handle: `@Pratik Sharma ✅`,
            profilePic: `images/me.jpg`,
            tweetText: replyText
        })
        render()
        saveToStorage()
    }
    else{
        
        alert('Cannot submit empty reply');
        
    }
}
// function for saveing data locally


function saveToStorage(){
    let storeData = JSON.stringify(tweets)
    localStorage.setItem('myTweets', storeData)
}

// render function

function render(){
    document.getElementById('feed').innerHTML = getFeedHtml()
}

render()