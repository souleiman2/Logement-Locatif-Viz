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
})({"scripts/fluctCout/helper.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.appendAxes = appendAxes;
exports.appendGraphLabels = appendGraphLabels;
exports.drawXAxis = drawXAxis;
exports.drawYAxis = drawYAxis;
exports.generateG = generateG;
exports.placeTitle = placeTitle;
exports.setCanvasSize = setCanvasSize;
/**
 * Generates the SVG element g which will contain the data visualisation.
 *
 * @param {object} margin The desired margins around the graph
 * @returns {*} The d3 Selection for the created g element
 */
function generateG(margin) {
  return d3.select('.graph-bubble').select('svg').append('g').attr('id', 'graph-g-bubble').attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');
}

/**
 * Sets the size of the SVG canvas containing the graph.
 *
 * @param {number} width The desired width
 * @param {number} height The desired height
 */
function setCanvasSize(width, height) {
  d3.select('#bubble-chart').attr('width', width).attr('height', height);
}

/**
 * Appends an SVG g element which will contain the axes.
 *
 * @param {*} g The d3 Selection of the graph's g SVG element
 */
function appendAxes(g) {
  g.append('g').attr('class', 'x axis bubble');
  g.append('g').attr('class', 'y axis bubble');
}
/**
 * Appends the labels for the the y axis and the title of the graph.
 *
 * @param {*} g The d3 Selection of the graph's g SVG element
 */
function appendGraphLabels(g) {
  g.append('text').text('prix moyen des propriétés ($)').attr('class', 'y axis-text').attr('font-size', 15);
  g.append('text').text('Mois').attr('class', 'x axis-text').attr('font-size', 15);
}

/**
 * Draws the X axis at the bottom of the diagram.
 *
 * @param {*} xScale The scale to use to draw the axis
 * @param {number} height The height of the graphic
 */
function drawXAxis(xScale, height) {
  d3.select('.x.axis.bubble').attr('transform', 'translate( 0, ' + height + ')').call(d3.axisBottom(xScale).tickSizeOuter(0));
}

/**
 * Draws the Y axis to the left of the diagram.
 *
 * @param {*} yScale The scale to use to draw the axis
 */
function drawYAxis(yScale) {
  d3.select('.y.axis.bubble').call(d3.axisLeft(yScale).tickSizeOuter(0).tickArguments([5]));
}

/**
 * Places the graph's title.
 *
 * @param {*} g The d3 Selection of the graph's g SVG element
 */
function placeTitle(g) {
  g.append('text').attr('class', 'title-bubble').attr('x', 0).attr('y', -20).attr('font-size', 14);
}
},{}],"scripts/fluctCout/scales.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setColorScale = setColorScale;
exports.setRadiusScale = setRadiusScale;
exports.setXScale = setXScale;
exports.setYScale = setYScale;
/**
 * Defines the scale to use for the circle markers' radius.
 *
 * The radius of the circle is linearly proportinal to the population of the given country.
 *
 * The radius is a value defined in the interval [5, 20].
 *
 * @param {object} data The data to be displayed
 * @returns {*} The linear scale used to determine the radius
 */
function setRadiusScale(data) {
  // TODO : Set scale
  var MAXI = 30;
  var MINI = 5;
  data = data.slice(6, data.length - 2);
  var total_maxi = -Infinity;
  var total_mini = Infinity;
  for (var i = 0; i < data.length; i++) {
    if (data[i]["total"] > total_maxi) {
      total_maxi = data[i]["total"];
    }
    if (data[i]["total"] < total_mini) {
      total_mini = data[i]["total"];
    }
  }
  return d3.scaleLinear().domain([total_mini, total_maxi]).range([MINI, MAXI]);
}

/**
 * Defines the color scale used to determine the color of the circle markers.
 *
 * The color of each circle is determined based on the continent of the country it represents.
 *
 * The possible colors are determined by the scheme d3.schemeCategory10.
 *
 * @returns {Function} The ordinal scale used to determine the color
 */
function setColorScale() {
  // TODO : Set scale

  var colorScale = function colorScale(continent) {
    var POSSIBLE_CONTINENT = ["Africa", "Asia", "Europe", "North America", "Oceania", "South America"];
    var POSSIBLE_COLORS = d3.schemeCategory10;
    for (var i = 0; i < POSSIBLE_CONTINENT.length; i++) {
      if (continent === POSSIBLE_CONTINENT[i]) {
        return POSSIBLE_COLORS[i];
      }
    }
    return POSSIBLE_COLORS[POSSIBLE_CONTINENT.length];
  };
  return colorScale;
}

/**
 * Defines the X scale.
 *
 * @param {number} width The width of the graph
 * @param {object} data The data to be used
 * @returns {*} The linear scale in X
 */
function setXScale(width) {
  var months = ["Jan 20", "Fev 20", "Mar 20", "Avr 20", "Mai 20", "Jun 20", "Jui 20", "Aou 20", "Sep 20", "Oct 20", "Nov 20", "Dec 20", "Jan 21", "Fev 21", "Mar 21", "Avr 21", "Mai 21", "Jun 21", "Jui 21", "Aou 21", "Sep 21", "Oct 21", "Nov 21", "Dec 21"];
  return d3.scaleBand().domain(months).range([0, width]);
}

/**
 * Defines the Y scale.
 *
 * @param {number} height The height of the graph
 * @param {object} data The data to be used
 * @returns {*} The linear scale in Y
 */
function setYScale(height, data) {
  var total_maxi = -Infinity;
  var total_mini = Infinity;
  for (var i = 0; i < data.length; i++) {
    if (data[i]["price"] > total_maxi) {
      total_maxi = data[i]["price"];
    }
    if (data[i]["price"] < total_mini) {
      total_mini = data[i]["price"];
    }
  }
  return d3.scaleLinear().domain([total_mini, total_maxi]).range([height, 0]);
}
},{}],"scripts/fluctCout/viz.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.drawCircles = drawCircles;
exports.moveCircles = moveCircles;
exports.positionLabels = positionLabels;
exports.setCircleHoverHandler = setCircleHoverHandler;
exports.setTitleText = setTitleText;
/**
 * Positions the x axis label and y axis label.
 *
 * @param {*} g The d3 Selection of the graph's g SVG element
 * @param {number} width The width of the graph
 * @param {number} height The height of the graph
 */

var months = ["Jan 20", "Fev 20", "Mar 20", "Avr 20", "Mai 20", "Jun 20", "Jui 20", "Aou 20", "Sep 20", "Oct 20", "Nov 20", "Dec 20", "Jan 21", "Fev 21", "Mar 21", "Avr 21", "Mai 21", "Jun 21", "Jui 21", "Aou 21", "Sep 21", "Oct 21", "Nov 21", "Dec 21"];
function positionLabels(g, width, height) {
  // TODO : Position axis labels
  var y_label = g.select('.y.axis-text');
  var ROTATION = -90;
  var X_TRANSLATION = -50;
  var HEIGHT_OFFSET = 40;
  y_label.attr('transform', "translate(".concat(X_TRANSLATION, ", ").concat(height / 2, ") rotate(").concat(ROTATION, ")"));
  var x_label = g.select('.x.axis-text');
  x_label.attr('transform', "translate(".concat((width / 2).toString(), ", ").concat(height + HEIGHT_OFFSET, ")"));
}

/**
 * Draws the circles on the graph.
 *
 * @param {object} data The data to bind to
 * @param {*} rScale The scale for the circles' radius
 * @param {*} colorScale The scale for the circles' color
 */
function drawCircles(data, rScale, tip) {
  // TODO : Draw the bubble chart's circles
  // Each circle's size depends on its population
  // and each circle's color depends on its continent.
  // The fill opacity of each circle is 70%
  // The outline of the circles is white

  var PARTIAL_OPACITY = 0.7;
  var MARGIN = 75;
  var g = d3.select('#graph-g-bubble');
  var offset = d3.select('.x.axis.bubble').node().getBoundingClientRect().height;
  var height = g.node().getBoundingClientRect().height - offset;
  d3.selectAll(".circles").remove();
  g.selectAll().data(data).enter().append("circle").attr('cx', 0).attr('cy', height - MARGIN).attr('r', function (d) {
    return rScale(d.total);
  }).attr('stroke', 'black').attr("opacity", PARTIAL_OPACITY).attr('class', "circles-bubble").attr('fill', function (d) {
    return '#e377c2';
  });
  setCircleHoverHandler(tip);
}

/**
 * Sets up the hover event handler. The tooltip should show on on hover.
 *
 * @param {*} tip The tooltip
 */
function setCircleHoverHandler(tip) {
  // TODO : Set hover handler. The tooltip shows on
  // hover and the opacity goes up to 100% (from 70%)
  var FULL_OPACITY = 1;
  var PARTIAL_OPACITY = 0.7;
  d3.selectAll(".circles-bubble").on('mouseover', function (d) {
    d3.select(this).attr("opacity", FULL_OPACITY);
    tip.show(d, this);
  }).on('mouseout', function (d) {
    d3.select(this).attr("opacity", PARTIAL_OPACITY);
    tip.hide(d, this);
  });
}

/**
 * Updates the position of the circles based on their bound data. The position
 * transitions gradually.
 *
 * @param {*} xScale The x scale used to position the circles
 * @param {*} yScale The y scale used to position the circles
 * @param {number} transitionDuration The duration of the transition
 */
function moveCircles(xScale, yScale, data) {
  // TODO : Set up the transition and place the circle centers
  // in x and y according to their GDP and CO2 respectively
  d3.select('#graph-g-bubble').selectAll('circle').transition().ease(d3.easeLinear).attr("cx", function (d) {
    return xScale(months[data.indexOf(d)]) + 28;
  }).attr("cy", function (d) {
    return yScale(d.price);
  });
}
function setTitleText(title) {
  // TODO : Set the title
  var FONT_SIZE = 14;
  var MARGIN = 10;
  var g = d3.select('#graph-g-bubble');
  g.append('text').text(title.toString()).attr('id', 'title-bubble').attr('transform', 'translate(0, -' + MARGIN.toString() + ')').attr('font-size', FONT_SIZE).attr('font-weight', "bolder");
}
},{}],"scripts/fluctCout/tooltip.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getContents = getContents;
/**
 * Defines the contents of the tooltip. See CSS for tooltip styling. The tooltip
 * features the country name, population, GDP, and CO2 emissions, preceded
 * by a label and followed by units where applicable.
 *
 * @param {object} d The data associated to the hovered element
 * @returns {string} The tooltip contents
 */

