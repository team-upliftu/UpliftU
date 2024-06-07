import { useRef, useState, useEffect } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Mesh } from 'three'
import React from "react"
import { OrbitControls, Environment, Sphere, useEnvironment } from '@react-three/drei'
import { useTexture, Cloud, useGLTF } from "@react-three/drei";
import { Bloom, EffectComposer } from '@react-three/postprocessing';
import { BlurPass, Resizer, KernelSize, Resolution } from 'postprocessing'
type BoxProps = {
  position: [x: number, y: number, z: number];
};
type WindowVector = {grad_x: number, grad_z: number};

const Cylinder: React.FC<BoxProps & {grad: WindowVector}> = (props) => {
  const mesh = useRef<Mesh>(null!);


  // x, zをもとに揺れの初期位相を決定
  const theta = props.position[0] * props.grad.grad_x + props.position[2] * props.grad.grad_z;
  
  useFrame(({ clock }) => {
    const time = clock.getElapsedTime();
    // 花びらの揺れに合わせて中心を揺らす動きをシミュレート
    mesh.current.position.y += Math.sin(time * 2 + theta) * 0.0007;
  });

  return (
    <mesh
      {...props}
      ref={mesh}
      scale={1}
			castShadow
			receiveShadow
    >
      <cylinderGeometry args={[0.1, 0.1, 1, 32]}/>
      <meshStandardMaterial color={'#005133'} />
      {/* <meshStandardMaterial color={'#005133'} emissive={'#005133'} emissiveIntensity={2} toneMapped={false} /> */}

    </mesh>
  );
};


const Petal: React.FC<BoxProps & { color: string, rotation: number[], grad: WindowVector}> = (props) => {
  const mesh = useRef<Mesh>(null!);
  const { color } = props;

  // x, zをもとに揺れの初期位相を決定
  const theta = props.position[0] * props.grad.grad_x + props.position[2] * props.grad.grad_z;

  useFrame(({ clock }) => {
    const time = clock.getElapsedTime();
    // 花びらの揺れをシミュレート
    mesh.current.position.y += Math.sin(time * 2 + theta) * 0.0007;
    mesh.current.rotation.z = props.rotation![2] + Math.sin(time * 2 + theta) * 0.2;

    // mesh.current.position.y += 
    // mesh.current.rotation.x = props.rotation![0] + Math.sin(time + theta) * 0.2;
  });


  return (
    <mesh
      {...props}
      ref={mesh}
      scale={1}
			castShadow
			receiveShadow
    >
      <boxGeometry args={[0.6, 0.01, 0.2]} />
      <meshStandardMaterial color={color} emissive={color} emissiveIntensity={2} toneMapped={false} />

    </mesh>
  );
};

const FlowerCenter: React.FC<BoxProps & { grad: WindowVector}> = (props) => {
  const mesh = useRef<Mesh>(null!);

  // x, zをもとに揺れの初期位相を決定
  const theta = props.position[0] * props.grad.grad_x + props.position[2] * props.grad.grad_z;

  useFrame(({ clock }) => {
    const time = clock.getElapsedTime();
    // 花びらの揺れに合わせて中心を揺らす動きをシミュレート
    mesh.current.position.y += Math.sin(time * 2 + theta) * 0.0007;
  });

  return (
    <mesh
      {...props}
      ref={mesh}
      scale={[0.1, 0.1, 0.1]}
      castShadow
      receiveShadow
    >
      <sphereGeometry args={[1, 32, 32]} />
      <meshStandardMaterial color={'#ffdd00'} emissive={'#ffdd00'} emissiveIntensity={0.9} toneMapped={false} />
    </mesh>
  );
};

const MovingCosmos: React.FC<BoxProps & { color: string, grad: WindowVector } > = (props) => {
  const { position, color } = props;
  const numPetals = 10;
  const petals = [];
  for (let i = 0; i < numPetals; i++) {
    const angle = (i / numPetals) * Math.PI * 2;
    petals.push(
      <Petal
        key={i}
        position={[position[0] + Math.sin(angle) * 0.4, position[1], position[2] + Math.cos(angle) * 0.4]}
        color={color}
        rotation={[0, angle + 0.5 * Math.PI, 0]}
        grad={props.grad}
      />
    );
  }

  return (
    <group>
      {petals}
      <FlowerCenter position={[position[0], position[1] , position[2]]} grad={props.grad} />
      <Cylinder position={[position[0], position[1] - 0.5, position[2]]} grad={props.grad} />
    </group>
  );
};

export default MovingCosmos;

