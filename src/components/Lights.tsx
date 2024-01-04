import { Environment, useHelper } from "@react-three/drei";
import React, { useRef } from "react";
import * as THREE from "three";

export default function Lights() {
  const lightRef = useRef<THREE.DirectionalLight>(null);
  useHelper(
    lightRef as React.MutableRefObject<THREE.Object3D>,
    THREE.DirectionalLightHelper,
    1,
    "hotpink"
  );

  return (
    <>
      <directionalLight
        intensity={0.5}
        position={[-120, -120, -120]}
        shadow-camera-near={0.1}
        shadow-camera-far={5000}
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
        castShadow
      />
      <ambientLight intensity={0.25} />

      <Environment
        files={[
          "/environmentMap/px.jpg",
          "/environmentMap/nx.jpg",
          "/environmentMap/py.jpg",
          "/environmentMap/ny.jpg",
          "/environmentMap/pz.jpg",
          "/environmentMap/nz.jpg",
        ]}
      />
    </>
  );
}
