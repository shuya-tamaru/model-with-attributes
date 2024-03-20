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
