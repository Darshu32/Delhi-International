import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Html, OrbitControls } from "@react-three/drei";
import type { Group } from "three";

function FloatingSchoolScene() {
  const groupRef = useRef<Group | null>(null);

  useFrame((state) => {
    if (!groupRef.current) {
      return;
    }

    groupRef.current.rotation.y = state.clock.elapsedTime * 0.28;
    groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.35) * 0.08;
  });

  return (
    <group ref={groupRef}>
      <Float speed={1.8} rotationIntensity={1} floatIntensity={1.6}>
        <mesh position={[-1.8, 0.9, -0.6]} rotation={[0.3, 0.5, 0.2]}>
          <boxGeometry args={[0.85, 0.22, 0.22]} />
          <meshStandardMaterial color="#ff8a3d" />
        </mesh>
      </Float>
      <Float speed={2.2} rotationIntensity={1.2} floatIntensity={1.8}>
        <mesh position={[1.6, 1.1, -0.2]}>
          <torusKnotGeometry args={[0.32, 0.12, 120, 16]} />
          <meshStandardMaterial color="#4ba3ff" metalness={0.2} roughness={0.25} />
        </mesh>
      </Float>
      <Float speed={1.6} rotationIntensity={0.8} floatIntensity={1.2}>
        <mesh position={[1.9, -1.1, 0.2]} rotation={[0.2, 0.1, 0.2]}>
          <octahedronGeometry args={[0.42, 0]} />
          <meshStandardMaterial color="#7bcf6b" />
        </mesh>
      </Float>
      <Float speed={1.9} rotationIntensity={0.6} floatIntensity={1.4}>
        <mesh position={[-1.7, -1.05, 0.1]}>
          <icosahedronGeometry args={[0.35, 0]} />
          <meshStandardMaterial color="#ffd059" />
        </mesh>
      </Float>
      <Float speed={1.4} rotationIntensity={0.5} floatIntensity={0.9}>
        <mesh position={[0, -1.7, -0.2]} rotation={[1.2, 0.6, 0.1]}>
          <torusGeometry args={[1.55, 0.05, 18, 80]} />
          <meshStandardMaterial color="#295f94" transparent opacity={0.55} />
        </mesh>
      </Float>
      <Html center transform distanceFactor={2.7}>
        <div className="hero-student-badge">
          <img
            src="https://delhiinternationalshimoga.com/wp-content/uploads/2026/03/WhatsApp-Image-2026-03-11-at-11.20.16-AM-1.jpeg"
            alt="Delhi International School students"
          />
        </div>
      </Html>
    </group>
  );
}

export default function HeroScene() {
  return (
    <div className="hero-canvas-shell">
      <Canvas camera={{ position: [0, 0, 5.2], fov: 42 }}>
        <ambientLight intensity={1.5} />
        <directionalLight position={[4, 3, 3]} intensity={1.8} />
        <pointLight position={[-3, -2, 2]} intensity={1.4} color="#ffb873" />
        <FloatingSchoolScene />
        <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.7} />
      </Canvas>
    </div>
  );
}