var months = ["Jan 20", "Fev 20", "Mar 20", "Avr 20", "Mai 20", "Jun 20", "Jui 20", "Aou 20", "Sep 20", "Oct 20", "Nov 20", "Dec 20", "Jan 21", "Fev 21", "Mar 21", "Avr 21", "Mai 21", "Jun 21", "Jui 21", "Aou 21", "Sep 21", "Oct 21", "Nov 21", "Dec 21"];
function getContents(d, data) {
  // TODO : Generate tooltip contents
  return "<div style='font-weight:normal'>\n            <b>Mois :</b> ".concat(months[data.indexOf(d)], "<br/>\n            <b>Nombre de logement \xE0 louer :</b> ").concat(d.total, "<br/>\n            <b>Prix moyen :</b> ").concat(Math.round(d.price), " $<br/>\n          </div>");
}
},{}],"scripts/fluctCout/preprocess.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getAveragePricePerHouseTypePerMonth = getAveragePricePerHouseTypePerMonth;
exports.getHouseTypes = getHouseTypes;
exports.getMonthsRange = getMonthsRange;
function getHouseTypes(data) {
  var unitype = new Array();
  data.forEach(function (listing) {
    if (!unitype.includes(listing.unitype)) unitype.push(listing.unitype);
  });
  return unitype;
}
var month = ["Janvier", "Fevrier", "Mars", "Avril", "Mai", "Juin", "Juillet", "Aout", "Septembre", "Octobre", "Novembre", "Decembre"];
function getMonthsRange(data) {
  var max = 0;
  var min = 11;
  data.forEach(function (listing) {
    if (listing.dateavailable !== null) {
      if (listing.dateavailable.getYear() - 100 === 20 && listing.dateavailable.getMonth() < min) {
        min = listing.dateavailable.getMonth();
      } else if (listing.dateavailable.getYear() - 100 === 21 && listing.dateavailable.getMonth() > max) {
        max = listing.dateavailable.getMonth();
      }
    }
  });
  // min 2020, max 2021
  return [min, max];
}
function getAveragePricePerHouseTypePerMonth(data) {
  var arr = getHouseTypes(data);
  var i = 0;
  var price_count = [];
  for (var index = 0; index < 24; index++) {
    var obj = {};
    obj["price_per_house"] = {};
    for (var i = 0; i < arr.length; i++) {
      obj[arr[i]] = 0;
      obj["price_per_house"][arr[i]] = 0;
    }
    obj["price"] = 0;
    obj["total"] = 0;
    price_count.push(obj);
  }
  var map = new Map();
  data.forEach(function (listing) {
    if (listing.dateavailable !== null) {
      listing.dateavailable.setHours(listing.dateavailable.getHours() + 5);
      if (!map.has(listing.unitype + " - " + month[listing.dateavailable.getMonth()] + " " + listing.dateavailable.getFullYear())) {
        map.set(listing.unitype + " - " + month[listing.dateavailable.getMonth()] + " " + listing.dateavailable.getFullYear(), {
          count: 1,
          sum: listing.price
        });
        if (listing.dateavailable.getFullYear() >= 2021) {
          price_count[listing.dateavailable.getMonth() + 12][listing.unitype] = 1;
          price_count[listing.dateavailable.getMonth() + 12]["price_per_house"][listing.unitype] = listing.price;
        } else {
          price_count[listing.dateavailable.getMonth()][listing.unitype] = 1;
          price_count[listing.dateavailable.getMonth()]["price_per_house"][listing.unitype] = listing.price;
        }
      } else {
        map.get(listing.unitype + " - " + month[listing.dateavailable.getMonth()] + " " + listing.dateavailable.getFullYear()).count++;
        map.get(listing.unitype + " - " + month[listing.dateavailable.getMonth()] + " " + listing.dateavailable.getFullYear()).sum += listing.price;
        if (listing.dateavailable.getFullYear() >= 2021) {
          price_count[listing.dateavailable.getMonth() + 12]["price_per_house"][listing.unitype] = map.get(listing.unitype + " - " + month[listing.dateavailable.getMonth()] + " " + listing.dateavailable.getFullYear()).sum;
          price_count[listing.dateavailable.getMonth() + 12][listing.unitype] = map.get(listing.unitype + " - " + month[listing.dateavailable.getMonth()] + " " + listing.dateavailable.getFullYear()).count;
        } else {
          price_count[listing.dateavailable.getMonth()]["price_per_house"][listing.unitype] = map.get(listing.unitype + " - " + month[listing.dateavailable.getMonth()] + " " + listing.dateavailable.getFullYear()).sum;
          price_count[listing.dateavailable.getMonth()][listing.unitype] = map.get(listing.unitype + " - " + month[listing.dateavailable.getMonth()] + " " + listing.dateavailable.getFullYear()).count;
        }
      }
    }
  });
  price_count.forEach(function (obj) {
    obj.total = obj["apartment"] + obj["basement-apartment"] + obj["condo"] + obj["duplex-triplex"] + obj["house"];
    if (obj.total !== 0) obj.price = (obj["price_per_house"]["apartment"] + obj["price_per_house"]["basement-apartment"] + obj["price_per_house"]["condo"] + obj["price_per_house"]["duplex-triplex"] + obj["price_per_house"]["house"]) / obj.total;
  });
  return price_count;
}
},{}],"../node_modules/d3-collection/src/map.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.prefix = exports.default = void 0;
var prefix = "$";
exports.prefix = prefix;
function Map() {}
Map.prototype = map.prototype = {
  constructor: Map,
  has: function (key) {
    return prefix + key in this;
  },
  get: function (key) {
    return this[prefix + key];
  },
  set: function (key, value) {
    this[prefix + key] = value;
    return this;
  },
  remove: function (key) {
    var property = prefix + key;
    return property in this && delete this[property];
  },
  clear: function () {
    for (var property in this) if (property[0] === prefix) delete this[property];
  },
  keys: function () {
    var keys = [];
    for (var property in this) if (property[0] === prefix) keys.push(property.slice(1));
    return keys;
  },
  values: function () {
    var values = [];
    for (var property in this) if (property[0] === prefix) values.push(this[property]);
    return values;
  },
  entries: function () {
    var entries = [];
    for (var property in this) if (property[0] === prefix) entries.push({
      key: property.slice(1),
      value: this[property]
    });
    return entries;
  },
  size: function () {
    var size = 0;
    for (var property in this) if (property[0] === prefix) ++size;
    return size;
  },
  empty: function () {
    for (var property in this) if (property[0] === prefix) return false;
    return true;
  },
  each: function (f) {
    for (var property in this) if (property[0] === prefix) f(this[property], property.slice(1), this);
  }
};
function map(object, f) {
  var map = new Map();

  // Copy constructor.
  if (object instanceof Map) object.each(function (value, key) {
    map.set(key, value);
  });

  // Index array by numeric index or specified key function.
  else if (Array.isArray(object)) {
    var i = -1,
      n = object.length,
      o;
    if (f == null) while (++i < n) map.set(i, object[i]);else while (++i < n) map.set(f(o = object[i], i, object), o);
  }

  // Convert object to map.
  else if (object) for (var key in object) map.set(key, object[key]);
  return map;
}
var _default = map;
exports.default = _default;
},{}],"../node_modules/d3-collection/src/nest.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;
var _map = _interopRequireDefault(require("./map"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _default() {
  var keys = [],
    sortKeys = [],
    sortValues,
    rollup,
    nest;
  function apply(array, depth, createResult, setResult) {
    if (depth >= keys.length) {
      if (sortValues != null) array.sort(sortValues);
      return rollup != null ? rollup(array) : array;
    }
    var i = -1,
      n = array.length,
      key = keys[depth++],
      keyValue,
      value,
      valuesByKey = (0, _map.default)(),
      values,
      result = createResult();
    while (++i < n) {
      if (values = valuesByKey.get(keyValue = key(value = array[i]) + "")) {
        values.push(value);
      } else {
        valuesByKey.set(keyValue, [value]);
      }
    }
    valuesByKey.each(function (values, key) {
      setResult(result, key, apply(values, depth, createResult, setResult));
    });
    return result;
  }
  function entries(map, depth) {
    if (++depth > keys.length) return map;
    var array,
      sortKey = sortKeys[depth - 1];
    if (rollup != null && depth >= keys.length) array = map.entries();else array = [], map.each(function (v, k) {
      array.push({
        key: k,
        values: entries(v, depth)
      });
    });
    return sortKey != null ? array.sort(function (a, b) {
      return sortKey(a.key, b.key);
    }) : array;
  }
  return nest = {
    object: function (array) {
      return apply(array, 0, createObject, setObject);
    },
    map: function (array) {
      return apply(array, 0, createMap, setMap);
    },
    entries: function (array) {
      return entries(apply(array, 0, createMap, setMap), 0);
    },
    key: function (d) {
      keys.push(d);
      return nest;
    },
    sortKeys: function (order) {
      sortKeys[keys.length - 1] = order;
      return nest;
    },
    sortValues: function (order) {
      sortValues = order;
      return nest;
    },
    rollup: function (f) {
      rollup = f;
      return nest;
    }
  };
}
function createObject() {
  return {};
}
function setObject(object, key, value) {
  object[key] = value;
}
function createMap() {
  return (0, _map.default)();
}
function setMap(map, key, value) {
  map.set(key, value);
}
},{"./map":"../node_modules/d3-collection/src/map.js"}],"../node_modules/d3-collection/src/set.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _map = _interopRequireWildcard(require("./map"));
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function Set() {}
var proto = _map.default.prototype;
Set.prototype = set.prototype = {
  constructor: Set,
  has: proto.has,
  add: function (value) {
    value += "";
    this[_map.prefix + value] = value;
    return this;
  },
  remove: proto.remove,
  clear: proto.clear,
  values: proto.keys,
  size: proto.size,
  empty: proto.empty,
  each: proto.each
};
function set(object, f) {
  var set = new Set();

  // Copy constructor.
  if (object instanceof Set) object.each(function (value) {
    set.add(value);
  });

  // Otherwise, assume it’s an array.
  else if (object) {
    var i = -1,
      n = object.length;
    if (f == null) while (++i < n) set.add(object[i]);else while (++i < n) set.add(f(object[i], i, object));
  }
  return set;
}
var _default = set;
exports.default = _default;
},{"./map":"../node_modules/d3-collection/src/map.js"}],"../node_modules/d3-collection/src/keys.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;
function _default(map) {
  var keys = [];
  for (var key in map) keys.push(key);
  return keys;
}
},{}],"../node_modules/d3-collection/src/values.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;
function _default(map) {
  var values = [];
  for (var key in map) values.push(map[key]);
  return values;
}
},{}],"../node_modules/d3-collection/src/entries.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;
function _default(map) {
  var entries = [];
  for (var key in map) entries.push({
    key: key,
    value: map[key]
  });
  return entries;
}
},{}],"../node_modules/d3-collection/src/index.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "entries", {
  enumerable: true,
  get: function () {
    return _entries.default;
  }
});
Object.defineProperty(exports, "keys", {
  enumerable: true,
  get: function () {
    return _keys.default;
  }
});
Object.defineProperty(exports, "map", {
  enumerable: true,
  get: function () {
    return _map.default;
  }
});
Object.defineProperty(exports, "nest", {
  enumerable: true,
  get: function () {
    return _nest.default;
  }
});
Object.defineProperty(exports, "set", {
  enumerable: true,
  get: function () {
    return _set.default;
  }
});
Object.defineProperty(exports, "values", {
  enumerable: true,
  get: function () {
    return _values.default;
  }
});
var _nest = _interopRequireDefault(require("./nest"));
var _set = _interopRequireDefault(require("./set"));
var _map = _interopRequireDefault(require("./map"));
var _keys = _interopRequireDefault(require("./keys"));
var _values = _interopRequireDefault(require("./values"));
var _entries = _interopRequireDefault(require("./entries"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
},{"./nest":"../node_modules/d3-collection/src/nest.js","./set":"../node_modules/d3-collection/src/set.js","./map":"../node_modules/d3-collection/src/map.js","./keys":"../node_modules/d3-collection/src/keys.js","./values":"../node_modules/d3-collection/src/values.js","./entries":"../node_modules/d3-collection/src/entries.js"}],"../node_modules/d3-selection/src/namespaces.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.xhtml = exports.default = void 0;
var xhtml = "http://www.w3.org/1999/xhtml";
exports.xhtml = xhtml;
var _default = {
  svg: "http://www.w3.org/2000/svg",
  xhtml: xhtml,
  xlink: "http://www.w3.org/1999/xlink",
  xml: "http://www.w3.org/XML/1998/namespace",
  xmlns: "http://www.w3.org/2000/xmlns/"
};
exports.default = _default;
},{}],"../node_modules/d3-selection/src/namespace.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;
var _namespaces = _interopRequireDefault(require("./namespaces"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _default(name) {
  var prefix = name += "",
    i = prefix.indexOf(":");
  if (i >= 0 && (prefix = name.slice(0, i)) !== "xmlns") name = name.slice(i + 1);
  return _namespaces.default.hasOwnProperty(prefix) ? {
    space: _namespaces.default[prefix],
    local: name
  } : name;
}
},{"./namespaces":"../node_modules/d3-selection/src/namespaces.js"}],"../node_modules/d3-selection/src/creator.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;
var _namespace = _interopRequireDefault(require("./namespace"));
var _namespaces = require("./namespaces");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function creatorInherit(name) {
  return function () {
    var document = this.ownerDocument,
      uri = this.namespaceURI;
    return uri === _namespaces.xhtml && document.documentElement.namespaceURI === _namespaces.xhtml ? document.createElement(name) : document.createElementNS(uri, name);
  };
}
function creatorFixed(fullname) {
  return function () {
    return this.ownerDocument.createElementNS(fullname.space, fullname.local);
  };
}
function _default(name) {
  var fullname = (0, _namespace.default)(name);
  return (fullname.local ? creatorFixed : creatorInherit)(fullname);
}
},{"./namespace":"../node_modules/d3-selection/src/namespace.js","./namespaces":"../node_modules/d3-selection/src/namespaces.js"}],"../node_modules/d3-selection/src/selector.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;
function none() {}
function _default(selector) {
  return selector == null ? none : function () {
    return this.querySelector(selector);
  };
}
},{}],"../node_modules/d3-selection/src/selection/select.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;
var _index = require("./index");
var _selector = _interopRequireDefault(require("../selector"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _default(select) {
  if (typeof select !== "function") select = (0, _selector.default)(select);
  for (var groups = this._groups, m = groups.length, subgroups = new Array(m), j = 0; j < m; ++j) {
    for (var group = groups[j], n = group.length, subgroup = subgroups[j] = new Array(n), node, subnode, i = 0; i < n; ++i) {
      if ((node = group[i]) && (subnode = select.call(node, node.__data__, i, group))) {
        if ("__data__" in node) subnode.__data__ = node.__data__;
        subgroup[i] = subnode;
      }
    }
  }
  return new _index.Selection(subgroups, this._parents);
}
},{"./index":"../node_modules/d3-selection/src/selection/index.js","../selector":"../node_modules/d3-selection/src/selector.js"}],"../node_modules/d3-selection/src/selectorAll.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;
function empty() {
  return [];
}
function _default(selector) {
  return selector == null ? empty : function () {
    return this.querySelectorAll(selector);
  };
}
},{}],"../node_modules/d3-selection/src/selection/selectAll.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;
var _index = require("./index");
var _selectorAll = _interopRequireDefault(require("../selectorAll"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _default(select) {
  if (typeof select !== "function") select = (0, _selectorAll.default)(select);
  for (var groups = this._groups, m = groups.length, subgroups = [], parents = [], j = 0; j < m; ++j) {
    for (var group = groups[j], n = group.length, node, i = 0; i < n; ++i) {
      if (node = group[i]) {
        subgroups.push(select.call(node, node.__data__, i, group));
        parents.push(node);
      }
    }
  }
  return new _index.Selection(subgroups, parents);
}
},{"./index":"../node_modules/d3-selection/src/selection/index.js","../selectorAll":"../node_modules/d3-selection/src/selectorAll.js"}],"../node_modules/d3-selection/src/matcher.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;
function _default(selector) {
  return function () {
    return this.matches(selector);
  };
}
},{}],"../node_modules/d3-selection/src/selection/filter.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;
var _index = require("./index");
var _matcher = _interopRequireDefault(require("../matcher"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _default(match) {
  if (typeof match !== "function") match = (0, _matcher.default)(match);
  for (var groups = this._groups, m = groups.length, subgroups = new Array(m), j = 0; j < m; ++j) {
    for (var group = groups[j], n = group.length, subgroup = subgroups[j] = [], node, i = 0; i < n; ++i) {
      if ((node = group[i]) && match.call(node, node.__data__, i, group)) {
        subgroup.push(node);
      }
    }
  }
  return new _index.Selection(subgroups, this._parents);
}
},{"./index":"../node_modules/d3-selection/src/selection/index.js","../matcher":"../node_modules/d3-selection/src/matcher.js"}],"../node_modules/d3-selection/src/selection/sparse.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;
function _default(update) {
  return new Array(update.length);
}
},{}],"../node_modules/d3-selection/src/selection/enter.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EnterNode = EnterNode;
exports.default = _default;
var _sparse = _interopRequireDefault(require("./sparse"));
var _index = require("./index");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _default() {
  return new _index.Selection(this._enter || this._groups.map(_sparse.default), this._parents);
}
function EnterNode(parent, datum) {
  this.ownerDocument = parent.ownerDocument;
  this.namespaceURI = parent.namespaceURI;
  this._next = null;
  this._parent = parent;
  this.__data__ = datum;
}
EnterNode.prototype = {
  constructor: EnterNode,
  appendChild: function (child) {
    return this._parent.insertBefore(child, this._next);
  },
  insertBefore: function (child, next) {
    return this._parent.insertBefore(child, next);
  },
  querySelector: function (selector) {
    return this._parent.querySelector(selector);
  },
  querySelectorAll: function (selector) {
    return this._parent.querySelectorAll(selector);
  }
};
},{"./sparse":"../node_modules/d3-selection/src/selection/sparse.js","./index":"../node_modules/d3-selection/src/selection/index.js"}],"../node_modules/d3-selection/src/constant.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;
function _default(x) {
  return function () {
    return x;
  };
}
},{}],"../node_modules/d3-selection/src/selection/data.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;
var _index = require("./index");
var _enter = require("./enter");
var _constant = _interopRequireDefault(require("../constant"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
var keyPrefix = "$"; // Protect against keys like “__proto__”.

function bindIndex(parent, group, enter, update, exit, data) {
  var i = 0,
    node,
    groupLength = group.length,
    dataLength = data.length;

  // Put any non-null nodes that fit into update.
  // Put any null nodes into enter.
  // Put any remaining data into enter.
  for (; i < dataLength; ++i) {
    if (node = group[i]) {
      node.__data__ = data[i];
      update[i] = node;
    } else {
      enter[i] = new _enter.EnterNode(parent, data[i]);
    }
  }

  // Put any non-null nodes that don’t fit into exit.
  for (; i < groupLength; ++i) {
    if (node = group[i]) {
      exit[i] = node;
    }
  }
}
function bindKey(parent, group, enter, update, exit, data, key) {
  var i,
    node,
    nodeByKeyValue = {},
    groupLength = group.length,
    dataLength = data.length,
    keyValues = new Array(groupLength),
    keyValue;

  // Compute the key for each node.
  // If multiple nodes have the same key, the duplicates are added to exit.
  for (i = 0; i < groupLength; ++i) {
    if (node = group[i]) {
      keyValues[i] = keyValue = keyPrefix + key.call(node, node.__data__, i, group);
      if (keyValue in nodeByKeyValue) {
        exit[i] = node;
      } else {
        nodeByKeyValue[keyValue] = node;
      }
    }
  }

  // Compute the key for each datum.
  // If there a node associated with this key, join and add it to update.
  // If there is not (or the key is a duplicate), add it to enter.
  for (i = 0; i < dataLength; ++i) {
    keyValue = keyPrefix + key.call(parent, data[i], i, data);
    if (node = nodeByKeyValue[keyValue]) {
      update[i] = node;
      node.__data__ = data[i];
      nodeByKeyValue[keyValue] = null;
    } else {
      enter[i] = new _enter.EnterNode(parent, data[i]);
    }
  }

  // Add any remaining nodes that were not bound to data to exit.
  for (i = 0; i < groupLength; ++i) {
    if ((node = group[i]) && nodeByKeyValue[keyValues[i]] === node) {
      exit[i] = node;
    }
  }
}
function _default(value, key) {
  if (!value) {
    data = new Array(this.size()), j = -1;
    this.each(function (d) {
      data[++j] = d;
    });
    return data;
  }
  var bind = key ? bindKey : bindIndex,
    parents = this._parents,
    groups = this._groups;
  if (typeof value !== "function") value = (0, _constant.default)(value);
  for (var m = groups.length, update = new Array(m), enter = new Array(m), exit = new Array(m), j = 0; j < m; ++j) {
    var parent = parents[j],
      group = groups[j],
      groupLength = group.length,
      data = value.call(parent, parent && parent.__data__, j, parents),
      dataLength = data.length,
      enterGroup = enter[j] = new Array(dataLength),
      updateGroup = update[j] = new Array(dataLength),
      exitGroup = exit[j] = new Array(groupLength);
    bind(parent, group, enterGroup, updateGroup, exitGroup, data, key);

    // Now connect the enter nodes to their following update node, such that
    // appendChild can insert the materialized enter node before this node,
    // rather than at the end of the parent node.
    for (var i0 = 0, i1 = 0, previous, next; i0 < dataLength; ++i0) {
      if (previous = enterGroup[i0]) {
        if (i0 >= i1) i1 = i0 + 1;
        while (!(next = updateGroup[i1]) && ++i1 < dataLength);
        previous._next = next || null;
      }
    }
  }
  update = new _index.Selection(update, parents);
  update._enter = enter;
  update._exit = exit;
  return update;
}
},{"./index":"../node_modules/d3-selection/src/selection/index.js","./enter":"../node_modules/d3-selection/src/selection/enter.js","../constant":"../node_modules/d3-selection/src/constant.js"}],"../node_modules/d3-selection/src/selection/exit.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;
var _sparse = _interopRequireDefault(require("./sparse"));
var _index = require("./index");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _default() {
  return new _index.Selection(this._exit || this._groups.map(_sparse.default), this._parents);
}
},{"./sparse":"../node_modules/d3-selection/src/selection/sparse.js","./index":"../node_modules/d3-selection/src/selection/index.js"}],"../node_modules/d3-selection/src/selection/join.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;
function _default(onenter, onupdate, onexit) {
  var enter = this.enter(),
    update = this,
    exit = this.exit();
  enter = typeof onenter === "function" ? onenter(enter) : enter.append(onenter + "");
  if (onupdate != null) update = onupdate(update);
  if (onexit == null) exit.remove();else onexit(exit);
  return enter && update ? enter.merge(update).order() : update;
}
},{}],"../node_modules/d3-selection/src/selection/merge.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;
var _index = require("./index");
function _default(selection) {
  for (var groups0 = this._groups, groups1 = selection._groups, m0 = groups0.length, m1 = groups1.length, m = Math.min(m0, m1), merges = new Array(m0), j = 0; j < m; ++j) {
    for (var group0 = groups0[j], group1 = groups1[j], n = group0.length, merge = merges[j] = new Array(n), node, i = 0; i < n; ++i) {
      if (node = group0[i] || group1[i]) {
        merge[i] = node;
      }
    }
  }
  for (; j < m0; ++j) {
    merges[j] = groups0[j];
  }
  return new _index.Selection(merges, this._parents);
}
},{"./index":"../node_modules/d3-selection/src/selection/index.js"}],"../node_modules/d3-selection/src/selection/order.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;
function _default() {
  for (var groups = this._groups, j = -1, m = groups.length; ++j < m;) {
    for (var group = groups[j], i = group.length - 1, next = group[i], node; --i >= 0;) {
      if (node = group[i]) {
        if (next && node.compareDocumentPosition(next) ^ 4) next.parentNode.insertBefore(node, next);
        next = node;
      }
    }
  }
  return this;
}
},{}],"../node_modules/d3-selection/src/selection/sort.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;
var _index = require("./index");
function _default(compare) {
  if (!compare) compare = ascending;
  function compareNode(a, b) {
    return a && b ? compare(a.__data__, b.__data__) : !a - !b;
  }
  for (var groups = this._groups, m = groups.length, sortgroups = new Array(m), j = 0; j < m; ++j) {
    for (var group = groups[j], n = group.length, sortgroup = sortgroups[j] = new Array(n), node, i = 0; i < n; ++i) {
      if (node = group[i]) {
        sortgroup[i] = node;
      }
    }
    sortgroup.sort(compareNode);
  }
  return new _index.Selection(sortgroups, this._parents).order();
}
function ascending(a, b) {
  return a < b ? -1 : a > b ? 1 : a >= b ? 0 : NaN;
}
},{"./index":"../node_modules/d3-selection/src/selection/index.js"}],"../node_modules/d3-selection/src/selection/call.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;
function _default() {
  var callback = arguments[0];
  arguments[0] = this;
  callback.apply(null, arguments);
  return this;
}
},{}],"../node_modules/d3-selection/src/selection/nodes.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;
function _default() {
  var nodes = new Array(this.size()),
    i = -1;
  this.each(function () {
    nodes[++i] = this;
  });
  return nodes;
}
},{}],"../node_modules/d3-selection/src/selection/node.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;
function _default() {
  for (var groups = this._groups, j = 0, m = groups.length; j < m; ++j) {
    for (var group = groups[j], i = 0, n = group.length; i < n; ++i) {
      var node = group[i];
      if (node) return node;
    }
  }
  return null;
}
},{}],"../node_modules/d3-selection/src/selection/size.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;
function _default() {
  var size = 0;
  this.each(function () {
    ++size;
  });
  return size;
}
},{}],"../node_modules/d3-selection/src/selection/empty.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;
function _default() {
  return !this.node();
}
},{}],"../node_modules/d3-selection/src/selection/each.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;
function _default(callback) {
  for (var groups = this._groups, j = 0, m = groups.length; j < m; ++j) {
    for (var group = groups[j], i = 0, n = group.length, node; i < n; ++i) {
      if (node = group[i]) callback.call(node, node.__data__, i, group);
    }
  }
  return this;
}
},{}],"../node_modules/d3-selection/src/selection/attr.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;
var _namespace = _interopRequireDefault(require("../namespace"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function attrRemove(name) {
  return function () {
    this.removeAttribute(name);
  };
}
function attrRemoveNS(fullname) {
  return function () {
    this.removeAttributeNS(fullname.space, fullname.local);
  };
}
function attrConstant(name, value) {
  return function () {
    this.setAttribute(name, value);
  };
}
function attrConstantNS(fullname, value) {
  return function () {
    this.setAttributeNS(fullname.space, fullname.local, value);
  };
}
function attrFunction(name, value) {
  return function () {
    var v = value.apply(this, arguments);
    if (v == null) this.removeAttribute(name);else this.setAttribute(name, v);
  };
}
function attrFunctionNS(fullname, value) {
  return function () {
    var v = value.apply(this, arguments);
    if (v == null) this.removeAttributeNS(fullname.space, fullname.local);else this.setAttributeNS(fullname.space, fullname.local, v);
  };
}
function _default(name, value) {
  var fullname = (0, _namespace.default)(name);
  if (arguments.length < 2) {
    var node = this.node();
    return fullname.local ? node.getAttributeNS(fullname.space, fullname.local) : node.getAttribute(fullname);
  }
  return this.each((value == null ? fullname.local ? attrRemoveNS : attrRemove : typeof value === "function" ? fullname.local ? attrFunctionNS : attrFunction : fullname.local ? attrConstantNS : attrConstant)(fullname, value));
}
},{"../namespace":"../node_modules/d3-selection/src/namespace.js"}],"../node_modules/d3-selection/src/window.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;
function _default(node) {
  return node.ownerDocument && node.ownerDocument.defaultView // node is a Node
  || node.document && node // node is a Window
  || node.defaultView; // node is a Document
}
},{}],"../node_modules/d3-selection/src/selection/style.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;
exports.styleValue = styleValue;
var _window = _interopRequireDefault(require("../window"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function styleRemove(name) {
  return function () {
    this.style.removeProperty(name);
  };
}
function styleConstant(name, value, priority) {
  return function () {
    this.style.setProperty(name, value, priority);
  };
}
function styleFunction(name, value, priority) {
  return function () {
    var v = value.apply(this, arguments);
    if (v == null) this.style.removeProperty(name);else this.style.setProperty(name, v, priority);
  };
}
function _default(name, value, priority) {
  return arguments.length > 1 ? this.each((value == null ? styleRemove : typeof value === "function" ? styleFunction : styleConstant)(name, value, priority == null ? "" : priority)) : styleValue(this.node(), name);
}
function styleValue(node, name) {
  return node.style.getPropertyValue(name) || (0, _window.default)(node).getComputedStyle(node, null).getPropertyValue(name);
}
},{"../window":"../node_modules/d3-selection/src/window.js"}],"../node_modules/d3-selection/src/selection/property.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;
function propertyRemove(name) {
  return function () {
    delete this[name];
  };
}
function propertyConstant(name, value) {
  return function () {
    this[name] = value;
  };
}
function propertyFunction(name, value) {
  return function () {
    var v = value.apply(this, arguments);
    if (v == null) delete this[name];else this[name] = v;
  };
}
function _default(name, value) {
  return arguments.length > 1 ? this.each((value == null ? propertyRemove : typeof value === "function" ? propertyFunction : propertyConstant)(name, value)) : this.node()[name];
}
},{}],"../node_modules/d3-selection/src/selection/classed.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;
function classArray(string) {
  return string.trim().split(/^|\s+/);
}
function classList(node) {
  return node.classList || new ClassList(node);
}
function ClassList(node) {
  this._node = node;
  this._names = classArray(node.getAttribute("class") || "");
}
ClassList.prototype = {
  add: function (name) {
    var i = this._names.indexOf(name);
    if (i < 0) {
      this._names.push(name);
      this._node.setAttribute("class", this._names.join(" "));
    }
  },
  remove: function (name) {
    var i = this._names.indexOf(name);
    if (i >= 0) {
      this._names.splice(i, 1);
      this._node.setAttribute("class", this._names.join(" "));
    }
  },
  contains: function (name) {
    return this._names.indexOf(name) >= 0;
  }
};
function classedAdd(node, names) {
  var list = classList(node),
    i = -1,
    n = names.length;
  while (++i < n) list.add(names[i]);
}
function classedRemove(node, names) {
  var list = classList(node),
    i = -1,
    n = names.length;
  while (++i < n) list.remove(names[i]);
}
function classedTrue(names) {
  return function () {
    classedAdd(this, names);
  };
}
function classedFalse(names) {
  return function () {
    classedRemove(this, names);
  };
}
function classedFunction(names, value) {
  return function () {
    (value.apply(this, arguments) ? classedAdd : classedRemove)(this, names);
  };
}
function _default(name, value) {
  var names = classArray(name + "");
  if (arguments.length < 2) {
    var list = classList(this.node()),
      i = -1,
      n = names.length;
    while (++i < n) if (!list.contains(names[i])) return false;
    return true;
  }
  return this.each((typeof value === "function" ? classedFunction : value ? classedTrue : classedFalse)(names, value));
}
},{}],"../node_modules/d3-selection/src/selection/text.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;
function textRemove() {
  this.textContent = "";
}
function textConstant(value) {
  return function () {
    this.textContent = value;
  };
}
function textFunction(value) {
  return function () {
    var v = value.apply(this, arguments);
    this.textContent = v == null ? "" : v;
  };
}
function _default(value) {
  return arguments.length ? this.each(value == null ? textRemove : (typeof value === "function" ? textFunction : textConstant)(value)) : this.node().textContent;
}
},{}],"../node_modules/d3-selection/src/selection/html.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;
function htmlRemove() {
  this.innerHTML = "";
}
function htmlConstant(value) {
  return function () {
    this.innerHTML = value;
  };
}
function htmlFunction(value) {
  return function () {
    var v = value.apply(this, arguments);
    this.innerHTML = v == null ? "" : v;
  };
}
function _default(value) {
  return arguments.length ? this.each(value == null ? htmlRemove : (typeof value === "function" ? htmlFunction : htmlConstant)(value)) : this.node().innerHTML;
}
},{}],"../node_modules/d3-selection/src/selection/raise.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;
function raise() {
  if (this.nextSibling) this.parentNode.appendChild(this);
}
function _default() {
  return this.each(raise);
}
},{}],"../node_modules/d3-selection/src/selection/lower.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;
function lower() {
  if (this.previousSibling) this.parentNode.insertBefore(this, this.parentNode.firstChild);
}
function _default() {
  return this.each(lower);
}
},{}],"../node_modules/d3-selection/src/selection/append.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;
var _creator = _interopRequireDefault(require("../creator"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _default(name) {
  var create = typeof name === "function" ? name : (0, _creator.default)(name);
  return this.select(function () {
    return this.appendChild(create.apply(this, arguments));
  });
}
},{"../creator":"../node_modules/d3-selection/src/creator.js"}],"../node_modules/d3-selection/src/selection/insert.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;
var _creator = _interopRequireDefault(require("../creator"));
var _selector = _interopRequireDefault(require("../selector"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function constantNull() {
  return null;
}
function _default(name, before) {
  var create = typeof name === "function" ? name : (0, _creator.default)(name),
    select = before == null ? constantNull : typeof before === "function" ? before : (0, _selector.default)(before);
  return this.select(function () {
    return this.insertBefore(create.apply(this, arguments), select.apply(this, arguments) || null);
  });
}
},{"../creator":"../node_modules/d3-selection/src/creator.js","../selector":"../node_modules/d3-selection/src/selector.js"}],"../node_modules/d3-selection/src/selection/remove.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;
function remove() {
  var parent = this.parentNode;
  if (parent) parent.removeChild(this);
}
function _default() {
  return this.each(remove);
}
},{}],"../node_modules/d3-selection/src/selection/clone.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;
function selection_cloneShallow() {
  var clone = this.cloneNode(false),
    parent = this.parentNode;
  return parent ? parent.insertBefore(clone, this.nextSibling) : clone;
}
function selection_cloneDeep() {
  var clone = this.cloneNode(true),
    parent = this.parentNode;
  return parent ? parent.insertBefore(clone, this.nextSibling) : clone;
}
function _default(deep) {
  return this.select(deep ? selection_cloneDeep : selection_cloneShallow);
}
},{}],"../node_modules/d3-selection/src/selection/datum.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;
function _default(value) {
  return arguments.length ? this.property("__data__", value) : this.node().__data__;
}
},{}],"../node_modules/d3-selection/src/selection/on.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.customEvent = customEvent;
exports.default = _default;
exports.event = void 0;
var filterEvents = {};
var event = null;
exports.event = event;
if (typeof document !== "undefined") {
  var element = document.documentElement;
  if (!("onmouseenter" in element)) {
    filterEvents = {
      mouseenter: "mouseover",
      mouseleave: "mouseout"
    };
  }
}
function filterContextListener(listener, index, group) {
  listener = contextListener(listener, index, group);
  return function (event) {
    var related = event.relatedTarget;
    if (!related || related !== this && !(related.compareDocumentPosition(this) & 8)) {
      listener.call(this, event);
    }
  };
}
function contextListener(listener, index, group) {
  return function (event1) {
    var event0 = event; // Events can be reentrant (e.g., focus).
    exports.event = event = event1;
    try {
      listener.call(this, this.__data__, index, group);
    } finally {
      exports.event = event = event0;
    }
  };
}
function parseTypenames(typenames) {
  return typenames.trim().split(/^|\s+/).map(function (t) {
    var name = "",
      i = t.indexOf(".");
    if (i >= 0) name = t.slice(i + 1), t = t.slice(0, i);
    return {
      type: t,
      name: name
    };
  });
}
function onRemove(typename) {
  return function () {
    var on = this.__on;
    if (!on) return;
    for (var j = 0, i = -1, m = on.length, o; j < m; ++j) {
      if (o = on[j], (!typename.type || o.type === typename.type) && o.name === typename.name) {
        this.removeEventListener(o.type, o.listener, o.capture);
      } else {
        on[++i] = o;
      }
    }
    if (++i) on.length = i;else delete this.__on;
  };
}
function onAdd(typename, value, capture) {
  var wrap = filterEvents.hasOwnProperty(typename.type) ? filterContextListener : contextListener;
  return function (d, i, group) {
    var on = this.__on,
      o,
      listener = wrap(value, i, group);
    if (on) for (var j = 0, m = on.length; j < m; ++j) {
      if ((o = on[j]).type === typename.type && o.name === typename.name) {
        this.removeEventListener(o.type, o.listener, o.capture);
        this.addEventListener(o.type, o.listener = listener, o.capture = capture);
        o.value = value;
        return;
      }
    }
    this.addEventListener(typename.type, listener, capture);
    o = {
      type: typename.type,
      name: typename.name,
      value: value,
      listener: listener,
      capture: capture
    };
    if (!on) this.__on = [o];else on.push(o);
  };
}
function _default(typename, value, capture) {
  var typenames = parseTypenames(typename + ""),
    i,
    n = typenames.length,
    t;
  if (arguments.length < 2) {
    var on = this.node().__on;
    if (on) for (var j = 0, m = on.length, o; j < m; ++j) {
      for (i = 0, o = on[j]; i < n; ++i) {
        if ((t = typenames[i]).type === o.type && t.name === o.name) {
          return o.value;
        }
      }
    }
    return;
  }
  on = value ? onAdd : onRemove;
  if (capture == null) capture = false;
  for (i = 0; i < n; ++i) this.each(on(typenames[i], value, capture));
  return this;
}
function customEvent(event1, listener, that, args) {
  var event0 = event;
  event1.sourceEvent = event;
  exports.event = event = event1;
  try {
    return listener.apply(that, args);
  } finally {
    exports.event = event = event0;
  }
}
},{}],"../node_modules/d3-selection/src/selection/dispatch.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;
var _window = _interopRequireDefault(require("../window"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function dispatchEvent(node, type, params) {
  var window = (0, _window.default)(node),
    event = window.CustomEvent;
  if (typeof event === "function") {
    event = new event(type, params);
  } else {
    event = window.document.createEvent("Event");
    if (params) event.initEvent(type, params.bubbles, params.cancelable), event.detail = params.detail;else event.initEvent(type, false, false);
  }
  node.dispatchEvent(event);
}
function dispatchConstant(type, params) {
  return function () {
    return dispatchEvent(this, type, params);
  };
}
function dispatchFunction(type, params) {
  return function () {
    return dispatchEvent(this, type, params.apply(this, arguments));
  };
}
function _default(type, params) {
  return this.each((typeof params === "function" ? dispatchFunction : dispatchConstant)(type, params));
}
},{"../window":"../node_modules/d3-selection/src/window.js"}],"../node_modules/d3-selection/src/selection/index.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Selection = Selection;
exports.root = exports.default = void 0;
var _select = _interopRequireDefault(require("./select"));
var _selectAll = _interopRequireDefault(require("./selectAll"));
var _filter = _interopRequireDefault(require("./filter"));
var _data = _interopRequireDefault(require("./data"));
var _enter = _interopRequireDefault(require("./enter"));
var _exit = _interopRequireDefault(require("./exit"));
var _join = _interopRequireDefault(require("./join"));
var _merge = _interopRequireDefault(require("./merge"));
var _order = _interopRequireDefault(require("./order"));
var _sort = _interopRequireDefault(require("./sort"));
var _call = _interopRequireDefault(require("./call"));
var _nodes = _interopRequireDefault(require("./nodes"));
var _node = _interopRequireDefault(require("./node"));
var _size = _interopRequireDefault(require("./size"));
var _empty = _interopRequireDefault(require("./empty"));
var _each = _interopRequireDefault(require("./each"));
var _attr = _interopRequireDefault(require("./attr"));
var _style = _interopRequireDefault(require("./style"));
var _property = _interopRequireDefault(require("./property"));
var _classed = _interopRequireDefault(require("./classed"));
var _text = _interopRequireDefault(require("./text"));
var _html = _interopRequireDefault(require("./html"));
var _raise = _interopRequireDefault(require("./raise"));
var _lower = _interopRequireDefault(require("./lower"));
var _append = _interopRequireDefault(require("./append"));
var _insert = _interopRequireDefault(require("./insert"));
var _remove = _interopRequireDefault(require("./remove"));
var _clone = _interopRequireDefault(require("./clone"));
var _datum = _interopRequireDefault(require("./datum"));
var _on = _interopRequireDefault(require("./on"));
var _dispatch = _interopRequireDefault(require("./dispatch"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
var root = [null];
exports.root = root;
function Selection(groups, parents) {
  this._groups = groups;
  this._parents = parents;
}
function selection() {
  return new Selection([[document.documentElement]], root);
}
Selection.prototype = selection.prototype = {
  constructor: Selection,
  select: _select.default,
  selectAll: _selectAll.default,
  filter: _filter.default,
  data: _data.default,
  enter: _enter.default,
  exit: _exit.default,
  join: _join.default,
  merge: _merge.default,
  order: _order.default,
  sort: _sort.default,
  call: _call.default,
  nodes: _nodes.default,
  node: _node.default,
  size: _size.default,
  empty: _empty.default,
  each: _each.default,
  attr: _attr.default,
  style: _style.default,
  property: _property.default,
  classed: _classed.default,
  text: _text.default,
  html: _html.default,
  raise: _raise.default,
  lower: _lower.default,
  append: _append.default,
  insert: _insert.default,
  remove: _remove.default,
  clone: _clone.default,
  datum: _datum.default,
  on: _on.default,
  dispatch: _dispatch.default
};
var _default = selection;
exports.default = _default;
},{"./select":"../node_modules/d3-selection/src/selection/select.js","./selectAll":"../node_modules/d3-selection/src/selection/selectAll.js","./filter":"../node_modules/d3-selection/src/selection/filter.js","./data":"../node_modules/d3-selection/src/selection/data.js","./enter":"../node_modules/d3-selection/src/selection/enter.js","./exit":"../node_modules/d3-selection/src/selection/exit.js","./join":"../node_modules/d3-selection/src/selection/join.js","./merge":"../node_modules/d3-selection/src/selection/merge.js","./order":"../node_modules/d3-selection/src/selection/order.js","./sort":"../node_modules/d3-selection/src/selection/sort.js","./call":"../node_modules/d3-selection/src/selection/call.js","./nodes":"../node_modules/d3-selection/src/selection/nodes.js","./node":"../node_modules/d3-selection/src/selection/node.js","./size":"../node_modules/d3-selection/src/selection/size.js","./empty":"../node_modules/d3-selection/src/selection/empty.js","./each":"../node_modules/d3-selection/src/selection/each.js","./attr":"../node_modules/d3-selection/src/selection/attr.js","./style":"../node_modules/d3-selection/src/selection/style.js","./property":"../node_modules/d3-selection/src/selection/property.js","./classed":"../node_modules/d3-selection/src/selection/classed.js","./text":"../node_modules/d3-selection/src/selection/text.js","./html":"../node_modules/d3-selection/src/selection/html.js","./raise":"../node_modules/d3-selection/src/selection/raise.js","./lower":"../node_modules/d3-selection/src/selection/lower.js","./append":"../node_modules/d3-selection/src/selection/append.js","./insert":"../node_modules/d3-selection/src/selection/insert.js","./remove":"../node_modules/d3-selection/src/selection/remove.js","./clone":"../node_modules/d3-selection/src/selection/clone.js","./datum":"../node_modules/d3-selection/src/selection/datum.js","./on":"../node_modules/d3-selection/src/selection/on.js","./dispatch":"../node_modules/d3-selection/src/selection/dispatch.js"}],"../node_modules/d3-selection/src/select.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;
var _index = require("./selection/index");
function _default(selector) {
  return typeof selector === "string" ? new _index.Selection([[document.querySelector(selector)]], [document.documentElement]) : new _index.Selection([[selector]], _index.root);
}
},{"./selection/index":"../node_modules/d3-selection/src/selection/index.js"}],"../node_modules/d3-selection/src/create.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;
var _creator = _interopRequireDefault(require("./creator"));
var _select = _interopRequireDefault(require("./select"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _default(name) {
  return (0, _select.default)((0, _creator.default)(name).call(document.documentElement));
}
},{"./creator":"../node_modules/d3-selection/src/creator.js","./select":"../node_modules/d3-selection/src/select.js"}],"../node_modules/d3-selection/src/local.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = local;
var nextId = 0;
function local() {
  return new Local();
}
function Local() {
  this._ = "@" + (++nextId).toString(36);
}
Local.prototype = local.prototype = {
  constructor: Local,
  get: function (node) {
    var id = this._;
    while (!(id in node)) if (!(node = node.parentNode)) return;
    return node[id];
  },
  set: function (node, value) {
    return node[this._] = value;
  },
  remove: function (node) {
    return this._ in node && delete node[this._];
  },
  toString: function () {
    return this._;
  }
};
},{}],"../node_modules/d3-selection/src/sourceEvent.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;
var _on = require("./selection/on");
function _default() {
  var current = _on.event,
    source;
  while (source = current.sourceEvent) current = source;
  return current;
}
},{"./selection/on":"../node_modules/d3-selection/src/selection/on.js"}],"../node_modules/d3-selection/src/point.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;
function _default(node, event) {
  var svg = node.ownerSVGElement || node;
  if (svg.createSVGPoint) {
    var point = svg.createSVGPoint();
    point.x = event.clientX, point.y = event.clientY;
    point = point.matrixTransform(node.getScreenCTM().inverse());
    return [point.x, point.y];
  }
  var rect = node.getBoundingClientRect();
  return [event.clientX - rect.left - node.clientLeft, event.clientY - rect.top - node.clientTop];
}
},{}],"../node_modules/d3-selection/src/mouse.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;
var _sourceEvent = _interopRequireDefault(require("./sourceEvent"));
var _point = _interopRequireDefault(require("./point"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _default(node) {
  var event = (0, _sourceEvent.default)();
  if (event.changedTouches) event = event.changedTouches[0];
  return (0, _point.default)(node, event);
}
},{"./sourceEvent":"../node_modules/d3-selection/src/sourceEvent.js","./point":"../node_modules/d3-selection/src/point.js"}],"../node_modules/d3-selection/src/selectAll.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;
var _index = require("./selection/index");
function _default(selector) {
  return typeof selector === "string" ? new _index.Selection([document.querySelectorAll(selector)], [document.documentElement]) : new _index.Selection([selector == null ? [] : selector], _index.root);
}
},{"./selection/index":"../node_modules/d3-selection/src/selection/index.js"}],"../node_modules/d3-selection/src/touch.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;
var _sourceEvent = _interopRequireDefault(require("./sourceEvent"));
var _point = _interopRequireDefault(require("./point"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _default(node, touches, identifier) {
  if (arguments.length < 3) identifier = touches, touches = (0, _sourceEvent.default)().changedTouches;
  for (var i = 0, n = touches ? touches.length : 0, touch; i < n; ++i) {
    if ((touch = touches[i]).identifier === identifier) {
      return (0, _point.default)(node, touch);
    }
  }
  return null;
}
},{"./sourceEvent":"../node_modules/d3-selection/src/sourceEvent.js","./point":"../node_modules/d3-selection/src/point.js"}],"../node_modules/d3-selection/src/touches.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;
var _sourceEvent = _interopRequireDefault(require("./sourceEvent"));
var _point = _interopRequireDefault(require("./point"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _default(node, touches) {
  if (touches == null) touches = (0, _sourceEvent.default)().touches;
  for (var i = 0, n = touches ? touches.length : 0, points = new Array(n); i < n; ++i) {
    points[i] = (0, _point.default)(node, touches[i]);
  }
  return points;
}
},{"./sourceEvent":"../node_modules/d3-selection/src/sourceEvent.js","./point":"../node_modules/d3-selection/src/point.js"}],"../node_modules/d3-selection/src/index.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "clientPoint", {
  enumerable: true,
  get: function () {
    return _point.default;
  }
});
Object.defineProperty(exports, "create", {
  enumerable: true,
  get: function () {
    return _create.default;
  }
});
Object.defineProperty(exports, "creator", {
  enumerable: true,
  get: function () {
    return _creator.default;
  }
});
Object.defineProperty(exports, "customEvent", {
  enumerable: true,
  get: function () {
    return _on.customEvent;
  }
});
Object.defineProperty(exports, "event", {
  enumerable: true,
  get: function () {
    return _on.event;
  }
});
Object.defineProperty(exports, "local", {
  enumerable: true,
  get: function () {
    return _local.default;
  }
});
Object.defineProperty(exports, "matcher", {
  enumerable: true,
  get: function () {
    return _matcher.default;
  }
});
Object.defineProperty(exports, "mouse", {
  enumerable: true,
  get: function () {
    return _mouse.default;
  }
});
Object.defineProperty(exports, "namespace", {
  enumerable: true,
  get: function () {
    return _namespace.default;
  }
});
Object.defineProperty(exports, "namespaces", {
  enumerable: true,
  get: function () {
    return _namespaces.default;
  }
});
Object.defineProperty(exports, "select", {
  enumerable: true,
  get: function () {
    return _select.default;
  }
});
Object.defineProperty(exports, "selectAll", {
  enumerable: true,
  get: function () {
    return _selectAll.default;
  }
});
Object.defineProperty(exports, "selection", {
  enumerable: true,
  get: function () {
    return _index.default;
  }
});
Object.defineProperty(exports, "selector", {
  enumerable: true,
  get: function () {
    return _selector.default;
  }
});
Object.defineProperty(exports, "selectorAll", {
  enumerable: true,
  get: function () {
    return _selectorAll.default;
  }
});
Object.defineProperty(exports, "style", {
  enumerable: true,
  get: function () {
    return _style.styleValue;
  }
});
Object.defineProperty(exports, "touch", {
  enumerable: true,
  get: function () {
    return _touch.default;
  }
});
Object.defineProperty(exports, "touches", {
  enumerable: true,
  get: function () {
    return _touches.default;
  }
});
Object.defineProperty(exports, "window", {
  enumerable: true,
  get: function () {
    return _window.default;
  }
});
var _create = _interopRequireDefault(require("./create"));
var _creator = _interopRequireDefault(require("./creator"));
var _local = _interopRequireDefault(require("./local"));
var _matcher = _interopRequireDefault(require("./matcher"));
var _mouse = _interopRequireDefault(require("./mouse"));
var _namespace = _interopRequireDefault(require("./namespace"));
var _namespaces = _interopRequireDefault(require("./namespaces"));
var _point = _interopRequireDefault(require("./point"));
var _select = _interopRequireDefault(require("./select"));
var _selectAll = _interopRequireDefault(require("./selectAll"));
var _index = _interopRequireDefault(require("./selection/index"));
var _selector = _interopRequireDefault(require("./selector"));
var _selectorAll = _interopRequireDefault(require("./selectorAll"));
var _style = require("./selection/style");
var _touch = _interopRequireDefault(require("./touch"));
var _touches = _interopRequireDefault(require("./touches"));
var _window = _interopRequireDefault(require("./window"));
var _on = require("./selection/on");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
},{"./create":"../node_modules/d3-selection/src/create.js","./creator":"../node_modules/d3-selection/src/creator.js","./local":"../node_modules/d3-selection/src/local.js","./matcher":"../node_modules/d3-selection/src/matcher.js","./mouse":"../node_modules/d3-selection/src/mouse.js","./namespace":"../node_modules/d3-selection/src/namespace.js","./namespaces":"../node_modules/d3-selection/src/namespaces.js","./point":"../node_modules/d3-selection/src/point.js","./select":"../node_modules/d3-selection/src/select.js","./selectAll":"../node_modules/d3-selection/src/selectAll.js","./selection/index":"../node_modules/d3-selection/src/selection/index.js","./selector":"../node_modules/d3-selection/src/selector.js","./selectorAll":"../node_modules/d3-selection/src/selectorAll.js","./selection/style":"../node_modules/d3-selection/src/selection/style.js","./touch":"../node_modules/d3-selection/src/touch.js","./touches":"../node_modules/d3-selection/src/touches.js","./window":"../node_modules/d3-selection/src/window.js","./selection/on":"../node_modules/d3-selection/src/selection/on.js"}],"../node_modules/d3-tip/index.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;
var _d3Collection = require("d3-collection");
var _d3Selection = require("d3-selection");
/**
 * d3.tip
 * Copyright (c) 2013-2017 Justin Palmer
 *
 * Tooltips for d3.js SVG visualizations
 */
