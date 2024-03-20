import { useThree } from "@react-three/fiber";
import { useCallback, useEffect, useState } from "react";
import * as THREE from "three";

import { useLoadedModel } from "../hooks/useLoadedModel";
import useFloorSelector from "../stores/useFloorSelector";
import { floorMaterials, selectedMaterial } from "../utils/materials";
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
  const [beforeSelectedMeshId, setBeforeSelectedMeshId] = useState<
    string | null
  >(null);

  const getRayCastPosition = useCallback(
    (e: MouseEvent) => {
      const mesh = model.scene.getObjectByProperty(
        "uuid",
        beforeSelectedMeshId
      ) as THREE.Mesh;
      if (mesh) {
        const materialId = mesh.userData.defaultMaterialId;
        const material = defaultMaterials.find((material) => {
          return material.uuid === materialId;
        });

        if (material) {
          mesh.material = material;
        }
      }
      const visibleMeshes = Array.from(model.scene.children).filter((child) => {
        return child.visible;
      });
      const intersectObjects = raycaster.intersectObjects(visibleMeshes);
      const firstIntersectObject = intersectObjects[0];
      if (
        firstIntersectObject &&
        firstIntersectObject.object instanceof THREE.Mesh
      ) {
        const userData = firstIntersectObject.object.userData as MeshUserData;
        if (userData) {
          firstIntersectObject.object.material = selectedMaterial;
          setBeforeSelectedMeshId(firstIntersectObject.object.uuid);
          setInformation(userData);
        } else {
          setBeforeSelectedMeshId(null);
        }
      }
    },
    [meshIndex, defaultMaterials]
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
    window.addEventListener("dblclick", getRayCastPosition);
    return () => window.removeEventListener("dblclick", getRayCastPosition);
  }, [getRayCastPosition]);

  return <primitive object={model.scene} />;
}
