const ranking = document.querySelector('.cryptoRank');
const title = document.querySelector('.cryptoTitle');
const subTitle = document.querySelector('.cryptoSubTitle');
const price = document.querySelector('.cryptoPrice');

function getCrypto() {
  fetch('https://api.coinmarketcap.com/v1/ticker/bitcoin/')
    .then(function(Result) {
      return Result.json();
    }).then(function(Result) {
      console.log(Result);
      ranking.innerHTML = Result[0].rank;
      title.innerHTML = Result[0].name;
      subTitle.innerHTML = Result[0].symbol;
      price.innerHTML = Result[0].price_usd;
      // console.log(Result[0].id);
    });
}

getCrypto();