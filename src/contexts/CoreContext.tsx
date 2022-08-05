import React, { useEffect, useMemo, useState } from 'react'
import {
  AmbientLight,
  PerspectiveCamera,
  Scene,
  Vector2,
  WebGLRenderer,
} from 'three'
import { v4 } from 'uuid'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer'
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass'
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass'
import { FXAAShader } from 'three/examples/jsm/shaders/FXAAShader'
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass'

interface Values {
  renderer: WebGLRenderer
  scene: Scene
  camera: PerspectiveCamera
  useRenderLoop: (handler: Handler, name: string, deps?: any[]) => void
  controls: OrbitControls
}

type Handler = () => void
interface HandlerConfig {
  id: string
  name: string
  handler: Handler
}

const CoreContext = React.createContext<Values>({} as Values)

export const CoreContextProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [handlers, setHandlers] = useState<HandlerConfig[]>([])
  const renderer = useMemo(
    () => new WebGLRenderer({ logarithmicDepthBuffer: true, alpha: true }),
    []
  )
  const composer = useMemo(() => new EffectComposer(renderer), [renderer])
  const scene = useMemo(() => new Scene(), [])
  const camera = useMemo(
    () =>
      new PerspectiveCamera(
        75,
        window.innerWidth / window.innerHeight,
        1e-6,
        1e27
      ),
    []
  )
  const renderPass = useMemo(
    () => new RenderPass(scene, camera),
    [camera, scene]
  )
  const controls = useMemo(
    () => new OrbitControls(camera, renderer.domElement),
    [renderer, camera]
  )
  controls.enableDamping = true
  controls.enableZoom = false

  const useRenderLoop = (handler: Handler, name: string, deps: any[] = []) => {
    useEffect(() => {
      const config: HandlerConfig = {
        id: v4(),
        name,
        handler,
      }

      setHandlers((prev) => {
        prev.push(config)
        return prev
      })

      return () => {
        setHandlers((prev) => prev.filter((conf) => conf.id !== config.id))
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, deps)
  }

  useEffect(() => {
    const container = document.querySelector('#scene-container')
    container?.append(renderer.domElement)

    const light = new AmbientLight()

    camera.position.x = 4
    camera.position.y = 4
    camera.position.z = 4

    scene.add(camera)
    scene.add(light)

    renderer.setSize(window.innerWidth, window.innerHeight)
    composer.setSize(window.innerWidth, window.innerHeight)

    composer.addPass(renderPass)
    composer.addPass(new ShaderPass(FXAAShader))
    const bloomPass = new UnrealBloomPass(
      new Vector2(window.innerWidth, window.innerHeight),
      1,
      1.25,
      0
    )
    composer.addPass(bloomPass)

    window.addEventListener('resize', () => {
      // Update camera
      camera.aspect = window.innerWidth / window.innerHeight
      camera.updateProjectionMatrix()
      renderer.setSize(window.innerWidth, window.innerHeight)
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
      composer.setSize(window.innerWidth, window.innerHeight)
    })

    return () => {
      window.removeEventListener('resize', () => {
        // Update camera
        camera.aspect = window.innerWidth / window.innerHeight
        camera.updateProjectionMatrix()
        renderer.setSize(window.innerWidth, window.innerHeight)
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
        composer.setSize(window.innerWidth, window.innerHeight)
      })
    }
  }, [renderer, scene, camera, composer, renderPass])

  useEffect(() => {
    let loopId = 0

    const loop = () => {
      composer.render()

      controls.update()
      camera.updateProjectionMatrix()
      handlers.forEach(({ handler }) => handler())

      loopId = requestAnimationFrame(loop)
    }

    loop()

    return () => {
      cancelAnimationFrame(loopId)
    }
  }, [camera, composer, controls, handlers, renderer, scene])

  return (
    <CoreContext.Provider
      value={{ renderer, scene, camera, useRenderLoop, controls }}
    >
      {children}
    </CoreContext.Provider>
  )
}

export const useCoreContext = () => React.useContext(CoreContext)
