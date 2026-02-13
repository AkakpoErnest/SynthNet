import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

function WireframeBox() {
  const ref = useRef<THREE.Mesh>(null)
  useFrame((state) => {
    if (!ref.current) return
    ref.current.rotation.x = state.clock.elapsedTime * 0.15
    ref.current.rotation.y = state.clock.elapsedTime * 0.2
  })
  return (
    <mesh ref={ref} position={[2.5, 0.5, -2]}>
      <boxGeometry args={[0.4, 0.4, 0.4]} />
      <meshBasicMaterial color="#3B82F6" wireframe transparent opacity={0.25} />
    </mesh>
  )
}

function WireframeSphere() {
  const ref = useRef<THREE.Mesh>(null)
  useFrame((state) => {
    if (!ref.current) return
    ref.current.rotation.y = state.clock.elapsedTime * 0.12
  })
  return (
    <mesh ref={ref} position={[-2.2, -0.3, -1.5]}>
      <sphereGeometry args={[0.35, 12, 12]} />
      <meshBasicMaterial color="#8B5CF6" wireframe transparent opacity={0.2} />
    </mesh>
  )
}

function SmallCube() {
  const ref = useRef<THREE.Mesh>(null)
  useFrame((state) => {
    if (!ref.current) return
    ref.current.rotation.x = state.clock.elapsedTime * 0.2
    ref.current.rotation.z = state.clock.elapsedTime * 0.15
  })
  return (
    <mesh ref={ref} position={[1.8, -0.8, -2.5]}>
      <boxGeometry args={[0.25, 0.25, 0.25]} />
      <meshBasicMaterial color="#06B6D4" wireframe transparent opacity={0.2} />
    </mesh>
  )
}

function WireframeTorus() {
  const ref = useRef<THREE.Mesh>(null)
  useFrame((state) => {
    if (!ref.current) return
    ref.current.rotation.x = state.clock.elapsedTime * 0.1
    ref.current.rotation.y = state.clock.elapsedTime * 0.18
  })
  return (
    <mesh ref={ref} position={[-1.5, 0.6, -2]}>
      <torusGeometry args={[0.3, 0.08, 8, 16]} />
      <meshBasicMaterial color="#3B82F6" wireframe transparent opacity={0.2} />
    </mesh>
  )
}

function WireframeRing() {
  const ref = useRef<THREE.Mesh>(null)
  useFrame((state) => {
    if (!ref.current) return
    ref.current.rotation.y = state.clock.elapsedTime * 0.25
    ref.current.rotation.z = state.clock.elapsedTime * 0.1
  })
  return (
    <mesh ref={ref} position={[2, -0.5, -1.5]}>
      <ringGeometry args={[0.2, 0.35, 16]} />
      <meshBasicMaterial color="#8B5CF6" wireframe transparent opacity={0.15} side={THREE.DoubleSide} />
    </mesh>
  )
}

function GlowOrb() {
  const ref = useRef<THREE.Mesh>(null)
  useFrame((state) => {
    if (!ref.current) return
    ref.current.position.y = Math.sin(state.clock.elapsedTime * 0.8) * 0.1
  })
  return (
    <mesh ref={ref} position={[1.2, 0.8, -3]}>
      <sphereGeometry args={[0.12, 16, 16]} />
      <meshBasicMaterial color="#06B6D4" transparent opacity={0.3} />
    </mesh>
  )
}

export default function FloatingShapes() {
  return (
    <>
      <WireframeBox />
      <WireframeSphere />
      <SmallCube />
      <WireframeTorus />
      <WireframeRing />
      <GlowOrb />
    </>
  )
}
