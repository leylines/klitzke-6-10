import * as Cesium from "cesium";
import "cesium/Build/Cesium/Widgets/widgets.css";
import "../src/css/main.css"

var west  = -100000.0;
var south = -100000.0;
var east  = 100000.0;
var north = 100000.0;
var rectangle = Cesium.Rectangle.fromDegrees(west, south, east, north);

Cesium.Camera.DEFAULT_VIEW_FACTOR = 1;
Cesium.Camera.DEFAULT_VIEW_RECTANGLE = rectangle;

const clockViewModel = new Cesium.ClockViewModel();
const optionsSphere = {
    animation: false,
    baseLayerPicker: true,
    clockViewModel: clockViewModel,
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

/**
const optionsEarth = {
    animation: false,
    baseLayerPicker: false,
    clockViewModel: clockViewModel,
    fullscreenButton: false,
    geocoder: false,
    hdr: true,
    homeButton: false,
    infoBox: false,
    navigationHelpButton: false,
    navigationInstructionsInitiallyVisible: false,
    sceneModePicker: false,
    scene3DOnly: true,
    timeline: false,
    baseLayer: Cesium.ImageryLayer.fromProviderAsync(
      Cesium.ArcGisMapServerImageryProvider.fromUrl(
        "https://services.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer"
      )
    ),
};
**/

const viewSphere = new Cesium.Viewer("viewSphere", optionsSphere);
//const viewEarth = new Cesium.Viewer("viewEarth", optionsEarth);

viewSphere.scene.skyBox.destroy();
viewSphere.scene.skyBox = undefined;
viewSphere.scene.sun.destroy();
viewSphere.scene.sun = undefined;
viewSphere.scene.moon.destroy();
viewSphere.scene.moon = undefined;
viewSphere.scene.backgroundColor = Cesium.Color.DEEPSKYBLUE;

/**
async function loadWorldTerrain() {
  let worldTerrain;
  try {
    worldTerrain = await Cesium.createWorldTerrainAsync();
    viewEarth.scene.terrainProvider = worldTerrain;
  } catch (error) {
    window.alert(`There was an error creating world terrain. ${error}`);
  }
};

loadWorldTerrain();
**/

let sphereWorldPosition;
let sphereDistance;

function syncEarthView() {
  // The center of the view is the point that the 3D camera is focusing on
  const viewCenter = new Cesium.Cartesian2(
    Math.floor(viewSphere.canvas.clientWidth / 2),
    Math.floor(viewSphere.canvas.clientHeight / 2)
  );
  // Given the pixel in the center, get the world position
  const newSphereWorldPosition = viewSphere.scene.camera.pickEllipsoid(
    viewCenter
  );
  if (Cesium.defined(newSphereWorldPosition)) {
    // Guard against the case where the center of the screen
    // does not fall on a position on the globe
    sphereWorldPosition = newSphereWorldPosition;
  }
  // Get the distance between the world position of the point the camera is focusing on, and the camera's world position
  sphereDistance = Cesium.Cartesian3.distance(
    sphereWorldPosition,
    viewSphere.scene.camera.positionWC
  );
  // Tell the 2D camera to look at the point of focus. The distance controls how zoomed in the 2D view is
  // (try replacing `distance` in the line below with `1e7`. The view will still sync, but will have a constant zoom)
  viewEarth.scene.camera.lookAt(
    sphereWorldPosition,
    new Cesium.Cartesian3(0.0, 0.0, sphereDistance)
  );
}

// Apply our sync function every time the 3D camera view changes
//viewSphere.camera.changed.addEventListener(syncEarthView);
// By default, the `camera.changed` event will trigger when the camera has changed by 50%
// To make it more sensitive, we can bring down this sensitivity
//viewSphere.camera.percentageChanged = 0.01;

// Since the 2D view follows the 3D view, we disable any
// camera movement on the 2D view
viewSphere.scene.screenSpaceCameraController.enableTilt = false;
//viewEarth.scene.screenSpaceCameraController.enableRotate = false;
//viewEarth.scene.screenSpaceCameraController.enableTranslate = false;
//viewEarth.scene.screenSpaceCameraController.enableZoom = false;
//viewEarth.scene.screenSpaceCameraController.enableTilt = false;
//viewEarth.scene.screenSpaceCameraController.enableLook = false;

/**
const scene = viewer.scene;
const globe = scene.globe;
const baseLayer = viewer.scene.imageryLayers.get(0);

//globe.showGroundAtmosphere = false;
//globe.baseColor = Cesium.Color.TRANSPARENT;
//globe.translucency.enabled = true;
//globe.undergroundColor = undefined;

// Set oceans on base layer to transparent
//baseLayer.colorToAlpha = new Cesium.Color(0.0, 0.0, 0.0);
//baseLayer.colorToAlphaThreshold = 0.2;

globe.showGroundAtmosphere = false;
globe.translucency.enabled = true;
globe.undergroundColor = undefined;
globe.translucency.frontFaceAlpha = 0.20;
globe.translucency.backFaceAlpha = 0.00;

**/

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

var maxHeight = 7300000;
var minHeight = 5300000;
var globeHeight = 6300000;
var direction = "smaller";

/**
dodecahedrons.forEach((dodecahedron, index) => {
  for (let i = 0; i < dodecahedron.length - 1; i++) {
    const corridor = viewEarth.entities.add({
      name: "Dodecahedron Corridor " + i,
      corridor: {
        width: 120000,
        height: 0,
        material: Cesium.Color.GREY.withAlpha(0.4),
        outline: false,
        positions: Cesium.Cartesian3.fromDegreesArray([dodecahedron[i][0], dodecahedron[i][1], dodecahedron[i+1][0], dodecahedron[i+1][1]]),
      }
    });
  };
});
**/

dodecahedrons.forEach((dodecahedron, i) => {
  let dodecahedronHeight = 300000;
  const polygon = viewSphere.entities.add({
    name: "Dodecahedron Polygon" + i,
    polygon: {
      material: Cesium.Color.BLUE.withAlpha(0.05),
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

/**
icosahedrons.forEach((icosahedron, index) => {
  for (let i = 0; i < icosahedron.length - 1; i++) {
    const corridor = viewEarth.entities.add({
      name: "corridor " + i,
      corridor: {
        width: 120000,
        height: 0,
        material: Cesium.Color.GREY.withAlpha(0.4),
        outline: false,
        positions: Cesium.Cartesian3.fromDegreesArray([icosahedron[i][0], icosahedron[i][1], icosahedron[i+1][0], icosahedron[i+1][1]]),
      }
    });
  };
});
**/

icosahedrons.forEach((icosahedron, i) => {
  let icosahedronHeight = 900000;
  const polygon = viewSphere.entities.add({
    name: "Icosahedron Polygon" + i,
    polygon: {
      material: Cesium.Color.RED.withAlpha(0.05),
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


const goldEllipsoid = viewSphere.entities.add({
  name: "Gold Ellipsoid",
  position: Cesium.Cartesian3.ZERO,
  ellipsoid: {
    //radii: new Cesium.Cartesian3(6300000.0, 6300000.0, 6300000.0),
    radii: new Cesium.CallbackProperty(function(){
            return new Cesium.Cartesian3(globeHeight, globeHeight, globeHeight);
        }, false),
    material: Cesium.Color.GOLD.withAlpha(1.0),
  },
});

