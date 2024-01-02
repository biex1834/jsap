import * as THREEJS from 'three'




export function createImage(scene,source,textureLoader,anchorX,anchorY,imgname){
    const material = new THREEJS.MeshBasicMaterial({map: textureLoader.load(`${source}`)})
    const geometry = new THREEJS.PlaneGeometry(0.7,0.91)
    const img = new THREEJS.Mesh(geometry,material)
    img.position.set(anchorX,anchorY)
    img.name = imgname
    scene.add(img)

    return img
}

export function createBackGround(scene,anchorX,anchorY){
    const geometry = new THREEJS.BoxGeometry(5,2,0.01)
    const material = new THREEJS.MeshNormalMaterial()
    const divBox = new THREEJS.Mesh(geometry,material)
    divBox.position.set(anchorX,anchorY,-1)
    scene.add(divBox)
}

export function createPlane(anchorX,anchorY,dist){
    const plane = new THREEJS.Plane(new THREEJS.Vector3(0,0,0.109),dist)
    return plane
}


export function createGrid(scene,sources, textureLoader, anchorX,anchorY,space){
    const imgs = []
    const planes = []
    anchorX += 0.2
    const dist = -0.105
    for (let i = 0; i < 2; i++){
        for (let j = 0; j< 5; j++){
            imgs.push(createImage(scene,sources[i*3+j%3],textureLoader,anchorX+j*0.8,anchorY-space*i,sources[i*3+j%3]))
        }
        //createBackGround(scene,anchorX,anchorY-space*i,)
    }
    return [imgs,planes]
}


export function createParticles(scene,amount,camera){
    

    const geometry = new THREEJS.BufferGeometry
    const arr = new Float32Array(amount * 3)
    const material = new THREEJS.PointsMaterial({
        size: 0.0025,
    })
    for (let i = 0; i < amount; i++){
        arr[3*i] = (Math.random()-0.5)*3
        arr[3*i+1] = (Math.random()-1)*10
        arr[3*i+2] = (Math.random()-0.5)*3

    }

    geometry.setAttribute('position', new THREEJS.BufferAttribute(arr,3))
    const pmesh = new THREEJS.Points(geometry,material)
    scene.add(pmesh)
    return pmesh
}



