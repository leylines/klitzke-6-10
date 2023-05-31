import * as Cesium from "cesium";
import "cesium/Build/Cesium/Widgets/widgets.css";
import "../src/css/main.css"

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/service-worker.js').then(registration => {
      console.log('SW registered: ', registration);
    }).catch(registrationError => {
      console.log('SW registration failed: ', registrationError);
    });
  });
}

var west  = -100000.0;
var south = -100000.0;
var east  = 100000.0;
var north = 100000.0;
var rectangle = Cesium.Rectangle.fromDegrees(west, south, east, north);

Cesium.Camera.DEFAULT_VIEW_FACTOR = 0.4;
Cesium.Camera.DEFAULT_VIEW_RECTANGLE = rectangle;

const optionsSphere = {
    animation: false,
    baseLayerPicker: false,
    fullscreenButton: false,
    geocoder: false,
    globe: false,
    infoBox: false,
    navigationHelpButton: false,
    navigationInstructionsInitiallyVisible: false,
    sceneModePicker: false,
    sceneModePicker: false,
    scene3DOnly: true,
    timeline: false,
    vrButton: true,
};

const viewSphere = new Cesium.Viewer("cesiumContainer", optionsSphere);

viewSphere.scene.skyBox.destroy();
viewSphere.scene.skyBox = undefined;
viewSphere.scene.sun.destroy();
viewSphere.scene.sun = undefined;
viewSphere.scene.moon.destroy();
viewSphere.scene.moon = undefined;
viewSphere.scene.backgroundColor = Cesium.Color.DEEPSKYBLUE;

viewSphere.scene.screenSpaceCameraController.enableTilt = false;

const dodecahedron1 = [[-40.78466772957245, 52.618824140935395], [31.200000000000003, 52.61031489578929], [31.2, 10.800000000010684], [-4.80138334081505, -10.822281509027434], [-40.79776321801472, 10.808510583843841], [-40.78466772957245, 52.618824140935395]];
const dodecahedron2 = [[31.200000000000003, 52.61031489578929], [103.1846677295724, 52.618824140935374], [103.19776321801469, 10.808510583843827], [67.20138334081507, -10.822281509027448], [31.2, 10.800000000010684], [31.200000000000003, 52.61031489578929]];
const dodecahedron3 = [[103.1846677295724, 52.618824140935374], [175.19052028333158, 52.63259589328868], [175.19861665918495, 10.822281509027434], [139.2022367819853, -10.808510583843841], [103.19776321801469, 10.808510583843827], [103.1846677295724, 52.618824140935374]];
const dodecahedron4 = [[175.19052028333158, 52.63259589328868], [-112.79052028333157, 52.63259589328868], [-112.79861665918494, 10.822281509027448], [-148.8, -10.800000000010684], [175.19861665918495, 10.822281509027434], [175.19052028333158, 52.63259589328868]];
const dodecahedron5 = [[-112.79052028333157, 52.63259589328868], [-40.78466772957245, 52.618824140935395], [-40.79776321801472, 10.808510583843841], [-76.8022367819853, -10.808510583843827], [-112.79861665918494, 10.822281509027448], [-112.79052028333157, 52.63259589328868]];
const dodecahedron6 = [[-112.79052028333157, 52.63259589328868], [175.19052028333158, 52.63259589328868], [103.1846677295724, 52.618824140935374], [31.200000000000003, 52.61031489578929], [-40.78466772957245, 52.618824140935395], [-112.79052028333157, 52.63259589328868]];
const dodecahedron7 = [[-4.80138334081505, -10.822281509027434], [31.2, 10.800000000010684], [67.20138334081507, -10.822281509027448], [67.20947971666843, -52.63259589328871], [-4.809479716668477, -52.63259589328871], [-4.80138334081505, -10.822281509027434]];
const dodecahedron8 = [[67.20138334081507, -10.822281509027448], [103.19776321801469, 10.808510583843827], [139.2022367819853, -10.808510583843841], [139.21533227042758, -52.6188241409354], [67.20947971666843, -52.63259589328871], [67.20138334081507, -10.822281509027448]];
const dodecahedron9 = [[139.2022367819853, -10.808510583843841], [175.19861665918495, 10.822281509027434], [-148.8, -10.800000000010684], [-148.8, -52.61031489578929], [139.21533227042758, -52.6188241409354], [139.2022367819853, -10.808510583843841]];
const dodecahedron10 = [[-148.8, -10.800000000010684], [-112.79861665918494, 10.822281509027448], [-76.8022367819853, -10.808510583843827], [-76.81533227042763, -52.618824140935374], [-148.8, -52.61031489578929], [-148.8, -10.800000000010684]];
const dodecahedron11 = [[-76.8022367819853, -10.808510583843827], [-40.79776321801472, 10.808510583843841], [-4.80138334081505, -10.822281509027434], [-4.809479716668477, -52.63259589328871], [-76.81533227042763, -52.618824140935374], [-76.8022367819853, -10.808510583843827]];
const dodecahedron12 = [[-4.809479716668477, -52.63259589328871], [67.20947971666843, -52.63259589328871], [139.21533227042758, -52.6188241409354], [-148.8, -52.61031489578929], [-76.81533227042763, -52.618824140935374], [-4.809479716668477, -52.63259589328871]];

