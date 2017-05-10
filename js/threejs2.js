let container;
let camera, scene, renderer;
let plane, cube;
let mouse, raycaster, isCTRLDown, isShiftDown = false;
let rollOverMesh, rollOverMaterial;
let cubeGeo, cubeMaterial;
let objects = [];
let controls;
let zoomer = 1500;
let zoomInOut = 50;
let cubeColor = 0x000000;
let cubeCounter = 0;

let changeColor = document.getElementById('colorChangerrrr');

let element;

// const {createStore, combineReducers} = Redux;

const {createStore} = Redux;

const construction = (state = [], action)=>{
  if(action.type == "ADD_VOXEL"){
    return state.concat([action.voxel]);
  }
  else if(action.type == "REMOVE_VOXEL"){
    return state.filter((voxel, index)=>{
      if(action.index === index){
        return false
      }
      else{
        return true
      }
    })
  }
  else if (action.type == "ADD_PLANE"){
      return state.concat([action.plane])
  } else {
      return state;
  }
}

const store = createStore(construction);



init();

function init() {
    container = document.createElement('div');
    document.body.appendChild(container);

    renderer = new THREE.WebGLRenderer({
        antialias: true
    });
    renderer.setClearColor(0xffffff, 1.3);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);


    element = renderer.domElement;
    element.id = 'ourCanvas';
    container.appendChild(element);


    camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 10000);
    camera.position.z = 1500;
    camera.position.y = 800;



    scene = new THREE.Scene();
    scene.add(camera);

    controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.enabled = false;
    controls.minAzimuthAngle = -Infinity;
    controls.maxAzimuthAngle = Infinity;



    rollOverGeo = new THREE.BoxGeometry(50, 50, 50);
    rollOverMaterial = new THREE.MeshBasicMaterial({
        color: 0xff0000,
        opacity: .5,
        transparent: true
    });
    rollOverMesh = new THREE.Mesh(rollOverGeo, rollOverMaterial);
    scene.add(rollOverMesh);

    cubeGeo = new THREE.BoxGeometry(50, 50, 50);
    cubeMaterial = new THREE.MeshLambertMaterial({
		map: THREE.ImageUtils.loadTexture('../img/textures/originaltexture.jpg'),
        opacity: .5,
    });


    let size = 700,
        step = 50;
    let geometry = new THREE.Geometry();
    for (let i = -size; i <= size; i += step) {
        geometry.vertices.push(new THREE.Vector3(-size, 0, i));
        geometry.vertices.push(new THREE.Vector3(size, 0, i));
        geometry.vertices.push(new THREE.Vector3(i, 0, -size));
        geometry.vertices.push(new THREE.Vector3(i, 0, size));
    }
    let material = new THREE.LineBasicMaterial({
        color: 0x000000,
        opacity: .5,
        transparent: true
    });
    let line = new THREE.LineSegments(geometry, material);
    scene.add(line);

    raycaster = new THREE.Raycaster();
    mouse = new THREE.Vector2();
    geometry = new THREE.PlaneBufferGeometry(1400, 1400);
    geometry.rotateX(-Math.PI / 2);
    plane = new THREE.Mesh(geometry, new THREE.MeshBasicMaterial({
        visible: false
    }));
    scene.add(plane);
    store.dispatch({type:"ADD_PLANE", plane});

    let ambientLight = new THREE.AmbientLight(0x606060);
    scene.add(ambientLight);
    let directionalLight = new THREE.DirectionalLight(0xffffff);
    directionalLight.position.set(1, 0.75, 0.5).normalize();
    scene.add(directionalLight);
    container.appendChild(renderer.domElement);



    controls.enableZoom = true;
    document.addEventListener('mousemove', onDocumentMouseMove, false);
    document.addEventListener('mousedown', onDocumentMouseDown, false);
    document.addEventListener('keydown', onDocumentKeyDown, false);
    document.addEventListener('keyup', onDocumentKeyUp, false);

}

