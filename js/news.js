var i = 1;

function getNews() {
  setTimeout(function () {
    const news = new XMLHttpRequest();
    news.open(
      "GET",
      `https://api.marketaux.com/v1/news/all?exchanges=CCY&filter_entities=true&published_after=2022-11-25T12:31&page=${i}&language=en&api_token=cVj44lWPeI7MnaEVMZRblYyzdvrpTb1QzZmsZkUC`
    );
    news.responseType = "json";
    news.send();

    var newsHeading = document.getElementsByClassName(`news-heading${i}`);
    var newsImg = document.getElementsByClassName(`news-img${i}`);
    var newsSrc = document.getElementsByClassName(`news-src${i}`);
    var newsDesc = document.getElementsByClassName(`news-desc${i}`);
    news.onload = function () {
      for (let x = 0; x < 3; x++) {
        var response = news.response;
        var newsJson = response["data"];
        var title = newsJson[x]["title"];
        var date = newsJson[x]["published_at"];
        var url = newsJson[x]["url"];
        var image = newsJson[x]["image_url"];
        var description = newsJson[x]["description"];
        newsHeading.item(x).innerHTML = title;
        newsImg.item(x).src = image;
        newsSrc.item(x).href = url;
        newsDesc.item(x).innerHTML = description;
      }
    };
    i++;
    if (i < 4) {
      getNews();
    }
  }, 100);
}

getNews();
