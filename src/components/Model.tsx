import { useGLTF } from "@react-three/drei";
import * as THREE from "three";
import useGetId from "../stores/useGetId";
import { useThree } from "@react-three/fiber";
import { useCallback, useEffect } from "react";

export default function Model() {
  const modelPath = "/model/userAttributes7-draco.glb";
  const gltf = useGLTF(modelPath);

  gltf.scene.traverse((child) => {
    if (child instanceof THREE.Mesh) {
      child.castShadow = true;
      child.receiveShadow = true;
      const material = child.material as THREE.MeshStandardMaterial;
      material.side = THREE.DoubleSide;
      material.envMapIntensity = 5;
      material.transparent = true;
      material.metalness = 0.5;
      material.roughness = 0.5;
    }
  });
  const { setMeshId } = useGetId((state) => state);
  const { raycaster } = useThree();
  const getRayCastPosition = useCallback((e: MouseEvent) => {
    const intersectObjects = raycaster.intersectObjects(gltf.scene.children);

    const firstIntersectObject = intersectObjects[0];
    const meshId = firstIntersectObject?.object.userData.id;

    if (meshId) {
      setMeshId(meshId);
    }
  }, []);

  useEffect(() => {
    window.addEventListener("mousedown", getRayCastPosition);
    return () => window.removeEventListener("mousedown", getRayCastPosition);
  }, []);

  return <primitive object={gltf.scene} />;
}