function onDocumentMouseMove(event) {
    event.preventDefault();
    mouse.set((event.clientX / window.innerWidth) * 2 - 1, -(event.clientY / window.innerHeight) * 2 + 1);
    raycaster.setFromCamera(mouse, camera);
    let intersects = raycaster.intersectObjects(store.getState());
    if (intersects.length > 0) {
        let intersect = intersects[0];
        rollOverMesh.position.copy(intersect.point).add(intersect.face.normal);
        rollOverMesh.position.divideScalar(50).floor().multiplyScalar(50).addScalar(25);
    }
    if (isCTRLDown) {
        rollOverMesh.material.opacity = "0";
    }
    render();
}

$('#bobChallengeSetup').click(function() {
    
})

function onDocumentMouseDown(event) {
    // event.preventDefault();
    mouse.set((event.clientX / window.innerWidth) * 2 - 1, -(event.clientY / window.innerHeight) * 2 + 1);
    raycaster.setFromCamera(mouse, camera);
    let intersects = raycaster.intersectObjects(store.getState());
    if (intersects.length > 0) {
        let intersect = intersects[0];
        if (isCTRLDown) {
            rollOverMesh.material.opacity = "0";
            if (intersect.object != plane) {
                store.dispatch({type:"REMOVE_VOXEL", index: store.getState().indexOf(intersect.object)} )
                cubeCounter++;
                $('#cubeCounter').html(cubeCounter);
                scene.remove(intersect.object);
            }
        } else if (!isShiftDown){
            if ($('body').hasClass('ingame')) {
                if ($('#cubeCounter').hasClass("up")) {
                    cubeCounter++;
                    console.log(parseInt(cubeCounter))
                    $('#cubeCounter').html(cubeCounter);
                } else {
                    cubeCounter--;
                    if (cubeCounter === 0) {
                        alert("Done!");
                    }
                }
                $('#cubeCounter').html(cubeCounter);
                let voxel = new THREE.Mesh(cubeGeo, cubeMaterial.clone());
                voxel.position.copy(intersect.point).add(intersect.face.normal);
                voxel.position.divideScalar(50).floor().multiplyScalar(50).addScalar(25);
                store.getState().map(obj => {
                    scene.remove(obj)
                })
                store.dispatch({type:"ADD_VOXEL", voxel})
                store.getState().map(obj => {
                    scene.add(obj)
                })
                // console.log(store.getState());
            }
        }
    }
	render();
}

function onDocumentKeyDown(event) {
    switch (event.keyCode) {
        case 17:
            isCTRLDown = true;
            break;
        case 16:
            isShiftDown = true;
            break;
    }
    if (isShiftDown) {
        controls.enabled = true;
        document.body.style.cursor = "move";
        rollOverMesh.material.opacity = "0";
        isShiftDown == true;
        render();
    }
}

function onDocumentKeyUp(event) {
    switch (event.keyCode) {
        case 17:
            isCTRLDown = false;
            break;
        case 16:
            isShiftDown = false;
            break;
    }
    if (!isShiftDown) {
        controls.enabled = false;
        document.body.style.cursor = "auto";
        rollOverMesh.material.opacity = "0.5";
        isShiftDown == false;
    }
}

function animate() {
    requestAnimationFrame(animate);
    controls.update();
    render();
}

render();

function render() {

    renderer.render(scene, camera);
}

let glassCube = document.getElementById('glassCube');
let grassCube = document.getElementById('grassCube');
let woodCube = document.getElementById('woodCube');
let brickCube = document.getElementById('brickCube');

function changeTexture(typeOfTexture) {
	cubeMaterial = new THREE.MeshLambertMaterial({
		map: THREE.ImageUtils.loadTexture(typeOfTexture)
	});
}

glassCube.addEventListener("click", () => {
	changeTexture("../img/textures/glasstexture.jpg");
});

grassCube.addEventListener("click", () => {
	changeTexture("../img/textures/grasstexture.jpg");
});

woodCube.addEventListener("click", () => {
	changeTexture("../img/textures/woodtexture.jpg");
});

brickCube.addEventListener("click", () => {
	changeTexture("../img/textures/bricktexture.png");
});
