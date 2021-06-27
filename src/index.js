
import * as FluctBuilder from './scripts/fluctCout/build.js'
import * as FluctTypeBuilder from './scripts/fluctCoutParType/build.js'


(function (d3) {
  d3.csv('./donnees_habitations.csv', d3.autoType).then(function (data) {
    FluctBuilder.build(data, d3);
    FluctTypeBuilder.build(data, d3);
  })
})(d3)