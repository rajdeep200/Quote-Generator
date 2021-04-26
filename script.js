// https://type.fit/api/quotes   <-- Quotes api

// method=getQuote — method name to invoke
// format=<format> — one of the server supported response formats
// key=<integer> — numeric key, which influences the choice of quotation, the maximum length is 6 characters
// lang=<string> — response language ("ru" or "en")
// jsonp=<string> — callback function name, used for jsonp format only

{
  /* <a class="twitter-share-button"
  href="https://twitter.com/intent/tweet"
  data-size="large"
  data-text="custom share text"
  data-url="https://dev.twitter.com/web/tweet-button"           <-- twitter share
  data-hashtags="example,demo"
  data-via="twitterdev"
  data-related="twitterapi,twitter">
Tweet
</a> */
}

const quoteContainer = document.getElementById("container");
let quote = document.getElementById("quote");
const author = document.getElementById("author");
const twitterButton = document.getElementById("twitter__button");
const newQuoteButton = document.getElementById("new__quote");
const loader = document.getElementById("loader");

// Show Loader function
const showLoader = () => {
  loader.hidden = false;
  quoteContainer.hidden = true;
};

// Hide Loader function
const hideLoader = () => {
  if (!loader.hidden) {
    quoteContainer.hidden = false;
    loader.hidden = true;
  } else {
    loader.hidden = false;
    quoteContainer.hidden = true;
  }
};

// Getting quote from api
const getQuote = async () => {
  showLoader();

  const apiUrl = "https://type.fit/api/quotes";
  let quoteNumber = Math.floor(Math.random() * 1600);
  
  try {
    const res = await fetch(apiUrl);
    const data = await res.json();

    //checking if author is present or not
    if (data[quoteNumber].author === "") {
      author.innerText = "Unknown";
    } else {
      author.innerText = data[quoteNumber].author;
    }

    //checking if the quote is too long
    if (data[quoteNumber].text.length > 50) {
      quote.classList.add("long__quote");
    } else {
      quote.classList.remove("long__quote");
    }

    quote.innerText = data[quoteNumber].text;
    author.innerText = data[quoteNumber].author;

    hideLoader();
  } catch (error) {
    console.log(error);
  }
};

//Tweet the quote
const tweetQuote = () => {
  const tweetQuote = quote.innerText;
  const author = quote.innerText;
  const tweetUrl = `https://twitter.com/intent/tweet?text=${quote} - ${author}`;
  window.open(tweetUrl, " _blank");
};

//Listening to Click Event
twitterButton.addEventListener("click", tweetQuote);
newQuoteButton.addEventListener("click", getQuote);

getQuote();
