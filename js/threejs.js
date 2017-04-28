let container;
let camera, scene, renderer;
let plane, cube;
let mouse, raycaster, isShiftDown = false;
let rollOverMesh, rollOverMaterial;
let cubeGeo, cubeMaterial;
let objects = [];
let threeJSPlayground = document.getElementById('playground');
let builder;

var targetRotation = 0;
var targetRotationOnMouseDown = 0;
var mouseX = 0;
var mouseXOnMouseDown = 0;
var windowHalfX = window.innerWidth / 2;
var windowHalfY = window.innerHeight / 2;
var rotateControls = false;
var builderStarted = false;

init();
// render();
function init() {


  container = document.createElement( 'div' );
  container.className = "canvasContainer";
  threeJSPlayground.appendChild(container)
  camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 10000 );
  // camera.position.set( 3000, 800, 300 );
  camera.position.set( 300, 800, 300 );
  camera.lookAt( new THREE.Vector3() );
  let cursorX
  let cursorY


$(window).scroll(function() {
    let zoomer = 1;
    zoomer++;
    console.log(zoomer);
});

  var zoomChange = false;
  document.addEventListener("keydown", function(e) {

      if (e.keyCode == 16) {

          var totalRotation = 720;
          var edgeAmount = 5000;
          var initialMouseX = e.clientX;

          zoomChange = (zoomChange) ? false : true;

      }
  });

  document.onmousemove = function(e){

      if (!zoomChange) {
          return;
      }

        document.body.style.cursor = "pointer";
        cursorX = e.pageX;
        cursorY = e.pageY;
        console.log(cursorY*2 + '<-- Y | X -->' + cursorX)
        // camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 10000 );
        // camera.position.set( 3000, cursorY, cursorX*1.4 );
        console.log( (cursorX * 90) * Math.PI / 90 , cursorY, Math.sin(cursorX * 90) * Math.PI / 40 )
        console.log(window.innerWidth)
        // camera.position.set( (Math.sin(cursorX*0.01) *700), 900, 500 );
        camera.position.set( (cursorX * 90) * Math.PI / 90 , camera.position.y, 300 );
        camera.lookAt( new THREE.Vector3() );

        // // I want a number from 300 to 680
        // (Math.sin(x) * 190) + 490
        // camera.position.set( Math.sin(cursorY*0.01)*3000, camera.position.y, Math.sin(cursorX*0.01)*3000 );
}

  scene = new THREE.Scene();
  // roll-over helpers
  rollOverGeo = new THREE.BoxGeometry( 50, 50, 50 );
  rollOverMaterial = new THREE.MeshBasicMaterial( { color: 0xff0000, opacity: 0.5, transparent: true } );
  rollOverMesh = new THREE.Mesh( rollOverGeo, rollOverMaterial );
  scene.add( rollOverMesh );

  builder = new THREE.Object3D();
  scene.add( builder );

  // cubes
  cubeGeo = new THREE.BoxGeometry( 50, 50, 50 );
  cubeMaterial = new THREE.MeshLambertMaterial( { color: 0xfeb74c, map: new THREE.TextureLoader().load("kalli1.jpg") } );
  // grid
  var size = 500, step = 50;
  var geometry = new THREE.Geometry();
  for ( var i = - size; i <= size; i += step ) {
    geometry.vertices.push( new THREE.Vector3( - size, 0, i ) );
    geometry.vertices.push( new THREE.Vector3(   size, 0, i ) );
    geometry.vertices.push( new THREE.Vector3( i, 0, - size ) );
    geometry.vertices.push( new THREE.Vector3( i, 0,   size ) );
  }
  var material = new THREE.LineBasicMaterial( { color: 0x000000, opacity: 0.2, transparent: true } );
  var line = new THREE.LineSegments( geometry, material );
  builder.add( line );
  console.log(line.position);
  //
  raycaster = new THREE.Raycaster();
  mouse = new THREE.Vector2();
  var geometry = new THREE.PlaneBufferGeometry( 50000, 50000 );
  geometry.rotateX( - Math.PI / 2 );
  plane = new THREE.Mesh( geometry, new THREE.MeshBasicMaterial( { visible: false } ) );
  builder.add( plane );
  objects.push( plane );
  // Lights
  var ambientLight = new THREE.AmbientLight( 0x606060 );
  builder.add( ambientLight );

  var directionalLight = new THREE.DirectionalLight( 0xffffff );
  directionalLight.position.set( 1, 0.75, 0.5 ).normalize();
  builder.add( directionalLight );

  renderer = new THREE.WebGLRenderer( { antialias: true } );
  renderer.setClearColor( 0xf0f0f0 );
  renderer.setPixelRatio( window.devicePixelRatio );
  renderer.setSize( window.innerWidth, window.innerHeight );

  container.appendChild( renderer.domElement );
  document.addEventListener( 'mousemove', onDocumentMouseMove, false );
  document.addEventListener( 'mousedown', onDocumentMouseDown, false );
  document.addEventListener( 'keydown', onDocumentKeyDown, false );
  document.addEventListener( 'keyup', onDocumentKeyUp, false );
  //
  window.addEventListener( 'resize', onWindowResize, false );
  document.addEventListener('mousedown', onDocumentMouseDown, false);
  document.addEventListener('mouseup', onMouseUp, false);
  document.addEventListener('mouseout', onMouseUp, false);
  // render();
}
function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize( window.innerWidth, window.innerHeight );
}
function onDocumentMouseMove( event ) {
  event.preventDefault();
  mouse.set( ( event.clientX / window.innerWidth ) * 2 - 1, - ( event.clientY / window.innerHeight ) * 2 + 1 );
  raycaster.setFromCamera( mouse, camera );
  var intersects = raycaster.intersectObjects( objects );
  if ( intersects.length > 0 ) {
    var intersect = intersects[ 0 ];
    rollOverMesh.position.copy( intersect.point ).add( intersect.face.normal );
    rollOverMesh.position.divideScalar( 50 ).floor().multiplyScalar( 50 ).addScalar( 25 );
  }
  // render();
    mouseX = event.clientX - windowHalfX;
    targetRotation = targetRotationOnMouseDown + ( mouseX - mouseXOnMouseDown ) * 0.02;

}
function onDocumentMouseDown( event ) {
  event.preventDefault();
  mouse.set( ( event.clientX / window.innerWidth ) * 2 - 1, - ( event.clientY / window.innerHeight ) * 2 + 1 );
  raycaster.setFromCamera( mouse, camera );
  var intersects = raycaster.intersectObjects( objects );
  if ( intersects.length > 0 ) {
    var intersect = intersects[ 0 ];
    // delete cube
    if ( isShiftDown ) {
      if ( intersect.object != plane ) {
        builder.remove( intersect.object );
        objects.splice( objects.indexOf( intersect.object ), 1 );
      }
    // create cube
    } else {
      var voxel = new THREE.Mesh( cubeGeo, cubeMaterial );
      voxel.position.copy( intersect.point ).add( intersect.face.normal );
      voxel.position.divideScalar( 50 ).floor().multiplyScalar( 50 ).addScalar( 25 );
      builder.add( voxel );
      objects.push( voxel );
    }

    // render();

    if ( builderStarted ) {
        rotateControls = true;
    }
    mouseXOnMouseDown = event.clientX - windowHalfX;
	targetRotationOnMouseDown = targetRotation;


  }
}

function onMouseUp( event ) {
	rotateControls = false;
}

function onDocumentKeyDown( event ) {
  switch( event.keyCode ) {
    case 16: isShiftDown = true; break;
  }
}
function onDocumentKeyUp( event ) {
  switch ( event.keyCode ) {
    case 16: isShiftDown = false; break;
  }
}
function render() {

  requestAnimationFrame( render );

  renderer.render( scene, camera );

  if ( rotateControls ) {
      builder.rotation.y = builder.rotation.y += ( targetRotation - builder.rotation.y ) * 0.05;
  }

}
render();

function onDocumentKeyDown(){
  animate();
}

function animate() {
cube.rotation.y += 500;
// render();

}

document.getElementById('play').addEventListener('click', function(){
    builderStarted = true;
});
