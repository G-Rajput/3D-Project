// src/Pillar.js
import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

const Pillar = () => {
  const mountRef = useRef(null);

  useEffect(() => {
    // Set up the scene
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer();

    renderer.setSize(window.innerWidth, window.innerHeight);
    mountRef.current.appendChild(renderer.domElement);

    // Create a material for the balloons
    const balloonMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000 });

    // Create a pillar of balloons
    const balloonGeometry = new THREE.SphereGeometry(0.5, 32, 32);
    const pillar = new THREE.Group();

    for (let i = 0; i < 10; i++) {
      const balloon = new THREE.Mesh(balloonGeometry, balloonMaterial);
      balloon.position.y = i * 1.2;
      pillar.add(balloon);
    }

    scene.add(pillar);

    // Position the camera
    camera.position.z = 5;

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);
      pillar.rotation.y += 0.01;
      renderer.render(scene, camera);
    };

    animate();

    // Cleanup on component unmount
    return () => {
      mountRef.current.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={mountRef} />;
};

export default Pillar;
