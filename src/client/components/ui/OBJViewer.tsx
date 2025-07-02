import { Box } from '@chakra-ui/react';
import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

type Props = {
  path: string;
};


export default function OBJViewer({ path }: Props) {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x000000);

    const camera = new THREE.PerspectiveCamera(
      75,
      containerRef.current.clientWidth / containerRef.current.clientHeight,
      0.1,
      1000
    );

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
    containerRef.current.appendChild(renderer.domElement);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true; // Smooth drag
    controls.dampingFactor = 0.05;
    controls.enableZoom = true; // Optional
    controls.autoRotate = false; // <-- no auto spin

    const loader = new OBJLoader();
    loader.load(`/api/download?path=${encodeURIComponent(path)}`, object => {
    scene.add(object);

    // Optional: compute box from whole object
    const box = new THREE.Box3().setFromObject(object);
    const size = new THREE.Vector3();
    box.getSize(size);

    const center = new THREE.Vector3();
    box.getCenter(center);
    object.position.sub(center); // center it

    // Camera fitting
    const maxDim = Math.max(size.x, size.y, size.z);
    const fov = camera.fov * (Math.PI / 180);
    let cameraZ = Math.abs(maxDim / 2 * Math.tan(fov * 2));
    cameraZ *= 2.5;

    camera.position.set(0, 0, cameraZ);
    camera.lookAt(0, 0, 0);
    controls.target.set(0, 0, 0);
    });


    const handleResize = () => {
      if (!containerRef.current) return;
      camera.aspect = containerRef.current.clientWidth / containerRef.current.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
    };


    window.addEventListener('resize', handleResize);

    return () => {
      renderer.dispose();
      window.removeEventListener('resize', handleResize);
    };
  }, [path]);

  return (
    <Box flex="1" ref={containerRef} height="100vh" background="black">
      {!path && <Box color="white">Select an STL file to view</Box>}
    </Box>
  );
}
