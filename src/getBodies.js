import * as THREE from "three";

// Set the middle of the scene
const sceneMiddle = new THREE.Vector3(0, 0, 0);

// Function to generate a fixed number of spheres with random sizes and cluster them together
function createBalls(RAPIER, world, numberOfBalls = 25) {
    const sizes = [0.8, 0.5, 0.3, 0.1]; // Define the available sizes
    const balls = []; // Array to store ball objects
    const clusterRadius = 1; // Radius of the cluster

    for (let i = 0; i < numberOfBalls; i++) {
        const size = sizes[Math.floor(Math.random() * sizes.length)];
        const density = size * 1.0; // Density based on size

        // Cluster position calculation
        const angle = Math.random() * Math.PI * 2;
        const r = Math.sqrt(Math.random()) * clusterRadius; // To ensure uniform distribution in the cluster
        const x = r * Math.cos(angle);
        const z = r * Math.sin(angle);
        const y = Math.random() * clusterRadius - clusterRadius * 0.5; // Slight variation in height

        // Create the rigid body for physics
        let rigidBodyDesc = RAPIER.RigidBodyDesc.dynamic()
            .setTranslation(x, y, z);
        let rigid = world.createRigidBody(rigidBodyDesc);
        let colliderDesc = RAPIER.ColliderDesc.ball(size).setDensity(density);
        world.createCollider(colliderDesc, rigid);

        // Create a sphere geometry with the chosen size
        const geometry = new THREE.SphereGeometry(size, 50, 50);
        // Different colors for different sizes
        const colors = {
            0.8: 0x365fb1, // Blue for large ball
            0.5: 0xd07836, // Orange for medium ball
            0.3: 0x365fb1, // Blue for small ball
            0.1: 0xd07836, // Orange for very small ball
        };
        const material = new THREE.MeshStandardMaterial({
            color: colors[size],
            flatShading: true
        });
        const mesh = new THREE.Mesh(geometry, material);

        // Function to update ball physics
        function update() {
            rigid.resetForces(true);
            let { x, y, z } = rigid.translation();
            let pos = new THREE.Vector3(x, y, z);
            let dir = pos.clone().sub(sceneMiddle).normalize();
            rigid.addForce(dir.multiplyScalar(-0.5), true);
            mesh.position.set(x, y, z);
        }

        // Add the ball to the array
        balls.push({ mesh, rigid, update });
    }

    return balls;
}

function getMouseBall(RAPIER, world) {
    const mouseSize = 0.3;
    const geometry = new THREE.SphereGeometry(mouseSize, 32, 32);
    const material = new THREE.MeshStandardMaterial({
        color: 0xffffff, // Set color to white for the mouse ball
        emissive: 0xffffff,
    });
    const mouseLight = new THREE.PointLight(0xffffff, 1);
    const mouseMesh = new THREE.Mesh(geometry, material);
    mouseMesh.add(mouseLight);

    // RIGID BODY
    let bodyDesc = RAPIER.RigidBodyDesc.kinematicPositionBased().setTranslation(0, 0, 0);
    let mouseRigid = world.createRigidBody(bodyDesc);
    let dynamicCollider = RAPIER.ColliderDesc.ball(mouseSize * 3.0);
    world.createCollider(dynamicCollider, mouseRigid);

    function update(mousePos) {
        mouseRigid.setTranslation({ x: mousePos.x * 5, y: mousePos.y * 5, z: 0.2 });
        let { x, y, z } = mouseRigid.translation();
        mouseMesh.position.set(x, y, z);
    }

    return { mesh: mouseMesh, update };
}

export { createBalls, getMouseBall };
