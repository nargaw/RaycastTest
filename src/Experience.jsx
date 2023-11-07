import { DoubleSide, MeshBasicMaterial, PointLightHelper } from "three";
import { useEffect, useRef, useState } from "react";
import { useHelper } from "@react-three/drei";
import { useThree } from "@react-three/fiber";
import * as THREE from 'three'

export default function Experience()
{

    const pointLight = useRef()
    const [line, setLine ] = useState(null)
    const [ray, setRay] = useState(null)
    const [innerBox, setInnerBox] = useState(null)
    const [outerBox, setOuterBox] = useState(null)
    const arrow = useRef()
    
    const arrowHelper = new THREE.ArrowHelper(
        new THREE.Vector3(),
        new THREE.Vector3(),
        0.25,
        0xffff00
    )


    const pos = new THREE.Vector3()
    const point1 = new THREE.Vector3(0, 0, 0)
    const point2 = new THREE.Vector3(0, 0, 0)

    const lineGeometry = new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(), new THREE.Vector3()])
    const lineMaterial = new THREE.LineBasicMaterial({color: 0xff0000})

    useEffect(() => {
        // if(line) setLine.geometry.attributes.position.needsUPdate = true
        // console.log(line.geometry.attributes.position)
        // line.geometry.attributes.position.needsUPdate = true
        if(!ray) return
        const intersectInner = ray.intersectObject(innerBox)
        const intersectOuter = ray.intersectObject(outerBox)
       
        // console.log(intersectInner[0].point)
        // console.log(intersectOuter[0].point)

        point1.copy(intersectInner[0].point)
        point2.copy(intersectOuter[0].point)

        lineGeometry.setFromPoints([point1, point2])
        console.log(point1.x - point2.x)

        // console.log(point1, point2)

        pos.copy(intersectInner[0].point)
        
        // arrow.current.position.copy(pos)
    }, [innerBox, outerBox, ray, pos, line])
    
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
            <meshStandardMaterial transparent={true} opacity={0.5} color={'green'} side={DoubleSide}/>
        </mesh>
        {/* <arrowHelper ref={arrow} args={[new THREE.Vector3(-1, 0, 0), new THREE.Vector3(), 1.0, 0xff0000]}/> */}
        <mesh ref={setOuterBox} name="outerBox">
            <boxGeometry args={[2, 2, 2]}/>
            <meshNormalMaterial transparent={true} opacity={0.5} color={'red'} side={DoubleSide}/>
        </mesh>
        <line ref={setLine} geometry={lineGeometry} material={lineMaterial}/>
    </>
}