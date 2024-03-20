import * as THREE from "three";

export const floorMaterials = {
  Floor1: new THREE.MeshStandardMaterial({
    color: 0x00ff00,
    side: THREE.DoubleSide,
    transparent: true,
  }),
  Floor2: new THREE.MeshStandardMaterial({
    color: 0xff0000,
    side: THREE.DoubleSide,
    transparent: true,
  }),
  Floor3: new THREE.MeshStandardMaterial({
    color: 0x0000ff,
    side: THREE.DoubleSide,
    transparent: true,
  }),
  Floor4: new THREE.MeshStandardMaterial({
    color: 0xffff00,
    side: THREE.DoubleSide,
    transparent: true,
  }),
  Roof: new THREE.MeshStandardMaterial({
    color: 0x00ffff,
    side: THREE.DoubleSide,
    transparent: true,
  }),
  External: new THREE.MeshStandardMaterial({
    color: 0xff00ff,
    side: THREE.DoubleSide,
    transparent: true,
  }),
};
