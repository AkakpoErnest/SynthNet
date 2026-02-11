import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Line, Sphere } from '@react-three/drei'
import * as THREE from 'three'
import ParticleSystem from './ParticleSystem'
import FloatingShapes from './FloatingShapes'

const NODE_COUNT = 28
const CONNECTION_DISTANCE = 2.8

function Node({
  position,
  isValidator,
  mouse,
}: {
  position: [number, number, number]
  isValidator: boolean
  mouse: React.MutableRefObject<{ x: number; y: number }>
}) {
  const meshRef = useRef<THREE.Mesh>(null)
  const materialRef = useRef<THREE.MeshStandardMaterial>(null)
  const color = isValidator ? '#8B5CF6' : '#3B82F6'
  const basePos = useRef(position)

  useFrame((state) => {
    if (!meshRef.current) return
    const t = state.clock.elapsedTime
    const [bx, by, bz] = basePos.current
    meshRef.current.position.x = bx + mouse.current.x * 0.15
    meshRef.current.position.y = by + Math.sin(t * 0.5 + bx) * 0.08
    meshRef.current.position.z = bz + mouse.current.y * 0.15
    if (materialRef.current) {
      materialRef.current.emissiveIntensity = 0.4 + Math.sin(t * 2) * 0.2
    }
  })

  return (
    <Sphere ref={meshRef} args={[0.06, 16, 16]} position={basePos.current}>
      <meshStandardMaterial
        ref={materialRef}
        color={color}
        emissive={color}
        emissiveIntensity={0.5}
        transparent
        opacity={0.95}
      />
    </Sphere>
  )
}

function Connection({ start, end }: { start: THREE.Vector3; end: THREE.Vector3 }) {
  const points = useMemo(
    () => [start.toArray(), end.toArray()] as [number, number, number][],
    [start, end]
  )
  return <Line points={points} color="#06B6D4" lineWidth={0.6} />
}

function Scene({ mouse }: { mouse: React.MutableRefObject<{ x: number; y: number }> }) {
  const nodes = useMemo(() => {
    const n: { pos: [number, number, number]; validator: boolean }[] = []
    for (let i = 0; i < NODE_COUNT; i++) {
      n.push({
        pos: [
          (Math.random() - 0.5) * 4,
          (Math.random() - 0.5) * 2,
          (Math.random() - 0.5) * 4,
        ],
        validator: i % 5 === 0,
      })
    }
    return n
  }, [])

  const connections = useMemo(() => {
    const conn: { start: THREE.Vector3; end: THREE.Vector3 }[] = []
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const a = new THREE.Vector3(...nodes[i].pos)
        const b = new THREE.Vector3(...nodes[j].pos)
        if (a.distanceTo(b) < CONNECTION_DISTANCE) {
          conn.push({ start: a, end: b })
        }
      }
    }
    return conn
  }, [nodes])

  return (
    <>
      <ambientLight intensity={0.4} />
      <pointLight position={[3, 3, 3]} intensity={1} color="#3B82F6" />
      <pointLight position={[-2, -1, 2]} intensity={0.6} color="#8B5CF6" />
      <ParticleSystem />
      <FloatingShapes />
      {connections.map((c, i) => (
        <Connection key={i} start={c.start} end={c.end} />
      ))}
      {nodes.map((n, i) => (
        <Node key={i} position={n.pos} isValidator={n.validator} mouse={mouse} />
      ))}
      <OrbitControls
        enableZoom={false}
        enablePan={false}
        autoRotate
        autoRotateSpeed={0.4}
        maxPolarAngle={Math.PI / 2 + 0.2}
        minPolarAngle={Math.PI / 2 - 0.2}
      />
    </>
  )
}

export default function NetworkVisualization() {
  const mouse = useRef({ x: 0, y: 0 })

  return (
    <div
      className="absolute inset-0"
      onMouseMove={(e) => {
        mouse.current.x = (e.clientX / window.innerWidth - 0.5) * 2
        mouse.current.y = -(e.clientY / window.innerHeight - 0.5) * 2
      }}
    >
      <Canvas
        camera={{ position: [0, 0, 5], fov: 50 }}
        gl={{ alpha: true, antialias: true }}
        dpr={[1, 2]}
      >
        <Scene mouse={mouse} />
      </Canvas>
    </div>
  )
}
