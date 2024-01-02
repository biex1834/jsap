import * as THREEJS from 'three'

export function createCamera(scene,sizes){
    const camera = new THREEJS.PerspectiveCamera(75,sizes.width/sizes.height,0.1,1000)
    camera.position.set(0,0,0)
    scene.add(camera)
    return camera
}

export function createRenderer(scene,canvas,sizes){
    const renderer = new THREEJS.WebGLRenderer({
        canvas: canvas
    })
    renderer.setSize(sizes.width,sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio,2))
    return renderer
}

export function createScene(canvas,sizes){
    const scene = new THREEJS.Scene()
    const renderer = createRenderer(scene,canvas,sizes)
    const camera = createCamera(scene,sizes)
    return [scene,renderer,camera]
}