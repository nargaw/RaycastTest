import { DoubleSide, MeshBasicMaterial, PointLightHelper } from "three";
import { useEffect, useRef, useState } from "react";
import { useHelper } from "@react-three/drei";
import { useThree } from "@react-three/fiber";
import * as THREE from 'three'

export default function Experience()
{

    const pointLight = useRef()
    const line = useRef()

    const [ray, setRay] = useState(null)
    const [innerBox, setInnerBox] = useState(null)
    const [outerBox, setOuterBox] = useState(null)
    const arrow = useRef()
    const lineGeometry = new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(0, 0, 0), new THREE.Vector3(0, 0, 1)])
    const lineMaterial = new THREE.LineBasicMaterial({color: 0xff0000})
    const arrowHelper = new THREE.ArrowHelper(
        new THREE.Vector3(),
        new THREE.Vector3(),
        0.25,
        0xffff00
    )


    const pos = new THREE.Vector3()


    useEffect(() => {
        // line.current.geometry.attributes.position.needsUPdate = true
        if(!ray) return
        console.log(ray.ray.direction)
        console.log(innerBox)
        const intersectinner = ray.intersectObject(innerBox)
        const intersectOuter = ray.intersectObject(outerBox)
        console.log(intersectinner)
        console.log(intersectOuter)
        console.log(pos)
        pos.copy(intersectOuter[0].point)
        console.log(pos)
        console.log(arrow.current)
        arrow.current.position.copy(pos)
    }, [innerBox, outerBox, ray, pos])
    
    // const { scene } = useThree()

    // useHelper(pointLight, PointLightHelper, 0.5, 'black')


    return <>
        <ambientLight />
        <pointLight ref={pointLight} intensity={2.} position={[0, 0.75, 0]} />
        <raycaster 
            ref={setRay}
            ray={[new THREE.Vector3(-5, 0, 0), new THREE.Vector3(5, 0, 0)]}
        />
        <mesh ref={setInnerBox} name="innerBox">
            <boxGeometry args={[1]} />
            <meshStandardMaterial transparent={true} opacity={0.5} color={'green'}/>
            
        </mesh>
        <arrowHelper ref={arrow} args={[new THREE.Vector3(1, 0, 0), new THREE.Vector3(), 1.0, 0xff0000]}/>
        <mesh ref={setOuterBox} name="outerBox">
            <boxGeometry args={[5, 2, 2]}/>
            <meshNormalMaterial transparent={true} opacity={0.5} color={'red'} side={DoubleSide}/>
        </mesh>
        {/* <line ref={line} geometry={lineGeometry} material={lineMaterial}/> */}
    </>
}