// eslint-disable-next-line no-extra-semi

// Public - constructs a new tooltip
//
// Returns a tip
function _default() {
  var direction = d3TipDirection,
    offset = d3TipOffset,
    html = d3TipHTML,
    rootElement = document.body,
    node = initNode(),
    svg = null,
    point = null,
    target = null;
  function tip(vis) {
    svg = getSVGNode(vis);
    if (!svg) return;
    point = svg.createSVGPoint();
    rootElement.appendChild(node);
  }

  // Public - show the tooltip on the screen
  //
  // Returns a tip
  tip.show = function () {
    var args = Array.prototype.slice.call(arguments);
    if (args[args.length - 1] instanceof SVGElement) target = args.pop();
    var content = html.apply(this, args),
      poffset = offset.apply(this, args),
      dir = direction.apply(this, args),
      nodel = getNodeEl(),
      i = directions.length,
      coords,
      scrollTop = document.documentElement.scrollTop || rootElement.scrollTop,
      scrollLeft = document.documentElement.scrollLeft || rootElement.scrollLeft;
    nodel.html(content).style('opacity', 1).style('pointer-events', 'all');
    while (i--) nodel.classed(directions[i], false);
    coords = directionCallbacks.get(dir).apply(this);
    nodel.classed(dir, true).style('top', coords.top + poffset[0] + scrollTop + 'px').style('left', coords.left + poffset[1] + scrollLeft + 'px');
    return tip;
  };

  // Public - hide the tooltip
  //
  // Returns a tip
  tip.hide = function () {
    var nodel = getNodeEl();
    nodel.style('opacity', 0).style('pointer-events', 'none');
    return tip;
  };

  // Public: Proxy attr calls to the d3 tip container.
  // Sets or gets attribute value.
  //
  // n - name of the attribute
  // v - value of the attribute
  //
  // Returns tip or attribute value
  // eslint-disable-next-line no-unused-vars
  tip.attr = function (n, v) {
    if (arguments.length < 2 && typeof n === 'string') {
      return getNodeEl().attr(n);
    }
    var args = Array.prototype.slice.call(arguments);
    _d3Selection.selection.prototype.attr.apply(getNodeEl(), args);
    return tip;
  };

  // Public: Proxy style calls to the d3 tip container.
  // Sets or gets a style value.
  //
  // n - name of the property
  // v - value of the property
  //
  // Returns tip or style property value
  // eslint-disable-next-line no-unused-vars
  tip.style = function (n, v) {
    if (arguments.length < 2 && typeof n === 'string') {
      return getNodeEl().style(n);
    }
    var args = Array.prototype.slice.call(arguments);
    _d3Selection.selection.prototype.style.apply(getNodeEl(), args);
    return tip;
  };

  // Public: Set or get the direction of the tooltip
  //
  // v - One of n(north), s(south), e(east), or w(west), nw(northwest),
  //     sw(southwest), ne(northeast) or se(southeast)
  //
  // Returns tip or direction
  tip.direction = function (v) {
    if (!arguments.length) return direction;
    direction = v == null ? v : functor(v);
    return tip;
  };

  // Public: Sets or gets the offset of the tip
  //
  // v - Array of [x, y] offset
  //
  // Returns offset or
  tip.offset = function (v) {
    if (!arguments.length) return offset;
    offset = v == null ? v : functor(v);
    return tip;
  };

  // Public: sets or gets the html value of the tooltip
  //
  // v - String value of the tip
  //
  // Returns html value or tip
  tip.html = function (v) {
    if (!arguments.length) return html;
    html = v == null ? v : functor(v);
    return tip;
  };

  // Public: sets or gets the root element anchor of the tooltip
  //
  // v - root element of the tooltip
  //
  // Returns root node of tip
  tip.rootElement = function (v) {
    if (!arguments.length) return rootElement;
    rootElement = v == null ? v : functor(v);
    return tip;
  };

  // Public: destroys the tooltip and removes it from the DOM
  //
  // Returns a tip
  tip.destroy = function () {
    if (node) {
      getNodeEl().remove();
      node = null;
    }
    return tip;
  };
  function d3TipDirection() {
    return 'n';
  }
  function d3TipOffset() {
    return [0, 0];
  }
  function d3TipHTML() {
    return ' ';
  }
  var directionCallbacks = (0, _d3Collection.map)({
      n: directionNorth,
      s: directionSouth,
      e: directionEast,
      w: directionWest,
      nw: directionNorthWest,
      ne: directionNorthEast,
      sw: directionSouthWest,
      se: directionSouthEast
    }),
    directions = directionCallbacks.keys();
  function directionNorth() {
    var bbox = getScreenBBox(this);
    return {
      top: bbox.n.y - node.offsetHeight,
      left: bbox.n.x - node.offsetWidth / 2
    };
  }
  function directionSouth() {
    var bbox = getScreenBBox(this);
    return {
      top: bbox.s.y,
      left: bbox.s.x - node.offsetWidth / 2
    };
  }
  function directionEast() {
    var bbox = getScreenBBox(this);
    return {
      top: bbox.e.y - node.offsetHeight / 2,
      left: bbox.e.x
    };
  }
  function directionWest() {
    var bbox = getScreenBBox(this);
    return {
      top: bbox.w.y - node.offsetHeight / 2,
      left: bbox.w.x - node.offsetWidth
    };
  }
  function directionNorthWest() {
    var bbox = getScreenBBox(this);
    return {
      top: bbox.nw.y - node.offsetHeight,
      left: bbox.nw.x - node.offsetWidth
    };
  }
  function directionNorthEast() {
    var bbox = getScreenBBox(this);
    return {
      top: bbox.ne.y - node.offsetHeight,
      left: bbox.ne.x
    };
  }
  function directionSouthWest() {
    var bbox = getScreenBBox(this);
    return {
      top: bbox.sw.y,
      left: bbox.sw.x - node.offsetWidth
    };
  }
  function directionSouthEast() {
    var bbox = getScreenBBox(this);
    return {
      top: bbox.se.y,
      left: bbox.se.x
    };
  }
  function initNode() {
    var div = (0, _d3Selection.select)(document.createElement('div'));
    div.style('position', 'absolute').style('top', 0).style('opacity', 0).style('pointer-events', 'none').style('box-sizing', 'border-box');
    return div.node();
  }
  function getSVGNode(element) {
    var svgNode = element.node();
    if (!svgNode) return null;
    if (svgNode.tagName.toLowerCase() === 'svg') return svgNode;
    return svgNode.ownerSVGElement;
  }
  function getNodeEl() {
    if (node == null) {
      node = initNode();
      // re-add node to DOM
      rootElement.appendChild(node);
    }
    return (0, _d3Selection.select)(node);
  }

  // Private - gets the screen coordinates of a shape
  //
  // Given a shape on the screen, will return an SVGPoint for the directions
  // n(north), s(south), e(east), w(west), ne(northeast), se(southeast),
  // nw(northwest), sw(southwest).
  //
  //    +-+-+
  //    |   |
  //    +   +
  //    |   |
  //    +-+-+
  //
  // Returns an Object {n, s, e, w, nw, sw, ne, se}
  function getScreenBBox(targetShape) {
    var targetel = target || targetShape;
    while (targetel.getScreenCTM == null && targetel.parentNode != null) {
      targetel = targetel.parentNode;
    }
    var bbox = {},
      matrix = targetel.getScreenCTM(),
      tbbox = targetel.getBBox(),
      width = tbbox.width,
      height = tbbox.height,
      x = tbbox.x,
      y = tbbox.y;
    point.x = x;
    point.y = y;
    bbox.nw = point.matrixTransform(matrix);
    point.x += width;
    bbox.ne = point.matrixTransform(matrix);
    point.y += height;
    bbox.se = point.matrixTransform(matrix);
    point.x -= width;
    bbox.sw = point.matrixTransform(matrix);
    point.y -= height / 2;
    bbox.w = point.matrixTransform(matrix);
    point.x += width;
    bbox.e = point.matrixTransform(matrix);
    point.x -= width / 2;
    point.y -= height / 2;
    bbox.n = point.matrixTransform(matrix);
    point.y += height;
    bbox.s = point.matrixTransform(matrix);
    return bbox;
  }

  // Private - replace D3JS 3.X d3.functor() function
  function functor(v) {
    return typeof v === 'function' ? v : function () {
      return v;
    };
  }
  return tip;
}
},{"d3-collection":"../node_modules/d3-collection/src/index.js","d3-selection":"../node_modules/d3-selection/src/index.js"}],"scripts/fluctCout/build.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.build = build;
var helper = _interopRequireWildcard(require("./helper.js"));
var scales = _interopRequireWildcard(require("./scales.js"));
var viz = _interopRequireWildcard(require("./viz.js"));
var tooltip = _interopRequireWildcard(require("./tooltip.js"));
var preproc = _interopRequireWildcard(require("./preprocess.js"));
var _d3Tip = _interopRequireDefault(require("d3-tip"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
var month = ["Jan", "Fev", "Mar", "Avr", "Mai", "Jun", "Jui", "Aou", "Sep", "Oct", "Nov", "Dec"];
'use strict';
function build(data, d3) {
  var data = preproc.getAveragePricePerHouseTypePerMonth(data);
  var margin = {
    top: 75,
    right: 200,
    bottom: 100,
    left: 80
  };
  var svgSize, graphSize;
  setSizing();
  var g = helper.generateG(margin);
  var tip = (0, _d3Tip.default)().attr('class', 'd3-tip').html(function (d) {
    return tooltip.getContents(d, data);
  });
  g.call(tip);
  helper.appendAxes(g);
  helper.appendGraphLabels(g);
  helper.placeTitle(g, graphSize.width);
  viz.positionLabels(g, graphSize.width, graphSize.height);
  viz.setTitleText("Fluctuation du prix des logement en fonction du mois et du nombre de propriétés sur le marché");
  var radiusScale = scales.setRadiusScale(data);
  var colorScale = scales.setColorScale(data);
  var xScale = scales.setXScale(graphSize.width, data);
  var yScale = scales.setYScale(graphSize.height, data);
  helper.drawXAxis(xScale, graphSize.height);
  helper.drawYAxis(yScale);
  viz.setCircleHoverHandler(tip);
  function setSizing() {
    svgSize = {
      width: 1400,
      height: 800
    };
    graphSize = {
      width: svgSize.width - margin.right - margin.left,
      height: svgSize.height - margin.bottom - margin.top
    };
    helper.setCanvasSize(svgSize.width, svgSize.height);
  }
  viz.drawCircles(data, radiusScale, tip);
  viz.moveCircles(xScale, yScale, data);
}
},{"./helper.js":"scripts/fluctCout/helper.js","./scales.js":"scripts/fluctCout/scales.js","./viz.js":"scripts/fluctCout/viz.js","./tooltip.js":"scripts/fluctCout/tooltip.js","./preprocess.js":"scripts/fluctCout/preprocess.js","d3-tip":"../node_modules/d3-tip/index.js"}],"scripts/fluctCoutParType/helper.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.appendAxes = appendAxes;
exports.appendGraphLabels = appendGraphLabels;
exports.drawXAxis = drawXAxis;
exports.drawYAxis = drawYAxis;
exports.generateG = generateG;
exports.placeTitle = placeTitle;
exports.setCanvasSize = setCanvasSize;
/**
 * Generates the SVG element g which will contain the data visualisation.
 *
 * @param {object} margin The desired margins around the graph
 * @returns {*} The d3 Selection for the created g element
 */
