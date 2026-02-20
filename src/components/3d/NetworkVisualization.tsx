import { useRef, useMemo, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Line, Sphere } from '@react-three/drei'
import * as THREE from 'three'
import ParticleSystem from './ParticleSystem'
import FloatingShapes from './FloatingShapes'
import { MOCK_MINERS } from '../../utils/mockData'

const NODE_COUNT = 28
const CONNECTION_DISTANCE = 2.8

function Node({
  position,
  isValidator,
  mouse,
  nodeIndex,
  miner,
  onHover,
}: {
  position: [number, number, number]
  isValidator: boolean
  mouse: React.MutableRefObject<{ x: number; y: number }>
  nodeIndex: number
  miner: { id: string; stake: number; trust: number; datasetsGenerated: number; uptime: number }
  onHover: (data: { index: number; miner: typeof MOCK_MINERS[0] } | null) => void
}) {
  const meshRef = useRef<THREE.Mesh>(null)
  const materialRef = useRef<THREE.MeshStandardMaterial>(null)
  const color = isValidator ? '#8B5CF6' : '#3B82F6'
  const basePos = useRef(position)

  useFrame((state) => {
    if (!meshRef.current) return
    const t = state.clock.elapsedTime
    const [bx, by, bz] = basePos.current
    meshRef.current.position.x = bx + mouse.current.x * 0.2 + Math.sin(t * 0.3 + bz) * 0.12
    meshRef.current.position.y = by + Math.sin(t * 0.5 + bx) * 0.15 + Math.cos(t * 0.4 + bz) * 0.08
    meshRef.current.position.z = bz + mouse.current.y * 0.2 + Math.cos(t * 0.35 + bx) * 0.1
    const scale = 0.9 + Math.sin(t * 1.5 + bx) * 0.15
    meshRef.current.scale.setScalar(scale)
    if (materialRef.current) {
      materialRef.current.emissiveIntensity = 0.5 + Math.sin(t * 2.5) * 0.35
    }
  })

  return (
    <Sphere
      ref={meshRef}
      args={[0.06, 16, 16]}
      position={basePos.current}
      onPointerOver={() => onHover({ index: nodeIndex, miner })}
      onPointerOut={() => onHover(null)}
    >
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

function Scene({
  mouse,
  onNodeHover,
}: {
  mouse: React.MutableRefObject<{ x: number; y: number }>
  onNodeHover: (data: { index: number; miner: (typeof MOCK_MINERS)[0] } | null) => void
}) {
  const miners = useMemo(() => MOCK_MINERS, [])
  const nodes = useMemo(() => {
    const n: { pos: [number, number, number]; validator: boolean; miner: (typeof miners)[0] }[] = []
    for (let i = 0; i < NODE_COUNT; i++) {
      n.push({
        pos: [
          (Math.random() - 0.5) * 4,
          (Math.random() - 0.5) * 2,
          (Math.random() - 0.5) * 4,
        ],
        validator: i % 5 === 0,
        miner: miners[i % miners.length],
      })
    }
    return n
  }, [miners])

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
        <Node
          key={i}
          position={n.pos}
          isValidator={n.validator}
          mouse={mouse}
          nodeIndex={i}
          miner={n.miner}
          onHover={onNodeHover}
        />
      ))}
      <OrbitControls
        enableZoom
        enablePan
        autoRotate
        autoRotateSpeed={0.6}
        maxPolarAngle={Math.PI / 2 + 0.2}
        minPolarAngle={Math.PI / 2 - 0.2}
        minDistance={2}
        maxDistance={12}
      />
    </>
  )
}

export default function NetworkVisualization() {
  const mouse = useRef({ x: 0, y: 0 })
  const [hoveredNode, setHoveredNode] = useState<{
    index: number
    miner: (typeof MOCK_MINERS)[0]
  } | null>(null)

  return (
    <div
      className={`absolute inset-0 ${hoveredNode ? 'cursor-pointer' : ''}`}
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
        <Scene mouse={mouse} onNodeHover={(data) => setHoveredNode(data)} />
      </Canvas>

      {hoveredNode && (
        <div className="absolute bottom-6 left-6 right-6 md:left-auto md:right-6 md:max-w-sm z-30 pointer-events-none">
          <div className="glass-card p-4 border border-white/10 transition-opacity duration-200">
            <p className="text-xs font-semibold text-[#06B6D4] uppercase tracking-wider mb-2">
              Node {hoveredNode.index + 1} · {hoveredNode.miner.validatorPermit ? 'Validator' : 'Miner'}
            </p>
            <p className="text-white font-medium mb-3">{hoveredNode.miner.id}</p>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div>
                <span className="text-white/50">Stake</span>
                <p className="text-white font-medium">{(hoveredNode.miner.stake / 1000).toFixed(1)}K TAO</p>
              </div>
              <div>
                <span className="text-white/50">Trust</span>
                <p className="text-white font-medium">{(hoveredNode.miner.trust * 100).toFixed(0)}%</p>
              </div>
              <div>
                <span className="text-white/50">Datasets</span>
                <p className="text-white font-medium">{hoveredNode.miner.datasetsGenerated}</p>
              </div>
              <div>
                <span className="text-white/50">Uptime</span>
                <p className="text-white font-medium">{hoveredNode.miner.uptime.toFixed(1)}%</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
