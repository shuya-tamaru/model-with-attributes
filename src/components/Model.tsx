import { useThree } from "@react-three/fiber";
import { useCallback, useEffect } from "react";
import * as THREE from "three";

import { useLoadedModel } from "../hooks/useLoadedModel";
import useFloorSelector from "../stores/useFloorSelector";
import { floorMaterials } from "../utils/materials";
import usePartFilter from "../stores/usePartFilter";
import useGetUserData from "../stores/useGetUserData";
import { MeshUserData } from "../types/MeshUserData";

export default function Model() {
  const setInformation = useGetUserData((state) => state.setInformation);
  const { raycaster } = useThree();
  const modelPath = "/model/userAttributes7-draco.glb";
  const { model, meshIndex, defaultMaterials } = useLoadedModel(modelPath);
  const floor = useFloorSelector((state) => state.floor);
  const part = usePartFilter((state) => state.part);

  const getRayCastPosition = useCallback(
    (e: MouseEvent) => {
      const intersectObjects = raycaster.intersectObjects(model.scene.children);
      const firstIntersectObject = intersectObjects[0];
      if (firstIntersectObject) {
        const userData = firstIntersectObject.object.userData as MeshUserData;
        if (userData) {
          setInformation(userData);
        }
      }
    },
    [meshIndex]
  );

  useEffect(() => {
    if (floor) {
      meshIndex.forEach((value, key) => {
        if (value.floor === floor) {
          const mesh = model.scene.getObjectByProperty(
            "uuid",
            key
          ) as THREE.Mesh;
          mesh.visible = true;
        } else {
          const mesh = model.scene.getObjectByProperty(
            "uuid",
            key
          ) as THREE.Mesh;
          mesh.visible = false;
        }
      });
    } else {
      meshIndex.forEach((value, key) => {
        const mesh = model.scene.getObjectByProperty("uuid", key) as THREE.Mesh;
        mesh.visible = true;
      });
    }
  }, [floor, meshIndex, defaultMaterials]);

  useEffect(() => {
    if (part) {
      meshIndex.forEach((value, key) => {
        if (value.part === part) {
          const mesh = model.scene.getObjectByProperty(
            "uuid",
            key
          ) as THREE.Mesh;
          mesh.visible = true;
        } else {
          const mesh = model.scene.getObjectByProperty(
            "uuid",
            key
          ) as THREE.Mesh;
          mesh.visible = false;
        }
      });
    } else {
      meshIndex.forEach((value, key) => {
        const mesh = model.scene.getObjectByProperty("uuid", key) as THREE.Mesh;
        mesh.visible = true;
      });
    }
  }, [part, meshIndex]);

  useEffect(() => {
    window.addEventListener("mousedown", getRayCastPosition);
    return () => window.removeEventListener("mousedown", getRayCastPosition);
  }, [getRayCastPosition]);

  return <primitive object={model.scene} />;
}
