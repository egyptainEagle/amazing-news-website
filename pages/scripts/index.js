const homepageBaseURL = "https://api.newscatcherapi.com/v2/latest_headlines?page_size=30&countries=US";
const covidBaseURL = "https://api.newscatcherapi.com/v2/search?q=covid";
/*--------- React Components ------------*/

/*--------- React Components ------------*/

function NewsComponentTitle(props) {
  return /*#__PURE__*/React.createElement("h2", {
    className: "article-element__title"
  }, props.value);
}

function NewsComponentDescription(props) {
  return /*#__PURE__*/React.createElement("p", {
    className: "article-element__description"
  }, props.value);
}

function NewsComponentSource(props) {
  return /*#__PURE__*/React.createElement("span", {
    className: "article-element__source"
  }, props.value);
}

function NewsComponentImage(props) {
  return /*#__PURE__*/React.createElement("img", {
    className: "article-element__img",
    src: props.value
  });
}

function NewsComponent(props) {
  return /*#__PURE__*/React.createElement("div", {
    className: "article-element"
  }, /*#__PURE__*/React.createElement(NewsComponentImage, {
    value: props.img
  }), /*#__PURE__*/React.createElement(NewsComponentTitle, {
    value: props.title
  }), /*#__PURE__*/React.createElement(NewsComponentDescription, {
    value: props.description
  }), /*#__PURE__*/React.createElement(NewsComponentSource, {
    value: props.source
  }));
}
/*------------=-=--=-=-=-=-=--------------*/


function formatTitle(title) {
  titleTailPattren = /\s+(-)+\s*.{3,}$/;

  if (title.match(titleTailPattren)) {
    title = title.replace(titleTailPattren, "");
  } else {
    return title;
  }

  return title;
}
/*
async function fetchNews(URL, category) {
  const RESTData = await fetch(`${URL}${(category.length == 0)?"":"&q="+category}`);
  const JSONData = await RESTData.json();
  console.log(JSONData);
  const articles = []; // Filter data and retun array of objects, each contain only the useful data about the news:

  for (articleElement of JSONData.articles) {
    const NewsElement = {};
    NewsElement.source = articleElement.source.name; //Format title and remove source name from the title:

    NewsElement.title = formatTitle(articleElement.title);
    NewsElement.description = articleElement.description;
    NewsElement.img = articleElement.urlToImage;
    articles.push(NewsElement);
  }

  return articles;
}
*/

async function fetchNews(category) {
  let RESTData = null;
  
   switch (category){
    case "trends":
     RESTData = await fetch(homepageBaseURL,{method: "GET", headers: {"x-api-key": "5HrxKqHabDyk49YRk8BwxDD6OeDTDjsUNjpM1yDxeLQ"}});
     console.log("trend")
     break;
    case "business":
     RESTData = await fetch(`${homepageBaseURL}&topic=business`,{method: "GET", headers: {"x-api-key": "5HrxKqHabDyk49YRk8BwxDD6OeDTDjsUNjpM1yDxeLQ"}});
     console.log("business")
     break;
    case "covid":
     RESTData = await fetch(covidBaseURL,{method: "GET", headers: {"x-api-key": "5HrxKqHabDyk49YRk8BwxDD6OeDTDjsUNjpM1yDxeLQ"}});
      break;
    case "science":
     RESTData = await fetch(`${homepageBaseURL}&topic=science`,{method: "GET", headers: {"x-api-key": "5HrxKqHabDyk49YRk8BwxDD6OeDTDjsUNjpM1yDxeLQ"}});
      break;
    case "technology":
     RESTData = await fetch(`${homepageBaseURL}&topic=tech`,{method: "GET", headers: {"x-api-key": "5HrxKqHabDyk49YRk8BwxDD6OeDTDjsUNjpM1yDxeLQ"}});
      break;
   }
   const JSONData = await RESTData.json();
   const articles = []; // Filter data and retun array of objects, each contain only the useful data about the news:
 console.log(JSONData)
   for (articleElement of JSONData.articles) {
     const NewsElement = {};
           //EDIT HERE:
     NewsElement.source = articleElement["clean_url"].replace(/\..+/,""); //Format title and remove source name from the title:
     NewsElement.title = formatTitle(articleElement.title);
     NewsElement.description = articleElement.summary;
     NewsElement.img = articleElement.media;
     articles.push(NewsElement);
   }
 
   return articles;
 }


async function renderNewsComponents(newsArray, containerID) {
  const NewsArray = await newsArray;
  NewsComponentArray = [];

  if (NewsArray.length > 0) {
    for (newsElement of NewsArray) {
      NewsComponentArray.push( /*#__PURE__*/React.createElement(NewsComponent, {
        title: newsElement.title,
        description: newsElement.description,
        source: newsElement.source,
        img: newsElement.img
      }));
    }

    ReactDOM.render( /*#__PURE__*/React.createElement(React.Fragment, null, NewsComponentArray), document.getElementById(containerID));
  }
}