function generateG(margin) {
  return d3.select('.graph-line').select('svg').append('g').attr('id', 'graph-g-line').attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');
}

/**
 * Sets the size of the SVG canvas containing the graph.
 *
 * @param {number} width The desired width
 * @param {number} height The desired height
 */
function setCanvasSize(width, height) {
  d3.select('#line-chart').attr('width', width).attr('height', height);
}

/**
 * Appends an SVG g element which will contain the axes.
 *
 * @param {*} g The d3 Selection of the graph's g SVG element
 */
function appendAxes(g) {
  g.append('g').attr('class', 'x axis line');
  g.append('g').attr('class', 'y axis line');
}
/**
 * Appends the labels for the the y axis and the title of the graph.
 *
 * @param {*} g The d3 Selection of the graph's g SVG element
 */
function appendGraphLabels(g) {
  g.append('text').text('Prix moyen des propriétés ($)').attr('class', 'y axis-text').attr('font-size', 15);
  g.append('text').text('Mois').attr('class', 'x axis-text').attr('font-size', 15);
}

/**
 * Draws the X axis at the bottom of the diagram.
 *
 * @param {*} xScale The scale to use to draw the axis
 * @param {number} height The height of the graphic
 */
function drawXAxis(xScale, height) {
  d3.select('.x.axis.line').attr('transform', 'translate(0, ' + height + ')').call(d3.axisBottom(xScale).tickSizeOuter(0).tickArguments([5, '~s']));
}

