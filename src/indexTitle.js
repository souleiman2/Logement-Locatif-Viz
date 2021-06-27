import * as helper from './scripts/termesTitre/helper'
import * as viz from './scripts/termesTitre/viz'
import * as preproc from "./scripts/termesTitre/preprocess"
import * as tooltip from "./scripts/termesTitre/tooltip"

import d3Tip from 'd3-tip'

/**
 * @file This file is the entry-point for the the code for TP3 for the course INF8808.
 * @author Olivia Gélinas
 * @version v1.0.0
 */

(function (d3) {
  const margin = { top: 50, right: 0, bottom: 50, left: 75 }
  let svgSize, graphSize, bounds;

  const xScale = d3.scaleLinear()
  const yScale = d3.scaleBand().padding(0.5)
  const nbWords = 30
  const g = helper.generateG(margin)
  
  helper.appendAxes(g)

  const tip = d3Tip().attr('class', 'd3-tip').html(function (d) { 
    return tooltip.getContents(d)
  })
  d3.select('.title-svg').call(tip)

  d3.csv("./donnees_habitations.csv", d3.autoType).then(function (data) {
    

    const words_data = preproc.endResult(data, nbWords)

    setSizing();
    build();
    helper.appendGraphLabels(g)

    function setSizing() {
      bounds = d3.select('.graph-title').node().getBoundingClientRect()
      svgSize = {
        width: bounds.width,
        height: 700
      }

      graphSize = {
        width: svgSize.width - margin.right - margin.left,
        height: svgSize.height - margin.bottom - margin.top,
      };

      helper.setCanvasSize(svgSize.width, svgSize.height)
    }
    function build() {
      helper.positionLabels(graphSize.width, graphSize.height);
      
      viz.updateXScale(xScale, words_data, graphSize.width);
      viz.updateYScale(yScale, words_data, graphSize.height);

      helper.drawXAxis(xScale, graphSize.height);
      helper.drawYAxis(yScale);

      viz.drawBars(yScale, xScale, words_data, tip)
    }

    window.addEventListener("resize", () => {
      setSizing();
      build();
    });
  });
})(d3);
