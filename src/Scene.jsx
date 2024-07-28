import React, { useRef, useEffect, useState } from 'react';
import { Canvas, useFrame, extend, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import RAPIER from '@dimforge/rapier3d-compat';
import { createBalls, getMouseBall } from './getBodies'; // Updated import
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass';

extend({ EffectComposer, RenderPass, UnrealBloomPass });

function Scene() {
  const { scene, camera, gl } = useThree();
  const composer = useRef();
  const [world, setWorld] = useState(null);
  const [bodies, setBodies] = useState([]);
  const mouseBall = useRef();
  const mousePos = useRef(new THREE.Vector2());

  useEffect(() => {
    async function initPhysics() {
      await RAPIER.init();
      const gravity = { x: 0.0, y: 0, z: 0.0 };
      const newWorld = new RAPIER.World(gravity);
      setWorld(newWorld);

      // Create 20 balls
      const newBodies = createBalls(RAPIER, newWorld, 20); // Use createBalls instead of getBody
      newBodies.forEach(body => {
        // body.mesh.position.set(Math.random() * 10 - 5, Math.random() * 10 - 5, Math.random() * 10 - 5); // Adjust position
        body.mesh.position.set( 5, 5, 0); 
        body.mesh.scale.set(1, 1, 1); // Adjust scale if needed
        scene.add(body.mesh);
      });
      setBodies(newBodies);

      const newMouseBall = getMouseBall(RAPIER, newWorld);
      mouseBall.current = newMouseBall;
      scene.add(newMouseBall.mesh);
    }

    initPhysics();

    const resizeHandler = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      gl.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', resizeHandler);
    resizeHandler(); // Ensure the initial size is correct

    const mouseMoveHandler = (evt) => {
      mousePos.current.x = (evt.clientX / window.innerWidth) * 2 - 1;
      mousePos.current.y = -(evt.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener('mousemove', mouseMoveHandler);

    return () => {
      window.removeEventListener('resize', resizeHandler);
      window.removeEventListener('mousemove', mouseMoveHandler);
    };
  }, [scene, camera, gl]);

  useEffect(() => {
    const renderScene = new RenderPass(scene, camera);
    const bloomPass = new UnrealBloomPass(
      new THREE.Vector2(window.innerWidth, window.innerHeight),
      1.5,
      0.4,
      100
    );
    bloomPass.threshold = 0.002;
    bloomPass.strength = 2.0;
    bloomPass.radius = 0;

    composer.current = new EffectComposer(gl);
    composer.current.addPass(renderScene);
    composer.current.addPass(bloomPass);
  }, [scene, camera, gl]);

  useFrame(() => {
    if (world) {
      world.step();
      mouseBall.current.update(mousePos.current);
      bodies.forEach((b) => b.update());
    }
    if (composer.current) {
      composer.current.render();
    }
  });

  return null;
}

export default Scene;