/**
 * Draws the Y axis to the left of the diagram.
 *
 * @param {*} yScale The scale to use to draw the axis
 */
function drawYAxis(yScale) {
  d3.select('.y.axis.line').call(d3.axisLeft(yScale).tickSizeOuter(0).tickArguments([5]));
}

/**
 * Places the graph's title.
 *
 * @param {*} g The d3 Selection of the graph's g SVG element
 */
function placeTitle(g) {
  g.append('text').attr('class', 'title').attr('x', 0).attr('y', -20).attr('font-size', 14);
}
},{}],"scripts/fluctCoutParType/scales.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setXScale = setXScale;
exports.setYScale = setYScale;
/**
 * Defines the X scale
 *
 * @param {number} width The width of the graph
 * @param {object} data The data to be used
 * @returns {*} The linear scale in X
 */
function setXScale(width) {
  var months = ["Jan 20", "Fev 20", "Mar 20", "Avr 20", "Mai 20", "Jun 20", "Jui 20", "Aou 20", "Sep 20", "Oct 20", "Nov 20", "Dec 20", "Jan 21", "Fev 21", "Mar 21", "Avr 21", "Mai 21", "Jun 21", "Jui 21", "Aou 21", "Sep 21", "Oct 21", "Nov 21", "Dec 21"];
  return d3.scaleBand().domain(months).range([0, width]);
}

