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
})({"scripts/explCoutArea/helper.js":[function(require,module,exports) {
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
  return d3.select('.graph-prix-area').select('svg').append('g').attr('id', 'graph-g-area').attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');
}

/**
 * Appends an SVG g element which will contain the y axis.
 *
 * @param {*} g The d3 Selection of the graph's g SVG element
 */
function appendAxes(g) {
  g.append('g').attr('class', 'x axis-area');
  g.append('g').attr('class', 'y axis-area');
}
/**
 * Appends the labels for the the y axis and the title of the graph.
 *
 * @param {*} g The d3 Selection of the graph's g SVG element
 */
function appendGraphLabels(g) {
  g.append('text').text('Prix ($)').attr('class', 'y axis-text area').attr('transform', 'rotate(-90)').attr('fill', '#898989').attr('font-size', 12);
  g.append('text').text("Taille du logement (pieds carrés)").attr('class', 'x axis-text area').attr('fill', '#898989').attr('font-size', 12);
  g.append('text').text('Prix en fonction de la taille du logement').attr('class', 'title area').attr('fill', '#898989');
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
  d3.select('#bar-chart-prix-area').select('svg').attr('width', width + 210).attr('height', height);
}

/**
 * Positions the x axis label, y axis label and title label on the graph.
 *
 * @param {number} width The width of the graph
 * @param {number} height The height of the graph
 */
function positionLabels(width, height) {
  d3.select('.y.axis-text.area').attr('x', -70).attr('y', height / 2);
  d3.select('.x.axis-text.area').attr('x', width / 2).attr('y', height + 40);
  d3.select('.title.area').attr('x', width / 2).attr('y', -35);
}

/**
 * Draws the x axis at the bottom of the plot.
 *
 * @param {*} xScale The scale to use for the x axis
 * @param {number} height The height of the graph
 */
function drawXAxis(xScale, height) {
  d3.select('.x.axis-area').attr('transform', 'translate(0, ' + height + ')').call(d3.axisBottom(xScale));
}

/**
 * Draws the y axis at the left of the plot.
 *
 * @param {*} yScale The scale to use for the y axis
 */
function drawYAxis(yScale) {
  d3.select('.y.axis-area').call(d3.axisLeft(yScale).ticks(5));
}
},{}],"scripts/explCoutArea/preprocess.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.endResult = endResult;
/**
 * Extracts the price and the area of the mainstream data
 *
 * @param {object[]} data the data to be used
 * @returns {object[]} The extracted data
 */
function extractPriceArea(data) {
  return data.map(function (elem) {
    return {
      "type": elem["unitype"],
      "price": elem["price"],
      "area": elem["areainfeet"]
    };
  });
}

/**
 * Cleans the data
 *
 * @param {object[]} data the data to be used
 * @returns {object[]} The cleaned data
 */
function cleanData(data) {
  return data.filter(function (elem) {
    return elem["price"] > 0 && elem["area"] > 10 && elem["area"] < 4000;
  });
}

/**
 * Defines the color scale used in the graph.
 *
 * @param {object[]} data the data to be used
 * @returns {object[]} The processed data
 */
function endResult(data) {
  var extracted_data = extractPriceArea(data);
  var cleaned_data = cleanData(extracted_data);
  return cleaned_data;
}
},{}],"scripts/explCoutArea/viz.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.drawCircles = drawCircles;
exports.updateXScale = updateXScale;
exports.updateYScale = updateYScale;
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
/**
 * Sets the domain and range of the X scale.
 *
 * @param {*} scale The x scale
 * @param {object[]} data The data to be used
 * @param {number} width The width of the graph
 */
function updateXScale(scale, data, width) {
  // TODO : Set the domain and range of the groups' x scale
  var temp = data.map(function (elem) {
    return elem["area"];
  });
  scale.domain([Math.min.apply(Math, _toConsumableArray(temp)), Math.max.apply(Math, _toConsumableArray(temp))]).range([0, width]);
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
  var temp = data.map(function (elem) {
    return elem["price"];
  });
  scale.domain([Math.min.apply(Math, _toConsumableArray(temp)), Math.max.apply(Math, _toConsumableArray(temp))]).range([height, 0]);
}

/**
 * Draws the circles
 *
 * @param {*} y The graph's y scale
 * @param {*} x The graph's x scale
 * @param {*} data The data to be used
 * @param {*} tip The tooltip to show when each bar is hovered and hide when it's not
 */
