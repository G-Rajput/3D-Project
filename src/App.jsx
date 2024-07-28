import React from 'react';
import { Canvas } from '@react-three/fiber';
import Scene from './Scene';
import './App.css';
import SplashScreen from './SplashScreen';

function App() {
  return ( <>
  <SplashScreen />
    <div className="App">
      <header className="App-header">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 50" fill='white' width="150" height="40">
          <title>Peptone | The Translational Biophysics Company Logo</title>
          <path d="M24.2 28.2l4.6-2.7-4.6-2.6-4.6 2.6zM24.2 38.5l2.8-1.6-2.8-1.6-2.7 1.6zM14.4 32.8l2.8-1.6-2.8-1.6-2.7 1.6zM4.6 27.9l4.1-2.4-4.1-2.3-4.1 2.3zM14.4 44.1l2.8-1.6-2.8-1.6-2.7 1.6zM4.6 39.2l4-2.3-4-2.4-4 2.4zM4.6 16.9l4.6-2.7-4.6-2.7L0 14.2zM14.4 11.2L19 8.6l-4.6-2.7-4.6 2.6zM24.3 5.5l4.6-2.6L24.2.2l-4.6 2.7zM14.4 22.5l4.6-2.6-4.6-2.7-4.6 2.7zM24.3 15.8l2.7-1.6-2.8-1.6-2.7 1.6zM34.1 10.8l3.8-2.2L34 6.3l-3.8 2.2zM34.1 22.5l4.6-2.6-4.7-2.7-4.6 2.7zM43.9 16.9l4.6-2.7-4.6-2.7-4.6 2.7z"></path>
          <path d="M24.2 38.5l2.8-1.6-2.8-1.6-2.7 1.6zM34.1 32.8l2.7-1.6-2.8-1.6-2.7 1.6zM43.9 27.1l2.7-1.6-2.7-1.6-2.8 1.6zM24.2 49.8l2.8-1.6-2.8-1.6-2.7 1.6zM34.1 44.1l2.7-1.6-2.8-1.6-2.7 1.6zM43.9 38.5l2.7-1.6-2.7-1.6-2.8 1.6z"></path>
          <g>
            <path d="M64.7 31.7v-13a78 78 0 00-.3-6.9h7.3c6.2 0 11.7 1.3 11.7 7.2s-5.5 7.2-11.7 7.2h-2.4v5.5c0 2.8.1 4.2.3 6.9h-5.2c.3-2.7.3-4.2.3-6.9zm7-6.2c3.6 0 7.1-1.3 7.1-6.6s-3.4-6.6-7.1-6.6h-2.4v13.1h2.4zM101.7 32.4c-1.2 4.1-3.8 6.8-8.5 6.8-5.2 0-9.5-3.1-9.5-8.7 0-5.5 4.4-8.7 9.2-8.7 5.1 0 8 3.2 8 6.8H88.1l-.1 1.6c0 4.2 2.1 7.9 6.4 7.9 3.1 0 5.5-1.9 6.7-5.7h.6zm-13.5-4.3h8.5c0-3.2-1.2-5.5-3.8-5.5-2.5-.1-4.2 1.8-4.7 5.5zM123.5 30.6c0 5.9-4 8.7-7.8 8.7a8.6 8.6 0 01-6.8-3.4v4c0 2.2 0 3.9.3 6.8h-4.6c.3-2.9.3-4.5.3-6.8V29.3c0-2.2 0-3.8-.3-6.8h4.5l-.2 4c.9-2.7 3-4.7 6.6-4.7 4.1.1 8 2.9 8 8.8zm-4.4 0c0-4.2-1.4-7.6-5-7.6-3.2 0-5.2 2.8-5.2 7.1V35c1.4 1.8 3.4 3.3 5.6 3.3 2.8 0 4.6-2.8 4.6-7.7zM137.4 31.7c-.8 6-2.5 7.7-5.3 7.7-3.1 0-4.4-1.7-4.4-5.7V23.2h-3.6v-.6h.5c4.5 0 4.4-3.3 4.4-7h3.4c0 2.8-.6 5.8-3.8 7h8v.6h-4.8v11.1c0 3.1.6 4 1.8 4 1.5 0 2.6-1.7 3.3-6.6h.5zM139.7 30.6c0-5.4 4.2-8.7 10-8.7s10 3.3 10 8.7c0 5.4-4.2 8.7-10 8.7-5.8-.1-10-3.4-10-8.7zm15.6 0c0-5.1-1.9-8-5.6-8-3.7 0-5.7 3-5.7 8 0 5.1 1.9 8 5.7 8 3.7 0 5.6-3 5.6-8zM174.7 31.8v-4.7c0-2.7-.8-4.1-2.7-4.1-2.3 0-4.1 2-5.2 4.3V32c0 2.2 0 3.8.3 6.6h-4.6c.3-2.7.3-4.3.3-6.6v-2.8c0-2.2 0-3.9-.3-6.6h4.6l-.3 3.6c1.2-2.2 3.3-4.3 6.7-4.3 3.3 0 5.3 1.8 5.3 6.5v3.4c0 2.2 0 3.5.3 6.8h-4.6c.2-3.3.2-4.6.2-6.8zM200 32.4c-1.2 4.1-3.8 6.8-8.5 6.8-5.2 0-9.5-3.1-9.5-8.7 0-5.5 4.4-8.7 9.2-8.7 5.1 0 8 3.2 8 6.8h-12.7l-.1 1.6c0 4.2 2.1 7.9 6.4 7.9 3.1 0 5.5-1.9 6.7-5.7h.5zm-13.5-4.3h8.5c0-3.2-1.2-5.5-3.8-5.5-2.5-.1-4.2 1.8-4.7 5.5z"></path>
          </g>
        </svg>
        <div className='nav-wrapper'>
          <nav className="navigation">
            <a href="#careers">Careers</a>
            <a href="#news">News</a>
          </nav>
          <button className="menu-button">☰</button>
        </div>
      </header>
      <main className="App-main">
        <section className="hero">
          <h1>Bringing order to disorder</h1>
          <div className='msg-wrapper'>
          <p>We are a translational biophysics company focusing on the discovery of novel therapeutics against intrinsically disordered proteins.</p>
          </div>
          <div className="scroll-indicator">
            <span className="scroll-text">Scroll</span>
            <span className="scroll-arrow">⬇</span>
          </div>
        </section>
        <Canvas
          camera={{ position: [0, 0, 5], fov: 75 }}
          onCreated={({ gl }) => {
            gl.setSize(window.innerWidth, window.innerHeight);
          }}
          style={{ height: '100vh', width: '100vw' }}
        >
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} intensity={1} />
            {/* <directionalLight
              position={[5, 10, 7.5]}
              intensity={1}
              castShadow
              shadow-mapSize-width={1024}
              shadow-mapSize-height={1024}
              shadow-camera-far={50}
              shadow-camera-left={-10}
              shadow-camera-right={10}
              shadow-camera-top={10}
              shadow-camera-bottom={-10}
            /> */}
          <Scene />
        </Canvas>
      </main>
    </div>
    </>
  );
}

export default App;
