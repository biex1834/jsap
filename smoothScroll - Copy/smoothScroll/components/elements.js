import * as THREEJS from 'three'


export function createImage(scene,source,textureLoader,anchorX,anchorY,space,i){
    const material = new THREEJS.MeshBasicMaterial({
        map: textureLoader.load(`${source}`)
    })
    const geometry = new THREEJS.PlaneGeometry(1,1.3)
    const img = new THREEJS.Mesh(geometry,material)
    img.position.set(anchorX+1.95+Math.pow(-1,i)*0.4,i*-space+anchorY)
    scene.add(img)
    console.log(source)
    return img
}

export function createUnderlayBox(scene,anchorX,anchorY,space,i){
    
    const material = new THREEJS.MeshNormalMaterial()
    const geometry = new THREEJS.BoxGeometry(1,1.3,0.05)
    const box = new THREEJS.Mesh(geometry,material)
    box.position.set(anchorX+1.95+Math.pow(-1,i)*0.4,i*-space+anchorY,-0.05)
    scene.add(box)
    return box
}

export function createDividerBox(scene,anchorX,anchorY,space,i){
    
    const material = new THREEJS.MeshNormalMaterial()
    const geometry = new THREEJS.BoxGeometry(4.5,0.5,1)
    const divider = new THREEJS.Mesh(geometry,material)
    divider.position.set(anchorX-2.95+Math.pow(-1,i)*0.4,i*-space+anchorY)
    scene.add(divider)
    return divider
}

export function createProjectGallery(scene,anchorX,anchorY,space,sources,textureLoader){

    const dividers = [], imgs = [], uBoxes = []
    for(let i = 0; i < sources.length; i++){
        console.log(`hii ${i}`)
        const source = sources[i]
        dividers.push(createDividerBox(scene,anchorX,anchorY,space,i))
        uBoxes.push(createUnderlayBox(scene,anchorX,anchorY,space,i))
        imgs.push(createImage(scene,source,textureLoader,anchorX,anchorY,space,i))
    }
    return [dividers,uBoxes,imgs]
}