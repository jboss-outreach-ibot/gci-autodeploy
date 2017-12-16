var intervalId = null;
var stuff;

function interval() {
    if (intervalId !== null){
        clearInterval(intervalId);
        intervalId = window.setInterval(nextTweet, 6600); //6.6 secs
    } else{
        intervalId = window.setInterval(nextTweet, 6600); //6.6 secs
    }
}

var tweetNum = 0;

function parser(data) {
    var parsed = "";
    var tweet = data.statuses[tweetNum].text;
    var words = tweet.split(" ");
    var loklakLinkCount = 0;
    for (var word in words) {
        if (words[word].startsWith("@")) {
            parsed += "<a href='https://twitter.com/" + words[word].slice(1) + "' target='_blank'>" + words[word] + "</a> ";
        } else if (words[word].startsWith("#")) {
            parsed += "<a href='https://twitter.com/hashtag/" + words[word].slice(1) + "' target='_blank'>" + words[word] + "</a> ";
        } else if (words[word].startsWith("http")) {
            if (words[word].startsWith("http://loklak")) {
                parsed += "<a href='" + data.statuses[tweetNum].links[loklakLinkCount] + "' target='_blank'>" + data.statuses[tweetNum].links[loklakLinkCount] + "</a> ";
                loklakLinkCount += 1;
            } else {
                parsed += "<a href='" + words[word] + "' target='_blank' style='word-break:break-all'>" + words[word] + "</a> ";
            }
        } else {
            parsed += words[word] + " ";
        }
    }
    document.getElementById("tweet").innerHTML = parsed;

    var user = data.statuses[tweetNum].user;
    var tweetDate = new Date(data.statuses[tweetNum].created_at);
    document.getElementById("tweet-info").innerHTML = "Posted by <a href='https://twitter.com/" + user.screen_name + "'><b>" + user.name + "</b></a>, <a href='" + data.statuses[tweetNum].link + "'><i>" + tweetDate.toUTCString() + "</i></a>";
}

function parseFunc() {
    parser(stuff);
}

function datafetcher() {
    // Ignore JSHintBear
    loklakFetcher.getTweets({}, datahandler);
}

function datahandler(raw) {
    stuff = raw;   // Makes the data available globally.
    parser(stuff);
    interval();
}

function nextTweet() {
    tweetNum += 1;
    var tweetsEl = document.getElementById('tweets');
    //go back to the first tweet if it's greater than the amount of tweets available
    if(tweetNum === tweetsEl.dataset.count) {
        tweetNum = 0;
    }
    interval();
    window.setTimeout(parseFunc, 560);
}
/**
function was never used. remove comment tags only if itcauses errors.
function lastTweet() {
    if (tweetNum > 0) {
        tweetNum -= 1;
        interval();
        window.setTimeout(parseFunc, 560);
    }
}
*/

datafetcher();
