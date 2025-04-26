import { useRef, useState, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text, useTexture } from '@react-three/drei';
import { politicalParties } from '../data/political-data';
import * as THREE from 'three';
import { PoliticalSymbol } from '../types';
import { useStore } from '../store';

interface SymbolsProps {
  onSymbolClick: (symbol: PoliticalSymbol) => void;
  searchOpen: boolean;
}

export function Symbols({ onSymbolClick, searchOpen }: SymbolsProps) {
  const groupRef = useRef<THREE.Group>(null);
  const [hoveredSymbol, setHoveredSymbol] = useState<string | null>(null);
  const { filteredSymbols, customSymbols } = useStore();
  
  const symbolRefs = useRef<{ [key: string]: THREE.Group }>({});
  const symbolVelocities = useRef<{ [key: string]: THREE.Vector3 }>({});
  const time = useRef(0);
  
  const filteredParties = politicalParties.filter(party => 
    filteredSymbols.some(symbol => symbol.symbol_id === party.symbol.symbol_id)
  );
  
  const filteredCustomSymbols = customSymbols.filter(symbol => 
    filteredSymbols.some(filtered => filtered.symbol_id === symbol.symbol_id)
  );

  const allSymbols = [
    ...filteredParties.map(party => ({ 
      symbol: party.symbol, 
      party_id: party.party_id 
    })),
    ...filteredCustomSymbols.map(symbol => ({ 
      symbol, 
      party_id: `custom-${symbol.symbol_id}` 
    }))
  ];

  const radius = Math.max(8, Math.sqrt(allSymbols.length) * 2.5);

  useEffect(() => {
    allSymbols.forEach(item => {
      symbolVelocities.current[item.party_id] = new THREE.Vector3(
        (Math.random() - 0.5) * 0.003,
        (Math.random() - 0.5) * 0.003,
        (Math.random() - 0.5) * 0.003
      );
    });
  }, [allSymbols]);

  useFrame((state, delta) => {
    time.current += delta * 0.5;

    allSymbols.forEach((item, index) => {
      const symbolRef = symbolRefs.current[item.party_id];
      const velocity = symbolVelocities.current[item.party_id];
      
      if (symbolRef && velocity) {
        const floatY = Math.sin(time.current + index) * 0.05;
        const floatX = Math.cos(time.current * 0.5 + index) * 0.05;
        
        const targetY = searchOpen ? radius : 0;
        const currentY = symbolRef.position.y;
        const smoothY = THREE.MathUtils.lerp(currentY, targetY + floatY, 0.03);
        
        symbolRef.position.y = smoothY;
        symbolRef.position.x += floatX * delta;
        
        symbolRef.position.add(velocity.clone().multiplyScalar(delta));
        
        const bounds = radius * 1.2;
        ['x', 'y', 'z'].forEach(axis => {
          if (Math.abs(symbolRef.position[axis]) > bounds) {
            velocity[axis] *= -0.8;
            symbolRef.position[axis] = Math.sign(symbolRef.position[axis]) * bounds;
          }
        });
        
        if (hoveredSymbol !== item.symbol.symbol_id) {
          symbolRef.rotation.y += delta * 0.3; // Reduced rotation speed
        }
        
        if (Math.random() < 0.005) {
          velocity.add(new THREE.Vector3(
            (Math.random() - 0.5) * 0.001,
            (Math.random() - 0.5) * 0.001,
            (Math.random() - 0.5) * 0.001
          ));
        }
        
        velocity.multiplyScalar(0.98);
      }
    });
  });

  return (
    <group ref={groupRef}>
      {allSymbols.map((item, index) => {
        const phi = Math.acos(-1 + (2 * index) / allSymbols.length);
        const theta = Math.sqrt(allSymbols.length * Math.PI) * phi;
        
        const x = radius * Math.cos(theta) * Math.sin(phi);
        const y = radius * Math.sin(theta) * Math.sin(phi);
        const z = radius * Math.cos(phi);

        const isHovered = hoveredSymbol === item.symbol.symbol_id;

        return (
          <group 
            key={item.party_id}
            position={[x, y, z]}
            ref={el => {
              if (el) symbolRefs.current[item.party_id] = el;
            }}
            onClick={(e) => {
              e.stopPropagation();
              onSymbolClick(item.symbol);
            }}
            onPointerOver={(e) => {
              e.stopPropagation();
              setHoveredSymbol(item.symbol.symbol_id);
            }}
            onPointerOut={(e) => {
              e.stopPropagation();
              setHoveredSymbol(null);
            }}
          >
            <SymbolPlane 
              symbol={item.symbol} 
              isHovered={isHovered} 
            />
            {isHovered && (
              <Text
                position={[0, 1.5, 0]}
                fontSize={0.4}
                color="white"
                anchorX="center"
                anchorY="middle"
                outlineWidth={0.02}
                outlineColor="#000000"
                renderOrder={2}
              >
                {item.symbol.symbol_name}
              </Text>
            )}
          </group>
        );
      })}
    </group>
  );
}

interface SymbolPlaneProps {
  symbol: PoliticalSymbol;
  isHovered: boolean;
}

