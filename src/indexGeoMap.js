import * as helper from './scripts/geoMap/helper'
import * as preproc from './scripts/geoMap/preprocess'
import * as viz from './scripts/geoMap/viz'
import * as legend from './scripts/geoMap/legend'
import * as tooltip from "./scripts/geoMap/tooltip"

import d3Tip from 'd3-tip'

/**
 * @file This file is the entry-point for the the code for TP3 for the course INF8808.
 * @author Olivia Gélinas
 * @version v1.0.0
 */

(function (d3) {
  const svgSize = {
    width: 1100,
    height: 625
  }

  helper.setCanvasSize(svgSize.width, svgSize.height)
  helper.generateMapG(svgSize.width, svgSize.height)
  helper.generateMarkerG(svgSize.width, svgSize.height)
  helper.initPanelDiv()

  build()

  function build () {

    var projection = helper.getProjection()

    var path = helper.getPath(projection)

    let radiusScale = d3.scaleLinear()
    let colorScale = d3.scaleLinear()
     
    const tip = d3Tip().attr('class', 'd3-tip').html(function (d) { 
      return tooltip.getContents(d)
    })
    d3.select('.title-svg').call(tip)
    

    d3.json('./montreal.json').then(function (data1) {
      viz.mapBackground(data1, path, viz.showMapLabel)

      d3.csv('./donnees_habitations.csv').then(function(data) {
        let processed_data = preproc.MapNeighborhood(data)
        
        viz.setRadiusScale(radiusScale, processed_data)
        viz.setColorScale(colorScale, processed_data, ["#07F907", "#0A2BFF"])

        viz.mapMarkers(radiusScale, colorScale, processed_data, data1["features"], path, tip)
        legend.drawLegend(radiusScale, colorScale, d3.select('.main-svg'))
      })
      

    })
    

  }
})(d3);
