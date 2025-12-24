# Getting Started
Install the dependencies and run the project
```
npm install
npm start
```

## I  have added reply, delete tweet and local storage in it. So every time you  refresh you don't loose your data. It's nice fun project to play and learn new concept. I also learned new way of writing (if else) statement.

// This code for local storage

```javascript
const storeData = localStorage.getItem('myTweets')
let tweets = storeData ? JSON.parse(storeData) : tweetsData 
```

//here comes my code for submitting reply

```javascript
document.addEventListner('click', funtion(e){
```

// rest of  the code if and else if.....

```javascript
else if(e.target.dataset.submitReply){
        const tweetId = e.target.dataset.submitReply
        const inputField = document.getElementById(`input-${tweetId}`)
        submitReply(inputField.value, tweetId)
        inputField.value = ''
}
```

//  here comes my code for delete tweet

```javascript
    else if(e.target.dataset.delete ){
        handleDeleteClick(e.target.dataset.delete)
    }
})
```

## And rest of the detail code is in index.js one can read and use these code.

Head over to https://vitejs.dev/ to learn more about configuring vite
## About Scrimba

At Scrimba our goal is to create the best possible coding school at the cost of a gym membership! 💜
If we succeed with this, it will give anyone who wants to become a software developer a realistic shot at succeeding, regardless of where they live and the size of their wallets 🎉
The Fullstack Developer Path aims to teach you everything you need to become a Junior Developer, or you could take a deep-dive with one of our advanced courses 🚀

- [Our courses](https://scrimba.com/courses)
- [The Frontend Career Path](https://scrimba.com/fullstack-path-c0fullstack)
- [Become a Scrimba Pro member](https://scrimba.com/pricing)

Happy Coding!
