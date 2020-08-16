function findClosingBracketIndex(str, pos) {
  if (str[pos] !== "{") {
    throw new Error("The position must contain an opening bracket");
  }
  let level = 1;
  for (let index = pos + 1; index < str.length; index++) {
    if (str[index] === "{") {
      level++;
    } else if (str[index] === "}") {
      level--;
    }

    if (level === 0) {
      return index;
    }
  }
  return -1;
}

var base = "https://wiki.openstreetmap.org/w/api.php";

loadPagesByTemplate("Service item");
loadPagesByTemplate("Software");

function parseTemplate(content) {
  var obj = {};
  var props = content.split(/\|(?![^{\[]*[}\]])/g);
  props.shift();

  for (var p in props) {
    var pair = props[p].trim();
    var start = pair.indexOf("=");
    var name = pair.substring(0, start).trim();
    var value = pair.substring(start + 1).trim();

    if (value) obj[name] = value;
  }

  console.info(obj);
}

function parsePage(content, template) {
  var start = content.indexOf("{{" + template);

  if (start === -1) return;

  var software = content.substring(start);

  var closing = findClosingBracketIndex(software, 0);

  var rest = software.substring(closing + 1);
  software = software.substring(0, closing + 1);

  software = software
    .substring(software.indexOf("|"), software.length - 2)
    .trim();

  //console.info(software);
  parseTemplate(software);

  parsePage(rest, template);
}

function loadPages(ids, template) {
  var params = {
    action: "query",
    prop: "revisions",
    rvprop: "content",
    pageids: ids.join("|"),
    rvslots: "*",
    formatversion: "2",
    format: "json"
  };

  var url = base + "?origin=*";
  Object.keys(params).forEach(function (key) {
    url += "&" + key + "=" + params[key];
  });

  fetch(url)
    .then(function (response) {
      return response.json();
    })
    .then(function (response) {
      var pages = response.query.pages;
      for (var p in pages) {
        var content = pages[p].revisions[0].slots.main.content;

        parsePage(content, template);
      }
    })
    .catch(function (error) {
      console.log(error);
    });
}

function loadPagesByTemplate(template) {
  var params = {
    action: "query",
    list: "embeddedin",
    eititle: "Template:" + template,
    eilimit: "500",
    formatversion: "2",
    format: "json"
  };

  var url = base + "?origin=*";
  Object.keys(params).forEach(function (key) {
    url += "&" + key + "=" + params[key];
  });

  fetch(url)
    .then(function (response) {
      return response.json();
    })
    .then(function (response) {
      processPagesByTemplateResult(response, template);
    })
    .catch(function (error) {
      console.log(error);
    });
}

function processPagesByTemplateResult(response, template) {
  if (response.continue && response.continue.eicontinue)
    loadPagesByTemplatePage(response.continue.eicontinue, template);
  var pages = response.query.embeddedin;
  var ids = [];
  for (var p in pages) {
    if (!/^\w{2}:/g.test(pages[p].title)) ids.push(pages[p].pageid);

    if (ids.length >= 50) {
      loadPages(ids, template);
      ids = [];
    }
  }

  if (ids.length > 0) {
    loadPages(ids, template);
  }
}

function loadPagesByTemplatePage(con, template) {
  var params = {
    action: "query",
    list: "embeddedin",
    eititle: "Template:" + template,
    eicontinue: con,
    eilimit: "500",
    formatversion: "2",
    format: "json"
  };

  var url = base + "?origin=*";
  Object.keys(params).forEach(function (key) {
    url += "&" + key + "=" + params[key];
  });

  fetch(url)
    .then(function (response) {
      return response.json();
    })
    .then(function (response) {
      processPagesByTemplateResult(response, template);
    })
    .catch(function (error) {
      console.log(error);
    });
}
