
document.addEventListener("DOMContentLoaded", function() {
  const ranking = document.querySelector('.cryptoRank');
  const title = document.querySelector('.cryptoTitle');
  const subTitle = document.querySelector('.cryptoSubTitle');
  const price = document.querySelector('.cryptoPrice');
  
  function getCrypto() {
    fetch('https://api.coinmarketcap.com/v1/ticker/')
      .then(function(Results) {
        return Results.json();
      }).then(function(Results) {
        console.log(Results);
        let card = doucment.querySelector('.card');
          Results.forEach(item => {
            card.push
          });
          ranking.innerHTML = Result.rank;
          title.innerHTML = Result.name;
          subTitle.innerHTML = Result.symbol;
          price.innerHTML = Result.price_usd;
        
        // console.log(Result[0].id);
      });
  }
});
