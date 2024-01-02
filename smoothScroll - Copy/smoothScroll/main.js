import './style.css'
import * as THREEJS from 'three'
import * as SEE from './components/perception.js'
import * as ELE from './components/elements.js'

const body = document.body;
const main = document.getElementById('main');
const sizes = {width: window.innerWidth,height:window.innerHeight}
const mouse = {x:0,y:0}
const canvas = document.querySelector('#bg')
const [scene,renderer,camera] = SEE.createScene(canvas,sizes)

window.addEventListener('resize', () =>{
  sizes.width = window.innerWidth
  sizes.height = window.innerHeight

  camera.aspect=sizes.width/sizes.height
  camera.updateProjectionMatrix()

  renderer.setSize(sizes.width,sizes.height)
  renderer.setPixelRatio(Math.min(window.devicePixelRatio,2))
})

for(let i = 0; i < 3; i++){
  const geometry = new THREEJS.BoxGeometry(750,500,100)
  const material = new THREEJS.MeshNormalMaterial()
  const sphere = new THREEJS.Mesh(geometry,material)
  sphere.position.set(750,-900*(i),-750)
  scene.add(sphere)
}










let sx = 0, // For scroll positions
    sy = 0;

let dx = sx, // For container positions
    dy = sy;

body.style.height = main.clientHeight + 'px';


main.style.position = 'fixed';
main.style.top = 0;
main.style.left = 0;

// Bind a scroll function
window.addEventListener('scroll', easeScroll);


function easeScroll() {
  sx = window.pageXOffset;
  sy = window.pageYOffset;
  console.log(sx,sy)
}




function tick(){
  //We calculate our container position by linear interpolation method
  dx = li(dx,sx,0.07);
  dy = li(dy,sy,0.07);
  
  dx = Math.floor(dx * 100) / 100;
  dy = Math.floor(dy * 100) / 100;
  
  
  main.style.transform = `translate3d(-${dx}px, -${dy}px, 0px)`;
  camera.position.set(dx,-dy)
  
  
  renderer.render(scene,camera)

  window.requestAnimationFrame(tick);
  
}
window.requestAnimationFrame(tick);


function li(a, b, n) {
  return (1 - n) * a + n * b;
}
