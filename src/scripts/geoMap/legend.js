/**
 * Draws the color legend.
 *
 * @param {*} colorScale The color scale used for the legend
 * @param {*} g The d3 Selection of the SVG g elemnt containing the legend
 */
export function drawLegend (radiusScale,colorScale, g) {
    
    const BOTTOM_UPPER_ELEMENT = 40
    const LEFT_UPPER_ELEMENT = 820
    const OFFSET = 20
    const BAR_HEIGHT = 200
    
    //titles
    g.append('text')
    .text('Légende')
    .attr('font-weight', "bold")
    .attr('transform', "translate(" + LEFT_UPPER_ELEMENT.toString() + "," + BOTTOM_UPPER_ELEMENT.toString() + ")")

    g.append('text')
    .text('Prix médian')
    .attr("font-size", "12")
    .attr('transform', "translate(" + LEFT_UPPER_ELEMENT.toString() + "," + (BOTTOM_UPPER_ELEMENT + OFFSET*1.5).toString() + ")")


    //titles (link : https://stackoverflow.com/questions/39023154/how-to-make-a-color-gradient-bar-using-d3js)
    var colors = colorScale.range();

    var svg = g.append('svg')
    .attr('width', 30)
    .attr('height', BAR_HEIGHT)
    .attr('x', LEFT_UPPER_ELEMENT + 30)
    .attr('y', (BOTTOM_UPPER_ELEMENT + OFFSET*2).toString())
    

    var grad = svg.append('defs')
    .append('linearGradient')
    .attr('id', 'grad')
    .attr('x1', '0%')
    .attr('x2', '0%')
    .attr('y1', '100%')
    .attr('y2', '0%');

    grad.selectAll('stop')
    .data(colors)
    .enter()
    .append('stop')
    .style('stop-color', function(d){ return d; })
    .attr('offset', function(d,i){
        return 100 * (i / (colors.length - 1)) + '%';
    })

    svg.append('rect')
    .attr('x', 10)
    .attr('y', 10)
    .attr('width', 50)
    .attr('height', BAR_HEIGHT)
    .style('fill', 'url(#grad)');

    //bar axes
    const yScale = d3.scaleLinear()
    let domain = colorScale.domain()
    console.log(domain)
    yScale.domain([Math.min(...domain), Math.max(...domain)]).range([BAR_HEIGHT, 0]);

    g.append("g")
    .attr('transform', "translate(" + (LEFT_UPPER_ELEMENT + 30).toString() + "," + (BOTTOM_UPPER_ELEMENT + OFFSET*2).toString() + ") ")
    .call(d3.axisLeft(yScale).ticks(5))

    const NEW_BOTTOM_UPPER_ELEMENT = BOTTOM_UPPER_ELEMENT + OFFSET*5 + BAR_HEIGHT
    g.append('text')
    .text('Superficie en pieds² médianne')
    .attr("font-size", "12")
    .attr('transform', "translate(" + LEFT_UPPER_ELEMENT.toString() + "," + NEW_BOTTOM_UPPER_ELEMENT.toString() + ")")

    let total_offset = NEW_BOTTOM_UPPER_ELEMENT + OFFSET
    for(let i = 0; i <= 4; i++){
        let super_value = 1800*(i/4)
        let value = radiusScale(super_value)
        total_offset += value*2 + OFFSET/2
        g.append('circle')
        .attr('cx', LEFT_UPPER_ELEMENT + OFFSET)
        .attr('cy', total_offset)
        .attr('r', value)
        .attr('fill', 'black');

        g.append('text')
        .text(super_value.toString() + " pieds²")
        .attr('font-size', 12)
        .attr('x', LEFT_UPPER_ELEMENT + OFFSET*2)
        .attr('y', total_offset + value/2)
        .attr('fill', 'black');
    }
    

}
