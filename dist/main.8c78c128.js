// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"epB2":[function(require,module,exports) {
var $siteList = $('.siteList');
var $lastList = $siteList.find('li.last');
var $searchForm = $('.searchForm')[0];
var $input = $('.input')[0];
var $se = $('.se');
var listData = localStorage.getItem('listData');
var dataObject = JSON.parse(listData);
var hashMap = dataObject || [{
  logo: 'G',
  url: 'https://www.github.com/'
}, {
  logo: 'M',
  url: 'https://developer.mozilla.org/'
}, {
  logo: 'V',
  url: 'https://vue3js.cn/'
}, {
  logo: 'R',
  url: 'https://reactjs.org/'
}, {
  logo: 'Y',
  url: 'https://www.youtube.com/'
}, {
  logo: 'T',
  url: 'https://twitter.com/'
}, {
  logo: 'B',
  url: 'https://www.bilibili.com/'
}];

var simplifyUrl = function simplifyUrl(url) {
  return url.replace('https://', '').replace('http://', '').replace('www.', '').replace(/\/.*/, '');
};

var render = function render() {
  $siteList.find('li:not(.last)').remove();
  hashMap.forEach(function (node, index) {
    var $li = $("\n        <li>\n            <div class=\"site\">\n                <div class=\"logo\">".concat(node.logo, "</div>\n                <div class=\"link\">").concat(simplifyUrl(node.url), "</div>\n                <div class=\"close\">\n                    <svg class=\"icon\">\n                        <use xlink:href=\"#icon-close\"></use>\n                    </svg>\n            </div>\n            </div>\n    </li>\n        ")).insertBefore($lastList);
    $li.on('click', function () {
      window.open(node.url);
    });
    $li.on('click', '.close', function (e) {
      e.stopPropagation();
      hashMap.splice(index, 1);
      render();
    });
  });
};

hashMap.forEach(function (node) {
  var $li = $("\n    <li>\n        <a href=\"".concat(node.url, "\">\n            <div class=\"site\">\n                <div class=\"logo\">").concat(node.logo, "</div>\n                <div class=\"link\">").concat(node.url, "</div>\n            </div>\n        </a>\n    </li>\n")).insertBefore($lastList);
});
render();
$('.addButton').on('click', function () {
  var url = window.prompt('请问你要添加的网址是啥？');

  if (url.indexOf('http') !== 0) {
    url = 'https://' + url;
  }

  hashMap.push({
    logo: simplifyUrl(url)[0],
    url: url
  });
  render();
});
$se.on('click', function (e) {
  switch (e.target.innerText) {
    case '谷歌':
      $se.find("button.active")[0].classList.remove('active');
      e.target.classList.add('active');
      $searchForm.action = 'https://www.google.com/search';
      $input.name = 'q';
      break;

    case '百度':
      $se.find("button.active")[0].classList.remove('active');
      e.target.classList.add('active');
      $searchForm.action = 'https://www.baidu.com/s';
      $input.name = 'wd';
      break;

    case '搜狗':
      $se.find("button.active")[0].classList.remove('active');
      e.target.classList.add('active');
      $searchForm.action = 'https://www.sogou.com/web';
      $input.name = 'query';
      break;

    case '必应':
      $se.find("button.active")[0].classList.remove('active');
      e.target.classList.add('active');
      $searchForm.action = 'https://cn.bing.com/search';
      $input.name = 'q';
      break;

    default:
      break;
  }
});

window.onbeforeunload = function () {
  var string = JSON.stringify(hashMap);
  localStorage.setItem('listData', string);
};

$(document).on('keypress', function (e) {
  var key = e.key;

  for (var i = 0; i < hashMap.length; i++) {
    if (hashMap[i].logo.toLowerCase() === key) {
      window.open(hashMap[i].url);
    }
  }
});
},{}]},{},["epB2"], null)
//# sourceMappingURL=main.8c78c128.js.map