const dodecahedrons = [dodecahedron1, dodecahedron2, dodecahedron3, dodecahedron4, dodecahedron5, dodecahedron6, dodecahedron7, dodecahedron8, dodecahedron9, dodecahedron10, dodecahedron11, dodecahedron12];

const icosahedron1 = [[-4.796381079455443, 26.555086315586593], [67.19638107945546, 26.555086315586593], [31.199999999999985, -26.57736814063898], [-4.796381079455443, 26.555086315586593]];
const icosahedron2 = [[67.19638107945546, 26.555086315586593], [103.20585764782062, -26.56885672935232], [31.199999999999985, -26.57736814063898], [67.19638107945546, 26.555086315586593]];
const icosahedron3 = [[67.19638107945546, 26.555086315586593], [139.19414235217937, 26.568856729352312], [103.20585764782062, -26.56885672935232], [67.19638107945546, 26.555086315586593]];
const icosahedron4 = [[139.19414235217937, 26.568856729352312], [175.20361892054453, -26.55508631558658], [103.20585764782062, -26.56885672935232], [139.19414235217937, 26.568856729352312]];
const icosahedron5 = [[139.19414235217937, 26.568856729352312], [-148.8, 26.577368140639003], [175.20361892054453, -26.55508631558658], [139.19414235217937, 26.568856729352312]];
const icosahedron6 = [[-148.8, 26.577368140639003], [-112.80361892054455, -26.55508631558658], [175.20361892054453, -26.55508631558658], [-148.8, 26.577368140639003]];
const icosahedron7 = [[-148.8, 26.577368140639003], [-76.79414235217939, 26.568856729352333], [-112.80361892054455, -26.55508631558658], [-148.8, 26.577368140639003]];
const icosahedron8 = [[-76.79414235217939, 26.568856729352333], [-40.80585764782063, -26.56885672935232], [-112.80361892054455, -26.55508631558658], [-76.79414235217939, 26.568856729352333]];
const icosahedron9 = [[-76.79414235217939, 26.568856729352333], [-4.796381079455443, 26.555086315586593], [-40.80585764782063, -26.56885672935232], [-76.79414235217939, 26.568856729352333]];
const icosahedron10 = [[-4.796381079455443, 26.555086315586593], [31.199999999999985, -26.57736814063898], [-40.80585764782063, -26.56885672935232], [-4.796381079455443, 26.555086315586593]];
const icosahedron11 = [[31.200000000032052, 89.98768303643898], [67.19638107945546, 26.555086315586593], [-4.796381079455443, 26.555086315586593], [31.200000000032052, 89.98768303643898]];
const icosahedron12 = [[31.200000000032052, 89.98768303643898], [139.19414235217937, 26.568856729352312], [67.19638107945546, 26.555086315586593], [31.200000000032052, 89.98768303643898]];
const icosahedron13 = [[31.200000000032052, 89.98768303643898], [-148.8, 26.577368140639003], [139.19414235217937, 26.568856729352312], [31.200000000032052, 89.98768303643898]];
const icosahedron14 = [[31.200000000032052, 89.98768303643898], [-76.79414235217939, 26.568856729352333], [-148.8, 26.577368140639003], [31.200000000032052, 89.98768303643898]];
const icosahedron15 = [[31.200000000032052, 89.98768303643898], [-4.796381079455443, 26.555086315586593], [-76.79414235217939, 26.568856729352333], [31.200000000032052, 89.98768303643898]];
const icosahedron16 = [[31.199999999999985, -26.57736814063898], [103.20585764782062, -26.56885672935232], [-148.79999999996795, -89.98768303643897], [31.199999999999985, -26.57736814063898]];
const icosahedron17 = [[103.20585764782062, -26.56885672935232], [175.20361892054453, -26.55508631558658], [-148.79999999996795, -89.98768303643897], [103.20585764782062, -26.56885672935232]];
const icosahedron18 = [[175.20361892054453, -26.55508631558658], [-112.80361892054455, -26.55508631558658], [-148.79999999996795, -89.98768303643897], [175.20361892054453, -26.55508631558658]];
const icosahedron19 = [[-112.80361892054455, -26.55508631558658], [-40.80585764782063, -26.56885672935232], [-148.79999999996795, -89.98768303643897], [-112.80361892054455, -26.55508631558658]];
const icosahedron20 = [[-40.80585764782063, -26.56885672935232], [31.199999999999985, -26.57736814063898], [-148.79999999996795, -89.98768303643897], [-40.80585764782063, -26.56885672935232]];

