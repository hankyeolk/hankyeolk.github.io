$("[data-tag]").click(e => {
  currentTag = e.target.dataset.tag;
  filterByTagName(currentTag);
});

function filterByTagName(tagName) {
  $(`.hidden`).removeClass(`hidden`);
  $(`.post-wrapper`).each((index, elem) => {
    if (!elem.hasAttribute(`data-${tagName}`)) {
      $(elem).addClass("hidden");
    }
  });
  $(`.tag`).removeClass("selected");
  $(`.tag[data-tag=${tagName}]`).addClass("selected");
}

$(document).ready(function () {
  let currentTag = "";
  const queryTag = getUrlParams().tag;
  if (queryTag) {
    currentTag = queryTag;
    filterByTagName(currentTag);
  }
});

function getUrlParams() {
  var params = {};
  window.location.search.replace(
    /[?&]+([^=&]+)=([^&]*)/gi,
    function (str, key, value) {
      params[key] = value;
    },
  );
  return params;
}
