import * as Cesium from "cesium";
import "cesium/Build/Cesium/Widgets/widgets.css";
import "../src/css/main.css"

// Your access token can be found at: https://cesium.com/ion/tokens.
// This is the default access token
Cesium.Ion.defaultAccessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJlYWE1OWUxNy1mMWZiLTQzYjYtYTQ0OS1kMWFjYmFkNjc5YzciLCJpZCI6NTc3MzMsImlhdCI6MTYyNzg0NTE4Mn0.XcKpgANiY19MC4bdFUXMVEBToBmqS8kuYpUlxJHYZxk';

// Initialize the Cesium Viewer in the HTML element with the `cesiumContainer` ID.
const viewer = new Cesium.Viewer('cesiumContainer', {
    animation: false,
    timeline: false
    //terrainProvider: createWorldTerrainAsync()
});

var r= 255, g=0, b=0;
//New color every time it's called
var fadeColorDodo = new Cesium.CallbackProperty(function(time, result){
    if (r > 0 && b === 0) {
       r--;
       g++;
    }
    if (g > 0 && r === 0) {
       g--;
       b++;
    }
    if (b > 0 && g === 0) {
       r++;
       b--;
    }
    return Cesium.Color.fromBytes(r, g, b, 160, result);
}, false);

async function loadWorldTerrain() {
  let worldTerrain;
  try {
    worldTerrain = await Cesium.createWorldTerrainAsync();
    viewer.scene.terrainProvider = worldTerrain;
  } catch (error) {
    window.alert(`There was an error creating world terrain. ${error}`);
  }
};
loadWorldTerrain();

// Settings
viewer.scene.globe.enableLighting = true;

// Settings for platonic solids
const corridorWidth = 120000;
const polygonTransparency = 0.2;
const polylineWidth = 2;
const height = 2500000;

// Dodecahedron
// Corridor
const dodecahedronCorridorColor = new Cesium.Color.CYAN.withAlpha(0.2);
// Polygon
const dodecahedronPolygonColor = Cesium.Color.BLUE.withAlpha(polygonTransparency);

// Icosahedron
// Corridor
const icosahedronCorridorColor = Cesium.Color.ORANGE.withAlpha(0.2);
// Polygon
const icosahedronPolygonColor = Cesium.Color.RED.withAlpha(polygonTransparency);

const dodecahedron1 = [[-40.79776321801472,10.808510583843841],[-4.80138334081505,-10.822281509027434],[31.2,10.800000000010684],[31.200000000000003,52.61031489578929],[-40.78466772957245,52.618824140935395],[-40.79776321801472,10.808510583843841]];
const dodecahedron2 = [[31.200000000000003,52.61031489578929],[31.2,10.800000000010684],[67.20138334081507,-10.822281509027448],[103.19776321801469,10.808510583843827],[103.1846677295724,52.618824140935374],[31.200000000000003,52.61031489578929]];
const dodecahedron3 = [[103.19776321801469,10.808510583843827],[139.2022367819853,-10.808510583843841],[175.19861665918495,10.822281509027434],[175.19052028333158,52.63259589328868],[103.1846677295724,52.618824140935374],[103.19776321801469,10.808510583843827]];
const dodecahedron4 = [[175.19861665918495,10.822281509027434],[-148.8,-10.800000000010684],[-112.79861665918494,10.822281509027448],[-112.79052028333157,52.63259589328868],[175.19052028333158,52.63259589328868],[175.19861665918495,10.822281509027434]];
const dodecahedron5 = [[-112.79861665918494,10.822281509027448],[-76.8022367819853,-10.808510583843827],[-40.79776321801472,10.808510583843841],[-40.78466772957245,52.618824140935395],[-112.79052028333157,52.63259589328868],[-112.79861665918494,10.822281509027448]];
const dodecahedron6 = [[31.200000000000003,52.61031489578929],[103.1846677295724,52.618824140935374],[175.19052028333158,52.63259589328868],[-112.79052028333157,52.63259589328868],[-40.78466772957245,52.618824140935395],[31.200000000000003,52.61031489578929]];
const dodecahedron7 = [[-4.809479716668477,-52.63259589328871],[67.20947971666843,-52.63259589328871],[67.20138334081507,-10.822281509027448],[31.2,10.800000000010684],[-4.80138334081505,-10.822281509027434],[-4.809479716668477,-52.63259589328871]];
const dodecahedron8 = [[67.20947971666843,-52.63259589328871],[139.21533227042758,-52.6188241409354],[139.2022367819853,-10.808510583843841],[103.19776321801469,10.808510583843827],[67.20138334081507,-10.822281509027448],[67.20947971666843,-52.63259589328871]];
const dodecahedron9 = [[139.21533227042758,-52.6188241409354],[ -148.8,-52.61031489578929],[-148.8,-10.800000000010684],[175.19861665918495,10.822281509027434],[139.2022367819853,-10.808510583843841],[139.21533227042758,-52.6188241409354]]
const dodecahedron10 = [[-148.8,-52.61031489578929],[-76.81533227042763,-52.618824140935374],[-76.8022367819853,-10.808510583843827],[-112.79861665918494,10.822281509027448],[-148.8,-10.800000000010684],[-148.8,-52.61031489578929]];
const dodecahedron11 = [[-76.81533227042763,-52.618824140935374],[-4.809479716668477,-52.63259589328871],[-4.80138334081505,-10.822281509027434],[-40.79776321801472,10.808510583843841],[-76.8022367819853,-10.808510583843827],[-76.81533227042763,-52.618824140935374]];
const dodecahedron12 = [[139.21533227042758,-52.6188241409354],[67.20947971666843,-52.63259589328871],[-4.809479716668477,-52.63259589328871],[-76.81533227042763,-52.618824140935374],[-148.8,-52.61031489578929],[139.21533227042758,-52.6188241409354]];