/**
 * Defines the X scale
 *
 * @param {number} height The height of the graph
 * @param {object} data The data to be used
 * @returns {*} The linear scale in Y
 */
function setYScale(height, data) {
  var keys = Object.keys(data[0]["price"]);
  var total_maxi = -Infinity;
  var total_mini = Infinity;
  for (var i = 0; i < data.length; i++) {
    for (var j = 0; j < keys.length && keys[j] != "house" && keys[j] != "basement-apartment"; j++) {
      if (data[i]["price"][[keys[j]]] > total_maxi) {
        total_maxi = data[i]["price"][[keys[j]]];
      }
      if (data[i]["price"][[keys[j]]] < total_mini && 0 != data[i]["price"][[keys[j]]]) {
        total_mini = data[i]["price"][[keys[j]]];
      }
    }
  }
  return d3.scaleLinear().domain([total_mini - 200, total_maxi]).range([height, 0]);
}
},{}],"scripts/fluctCoutParType/viz.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.drawLines = drawLines;
exports.moveCircles = moveCircles;
exports.positionLabels = positionLabels;
exports.setCircleHoverHandler = setCircleHoverHandler;
exports.setTitleText = setTitleText;
/**
 * Positions the x axis label and y axis label.
 *
 * @param {*} g The d3 Selection of the graph's g SVG element
 * @param {number} width The width of the graph
 * @param {number} height The height of the graph
 */