const icosahedrons = [icosahedron1, icosahedron2, icosahedron3, icosahedron4, icosahedron5, icosahedron6, icosahedron7, icosahedron8, icosahedron9, icosahedron10, icosahedron11, icosahedron12, icosahedron13, icosahedron14, icosahedron15, icosahedron16, icosahedron17, icosahedron18, icosahedron19, icosahedron20]

var maxHeight = 7300000;
var minHeight = 5300000;
var globeHeight = 6300000;
var direction = "smaller";

dodecahedrons.forEach((dodecahedron, i) => {
  let dodecahedronHeight = 300000;
  const polygon = viewSphere.entities.add({
    name: "Dodecahedron Polygon" + i,
    polygon: {
      material: Cesium.Color.BLUE.withAlpha(0.1),
      arcType: 'NONE',
      width: 3,
      outline: true,
      perPositionHeight: true,
      outlineColor: Cesium.Color.BLUE,
      outlineWidth: 5,
      hierarchy: Cesium.Cartesian3.fromDegreesArrayHeights([dodecahedron[0][0], dodecahedron[0][1], dodecahedronHeight, dodecahedron[1][0], dodecahedron[1][1], dodecahedronHeight, dodecahedron[2][0], dodecahedron[2][1], dodecahedronHeight, dodecahedron[3][0], dodecahedron[3][1], dodecahedronHeight, dodecahedron[4][0], dodecahedron[4][1], dodecahedronHeight])
    }
  });
});

icosahedrons.forEach((icosahedron, i) => {
  let icosahedronHeight = 920000;
  const polygon = viewSphere.entities.add({
    name: "Icosahedron Polygon" + i,
    polygon: {
      material: Cesium.Color.RED.withAlpha(0.1),
      arcType: 'NONE',
      width: 3,
      perPositionHeight: true,
      outline: true,
      outlineColor: Cesium.Color.RED,
      outlineWidth: 5,
      hierarchy: Cesium.Cartesian3.fromDegreesArrayHeights([icosahedron[0][0], icosahedron[0][1], icosahedronHeight, icosahedron[1][0], icosahedron[1][1], icosahedronHeight, icosahedron[2][0], icosahedron[2][1], icosahedronHeight])
    }
  });
});

setInterval(function(){
  if (direction  == "greater" && globeHeight < maxHeight) {
    globeHeight = globeHeight + 10000
  } else if (direction  == "greater" && globeHeight == maxHeight) {
    direction = "smaller"
    globeHeight = globeHeight - 10000
  } else if (direction  == "smaller" && globeHeight > minHeight) {
    globeHeight = globeHeight - 10000
  } else {
    direction = "greater"
    globeHeight = globeHeight + 10000
  }
}, 50);

var fadeAlpha = new Cesium.CallbackProperty(function(time, result){
    let alpha = (( globeHeight - minHeight ) / (maxHeight - minHeight)) * (254 - 194) + 0;
    return Cesium.Color.fromBytes(255, 221, 0, 254 - alpha, result);
}, false);

const goldEllipsoid = viewSphere.entities.add({
  name: "Gold Ellipsoid",
  position: Cesium.Cartesian3.ZERO,
  ellipsoid: {
    //radii: new Cesium.Cartesian3(6300000.0, 6300000.0, 6300000.0),
    radii: new Cesium.CallbackProperty(function(){
            return new Cesium.Cartesian3(globeHeight, globeHeight, globeHeight);
        }, false),
    //material: Cesium.Color.GOLD.withAlpha(1.0),
    material: new Cesium.ColorMaterialProperty(fadeAlpha),
  },
});

