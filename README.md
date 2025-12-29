# X-Clone: Social Media Architecture
A functional social media interface focused on real-time data handling, user interaction, and data persistence. This project extends the base Scrimba curriculum of [The fullstack developer path](https://scrimba.com/fullstack-path-c0fullstack) by implementing advanced features for a more robust user experience.

#### I  have added reply, delete tweet and local storage in it. So every time you  refresh you don't loose your data. It's nice fun project to play and learn new concept. I also learned new way of writing (if else) statement.


## Advanced Features I Implemented
While the core UI was taught in the course, I engineered the following functional enhancements:

Data Persistence (LocalStorage): Implemented a state-syncing mechanism so user data (tweets, likes, retweets) persists across browser refreshes.

Nested Reply System: Developed a custom event listener to handle unique tweet IDs and capture input values for threaded conversations.

Dynamic Deletion: Integrated a deletion flow that updates the internal data state and triggers a re-render of the DOM.

Optimized Logic: Replaced standard if/else chains with more efficient target-checking patterns (Short-circuiting/Ternaries).

// State Recovery Logic:

```javascript
const storeData = localStorage.getItem('myTweets')
let tweets = storeData ? JSON.parse(storeData) : tweetsData 
```

// Event Delegation Pattern:

```javascript
document.addEventListener('click', function(e){
```
```javascript
else if(e.target.dataset.submitReply){
        const tweetId = e.target.dataset.submitReply
        const inputField = document.getElementById(`input-${tweetId}`)
        submitReply(inputField.value, tweetId)
        inputField.value = ''
}
```

//  Code for delete tweet

```javascript
    else if(e.target.dataset.delete ){
        handleDeleteClick(e.target.dataset.delete)
    }
})
```

### And rest of the detailed code is in <mark>index.js</mark> one can read and use these code.
