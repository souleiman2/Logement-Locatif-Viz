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
})({"scripts/explCoutType/helper.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.appendAxes = appendAxes;
exports.appendGraphLabels = appendGraphLabels;
exports.defineColorScale = defineColorScale;
exports.drawXAxis = drawXAxis;
exports.drawYAxis = drawYAxis;
exports.generateG = generateG;
exports.positionLabels = positionLabels;
exports.setCanvasSize = setCanvasSize;
/**
 * Generates the SVG element g which will contain the data visualisation.
 *
 * @param {object} margin The desired margins around the graph
 * @returns {*} The d3 Selection for the created g element
 */
function generateG(margin) {
  return d3.select('.graph-prix-type').select('svg').append('g').attr('id', 'graph-g-type').attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');
}

/**
 * Appends an SVG g element which will contain the y axis.
 *
 * @param {*} g The d3 Selection of the graph's g SVG element
 */
function appendAxes(g) {
  g.append('g').attr('class', 'x axis-type');
  g.append('g').attr('class', 'y axis-type');
}
/**
 * Appends the labels for the the y axis and the title of the graph.
 *
 * @param {*} g The d3 Selection of the graph's g SVG element
 */
function appendGraphLabels(g) {
  g.append('text').text('Prix ($)').attr('class', 'y axis-text type').attr('transform', 'rotate(-90)').attr('fill', '#898989').attr('font-size', 12);
  g.append('text').text("Type d'habitation").attr('class', 'x axis-text type').attr('fill', '#898989').attr('font-size', 12);
  g.append('text').text("Prix en fonction du type d'habitation").attr('class', 'title type').attr('fill', '#898989');
}

/**
 * Defines the color scale used in the graph.
 *
 * @param {string[]} colors A sorted array of color hex strings to be used
 * @param {string[]} players A sorted array of player names to use as the domain
 * @returns {*} The color scale to be used inthe graph
 */
function defineColorScale(colors, players) {
  return d3.scaleOrdinal().range(colors).domain(players);
}

/**
 * Sets the size of the SVG canvas containing the graph.
 *
 * @param {number} width The desired width
 * @param {number} height The desired height
 */
function setCanvasSize(width, height) {
  d3.select('#bar-chart-prix-type').select('svg').attr('width', width).attr('height', height);
}

/**
 * Positions the x axis label, y axis label and title label on the graph.
 *
 * @param {number} width The width of the graph
 * @param {number} height The height of the graph
 */
function positionLabels(width, height) {
  d3.select('.y.axis-text.type').attr('x', -70).attr('y', height / 2);
  d3.select('.x.axis-text.type').attr('x', width / 2).attr('y', height + 50);
  d3.select('.title.type').attr('x', width / 2).attr('y', -35);
}

/**
 * Draws the x axis at the bottom of the plot.
 *
 * @param {*} xScale The scale to use for the x axis
 * @param {number} height The height of the graph
 */
function drawXAxis(xScale, height) {
  d3.select('.x.axis-type').attr('transform', 'translate(0, ' + height + ')').call(d3.axisBottom(xScale));
}

/**
 * Draws the y axis at the left of the plot.
 *
 * @param {*} yScale The scale to use for the y axis
 */
function drawYAxis(yScale) {
  d3.select('.y.axis-type').call(d3.axisLeft(yScale).ticks(5));
}
},{}],"scripts/explCoutType/preprocess.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.endResult = endResult;
/**
 * Extracts the price and the type of the mainstream data
 *
 * @param {object[]} data the data to be used
 * @returns {object[]} The extracted data
 */
function extractPriceType(data) {
  return data.map(function (elem) {
    return {
      "price": elem["price"],
      "type": elem["unitype"]
    };
  });
}

/**
 * Cleans the data
 *
 * @param {object[]} data the data to be used
 * @returns {object[]} The cleaned data
 */
function clean_data(data) {
  return data.filter(function (elem) {
    return elem["type"] != "Not Available";
  });
}

/**
 * Divide the different data into percentiles (10th, 25th, 50th, 75th,90th)
 *
 * @param {object[]} data the data to be used
 * @returns {object[]} The divided data
 */
