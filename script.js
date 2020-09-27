const quoteContainer = document.querySelector("#quote-container");
const quoteText = document.querySelector("#quote");
const authorText = document.querySelector("#author");
const twitterBtn = document.querySelector("#twitter");
const nextQuoteBtn = document.querySelector("#new-quote");
const loader = document.querySelector("#loader");

function showLoadingSpinner() {
  loader.hidden = false;
  quoteContainer.hidden = true;
}

function hideLoadingSpinner() {
  if (!loader.hidden) {
    quoteContainer.hidden = false;
    loader.hidden = true;
  }
}

// get quote from api
async function getQuote() {
  showLoadingSpinner();
  //proxy url to avoid cors error
  const proxyUrl = `https://cors-anywhere.herokuapp.com/`;
  const apiUrl = `https://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json`;
  try {
    const response = await fetch(proxyUrl + apiUrl);
    const response2 = await response.json();
    //reducing the font size if the quote is too long
    if (response2.quoteText.length > 100) {
      quoteText.classList.add("long-quote");
    } else {
      quoteText.classList.remove("long-quote");
    }
    quoteText.innerText = response2.quoteText;
    //checking if the author data is not present
    if (response2.quoteAuthor === "") {
      authorText.innerText = "- Unknown";
    } else {
      authorText.innerText = `- ${response2.quoteAuthor}`;
    }
    hideLoadingSpinner();
  } catch (error) {
    console.log(error);
  }
}

//Tweet Quote
function tweetQuote() {
  const quote = quoteText.innerText;
  const author = authorText.innerText;
  const twitterURL = `https://twitter.com/intent/tweet?text=${quote} ${author}`;
  window.open(twitterURL, "_blank");
}

//Event Listeners
twitterBtn.addEventListener("click", tweetQuote);
nextQuoteBtn.addEventListener("click", getQuote);

// onLoad
getQuote();
