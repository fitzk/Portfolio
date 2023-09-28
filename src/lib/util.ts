import * as THREE from "three";

export function getRandomColor(baseColor: 0xffffff) {
  const color = new THREE.Color(baseColor);
  color.setHex(Math.random() * 0xffffff);
  return color;
}

export function drawCube(color: number) {
  return new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1),
    new THREE.MeshBasicMaterial({
      color,
    }),
  );
}

export function getCanvasDims() {
  let isMobile = false;
  let isSmallScreen = false;
  // window is only available in onMount fn
  let height = window.innerHeight / 2;
  let width = window.innerWidth / 2;
  if (
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent,
    )
  ) {
    isMobile = true;
  }

  if (window.innerWidth < 1000) {
    isSmallScreen = true;
  }

  if (isMobile || isSmallScreen) {
    height = window.innerHeight / 2;
    width = window.innerWidth - 20;
  }

  return {
    width,
    height,
  };
}
