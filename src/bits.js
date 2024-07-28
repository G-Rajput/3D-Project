import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import * as THREE from 'three';

export function setupPostProcessing({ scene, camera, renderer, width, height }) {
  const renderScene = new RenderPass(scene, camera);
  const bloomPass = new UnrealBloomPass(new THREE.Vector2(width, height), 1.5, 0.4, 100);
  bloomPass.threshold = 0.002;
  bloomPass.strength = 2.0;
  bloomPass.radius = 0;

  const composer = new EffectComposer(renderer);
  composer.addPass(renderScene);
  composer.addPass(bloomPass);

  return composer;
}

export function setupControls({ camera, renderer }) {
  const controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  controls.dampingFactor = 0.03;
  return controls;
}