const dodecahedrons = [dodecahedron1, dodecahedron2, dodecahedron3, dodecahedron4, dodecahedron5, dodecahedron6, dodecahedron7, dodecahedron8, dodecahedron9, dodecahedron10, dodecahedron11, dodecahedron12];

dodecahedrons.forEach((dodecahedron, index) => {
  for (let i = 0; i < dodecahedron.length - 1; i++) {
    let points = [dodecahedron[i][0], dodecahedron[i][1], 0, dodecahedron[i+1][0], dodecahedron[i+1][1], 0]

    const corridor = viewer.entities.add({
      name: "Dodecahedron Corridor " + i,
      corridor: {
        width: corridorWidth,
        height: 0,
        material: dodecahedronCorridorColor,
        outline: false,
        positions: Cesium.Cartesian3.fromDegreesArrayHeights(points),
      }
    });
  };
});

var dodeHeight = 2500000;
var dodeDirection = "greater"
dodecahedrons.forEach((dodecahedron, i) => {
  const polygon = viewer.entities.add({
    name: "Dodecahedron Polygon" + i,
    polygon: {
      //material: new Cesium.ColorMaterialProperty(fadeColorDodo),
      material: dodecahedronPolygonColor,
      outline: true,
      outlineColor: Cesium.Color.CYAN,
      perPositionHeight: true,
      hierarchy: new Cesium.CallbackProperty(getDodecahedronHeight(dodecahedron), false)
    }
  });
});

function getDodecahedronHeight(dodecahedron) {
  return function callbackFunction() {
    return { positions: Cesium.Cartesian3.fromDegreesArrayHeights([dodecahedron[0][0], dodecahedron[0][1], dodeHeight, dodecahedron[1][0], dodecahedron[1][1], dodeHeight, dodecahedron[2][0], dodecahedron[2][1], dodeHeight, dodecahedron[3][0], dodecahedron[3][1], dodeHeight, dodecahedron[4][0], dodecahedron[4][1], dodeHeight]) };
  };
}

setInterval(function(){
  if (dodeDirection  == "greater" && dodeHeight < 5000000) {
    dodeHeight = dodeHeight + 10000
  } else if (dodeDirection  == "greater" && dodeHeight == 5000000) {
    dodeDirection = "smaller"
    dodeHeight = dodeHeight - 10000
  } else if (dodeDirection  == "smaller" && dodeHeight > 2500000) {
    dodeHeight = dodeHeight - 10000
  } else {
    dodeDirection = "greater"
    dodeHeight = dodeHeight + 10000
  }
}, 50);