function SymbolPlane({ symbol, isHovered }: SymbolPlaneProps) {
  // Add safe access to color with fallback
  const fallbackColor = new THREE.Color(symbol.layers?.color?.toLowerCase() || '#ffffff');
  
  try {
    const texture = useTexture(symbol.image_url);
    texture.minFilter = THREE.LinearFilter;
    texture.magFilter = THREE.LinearFilter;
    texture.generateMipmaps = false; // Prevent mipmap flickering
    
    const material = new THREE.MeshStandardMaterial({
      map: texture,
      transparent: true,
      side: THREE.FrontSide, // Changed to FrontSide
      emissive: new THREE.Color('white'),
      emissiveIntensity: 0.1,
      emissiveMap: texture,
      depthWrite: true, // Enable depth writing
      alphaTest: 0.5, // Add alpha test to prevent transparency issues
    });

    return (
      <group>
        <group position={[0, 0, 0.02]}>
          <mesh renderOrder={1}>
            <planeGeometry args={[2.4, 2.4]} />
            <meshBasicMaterial color={fallbackColor} transparent opacity={0.1} side={THREE.FrontSide} depthWrite={false} />
          </mesh>
          
          <mesh renderOrder={2}>
            <planeGeometry args={[2, 2]} />
            <meshBasicMaterial color="black" transparent opacity={0.3} side={THREE.FrontSide} depthWrite={false} />
          </mesh>
          
          <mesh renderOrder={3}>
            <planeGeometry args={[2, 2]} />
            <primitive object={material} attach="material" />
          </mesh>

          {isHovered && (
            <mesh renderOrder={4}>
              <planeGeometry args={[2.2, 2.2]} />
              <meshBasicMaterial color="white" transparent opacity={0.1} side={THREE.FrontSide} depthWrite={false} />
            </mesh>
          )}
        </group>

        <group position={[0, 0, -0.02]} rotation={[0, Math.PI, 0]}>
          <mesh renderOrder={1}>
            <planeGeometry args={[2.4, 2.4]} />
            <meshBasicMaterial color={fallbackColor} transparent opacity={0.1} side={THREE.FrontSide} depthWrite={false} />
          </mesh>
          
          <mesh renderOrder={2}>
            <planeGeometry args={[2, 2]} />
            <meshBasicMaterial color="black" transparent opacity={0.3} side={THREE.FrontSide} depthWrite={false} />
          </mesh>
          
          <mesh renderOrder={3}>
            <planeGeometry args={[2, 2]} />
            <primitive object={material} attach="material" />
          </mesh>

          {isHovered && (
            <mesh renderOrder={4}>
              <planeGeometry args={[2.2, 2.2]} />
              <meshBasicMaterial color="white" transparent opacity={0.1} side={THREE.FrontSide} depthWrite={false} />
            </mesh>
          )}
        </group>
      </group>
    );
  } catch (error) {
    const fallbackMaterial = new THREE.MeshStandardMaterial({
      color: fallbackColor,
      emissive: fallbackColor,
      emissiveIntensity: 0.2,
      side: THREE.FrontSide,
      depthWrite: true,
    });

    return (
      <group>
        <group position={[0, 0, 0.02]}>
          <mesh renderOrder={1}>
            <planeGeometry args={[2.4, 2.4]} />
            <meshBasicMaterial color={fallbackColor} transparent opacity={0.1} side={THREE.FrontSide} depthWrite={false} />
          </mesh>
          
          <mesh renderOrder={2}>
            <planeGeometry args={[2, 2]} />
            <meshBasicMaterial color="black" transparent opacity={0.3} side={THREE.FrontSide} depthWrite={false} />
          </mesh>
          
          <mesh renderOrder={3}>
            <planeGeometry args={[2, 2]} />
            <primitive object={fallbackMaterial} attach="material" />
          </mesh>

          {isHovered && (
            <mesh renderOrder={4}>
              <planeGeometry args={[2.2, 2.2]} />
              <meshBasicMaterial color="white" transparent opacity={0.1} side={THREE.FrontSide} depthWrite={false} />
            </mesh>
          )}
        </group>

        <group position={[0, 0, -0.02]} rotation={[0, Math.PI, 0]}>
          <mesh renderOrder={1}>
            <planeGeometry args={[2.4, 2.4]} />
            <meshBasicMaterial color={fallbackColor} transparent opacity={0.1} side={THREE.FrontSide} depthWrite={false} />
          </mesh>
          
          <mesh renderOrder={2}>
            <planeGeometry args={[2, 2]} />
            <meshBasicMaterial color="black" transparent opacity={0.3} side={THREE.FrontSide} depthWrite={false} />
          </mesh>
          
          <mesh renderOrder={3}>
            <planeGeometry args={[2, 2]} />
            <primitive object={fallbackMaterial} attach="material" />
          </mesh>

          {isHovered && (
            <mesh renderOrder={4}>
              <planeGeometry args={[2.2, 2.2]} />
            <meshBasicMaterial color="white" transparent opacity={0.1} side={THREE.FrontSide} depthWrite={false} />
            </mesh>
          )}
        </group>
      </group>
    );
  }
}