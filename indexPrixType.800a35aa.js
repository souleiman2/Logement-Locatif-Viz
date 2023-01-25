parcelRequire=function(e,r,t,n){var i,o="function"==typeof parcelRequire&&parcelRequire,u="function"==typeof require&&require;function f(t,n){if(!r[t]){if(!e[t]){var i="function"==typeof parcelRequire&&parcelRequire;if(!n&&i)return i(t,!0);if(o)return o(t,!0);if(u&&"string"==typeof t)return u(t);var c=new Error("Cannot find module '"+t+"'");throw c.code="MODULE_NOT_FOUND",c}p.resolve=function(r){return e[t][1][r]||r},p.cache={};var l=r[t]=new f.Module(t);e[t][0].call(l.exports,p,l,l.exports,this)}return r[t].exports;function p(e){return f(p.resolve(e))}}f.isParcelRequire=!0,f.Module=function(e){this.id=e,this.bundle=f,this.exports={}},f.modules=e,f.cache=r,f.parent=o,f.register=function(r,t){e[r]=[function(e,r){r.exports=t},{}]};for(var c=0;c<t.length;c++)try{f(t[c])}catch(e){i||(i=e)}if(t.length){var l=f(t[t.length-1]);"object"==typeof exports&&"undefined"!=typeof module?module.exports=l:"function"==typeof define&&define.amd?define(function(){return l}):n&&(this[n]=l)}if(parcelRequire=f,i)throw i;return f}({"YUzh":[function(require,module,exports) {
"use strict";function t(t){return d3.select(".graph-prix-type").select("svg").append("g").attr("id","graph-g-type").attr("transform","translate("+t.left+","+t.top+")")}function e(t){t.append("g").attr("class","x axis-type"),t.append("g").attr("class","y axis-type")}function a(t){t.append("text").text("Prix ($)").attr("class","y axis-text type").attr("transform","rotate(-90)").attr("fill","#898989").attr("font-size",12),t.append("text").text("Type d'habitation").attr("class","x axis-text type").attr("fill","#898989").attr("font-size",12),t.append("text").text("Prix en fonction du type d'habitation").attr("class","title type").attr("fill","#898989")}function r(t,e){return d3.scaleOrdinal().range(t).domain(e)}function s(t,e){d3.select("#bar-chart-prix-type").select("svg").attr("width",t).attr("height",e)}function i(t,e){d3.select(".y.axis-text.type").attr("x",-70).attr("y",e/2),d3.select(".x.axis-text.type").attr("x",t/2).attr("y",e+50),d3.select(".title.type").attr("x",t/2).attr("y",-35)}function p(t,e){d3.select(".x.axis-type").attr("transform","translate(0, "+e+")").call(d3.axisBottom(t))}function n(t){d3.select(".y.axis-type").call(d3.axisLeft(t).ticks(5))}Object.defineProperty(exports,"__esModule",{value:!0}),exports.appendAxes=e,exports.appendGraphLabels=a,exports.defineColorScale=r,exports.drawXAxis=p,exports.drawYAxis=n,exports.generateG=t,exports.positionLabels=i,exports.setCanvasSize=s;
},{}],"kz3K":[function(require,module,exports) {
"use strict";function t(t){return t.map(function(t){return{price:t.price,type:t.unitype}})}function r(t){return t.filter(function(t){return"Not Available"!=t.type})}function e(t){var r={};t.forEach(function(t){r.hasOwnProperty(t.type)?r[t.type].push(t.price):r[t.type]=[]});var e={};for(var o in r)e[o]=n(r[o]);return e}function n(t){return t.sort(function(t,r){return t-r}),{10:t[Math.floor(t.length/10)],25:t[Math.floor(1*t.length/4)],50:t[Math.floor(1*t.length/2)],75:t[Math.floor(3*t.length/4)],90:t[Math.floor(9*t.length/10)]}}function o(n){return e(r(t(n)))}Object.defineProperty(exports,"__esModule",{value:!0}),exports.endResult=o;
},{}],"lsvf":[function(require,module,exports) {
"use strict";function t(t,e,r){var a=Object.keys(e);t.domain(a).range([0,r])}function e(t,e,r){var a=-1/0;for(var c in e)e[c][90]>a&&(a=e[c][90]);t.domain([0,a]).range([r,0])}function r(t,e,r,a){var c=e.bandwidth(),l=function(t){return t/3},n=function(t){return 2*t/3};d3.selectAll(".typeCircles").remove();var s=Object.keys(r);d3.select("#graph-g-type").selectAll(".area-circle").data(s).enter().append("path").attr("d",function(a){return d3.line()([[e(a)+l(c),t(r[a][10])],[e(a)+n(c),t(r[a][10])]])}).attr("class","typeCircles").attr("stroke","black"),d3.select("#graph-g-type").selectAll(".area-circle").data(s).enter().append("path").attr("d",function(a){return d3.line()([[e(a)+l(c),t(r[a][90])],[e(a)+n(c),t(r[a][90])]])}).attr("class","typeCircles").attr("stroke","black"),d3.select("#graph-g-type").selectAll(".area-circle").data(s).enter().append("path").attr("d",function(a){return d3.line()([[e(a)+c/2,t(r[a][10])],[e(a)+c/2,t(r[a][90])]])}).attr("class","typeCircles").attr("stroke","black"),d3.select("#graph-g-type").selectAll(".area-circle").data(s).enter().append("rect").attr("x",function(t){return e(t)+l(c)}).attr("y",function(e){return t(r[e][75])}).attr("width",n(c)-l(c)).attr("height",function(e){return t(r[e][25])-t(r[e][75])}).attr("class","typeCircles").attr("stroke","black").attr("fill","#69a3b2"),d3.select("#graph-g-type").selectAll(".area-circle").data(s).enter().append("path").attr("d",function(a){return d3.line()([[e(a)+l(c),t(r[a][50])],[e(a)+n(c),t(r[a][50])]])}).attr("class","typeCircles").attr("stroke","black")}Object.defineProperty(exports,"__esModule",{value:!0}),exports.drawBoxes=r,exports.updateXScale=t,exports.updateYScale=e;
},{}],"v3vx":[function(require,module,exports) {
"use strict";var e=n(require("./scripts/explCoutType/helper")),t=n(require("./scripts/explCoutType/preprocess")),r=n(require("./scripts/explCoutType/viz"));function i(e){if("function"!=typeof WeakMap)return null;var t=new WeakMap,r=new WeakMap;return(i=function(e){return e?r:t})(e)}function n(e,t){if(!t&&e&&e.__esModule)return e;if(null===e||"object"!=typeof e&&"function"!=typeof e)return{default:e};var r=i(t);if(r&&r.has(e))return r.get(e);var n={},a=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var o in e)if("default"!==o&&Object.prototype.hasOwnProperty.call(e,o)){var p=a?Object.getOwnPropertyDescriptor(e,o):null;p&&(p.get||p.set)?Object.defineProperty(n,o,p):n[o]=e[o]}return n.default=e,r&&r.set(e,n),n}!function(i){var n,a,o,p={top:50,right:0,bottom:50,left:75},s=i.scaleBand(),u=i.scaleLinear(),c=e.generateG(p);e.appendAxes(c),e.appendGraphLabels(c),i.csv("Logement-Locatif-Viz/donnees_habitations.csv",i.autoType).then(function(c){var h=t.endResult(c);function d(){o=i.select(".graph-prix-type").node().getBoundingClientRect(),n={width:o.width,height:700},a={width:n.width-p.right-p.left,height:n.height-p.bottom-p.top},e.setCanvasSize(n.width,n.height)}function l(){e.positionLabels(a.width,a.height),r.updateXScale(s,h,a.width),r.updateYScale(u,h,a.height),e.drawXAxis(s,a.height),e.drawYAxis(u),r.drawBoxes(u,s,h,a.height)}d(),l(),window.addEventListener("resize",function(){d(),l()})})}(d3);
},{"./scripts/explCoutType/helper":"YUzh","./scripts/explCoutType/preprocess":"kz3K","./scripts/explCoutType/viz":"lsvf"}]},{},["v3vx"], null)
//# sourceMappingURL=Logement-Locatif-Viz/indexPrixType.800a35aa.js.map