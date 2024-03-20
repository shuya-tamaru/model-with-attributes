import { useGLTF } from "@react-three/drei";
import { useEffect, useState } from "react";
import * as THREE from "three";
import { GLTF } from "three/examples/jsm/loaders/GLTFLoader";
import { ObjectMap } from "@react-three/fiber";

import { MeshUserData } from "../types/MeshUserData";

export function useLoadedModel(modelPath: string) {
  const model = useGLTF(modelPath) as GLTF & ObjectMap;
  const defaultMaterials = Object.values(model.materials);
  const [meshIndex, setMeshIndex] = useState<Map<string, MeshUserData>>(
    new Map()
  );

  useEffect(() => {
    const newMeshIndex: Map<string, MeshUserData> = new Map();
    model.scene.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        initializeMesh(child);
        const userData = child.userData as MeshUserData;
        newMeshIndex.set(child.uuid, userData);
      }
    });
    setMeshIndex(newMeshIndex);

    defaultMaterials.forEach((material) => {
      if (material.name.indexOf("天井") !== -1) {
        material.side = THREE.FrontSide;
      }
    });
  }, [modelPath]);

  return { model, meshIndex, defaultMaterials };
}

function initializeMesh(mesh: THREE.Mesh) {
  mesh.castShadow = true;
  mesh.receiveShadow = true;
  const material = mesh.material as THREE.MeshStandardMaterial;
  material.side = THREE.DoubleSide;
  material.envMapIntensity = 5;
  material.transparent = true;
  material.roughness = 0.5;
  mesh.userData = { ...mesh.userData, defaultMaterialId: material.uuid };
}
