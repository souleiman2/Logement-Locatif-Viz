/**
 * Defines the contents of the tooltip. See CSS for tooltip styling. The tooltip
 * features the country name, population, GDP, and CO2 emissions, preceded
 * by a label and followed by units where applicable.
 *
 * @param {object} d The data associated to the hovered element
 * @returns {string} The tooltip contents
 */

 var months = ["Jan 20", "Fev 20", "Mar 20", "Avr 20", "Mai 20", "Jun 20", "Jui 20", "Aou 20", "Sep 20", "Oct 20", "Nov 20", "Dec 20",
 "Jan 21", "Fev 21", "Mar 21", "Avr 21", "Mai 21", "Jun 21", "Jui 21", "Aou 21", "Sep 21", "Oct 21", "Nov 21", "Dec 21"];


export function getContents (d, data) {
  // TODO : Generate tooltip contents
  return `<div style='font-weight:normal'>
            <b>Mois :</b> ${months[data.indexOf(d)]}<br/>
            <b>Nombre de logement à louer :</b> ${d.total}<br/>
            <b>Prix moyen :</b> ${Math.round(d.price)} $<br/>
          </div>`
}
