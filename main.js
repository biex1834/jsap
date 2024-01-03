import './style.css'
import * as THREEJS from './node_modules/three/src/Three.js'
import * as SEE from './components/perception.js'
import * as ELE from './components/nElements.js'
import gsap from './node_modules/gsap'
import { ScrollTrigger } from "./node_modules/gsap/ScrollTrigger.js"
import SplitType from 'split-type'



const body = document.body;
const main = document.getElementById('main');
const sizes = {width: window.innerWidth,height:window.innerHeight}
const mouse = {x:0,y:0}
const canvas = document.querySelector('#bg')
const [scene,renderer,camera] = SEE.createScene(canvas,sizes)
const names = ['bleh.jpg','maxwell.jpg','waltuh.jpg','scrungly.jpg','doge.jpg','glass.jpg']
const textureLoader = new THREEJS.TextureLoader();
const space = 2.125
const click = {x:0,y:0}
var clicked = false



//const [dividers,uBoxes,imgs] = ELE.createProjectGallery(scene,-1,-1,space,names,textureLoader)

const [imgs,planes] = ELE.createGrid(scene,names,textureLoader,-0.75,-1,space)

gsap.registerPlugin(ScrollTrigger)
const splitTypes = document.querySelectorAll('#rt')


splitTypes.forEach((char,i) =>{
  const text = new SplitType(char,{
    types: 'chars,words'
  })
  gsap.from(text.chars,{
    scrollTrigger:{
      trigger:char,
      start: 'top 20%',
      end: 'top 100%',
      scrub: false,
      markers: true
    },
    y:-5,
    opacity: 0,
    stagger:0.01,
    duration:0.5,
    x:5
    
  })
})


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

window.addEventListener('click', (event) =>{
  click.x = event.clientX/sizes.width * 2 -1
  click.y = -event.clientY/sizes.height * 2 + 1
  clicked = true
  //console.log(click)
})

function easeScroll() {
  sx = window.pageXOffset;
  sy = window.pageYOffset;
  //console.log(sx,sy)
}




window.addEventListener('resize', () =>{
  sizes.width = window.innerWidth
  sizes.height = window.innerHeight

  camera.aspect=sizes.width/sizes.height
  camera.updateProjectionMatrix()

  renderer.setSize(sizes.width,sizes.height)
  renderer.setPixelRatio(Math.min(window.devicePixelRatio,2))
})


window.addEventListener('mousemove',(event) => {
  mouse.x = event.clientX/sizes.width * 2 -1
  mouse.y = -event.clientY/sizes.height * 2 + 1
})

const raycaster = new THREEJS.Raycaster()

const POIS = []
for (let i = 0; i <6; i++){
  POIS.push(new THREEJS.Vector3)
}

const particles = ELE.createParticles(scene,1000)
let running = 0
function tick(){
  running +=1
  raycaster.setFromCamera(mouse,camera)
  const intersections = raycaster.intersectObjects(imgs)

  for (const intersection of intersections){
    if (clicked){
      console.log(intersection.object.name)
      clicked = false
    }
    gsap.to(intersection.object.scale,{x:1.25,y:1.25})

  }
  
  particles.rotation.set(0,(dy-running)/window.innerHeight*2,0)
  
  for (const img of imgs){
    if (!intersections.find(intersect => intersect.img === img)){
      gsap.to(img.scale,{x:1,y:1})
      
    }
  }



  dx = li(dx,sx,0.07);
  dy = li(dy,sy,0.07);
  dx = Math.floor(dx * 100) / 100;
  dy = Math.floor(dy * 100) / 100;
  main.style.transform = `translate3d(-${dx}px, -${dy}px, 0px)`;
  
  camera.position.set(Math.cos(Math.PI/2*dy/window.innerHeight)/2+Math.cos(running/75)/50 - (mouse.x/window.innerWidth)*50,-dy/window.innerHeight)
  //console.log(camera.position)
  //console.log(mouse.x)
  
  renderer.render(scene,camera)
  //bloomComposer.render()
  window.requestAnimationFrame(tick);
  
}
window.requestAnimationFrame(tick);




function li(a, b, n) {
  return (1 - n) * a + n * b;
}
