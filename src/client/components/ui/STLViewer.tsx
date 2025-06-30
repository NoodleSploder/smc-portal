import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { STLLoader } from 'three/examples/jsm/loaders/STLLoader';

type Props = {
  path: string | null;
};

export default function STLViewer({ path }: Props) {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!path || !mountRef.current) return;

    const width = mountRef.current.clientWidth;
    const height = mountRef.current.clientHeight;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(0, 0, 100);

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(width, height);
    mountRef.current.innerHTML = '';
    mountRef.current.appendChild(renderer.domElement);

    const ambientLight = new THREE.AmbientLight(0xffffff, 1);
    scene.add(ambientLight);

    const loader = new STLLoader();
    loader.load(`/api/download?path=${encodeURIComponent(path)}`, (geometry) => {
      const material = new THREE.MeshStandardMaterial({ color: 0x00ff00 });
      const mesh = new THREE.Mesh(geometry, material);
      scene.add(mesh);

      const animate = function () {
        requestAnimationFrame(animate);
        mesh.rotation.z += 0.01;
        mesh.rotation.x += 0.01;
        renderer.render(scene, camera);
      };

      animate();
    });

    return () => {
      renderer.dispose();
    };
  }, [path]);

  return <div ref={mountRef} style={{ width: '100%', height: '100%' }} />;
}
