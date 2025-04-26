import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { Symbols } from './Symbols';
import { PoliticalSymbol } from '../types';
import { useStore } from '../store';

interface SceneProps {
  onSymbolClick: (symbol: PoliticalSymbol) => void;
}

export function Scene({ onSymbolClick }: SceneProps) {
  const { searchOpen } = useStore();

  return (
    <Canvas
      camera={{ position: [0, 0, 25], fov: 45 }}
      style={{ background: '#000' }}
      gl={{ antialias: true }}
    >
      <ambientLight intensity={0.8} />
      <pointLight position={[10, 10, 10]} intensity={0.5} />
      <pointLight position={[-10, -10, -10]} intensity={0.3} />
      <pointLight position={[0, 10, 0]} intensity={0.2} />
      
      <fog attach="fog" args={['#000', 30, 60]} />
      
      <Symbols onSymbolClick={onSymbolClick} searchOpen={searchOpen} />
      <OrbitControls 
        enableDamping 
        dampingFactor={0.05}
        minDistance={10}
        maxDistance={40}
        rotateSpeed={0.3}
        autoRotate={false}
      />
    </Canvas>
  );
}