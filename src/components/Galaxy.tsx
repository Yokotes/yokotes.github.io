import React, { useEffect } from 'react'
import {
  BufferGeometry,
  Color,
  BufferAttribute,
  PointsMaterial,
  AdditiveBlending,
  Scene,
  Points,
  PerspectiveCamera,
  WebGLRenderer,
} from 'three'

import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

interface Props {
  count: number
}

const parameters = {
  size: 0.01,
  radius: 5,
  branches: 8,
  spin: 1,
  randomness: 0.3,
  randomnessPower: 5,
  stars: 9000,
  starColor: '#1b3984',
  insideColor: '#ff6030',
  outsideColor: '#1b3984',
}

export const Galaxy = ({ count }: Props) => {
  //gALAXY GENerator
  let geometry: BufferGeometry
  let material: PointsMaterial
  let points: Points
  const scene = new Scene()

  function generateGalaxy() {
    if (points !== null) {
      geometry.dispose()
      material.dispose()
      scene.remove(points)
    }

    geometry = new BufferGeometry()

    const positions = new Float32Array(count * 3)
    const colors = new Float32Array(count * 3)

    const colorInside = new Color(parameters.insideColor)
    const colorOutside = new Color(parameters.outsideColor)

    for (let i = 0; i < count; i++) {
      //Position
      const x = Math.random() * parameters.radius
      const branchAngle =
        ((i % parameters.branches) / parameters.branches) * 2 * Math.PI
      const spinAngle = x * parameters.spin

      const randomX =
        Math.pow(Math.random(), parameters.randomnessPower) *
        (Math.random() < 0.5 ? 1 : -1)
      const randomY =
        Math.pow(Math.random(), parameters.randomnessPower) *
        (Math.random() < 0.5 ? 1 : -1)
      const randomZ =
        Math.pow(Math.random(), parameters.randomnessPower) *
        (Math.random() < 0.5 ? 1 : -1)

      positions[i * 3] = Math.sin(branchAngle + spinAngle) * x + randomX
      positions[i * 3 + 1] = randomY
      positions[i * 3 + 2] = Math.cos(branchAngle + spinAngle) * x + randomZ

      //Color

      const mixedColor = colorInside.clone()
      mixedColor.lerp(colorOutside, x / parameters.radius)

      colors[i * 3 + 0] = mixedColor.r
      colors[i * 3 + 1] = mixedColor.g
      colors[i * 3 + 2] = mixedColor.b
    }

    geometry.setAttribute('position', new BufferAttribute(positions, 3))
    geometry.setAttribute('color', new BufferAttribute(colors, 3))

    material = new PointsMaterial({
      color: 'white',
      size: parameters.size,
      depthWrite: false,
      sizeAttenuation: true,
      blending: AdditiveBlending,
      vertexColors: true,
      transparent: true,
    })

    points = new Points(geometry, material)
    scene.add(points)
  }

  useEffect(() => {
    generateGalaxy()
    const canvas = document.querySelector('#galaxy-canvas') as HTMLCanvasElement
    /**
     * Sizes
     */
    const sizes = {
      width: window.innerWidth,
      height: window.innerHeight,
    }

    window.addEventListener('resize', () => {
      // Update sizes
      sizes.width = window.innerWidth
      sizes.height = window.innerHeight

      // Update camera
      camera.aspect = sizes.width / sizes.height
      camera.updateProjectionMatrix()

      // Update renderer
      renderer.setSize(sizes.width, sizes.height)
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    })

    /**
     * Camera
     */
    // Base camera
    const camera = new PerspectiveCamera(
      75,
      sizes.width / sizes.height,
      0.1,
      100
    )
    camera.position.x = 3
    camera.position.y = 3
    camera.position.z = 3
    scene.add(camera)

    /**
     * Renderer
     */
    const renderer = new WebGLRenderer({ canvas })
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

    // Controls
    const controls = new OrbitControls(camera, renderer.domElement)
    controls.enableDamping = true
  }, [generateGalaxy])

  return <canvas id="galaxy-canvas"></canvas>
}