function drawCircles(y, x, data) {
  // TODO : Draw the bars

  d3.selectAll(".areaCircles").remove();
  var circle = d3.select('#graph-g-area').selectAll('.area-circle').data(data).enter().append('circle');
  circle.attr('cx', function (elem) {
    return x(elem["area"]);
  }).attr('cy', function (elem) {
    return y(elem["price"]);
  }).attr('r', 5).attr('class', "areaCircles").attr('stroke', 'black').attr('fill', function (elem) {
    return color(elem["type"]);
  });
}
function color(type) {
  switch (type) {
    case "apartment":
      return "#ffb997";
    case "condo":
      return "#f67e7d";
    case "duplex-triplex":
      return "#040926";
    case "house":
      return "#3CAEA3";
    default:
      return "#69a3b2";
  }
}
},{}],"scripts/explCoutArea/legend.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.drawLegend = drawLegend;
/**
 * Draws the legend.
 *
 * @param {*} g The d3 Selection of the graph's g SVG element
 * @param {number} width The width of the graph, used to place the legend
 */
function drawLegend(g, width) {
  // TODO : Draw the legend using d3Legend
  // For help, see : https://d3-legend.susielu.com/
  var data = ["Apartement", "Condo", "duplex-triplex"];
  var TOP_LEGEND_TITLE = -30;
  var TOP_LEGEND = -10;
  var MARGIN = 10;
  d3.selectAll(".areaLegend").remove();
  g.append('text').text('Légende').attr('font-weight', "bold").attr("class", "areaLegend").attr("transform", "translate(" + (width + MARGIN).toString() + "," + TOP_LEGEND.toString() + ")");
  g.append('text').text("Appartement").attr('font-weight', "bold").attr("class", "areaLegend").attr("transform", "translate(" + (width + MARGIN + 20).toString() + "," + (TOP_LEGEND_TITLE + 50).toString() + ")");
  g.append('text').text("Condo").attr('font-weight', "bold").attr("class", "areaLegend").attr("transform", "translate(" + (width + MARGIN + 20).toString() + "," + (TOP_LEGEND_TITLE + 75).toString() + ")");
  g.append('text').text("duplex-triplex").attr('font-weight', "bold").attr("class", "areaLegend").attr("transform", "translate(" + (width + MARGIN + 20).toString() + "," + (TOP_LEGEND_TITLE + 100).toString() + ")");
  g.append('text').text("Maison").attr('font-weight', "bold").attr("class", "areaLegend").attr("transform", "translate(" + (width + MARGIN + 20).toString() + "," + (TOP_LEGEND_TITLE + 125).toString() + ")");
  g.append('rect').attr("width", "15").attr("height", "15").attr("fill", "#ffb997").attr("class", "areaLegend").attr("transform", "translate(" + (width + MARGIN).toString() + "," + (TOP_LEGEND_TITLE + 38).toString() + ")");
  g.append('rect').attr("width", "15").attr("height", "15").attr("fill", "#f67e7d").attr("class", "areaLegend").attr("transform", "translate(" + (width + MARGIN).toString() + "," + (TOP_LEGEND_TITLE + 63).toString() + ")");
  g.append('rect').attr("width", "15").attr("height", "15").attr("fill", "#040926").attr("class", "areaLegend").attr("transform", "translate(" + (width + MARGIN).toString() + "," + (TOP_LEGEND_TITLE + 88).toString() + ")");
  g.append('rect').attr("width", "15").attr("height", "15").attr("fill", "#3CAEA3").attr("class", "areaLegend").attr("transform", "translate(" + (width + MARGIN).toString() + "," + (TOP_LEGEND_TITLE + 113).toString() + ")");
}
},{}],"indexPrixGrandeur.js":[function(require,module,exports) {
"use strict";

var helper = _interopRequireWildcard(require("./scripts/explCoutArea/helper"));
var preproc = _interopRequireWildcard(require("./scripts/explCoutArea/preprocess"));
var viz = _interopRequireWildcard(require("./scripts/explCoutArea/viz"));
var legend = _interopRequireWildcard(require("./scripts/explCoutArea/legend.js"));
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
  var xScale = d3.scaleLinear();
  var yScale = d3.scaleLinear();
  var g = helper.generateG(margin);
  helper.appendAxes(g);
  helper.appendGraphLabels(g);
  d3.csv("./donnees_habitations.csv", d3.autoType).then(function (data) {
    var extracted_data = preproc.endResult(data);
    setSizing();
    build();
    function setSizing() {
      bounds = d3.select('.graph-prix-area').node().getBoundingClientRect();
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
      viz.drawCircles(yScale, xScale, extracted_data);
      legend.drawLegend(g, graphSize.width);
    }
    window.addEventListener("resize", function () {
      setSizing();
      build();
    });
  });
})(d3);
},{"./scripts/explCoutArea/helper":"scripts/explCoutArea/helper.js","./scripts/explCoutArea/preprocess":"scripts/explCoutArea/preprocess.js","./scripts/explCoutArea/viz":"scripts/explCoutArea/viz.js","./scripts/explCoutArea/legend.js":"scripts/explCoutArea/legend.js"}],"../node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
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
},{}]},{},["../node_modules/parcel-bundler/src/builtins/hmr-runtime.js","indexPrixGrandeur.js"], null)
//# sourceMappingURL=/indexPrixGrandeur.cc7ba5ed.js.map