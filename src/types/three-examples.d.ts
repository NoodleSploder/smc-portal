declare module 'three/examples/jsm/loaders/STLLoader' {
  import { Loader } from 'three';
  import { BufferGeometry } from 'three';

  export class STLLoader extends Loader {
    load(
      url: string,
      onLoad: (geometry: BufferGeometry) => void,
      onProgress?: (event: ProgressEvent) => void,
      onError?: (event: ErrorEvent) => void
    ): void;
  }
}

declare module 'three/examples/jsm/loaders/OBJLoader' {
  import { Loader, LoadingManager, Object3D } from 'three';
  export class OBJLoader extends Loader {
    constructor(manager?: LoadingManager);
    load(
      url: string,
      onLoad: (object: Object3D) => void,
      onProgress?: (event: ProgressEvent) => void,
      onError?: (event: ErrorEvent) => void
    ): void;
  }
}

declare module 'three/examples/jsm/controls/OrbitControls' {
  export class OrbitControls extends THREE.EventDispatcher {
    constructor(object: THREE.Camera, domElement?: HTMLElement);
    enabled: boolean;
    target: THREE.Vector3;
    minDistance: number;
    maxDistance: number;
    minZoom: number;
    maxZoom: number;
    minPolarAngle: number;
    maxPolarAngle: number;
    minAzimuthAngle: number;
    maxAzimuthAngle: number;
    enableDamping: boolean;
    dampingFactor: number;
    enableZoom: boolean;
    zoomSpeed: number;
    enableRotate: boolean;
    rotateSpeed: number;
    enablePan: boolean;
    panSpeed: number;
    screenSpacePanning: boolean;
    keyPanSpeed: number;
    autoRotate: boolean;
    autoRotateSpeed: number;
    update(): void;
    reset(): void;
    dispose(): void;
  }
}
