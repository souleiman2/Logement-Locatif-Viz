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
})({"scripts/distDimensions/preprocess.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.endResult = endResult;
exports.getExtractedData = getExtractedData;
exports.getLinks = getLinks;
exports.getNodes = getNodes;
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit(arr, i) { var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"]; if (null != _i) { var _s, _e, _x, _r, _arr = [], _n = !0, _d = !1; try { if (_x = (_i = _i.call(arr)).next, 0 === i) { if (Object(_i) !== _i) return; _n = !1; } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0); } catch (err) { _d = !0, _e = err; } finally { try { if (!_n && null != _i.return && (_r = _i.return(), Object(_r) !== _r)) return; } finally { if (_d) throw _e; } } return _arr; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
/**
 * Extracts the number of bedrooms and the type from the original data
 *
 * @param {object[]} data the data to be used
 * @returns {object[]} The extracted data
 */
function getExtractedData(data) {
  return data.map(function (elem) {
    return {
      "nbBeds": elem["numberbedrooms"],
      "type": elem["unitype"]
    };
  });
}

/**
 * Transforms the data to get the nodes of the sankey diagram
 *
 * @param {object[]} data the data to be used
 * @returns {object[]} The color scale to be used inthe graph
 * Final format :
 * 
 * [
    {"node":0,"name":"node0"},
    {"node":1,"name":"node1"},
    {"node":2,"name":"node2"},
    {"node":3,"name":"node3"},
    {"node":4,"name":"node4"}
    ],
 * 
 */
function getNodes(data) {
  var ans = [];
  var index = 0;
  var temp = {};
  data.forEach(function (elem) {
    temp[elem["nbBeds"]] = temp.hasOwnProperty(elem["nbBeds"]) ? temp[elem["nbBeds"]] + 1 : 1;
  });
  var beds_keys = Object.keys(temp);
  var last_item = beds_keys.pop();
  beds_keys.sort(function (a, b) {
    return parseFloat(a) - parseFloat(b);
  });
  beds_keys.push(last_item);
  var total = 0;
  beds_keys.forEach(function (elem) {
    total += temp[elem];
    ans.push({
      node: index,
      name: temp[elem].toString() + (elem.toString() != "Not Available" ? " ont " : " ") + elem.toString() + (elem.toString() != "Not Available" ? " pièces" : "")
    });
    index += 1;
  });
  var centerIndex = index;
  ans.push({
    node: centerIndex,
    name: total.toString() + " habitations"
  });
  index += 1;
  temp = {};
  data.forEach(function (elem) {
    temp[elem["type"]] = temp.hasOwnProperty(elem["type"]) ? temp[elem["type"]] + 1 : 1;
  });
  var type_keys = Object.keys(temp);
  type_keys.forEach(function (elem) {
    ans.push({
      node: index,
      name: temp[elem].toString() + " " + elem.toString()
    });
    index += 1;
  });
  return [ans, centerIndex];
}

/**
 * Defines the different links between the nodes
 *
 * @param {object[]} data the data to be used
 * @returns {object[]} The links between the nodes
 * 
 * Final format : 
 * 
 *  [
    {"source":0,"target":2,"value":2},
    {"source":1,"target":2,"value":2},
    {"source":1,"target":3,"value":2},
    {"source":0,"target":4,"value":2},
    {"source":2,"target":3,"value":2},
    {"source":2,"target":4,"value":2},
    {"source":3,"target":4,"value":4}
    ]}
 * 
 */
function getLinks(nodes, centerIndex) {
  var links = [];
  var index = 0;
  for (var i = 0; i < centerIndex; i++) {
    var valueTemp = parseInt(nodes[i]["name"].split(" ")[0]);
    links.push({
      source: i,
      target: centerIndex,
      value: valueTemp
    });
  }
  for (var _i = centerIndex + 1; _i < nodes.length; _i++) {
    var _valueTemp = parseInt(nodes[_i]["name"].split(" ")[0]);
    links.push({
      source: centerIndex,
      target: _i,
      value: _valueTemp
    });
  }
  return links;
}

/**
 * Processes the data
 *
 * @param {object[]} data the data to be used
 * @returns {object} Nodes and the links for the sankey diagram 
 */
function endResult(data) {
  var extracted_data = getExtractedData(data);
  var _getNodes = getNodes(extracted_data),
    _getNodes2 = _slicedToArray(_getNodes, 2),
    nodesTemp = _getNodes2[0],
    centerIndex = _getNodes2[1];
  var linksTemp = getLinks(nodesTemp, centerIndex);
  return {
    nodes: nodesTemp,
    links: linksTemp
  };
}
},{}],"indexDistDimen.js":[function(require,module,exports) {
"use strict";

var preproc = _interopRequireWildcard(require("./scripts/distDimensions/preprocess"));
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
// link : https://gist.github.com/d3noob/d0a65a5526872728400758d4b7de582c (license MIT)

(function (d3) {
  var units = "Widgets";

  // set the dimensions and margins of the graph
  var margin = {
      top: 10,
      right: 10,
      bottom: 10,
      left: 10
    },
    width = 1000 - margin.left - margin.right,
    height = 700 - margin.top - margin.bottom;

  // format variables
  var formatNumber = d3.format(",.0f"),
    // zero decimal places
    format = function format(d) {
      return formatNumber(d) + " " + units;
    },
    color = d3.scaleOrdinal(d3.schemeCategory10);

  // append the svg object to the body of the page
  var svg = d3.select("#chart").append("svg").attr("width", width + margin.left + margin.right).attr("height", height + margin.top + margin.bottom).append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  // Set the sankey diagram properties
  var sankey = d3.sankey().nodeWidth(36).nodePadding(40).size([width, height]);
  var path = sankey.link();
  d3.csv("./donnees_habitations.csv", d3.autoType).then(function (data) {
    var graph = preproc.endResult(data);
    sankey.nodes(graph.nodes).links(graph.links).layout(32);

    // add in the links
    var link = svg.append("g").selectAll(".link").data(graph.links).enter().append("path").attr("class", "link").attr("d", path).style("stroke-width", function (d) {
      return Math.max(1, d.dy);
    }).sort(function (a, b) {
      return b.dy - a.dy;
    });

    // add the link titles
    link.append("title").text(function (d) {
      return d.source.name + " → " + d.target.name + "\n" + format(d.value);
    });

    // add in the nodes
    var node = svg.append("g").selectAll(".node").data(graph.nodes).enter().append("g").attr("class", "node").attr("transform", function (d) {
      return "translate(" + d.x + "," + d.y + ")";
    }).call(d3.drag().subject(function (d) {
      return d;
    }).on("start", function () {
      this.parentNode.appendChild(this);
    }).on("drag", dragmove));

    // add the rectangles for the nodes
    node.append("rect").attr("height", function (d) {
      return d.dy;
    }).attr("width", sankey.nodeWidth()).style("fill", function (d) {
      return d.color = color(d.name.replace(/ .*/, ""));
    }).style("stroke", function (d) {
      return d3.rgb(d.color).darker(2);
    }).append("title").text(function (d) {
      return d.name + "\n" + format(d.value);
    });

    // add in the title for the nodes
    node.append("text").attr("x", -6).attr("y", function (d) {
      return d.dy / 2;
    }).attr("dy", ".35em").attr("text-anchor", "end").attr("transform", null).text(function (d) {
      return d.name;
    }).filter(function (d) {
      return d.x < width / 2;
    }).attr("x", 6 + sankey.nodeWidth()).attr("text-anchor", "start");

    // the function for moving the nodes
    function dragmove(d) {
      d3.select(this).attr("transform", "translate(" + (d.x = Math.max(0, Math.min(width - d.dx, d3.event.x))) + "," + (d.y = Math.max(0, Math.min(height - d.dy, d3.event.y))) + ")");
      sankey.relayout();
      link.attr("d", path);
    }
  });
})(d3);
},{"./scripts/distDimensions/preprocess":"scripts/distDimensions/preprocess.js"}],"../node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
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
},{}]},{},["../node_modules/parcel-bundler/src/builtins/hmr-runtime.js","indexDistDimen.js"], null)
//# sourceMappingURL=/indexDistDimen.e515510a.js.map