var months = ["Jan 20", "Fev 20", "Mar 20", "Avr 20", "Mai 20", "Jun 20", "Jui 20", "Aou 20", "Sep 20", "Oct 20", "Nov 20", "Dec 20", "Jan 21", "Fev 21", "Mar 21", "Avr 21", "Mai 21", "Jun 21", "Jui 21", "Aou 21", "Sep 21", "Oct 21", "Nov 21", "Dec 21"];
function positionLabels(g, width, height) {
  // TODO : Position axis labels
  var y_label = g.select('.y.axis-text');
  var ROTATION = -90;
  var X_TRANSLATION = -50;
  var HEIGHT_OFFSET = 40;
  y_label.attr('transform', "translate(".concat(X_TRANSLATION, ", ").concat(height / 2, ") rotate(").concat(ROTATION, ")"));
  var x_label = g.select('.x.axis-text');
  x_label.attr('transform', "translate(".concat((width / 2).toString(), ", ").concat(height + HEIGHT_OFFSET, ")"));
}

/**
 * Sets up the hover event handler. The tooltip should show on on hover.
 *
 * @param {*} tip The tooltip
 */
function setCircleHoverHandler(tip) {
  // TODO : Set hover handler. The tooltip shows on
  // hover and the opacity goes up to 100% (from 70%)
  var FULL_OPACITY = 1;
  var PARTIAL_OPACITY = 0.7;
  d3.selectAll(".circles").on('mouseover', function (d) {
    d3.select(this).attr("opacity", FULL_OPACITY);
    tip.show(d, this);
  }).on('mouseout', function (d) {
    d3.select(this).attr("opacity", PARTIAL_OPACITY);
    tip.hide(d, this);
  });
}

/**
 * Updates the position of the circles based on their bound data. The position
 * transitions gradually.
 *
 * @param {*} xScale The x scale used to position the circles
 * @param {*} yScale The y scale used to position the circles
 * @param {number} transitionDuration The duration of the transition
 */