function divData(data) {
  var temp = {};
  data.forEach(function (elem) {
    if (temp.hasOwnProperty(elem["type"])) {
      temp[elem["type"]].push(elem["price"]);
    } else {
      temp[elem["type"]] = [];
    }
  });
  var ans = {};
  for (var key in temp) {
    ans[key] = arrToDist(temp[key]);
  }
  return ans;
}

/**
 * Transforms array into percentiles (10th, 25th, 50th, 75th,90th)
 *
 * @param {number[]} data the data to be used
 * @returns {object} The percentiles 
 */
function arrToDist(arr) {
  arr.sort(function (a, b) {
    return a - b;
  });
  return {
    "10": arr[Math.floor(arr.length / 10)],
    "25": arr[Math.floor(arr.length * 1 / 4)],
    "50": arr[Math.floor(arr.length * 1 / 2)],
    "75": arr[Math.floor(arr.length * 3 / 4)],
    "90": arr[Math.floor(arr.length * 9 / 10)]
  };
}

/**
 * Processes the data to have in the format that we desire
 *
 * @param {object[]} data the data to be used
 * @returns {object[]} The processed data
 */
function endResult(data) {
  var extracted_data = extractPriceType(data);
  var cleaned_data = clean_data(extracted_data);
  var div_data = divData(cleaned_data);
  return div_data;
}
},{}],"scripts/explCoutType/viz.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.drawBoxes = drawBoxes;
exports.updateXScale = updateXScale;
exports.updateYScale = updateYScale;
/**
 * Sets the domain and range of the X scale.
 *
 * @param {*} scale The x scale
 * @param {object[]} data The data to be used
 * @param {number} width The width of the graph
 */
function updateXScale(scale, data, width) {
  // TODO : Set the domain and range of the groups' x scale
  var keys = Object.keys(data);
  scale.domain(keys).range([0, width]);
}

/**
 * Sets the domain and range of the Y scale.
 *
 * @param {*} scale The Y scale
 * @param {object[]} data The data to be used
 * @param {number} height The height of the graph
 */
function updateYScale(scale, data, height) {
  // TODO : Set the domain and range of the graph's y scale
  var maxi = -Infinity;
  for (var key in data) {
    if (data[key]["90"] > maxi) {
      maxi = data[key]["90"];
    }
  }
  scale.domain([0, maxi]).range([height, 0]);
}

/**
 * Draws the bars inside the groups
 *
 * @param {*} y The graph's y scale
 * @param {*} x The graph's x scale
 * @param {*} data The data to be used
 * @param {*} tip The tooltip to show when each bar is hovered and hide when it's not
 */
