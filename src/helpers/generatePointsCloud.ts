import {
  AdditiveBlending,
  BufferAttribute,
  BufferGeometry,
  Points,
  PointsMaterial,
  TextureLoader,
} from 'three'

const COUNT = 10000

export function generatePointsCloud(size = 0.002, radius = 10) {
  const geometry = new BufferGeometry()
  const textureLoader = new TextureLoader()
  const shape = textureLoader.load('/images/star.png')

  const positions = new Float32Array(COUNT * 3)
  const colors = new Float32Array(COUNT * 3)

  for (let i = 0; i < COUNT; i++) {
    positions[i * 3] = Math.random() * radius - radius / 2
    positions[i * 3 + 1] = Math.random() * radius - radius / 2
    positions[i * 3 + 2] = Math.random() * radius - radius / 2

    colors[i * 3 + 0] = 256
    colors[i * 3 + 1] = 256
    colors[i * 3 + 2] = 256
  }

  geometry.setAttribute('position', new BufferAttribute(positions, 3))
  geometry.setAttribute('color', new BufferAttribute(colors, 3))

  const material = new PointsMaterial({
    color: 'white',
    size,
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
