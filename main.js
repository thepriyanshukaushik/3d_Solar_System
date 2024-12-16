import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/Addons.js";
import { RGBELoader } from "three/examples/jsm/loaders/RGBELoader.js";

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

const textureloader = new THREE.TextureLoader();
const textures = {
  suntexture : textureloader.load("Sun_texture.jpg"),
  Mercurytexture : textureloader.load("Mercury_texture.jpg"),
  venustexture : textureloader.load("venus_texture.jpg"),
  Earthtexture : textureloader.load("earth_texture.jpg"),
  Earthcloudtexture : textureloader.load("earth_clouds_texture.jpg"),
  marstexture : textureloader.load("mars_texture.jpg"),
  Jupitertexture : textureloader.load("Jupiter_texture.jpg"),
  saturntexture : textureloader.load("Saturn_texture.jpg"),
  saturnringtexture : textureloader.load("saturn_ring_texture.png"),
  uranustexture : textureloader.load("Uranus_texture.jpg"),
  Neptunetexture : textureloader.load("Neptune_texture.jpg"),
  bgtexture : textureloader.load("stars_milky_texture.jpg")
};

Object.values(textures).forEach((texture) => {
  texture.colorSpace = THREE.SRGBColorSpace;
});

scene.background = textures.bgtexture;


const geometry = new THREE.SphereGeometry(3, 64, 64);
const material = new THREE.MeshStandardMaterial({map : textures.suntexture});
const sun = new THREE.Mesh(geometry, material);

const geometry2 = new THREE.SphereGeometry(1, 64, 64);
const material2 = new THREE.MeshStandardMaterial({map : textures.Mercurytexture});
const mercury = new THREE.Mesh(geometry2, material2);

const geometry3 = new THREE.SphereGeometry(1.5, 64, 64);
const material3 = new THREE.MeshStandardMaterial({map : textures.venustexture});
const venus = new THREE.Mesh(geometry3, material3);

const geometry4 = new THREE.SphereGeometry(1.7, 64, 64);
const material4 = new THREE.MeshStandardMaterial({map : textures.Earthtexture});
const earth = new THREE.Mesh(geometry4, material4);

const geometry5 = new THREE.SphereGeometry(1.72, 64, 64);
const material5 = new THREE.MeshStandardMaterial({alphaMap: textures.Earthcloudtexture});
material5.transparent = true;
const earthcloud = new THREE.Mesh(geometry5, material5);

const geometry6 = new THREE.SphereGeometry(1, 64, 64);
const material6 = new THREE.MeshStandardMaterial({map :  textures.marstexture});
const mars = new THREE.Mesh(geometry6, material6);

const geometry7 = new THREE.SphereGeometry(2.5, 64, 64);
const material7 = new THREE.MeshStandardMaterial({map :  textures.Jupitertexture});
const jupiter = new THREE.Mesh(geometry7, material7);

const geometry8 = new THREE.SphereGeometry(1.9, 64, 64);
const material8 = new THREE.MeshStandardMaterial({map :  textures.saturntexture});
const saturn = new THREE.Mesh(geometry8, material8);

const geometry9 = new THREE.CylinderGeometry( 1.9, 2.9, .18, 32 , 10 , true);
const material9 = new THREE.MeshStandardMaterial({map: textures.saturnringtexture,  transparent: true});
const saturnring = new THREE.Mesh(geometry9, material9);

const geometry10 = new THREE.SphereGeometry(1.8, 64, 64);
const material10 = new THREE.MeshStandardMaterial({map :  textures.uranustexture});
const uranus = new THREE.Mesh(geometry10, material10);

const geometry11 = new THREE.SphereGeometry(1.75, 64, 64);
const material11 = new THREE.MeshStandardMaterial({map :  textures.Neptunetexture});
const neptune = new THREE.Mesh(geometry11, material11);

camera.position.z = 20;
camera.position.y = 8;


scene.add(sun);
scene.add(mercury);
scene.add(venus);
scene.add(earth);
scene.add(earthcloud);
scene.add(mars);
scene.add(jupiter);
scene.add(saturn);
scene.add(saturnring);
scene.add(uranus);
scene.add(neptune);


const hdriLoader = new RGBELoader();
hdriLoader.load(
  "https://dl.polyhaven.org/file/ph-assets/HDRIs/hdr/2k/sandsloot_2k.hdr",
  (hdriTexture) => {
    hdriTexture.mapping = THREE.EquirectangularReflectionMapping; 
    scene.environment = hdriTexture; 

  }
);

const canvas = document.querySelector("canvas");
const renderer = new THREE.WebGLRenderer({canvas});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
const controls = new OrbitControls(camera, renderer.domElement);


window.addEventListener("resize", function(){
  camera.aspect = window.innerWidth / window.innerHeight;
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.updateProjectionMatrix();
})




//Setting the positions and scaling of the sun and the planets

//1.Sun
sun.position.set(-9, 1, 4)
sun.scale.set(1.6, 1.6, 1.6);

//2. Mercury
mercury.position.set(-2.5, 0, 8)
mercury.scale.set(.6, .6, .6);

//3. Venus
venus.position.set(-.8, .2, -4)
venus.scale.set(1, 1, 1);

//4. Earth
earth.position.set(2.8, .3, 10);
earth.scale.set(1, 1, 1);

//EarthCloud
earthcloud.position.set(2.8, .3, 10);
earthcloud.scale.set(1, 1, 1);

//Mars
mars.position.set(6.5, -.5, 0);
mars.scale.set(.7, .7, .7);

//Jupiter
jupiter.position.set(10, .3, -15);
jupiter.scale.set(1.4, 1.4, 1.4);

//Saturn
saturn.position.set(19, 1, -8);
saturn.scale.set(1.25, 1.25, 1.25);

//Saturn Rings
saturnring.position.set(19, 1, -8);
saturnring.scale.set(1.3, 1.3, 1.3);
saturnring.rotation.x =.5;


//Uranus
uranus.position.set(22, 1.2, -30);
uranus.scale.set(1.2, 1.2, 1.2);

//Neptune
neptune.position.set(29, 1.5, -12);
neptune.scale.set(1.2, 1.2, 1.2);

window.addEventListener("resize", () => {
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
});


const sunLight = new THREE.PointLight(0xffffff, 1.5, 100);
sunLight.position.copy(sun.position);
scene.add(sunLight);



function animate(){
  window.requestAnimationFrame(animate);
  sun.rotation.y += .001;
  mercury.rotation.y += .003;
  venus.rotation.y += .003;
  earth.rotation.y += .003;
  earthcloud.rotation.y += .003;
  jupiter.rotation.y += .003;
  saturn.rotation.y += .003;
  saturnring.rotation.z += .005;
  neptune.rotation.y += .003;
  mars.rotation.y += .003;
  uranus.rotation.y += .003;
  controls.update();
  renderer.render(scene, camera);
}

animate();