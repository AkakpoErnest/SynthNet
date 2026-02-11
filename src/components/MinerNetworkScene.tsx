import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Line, Sphere } from '@react-three/drei'
import * as THREE from 'three'

const N = 12

function Nodes({ positions }: { positions: [number, number, number][] }) {
  const refs = useRef<(THREE.Mesh | null)[]>([])
  useFrame((state) => {
    const t = state.clock.elapsedTime
    refs.current.forEach((mesh, i) => {
      if (!mesh) return
      const [x, y, z] = positions[i]
      mesh.position.set(
        x + Math.sin(t * 0.3 + i) * 0.05,
        y + Math.cos(t * 0.2 + i * 0.5) * 0.05,
        z
      )
    })
  })
  return (
    <>
      {positions.map((pos, i) => (
        <Sphere
          key={i}
          ref={(el) => { if (el) refs.current[i] = el }}
          args={[0.04, 12, 12]}
          position={pos}
        >
          <meshStandardMaterial
            color={i % 4 === 0 ? '#8B5CF6' : '#3B82F6'}
            emissive={i % 4 === 0 ? '#8B5CF6' : '#3B82F6'}
            emissiveIntensity={0.4}
          />
        </Sphere>
      ))}
    </>
  )
}

function Connections({ positions }: { positions: [number, number, number][] }) {
  const pairs = useMemo(() => {
    const p: { start: THREE.Vector3; end: THREE.Vector3 }[] = []
    for (let i = 0; i < positions.length; i++) {
      for (let j = i + 1; j < positions.length; j++) {
        const a = new THREE.Vector3(...positions[i])
        const b = new THREE.Vector3(...positions[j])
        if (a.distanceTo(b) < 1.8) p.push({ start: a, end: b })
      }
    }
    return p
  }, [positions])

  return (
    <>
      {pairs.map(({ start, end }, i) => (
        <Line
          key={i}
          points={[start.toArray(), end.toArray()] as [number, number, number][]}
          color="#06B6D4"
          lineWidth={0.4}
        />
      ))}
    </>
  )
}

function Scene() {
  const positions = useMemo(() => {
    const out: [number, number, number][] = []
    for (let i = 0; i < N; i++) {
      out.push([
        (Math.random() - 0.5) * 2.5,
        (Math.random() - 0.5) * 2.5,
        (Math.random() - 0.5) * 2.5,
      ])
    }
    return out
  }, [])
  return (
    <>
      <ambientLight intensity={0.5} />
      <pointLight position={[1, 1, 1]} intensity={0.8} color="#3B82F6" />
      <Nodes positions={positions} />
      <Connections positions={positions} />
    </>
  )
}

export default function MinerNetworkScene() {
  return (
    <div className="w-full h-64 rounded-2xl overflow-hidden bg-[#0F172A]/80 border border-white/10">
      <Canvas camera={{ position: [0, 0, 3.5], fov: 50 }} gl={{ alpha: true }}>
        <Scene />
      </Canvas>
    </div>
  )
}
