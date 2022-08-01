import {
  AdditiveBlending,
  BufferAttribute,
  BufferGeometry,
  Points,
  PointsMaterial,
  TextureLoader,
} from 'three'

const COUNT = 10000

export function generatePointsCloud() {
  const geometry = new BufferGeometry()
  const textureLoader = new TextureLoader()
  const shape = textureLoader.load('/images/star2.png')

  const positions = new Float32Array(COUNT * 3)
  const colors = new Float32Array(COUNT * 3)

  for (let i = 0; i < COUNT; i++) {
    positions[i * 3] = Math.random() * 10 - 5
    positions[i * 3 + 1] = Math.random() * 10 - 5
    positions[i * 3 + 2] = Math.random() * 10 - 5

    colors[i * 3 + 0] = 256
    colors[i * 3 + 1] = 256
    colors[i * 3 + 2] = 256
  }

  geometry.setAttribute('position', new BufferAttribute(positions, 3))
  geometry.setAttribute('color', new BufferAttribute(colors, 3))

  const material = new PointsMaterial({
    color: 'white',
    size: 0.001,
    depthWrite: false,
    sizeAttenuation: true,
    blending: AdditiveBlending,
    vertexColors: true,
    transparent: true,
    map: shape,
  })

  const points = new Points(geometry, material)

  return points
}