function moveCircles(xScale, yScale, data) {
  // TODO : Set up the transition and place the circle centers
  // in x and y according to their GDP and CO2 respectively
  d3.select('#graph-g-line').selectAll('circle').transition().ease(d3.easeLinear).attr("cx", function (d) {
    return xScale(months[data.indexOf(d)]) + 28;
  }).attr("cy", function (d) {
    return yScale(d.price);
  });
}
function setTitleText(title) {
  // TODO : Set the title
  var FONT_SIZE = 14;
  var MARGIN = 10;
  var g = d3.select('#graph-g-line');
  g.append('text').text(title.toString()).attr('id', 'title-line').attr('transform', 'translate(0, -' + MARGIN.toString() + ')').attr('font-size', FONT_SIZE).attr('font-weight', "bolder");
}
function drawLines(XScale, yScale, data, appart, condos, duplex, house) {
  var g = d3.select('#graph-g-line');
  if (appart) {
    g.append('path').attr("class", "appartPath").datum(data).attr("fill", "none").attr("stroke", "#ffb997").attr("stroke-width", 1.5).attr("d", d3.line().defined(function (d) {
      return d["apartment"] !== 0;
    }).x(function (d) {
      return XScale(months[data.indexOf(d)]) + 25;
    }).y(function (d) {
      return yScale(d["price"]["apartment"]);
    }));
  } else {
    d3.selectAll(".appartPath").remove();
  }
  if (condos) {
    g.append('path').datum(data).attr("fill", "none").attr("class", "condoPath").attr("stroke", "#f67e7d").attr("stroke-width", 1.5).attr("d", d3.line().defined(function (d) {
      return d["condo"] !== 0;
    }).x(function (d) {
      return XScale(months[data.indexOf(d)]) + 25;
    }).y(function (d) {
      return yScale(d["price"]["condo"]);
    }));
  } else {
    d3.selectAll(".condoPath").remove();
  }
  if (duplex) {
    g.append('path').datum(data).attr("fill", "none").attr("class", "duplexPath").attr("stroke", "#040926").attr("stroke-width", 1.5).attr("d", d3.line().defined(function (d) {
      return d["duplex-triplex"] !== 0;
    }).x(function (d) {
      return XScale(months[data.indexOf(d)]) + 25;
    }).y(function (d) {
      return yScale(d["price"]["duplex-triplex"]);
    }));
  } else {
    d3.selectAll(".duplexPath").remove();
  }
  if (house) {
    g.append('path').datum(data).attr("fill", "none").attr("class", "housePath").attr("stroke", "#3CAEA3").attr("stroke-width", 1.5).attr("d", d3.line().defined(function (d) {
      return d["house"] !== 0;
    }).x(function (d) {
      return XScale(months[data.indexOf(d)]) + 25;
    }).y(function (d) {
      return yScale(d["price"]["house"]);
    }));
  } else {
    d3.selectAll(".housePath").remove();
  }
}
},{}],"scripts/fluctCoutParType/preprocess.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getAveragePricePerHouseTypePerMonth = getAveragePricePerHouseTypePerMonth;
exports.getHouseTypes = getHouseTypes;
exports.getMonthsRange = getMonthsRange;
function getHouseTypes(data) {
  var unitype = new Array();
  data.forEach(function (listing) {
    if (!unitype.includes(listing.unitype)) unitype.push(listing.unitype);
  });
  return unitype;
}
var month = ["Janvier", "Fevrier", "Mars", "Avril", "Mai", "Juin", "Juillet", "Aout", "Septembre", "Octobre", "Novembre", "Decembre"];
function getMonthsRange(data) {
  var max = 0;
  var min = 11;
  data.forEach(function (listing) {
    if (listing.dateavailable !== null) {
      if (listing.dateavailable.getYear() - 100 === 20 && listing.dateavailable.getMonth() < min) {
        min = listing.dateavailable.getMonth();
      } else if (listing.dateavailable.getYear() - 100 === 21 && listing.dateavailable.getMonth() > max) {
        max = listing.dateavailable.getMonth();
      }
    }
  });
  // min 2020, max 2021
  return [min, max];
}
function getAveragePricePerHouseTypePerMonth(data) {
  var arr = getHouseTypes(data);
  var i = 0;
  var price_count = [];
  for (var index = 0; index < 24; index++) {
    var obj = {};
    for (var i = 0; i < arr.length; i++) {
      obj[arr[i]] = 0;
    }
    obj["price"] = {};
    obj["total"] = {};
    price_count.push(obj);
  }
  var map = new Map();
  data.forEach(function (listing) {
    if (listing.dateavailable !== null) {
      listing.dateavailable.setHours(listing.dateavailable.getHours() + 5);
      if (!map.has(listing.unitype + " - " + month[listing.dateavailable.getMonth()] + " " + listing.dateavailable.getFullYear())) {
        map.set(listing.unitype + " - " + month[listing.dateavailable.getMonth()] + " " + listing.dateavailable.getFullYear(), {
          count: 1,
          sum: listing.price
        });
        if (listing.dateavailable.getFullYear() >= 2021) {
          price_count[listing.dateavailable.getMonth() + 12][listing.unitype] = 1;
          price_count[listing.dateavailable.getMonth() + 12]["price"][listing.unitype] = listing.price;
        } else {
          price_count[listing.dateavailable.getMonth()][listing.unitype] = 1;
          price_count[listing.dateavailable.getMonth()]["price"][listing.unitype] = listing.price;
        }
      } else {
        map.get(listing.unitype + " - " + month[listing.dateavailable.getMonth()] + " " + listing.dateavailable.getFullYear()).count++;
        map.get(listing.unitype + " - " + month[listing.dateavailable.getMonth()] + " " + listing.dateavailable.getFullYear()).sum += listing.price;
        if (listing.dateavailable.getFullYear() >= 2021) {
          price_count[listing.dateavailable.getMonth() + 12][listing.unitype]++;
          price_count[listing.dateavailable.getMonth() + 12]["price"][listing.unitype] += listing.price;
        } else {
          price_count[listing.dateavailable.getMonth()][listing.unitype]++;
          price_count[listing.dateavailable.getMonth()]["price"][listing.unitype] += listing.price;
        }
      }
    }
  });
  price_count.forEach(function (obj) {
    if (obj["apartment"] > 0) {
      obj.price["apartment"] = obj.price["apartment"] / obj["apartment"];
    } else {
      obj.price["apartment"] = 0;
    }
    if (obj["basement-apartment"] > 0) {
      obj.price["basement-apartment"] = obj.price["basement-apartment"] / obj["basement-apartment"];
    } else {
      obj.price["basement-apartment"] = 0;
    }
    if (obj["condo"] > 0) {
      obj.price["condo"] = obj.price["condo"] / obj["condo"];
    } else {
      obj.price["condo"] = 0;
    }
    if (obj["duplex-triplex"] > 0) {
      obj.price["duplex-triplex"] = obj.price["duplex-triplex"] / obj["duplex-triplex"];
    } else {
      obj.price["duplex-triplex"] = 0;
    }
    if (obj["house"] > 0) {
      obj.price["house"] = obj.price["house"] / obj["house"];
    } else {
      obj.price["house"] = 0;
    }
  });
  return price_count;
}
},{}],"scripts/fluctCoutParType/tooltip.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getContents = getContents;
/**
 * Defines the contents of the tooltip. See CSS for tooltip styling. The tooltip
 * features the country name, population, GDP, and CO2 emissions, preceded
 * by a label and followed by units where applicable.
 *
 * @param {object} d The data associated to the hovered element
 * @returns {string} The tooltip contents
 */

var months = ["Jan 20", "Fev 20", "Mar 20", "Avr 20", "Mai 20", "Jun 20", "Jui 20", "Aou 20", "Sep 20", "Oct 20", "Nov 20", "Dec 20", "Jan 21", "Fev 21", "Mar 21", "Avr 21", "Mai 21", "Jun 21", "Jui 21", "Aou 21", "Sep 21", "Oct 21", "Nov 21", "Dec 21"];
function getContents(d, data) {
  // TODO : Generate tooltip contents
  return "<div style='font-weight:normal'>\n            <b>Mois :</b> ".concat(months[data.indexOf(d)], "<br/>\n            <b>Nombre de logement \xE0 louer :</b> ").concat(d.total, "<br/>\n            <b>Prix moyen :</b> ").concat(Math.round(d.price), " $<br/>\n          </div>");
}
},{}],"scripts/fluctCoutParType/legend.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.drawLegend = drawLegend;
/**
 * Draws the legend.
 *
 * @param {*} colorScale The color scale to use
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
  g.append('text').text('Légende').attr('font-weight', "bold").attr("transform", "translate(" + (width + MARGIN).toString() + "," + TOP_LEGEND.toString() + ")");
  g.append('text').text("Apartement").attr('font-weight', "bold").attr("transform", "translate(" + (width + MARGIN + 20).toString() + "," + (TOP_LEGEND_TITLE + 50).toString() + ")");
  g.append('text').text("Condo").attr('font-weight', "bold").attr("transform", "translate(" + (width + MARGIN + 20).toString() + "," + (TOP_LEGEND_TITLE + 75).toString() + ")");
  g.append('text').text("duplex-triplex").attr('font-weight', "bold").attr("transform", "translate(" + (width + MARGIN + 20).toString() + "," + (TOP_LEGEND_TITLE + 100).toString() + ")");
  g.append('text').text("Maison").attr('font-weight', "bold").attr("transform", "translate(" + (width + MARGIN + 20).toString() + "," + (TOP_LEGEND_TITLE + 125).toString() + ")");
  g.append('rect').attr("width", "15").attr("height", "15").attr("fill", "#ffb997").attr("transform", "translate(" + (width + MARGIN).toString() + "," + (TOP_LEGEND_TITLE + 38).toString() + ")");
  g.append('rect').attr("width", "15").attr("height", "15").attr("fill", "#f67e7d").attr("transform", "translate(" + (width + MARGIN).toString() + "," + (TOP_LEGEND_TITLE + 63).toString() + ")");
  g.append('rect').attr("width", "15").attr("height", "15").attr("fill", "#040926").attr("transform", "translate(" + (width + MARGIN).toString() + "," + (TOP_LEGEND_TITLE + 88).toString() + ")");
  g.append('rect').attr("width", "15").attr("height", "15").attr("fill", "#3CAEA3").attr("transform", "translate(" + (width + MARGIN).toString() + "," + (TOP_LEGEND_TITLE + 113).toString() + ")");
}
},{}],"scripts/fluctCoutParType/build.js":[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.build = build;
var helper = _interopRequireWildcard(require("./helper.js"));
var scales = _interopRequireWildcard(require("./scales.js"));
var viz = _interopRequireWildcard(require("./viz.js"));
var preproc = _interopRequireWildcard(require("./preprocess.js"));
var tooltip = _interopRequireWildcard(require("./tooltip.js"));
var legend = _interopRequireWildcard(require("./legend.js"));
var _d3Tip = _interopRequireDefault(require("d3-tip"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function build(data, d3) {
  var data = preproc.getAveragePricePerHouseTypePerMonth(data);
  var margin = {
    top: 75,
    right: 200,
    bottom: 100,
    left: 80
  };
  var svgSize, graphSize;
  setSizing();
  var g = helper.generateG(margin);
  var tip = (0, _d3Tip.default)().attr('class', 'd3-tip').html(function (d) {
    return tooltip.getContents(d, data);
  });
  g.call(tip);
  helper.appendAxes(g);
  helper.appendGraphLabels(g);
  helper.placeTitle(g, graphSize.width, graphSize.height);
  viz.positionLabels(g, graphSize.width, graphSize.height);
  viz.setTitleText("Fluctuation du prix des logement en fonction du mois et du type de propriété");
  var xScale = scales.setXScale(graphSize.width, data);
  var yScale = scales.setYScale(graphSize.height, data);
  helper.drawXAxis(xScale, graphSize.height);
  helper.drawYAxis(yScale);
  legend.drawLegend(g, graphSize.width);
  function setSizing() {
    svgSize = {
      width: 1400,
      height: 800
    };
    graphSize = {
      width: svgSize.width - margin.right - margin.left,
      height: svgSize.height - margin.bottom - margin.top
    };
    helper.setCanvasSize(svgSize.width, svgSize.height);
  }
  viz.drawLines(xScale, yScale, data, document.getElementsByName("checkBoxAppart")[0].checked, document.getElementsByName("checkBoxCondos")[0].checked, document.getElementsByName("checkBoxDuplex")[0].checked, document.getElementsByName("checkBoxHouse")[0].checked);
  document.getElementsByName("checkBoxAppart")[0].addEventListener('change', function () {
    viz.drawLines(xScale, yScale, data, document.getElementsByName("checkBoxAppart")[0].checked, document.getElementsByName("checkBoxCondos")[0].checked, document.getElementsByName("checkBoxDuplex")[0].checked, document.getElementsByName("checkBoxHouse")[0].checked);
  });
  document.getElementsByName("checkBoxCondos")[0].addEventListener('change', function () {
    viz.drawLines(xScale, yScale, data, document.getElementsByName("checkBoxAppart")[0].checked, document.getElementsByName("checkBoxCondos")[0].checked, document.getElementsByName("checkBoxDuplex")[0].checked, document.getElementsByName("checkBoxHouse")[0].checked);
  });
  document.getElementsByName("checkBoxDuplex")[0].addEventListener('change', function () {
    viz.drawLines(xScale, yScale, data, document.getElementsByName("checkBoxAppart")[0].checked, document.getElementsByName("checkBoxCondos")[0].checked, document.getElementsByName("checkBoxDuplex")[0].checked, document.getElementsByName("checkBoxHouse")[0].checked);
  });
  document.getElementsByName("checkBoxHouse")[0].addEventListener('change', function () {
    viz.drawLines(xScale, yScale, data, document.getElementsByName("checkBoxAppart")[0].checked, document.getElementsByName("checkBoxCondos")[0].checked, document.getElementsByName("checkBoxDuplex")[0].checked, document.getElementsByName("checkBoxHouse")[0].checked);
  });
}
},{"./helper.js":"scripts/fluctCoutParType/helper.js","./scales.js":"scripts/fluctCoutParType/scales.js","./viz.js":"scripts/fluctCoutParType/viz.js","./preprocess.js":"scripts/fluctCoutParType/preprocess.js","./tooltip.js":"scripts/fluctCoutParType/tooltip.js","./legend.js":"scripts/fluctCoutParType/legend.js","d3-tip":"../node_modules/d3-tip/index.js"}],"index.js":[function(require,module,exports) {
"use strict";

var FluctBuilder = _interopRequireWildcard(require("./scripts/fluctCout/build.js"));
var FluctTypeBuilder = _interopRequireWildcard(require("./scripts/fluctCoutParType/build.js"));
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
(function (d3) {
  d3.csv('./donnees_habitations.csv', d3.autoType).then(function (data) {
    FluctBuilder.build(data, d3);
    FluctTypeBuilder.build(data, d3);
  });
})(d3);
},{"./scripts/fluctCout/build.js":"scripts/fluctCout/build.js","./scripts/fluctCoutParType/build.js":"scripts/fluctCoutParType/build.js"}],"../node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
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
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "38129" + '/');
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
},{}]},{},["../node_modules/parcel-bundler/src/builtins/hmr-runtime.js","index.js"], null)
//# sourceMappingURL=/src.e31bb0bc.js.map