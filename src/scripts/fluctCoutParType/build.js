'use strict'

import * as helper from './helper.js'
import * as scales from './scales.js'
import * as viz from './viz.js'
import * as preproc from './preprocess.js'
import * as tooltip from './tooltip.js'
import * as legend from './legend.js'

import d3Tip from 'd3-tip'

export function build(data, d3) {

    var data = preproc.getAveragePricePerHouseTypePerMonth(data)

    const margin = {
        top: 75,
        right: 200,
        bottom: 100,
        left: 80
    }

    let svgSize, graphSize

    setSizing()

    const g = helper.generateG(margin)

    const tip = d3Tip().attr('class', 'd3-tip').html(function (d) { return tooltip.getContents(d, data) })
    g.call(tip)

    helper.appendAxes(g)
    helper.appendGraphLabels(g)
    helper.placeTitle(g, graphSize.width, graphSize.height)

    viz.positionLabels(g, graphSize.width, graphSize.height)
    viz.setTitleText("Fluctuation du prix des logement en fonction du mois et du type de propriété")

    const xScale = scales.setXScale(graphSize.width, data)
    const yScale = scales.setYScale(graphSize.height, data)

    helper.drawXAxis(xScale, graphSize.height)
    helper.drawYAxis(yScale)

    legend.drawLegend(g, graphSize.width)

    function setSizing() {
        svgSize = {
            width: 1400,
            height: 800
        }

        graphSize = {
            width: svgSize.width - margin.right - margin.left,
            height: svgSize.height - margin.bottom - margin.top
        }

        helper.setCanvasSize(svgSize.width, svgSize.height)
    }

    viz.drawLines(xScale, yScale, data, document.getElementsByName("checkBoxAppart")[0].checked, document.getElementsByName("checkBoxCondos")[0].checked, document.getElementsByName("checkBoxDuplex")[0].checked, document.getElementsByName("checkBoxHouse")[0].checked);

      document.getElementsByName("checkBoxAppart")[0].addEventListener('change', function() {
        viz.drawLines(xScale, yScale, data, document.getElementsByName("checkBoxAppart")[0].checked, document.getElementsByName("checkBoxCondos")[0].checked, document.getElementsByName("checkBoxDuplex")[0].checked, document.getElementsByName("checkBoxHouse")[0].checked);
      });

      document.getElementsByName("checkBoxCondos")[0].addEventListener('change', function() {
        viz.drawLines(xScale, yScale, data, document.getElementsByName("checkBoxAppart")[0].checked, document.getElementsByName("checkBoxCondos")[0].checked, document.getElementsByName("checkBoxDuplex")[0].checked, document.getElementsByName("checkBoxHouse")[0].checked);
      });

      document.getElementsByName("checkBoxDuplex")[0].addEventListener('change', function() {
        viz.drawLines(xScale, yScale, data, document.getElementsByName("checkBoxAppart")[0].checked, document.getElementsByName("checkBoxCondos")[0].checked, document.getElementsByName("checkBoxDuplex")[0].checked, document.getElementsByName("checkBoxHouse")[0].checked);
      });

      document.getElementsByName("checkBoxHouse")[0].addEventListener('change', function() {
        viz.drawLines(xScale, yScale, data, document.getElementsByName("checkBoxAppart")[0].checked, document.getElementsByName("checkBoxCondos")[0].checked, document.getElementsByName("checkBoxDuplex")[0].checked, document.getElementsByName("checkBoxHouse")[0].checked);
      });

}

