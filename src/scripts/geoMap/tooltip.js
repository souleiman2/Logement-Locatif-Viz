/**
 * Defines the contents of the tooltip.
 *
 * @param {object} d The data associated to the hovered element
 * @returns {string} The tooltip contents
 */
export function getContents (d) {
  /* TODO : Define and return the tooltip contents including :
      + A title stating the hovered element's group, with:
        - Font family: Grenze Gotish
        - Font size: 24px
        - Font weigth: normal
      + A bold label for the player name followed
        by the hovered elements's player's name
      + A bold label for the player's line count
        followed by the number of lines
  */

  return `<div style='font-weight:normal'>
            <b>Nom du quartier : </b>${d["name"]}<br/>
            <b>Prix médian : </b>${Number(Number(d["prix"]).toFixed(2))}$<br/>
            <b>Superficie médianne : </b>${Number(Number(d["superficie"]).toFixed(2))} pieds²<br/>
            <b>Taille d'échantillon : </b>${d["total"]}<br/>
          </div>`
}