function drawBoxes(y, x, data, height) {
  var width = x.bandwidth();
  var left = function left(width) {
    return width / 3;
  };
  var right = function right(width) {
    return width * 2 / 3;
  };
  d3.selectAll('.typeCircles').remove();
  var keys = Object.keys(data);

  //draw the 10th percentile
  var line1 = d3.select('#graph-g-type').selectAll('.area-circle').data(keys).enter().append('path');
  line1.attr('d', function (elem) {
    return d3.line()([[x(elem) + left(width), y(data[elem]["10"])], [x(elem) + right(width), y(data[elem]["10"])]]);
  }).attr('class', 'typeCircles').attr('stroke', 'black');

  //draw the 90th percentile
  var line2 = d3.select('#graph-g-type').selectAll('.area-circle').data(keys).enter().append('path');
  line2.attr('d', function (elem) {
    return d3.line()([[x(elem) + left(width), y(data[elem]["90"])], [x(elem) + right(width), y(data[elem]["90"])]]);
  }).attr('class', 'typeCircles').attr('stroke', 'black');

  //draw the middle line
  var line3 = d3.select('#graph-g-type').selectAll('.area-circle').data(keys).enter().append('path');
  line3.attr('d', function (elem) {
    return d3.line()([[x(elem) + width / 2, y(data[elem]["10"])], [x(elem) + width / 2, y(data[elem]["90"])]]);
  }).attr('class', 'typeCircles').attr('stroke', 'black');

  //draw the rectangle
  var rect = d3.select('#graph-g-type').selectAll('.area-circle').data(keys).enter().append('rect');
  rect.attr('x', function (elem) {
    return x(elem) + left(width);
  }).attr('y', function (elem) {
    return y(data[elem]["75"]);
  }).attr('width', right(width) - left(width)).attr('height', function (elem) {
    return y(data[elem]["25"]) - y(data[elem]["75"]);
  }).attr('class', 'typeCircles').attr('stroke', 'black').attr('fill', '#69a3b2');

  //draw the median
  var median = d3.select('#graph-g-type').selectAll('.area-circle').data(keys).enter().append('path');
  median.attr('d', function (elem) {
    return d3.line()([[x(elem) + left(width), y(data[elem]["50"])], [x(elem) + right(width), y(data[elem]["50"])]]);
  }).attr('class', 'typeCircles').attr('stroke', 'black');
}
},{}],"indexPrixType.js":[function(require,module,exports) {
"use strict";

var helper = _interopRequireWildcard(require("./scripts/explCoutType/helper"));
var preproc = _interopRequireWildcard(require("./scripts/explCoutType/preprocess"));
var viz = _interopRequireWildcard(require("./scripts/explCoutType/viz"));
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
/**
 * @file This file is the entry-point for the the code for TP3 for the course INF8808.
 * @author Olivia Gélinas
 * @version v1.0.0
 */

(function (d3) {
  var margin = {
    top: 50,
    right: 0,
    bottom: 50,
    left: 75
  };
  var svgSize, graphSize, bounds;
  var xScale = d3.scaleBand();
  var yScale = d3.scaleLinear();
  var g = helper.generateG(margin);
  helper.appendAxes(g);
  helper.appendGraphLabels(g);
  d3.csv("Logement-Locatif-Viz/donnees_habitations.csv", d3.autoType).then(function (data) {
    var extracted_data = preproc.endResult(data);
    setSizing();
    build();
    function setSizing() {
      bounds = d3.select('.graph-prix-type').node().getBoundingClientRect();
      svgSize = {
        width: bounds.width,
        height: 700
      };
      graphSize = {
        width: svgSize.width - margin.right - margin.left,
        height: svgSize.height - margin.bottom - margin.top
      };
      helper.setCanvasSize(svgSize.width, svgSize.height);
    }
    function build() {
      helper.positionLabels(graphSize.width, graphSize.height);
      viz.updateXScale(xScale, extracted_data, graphSize.width);
      viz.updateYScale(yScale, extracted_data, graphSize.height);
      helper.drawXAxis(xScale, graphSize.height);
      helper.drawYAxis(yScale);
      viz.drawBoxes(yScale, xScale, extracted_data, graphSize.height);
    }
    window.addEventListener("resize", function () {
      setSizing();
      build();
    });
  });
})(d3);
},{"./scripts/explCoutType/helper":"scripts/explCoutType/helper.js","./scripts/explCoutType/preprocess":"scripts/explCoutType/preprocess.js","./scripts/explCoutType/viz":"scripts/explCoutType/viz.js"}],"../node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;
function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}
module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;
if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "34999" + '/');
  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);
    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);
          if (didAccept) {
            handled = true;
          }
        }
      });

      // Enable HMR for CSS by default.
      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });
      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }
    if (data.type === 'reload') {
      ws.close();
      ws.onclose = function () {
        location.reload();
      };
    }
    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }
    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}
function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);
  if (overlay) {
    overlay.remove();
  }
}
function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID;

  // html encode message and stack trace
  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}
function getParents(bundle, id) {
  var modules = bundle.modules;
  if (!modules) {
    return [];
  }
  var parents = [];
  var k, d, dep;
  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];
      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }
  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }
  return parents;
}
function hmrApply(bundle, asset) {
  var modules = bundle.modules;
  if (!modules) {
    return;
  }
  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}
function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;
  if (!modules) {
    return;
  }
  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }
  if (checkedAssets[id]) {
    return;
  }
  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);
  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }
  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}
function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};
  if (cached) {
    cached.hot.data = bundle.hotData;
  }
  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }
  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];
  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });
    return true;
  }
}
},{}]},{},["../node_modules/parcel-bundler/src/builtins/hmr-runtime.js","indexPrixType.js"], null)
//# sourceMappingURL=/indexPrixType.f4c5169c.js.map