const icosahedron1 = [[66.70941343069455,27.978409693953772],[-6.69436868171357,28.832154577243884],[29.375674309792444,-24.27636072067999],[66.70941343069455,27.978409693953772]];
const icosahedron2 = [[66.70941343069455,27.978409693953772],[29.375674309792444,-24.27636072067999],[100.51573889211991,-26.512886979254972],[66.70941343069455,27.9784096939537722]];
const icosahedron3 = [[66.70941343069455,27.978409693953772],[100.51573889211991,-26.512886979254972],[138.6539041968874,25.162830706395297],[66.70941343069455,27.978409693953772]];
const icosahedron4 = [[138.6539041968874,25.162830706395297],[100.51573889211991,-26.512886979254972],[173.3056313182864,-28.832154577243884],[138.6539041968874,25.162830706395297]];
const icosahedron5 = [[138.6539041968874,25.162830706395297],[173.3056313182864,-28.832154577243884],[-150.62432569020757,24.27636072067999],[138.6539041968874,25.162830706395297]];
const icosahedron6 = [[-150.62432569020757,24.27636072067999],[173.3056313182864,-28.832154577243884],[-113.29058656930545,-27.97840969395375],[-150.62432569020757,24.27636072067999]];
const icosahedron7 = [[-150.62432569020757,24.27636072067999],[-113.29058656930545,-27.97840969395375],[-79.48426110788012,26.512886979254972],[-150.62432569020757,24.27636072067999]];
const icosahedron8 = [[-79.48426110788012,26.512886979254972],[-113.29058656930545,-27.97840969395375],[-41.34609580311263,-25.16283070639531],[-79.48426110788012,26.512886979254972]];
const icosahedron9 = [[-41.34609580311263,-25.16283070639531],[-79.48426110788012,26.512886979254972],[-6.69436868171357,28.832154577243884],[-41.34609580311263,-25.1628307063953]];
const icosahedron10 = [[-6.69436868171357,28.832154577243884],[-41.34609580311263,-25.16283070639531],[29.375674309792444,-24.27636072067999],[-6.69436868171357,28.832154577243884]];
const icosahedron11 = [[-6.69436868171357,28.832154577243884],[66.70941343069455,27.978409693953772],[-167.6386131682305,87.60443115654648],[-6.69436868171357,28.832154577243884]];
const icosahedron12 = [[-167.6386131682305,87.60443115654648],[66.70941343069455,27.978409693953772],[138.6539041968874,25.162830706395297],[-167.6386131682305,87.60443115654648]];
const icosahedron13 = [[-167.6386131682305,87.60443115654648],[138.6539041968874,25.162830706395297],[-150.62432569020757,24.27636072067999],[-167.6386131682305,87.60443115654648]];
const icosahedron14 = [[-167.6386131682305,87.60443115654648],[-150.62432569020757,24.27636072067999],[-79.48426110788012,26.512886979254972],[-167.6386131682305,87.6044311565464]];
const icosahedron15 = [[-167.6386131682305,87.60443115654648],[-79.48426110788012,26.512886979254972],[-6.69436868171357,28.832154577243884],[-167.6386131682305,87.60443115654648]];
const icosahedron16 = [[12.361386831769488,-87.60443115654647],[100.51573889211991,-26.512886979254972],[29.375674309792444,-24.27636072067999],[12.361386831769488,-87.60443115654647]];
const icosahedron17 = [[12.361386831769488,-87.60443115654647],[100.51573889211991,-26.512886979254972],[173.3056313182864,-28.832154577243884],[12.361386831769488,-87.60443115654647]];
const icosahedron18 = [[173.3056313182864,-28.832154577243884],[12.361386831769488,-87.60443115654647],[-113.29058656930545,-27.97840969395375],[173.3056313182864,-28.832154577243884]];
const icosahedron19 = [[-113.29058656930545,-27.97840969395375],[12.361386831769488,-87.60443115654647],[-41.34609580311263,-25.16283070639531],[-113.29058656930545,-27.97840969395375]];
const icosahedron20 = [[-41.34609580311263,-25.16283070639531],[12.361386831769488,-87.60443115654647],[29.375674309792444,-24.27636072067999],[-41.34609580311263,-25.16283070639531]];

const icosahedrons = [icosahedron1, icosahedron2, icosahedron3, icosahedron4, icosahedron5, icosahedron6, icosahedron7, icosahedron8, icosahedron9, icosahedron10, icosahedron11, icosahedron12, icosahedron13, icosahedron14, icosahedron15, icosahedron16, icosahedron17, icosahedron18, icosahedron19, icosahedron20]

icosahedrons.forEach((icosahedron, index) => {
  for (let i = 0; i < icosahedron.length - 1; i++) {
    let points = [icosahedron[i][0], icosahedron[i][1], 0, icosahedron[i+1][0], icosahedron[i+1][1], 0]

    const corridor = viewer.entities.add({
      name: "corridor " + i,
      corridor: {
        width: corridorWidth,
        height: 0,
        material: dodecahedronCorridorColor,
        outline: false,
        positions: Cesium.Cartesian3.fromDegreesArrayHeights(points),
      }
    });
  };
});

var icoHeight = 5000000;
var icoDirection = "smaller"
icosahedrons.forEach((icosahedron, i) => {
  let points = [icosahedron[0][0], icosahedron[0][1], icosahedron[1][0], icosahedron[1][1], icosahedron[2][0], icosahedron[2][1]]

  const polygon = viewer.entities.add({
    name: "Icosahedron Polygon" + i,
    polygon: {
      material: icosahedronPolygonColor,
      outline: true,
      outlineColor: Cesium.Color.ORANGE,
      perPositionHeight: true,
      hierarchy: new Cesium.CallbackProperty(getIcosahedronHeight(icosahedron), false)
    }
  });
});

function getIcosahedronHeight(icosahedron) {
  return function callbackFunction() {
    return { positions: Cesium.Cartesian3.fromDegreesArrayHeights([icosahedron[0][0], icosahedron[0][1], icoHeight, icosahedron[1][0], icosahedron[1][1], icoHeight, icosahedron[2][0], icosahedron[2][1], icoHeight]) };
  };
}

setInterval(function(){
  if (icoDirection  == "greater" && icoHeight < 5000000) {
    icoHeight = icoHeight + 10000
  } else if (icoDirection  == "greater" && icoHeight == 5000000) {
    icoDirection = "smaller"
    icoHeight = icoHeight - 10000
  } else if (icoDirection  == "smaller" && icoHeight > 2500000) {
    icoHeight = icoHeight - 10000
  } else {
    icoDirection = "greater"
    icoHeight = icoHeight + 10000
  }
}, 50);
