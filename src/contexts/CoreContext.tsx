import React, { useEffect, useMemo, useState } from 'react'
import { PerspectiveCamera, Scene, WebGLRenderer } from 'three'
import { v4 } from 'uuid'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer'
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass'
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass'
import { FocusShader as Shader } from 'three/examples/jsm/shaders/FocusShader'

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
    () => new WebGLRenderer({ antialias: true, logarithmicDepthBuffer: true }),
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
  const shaderPass = useMemo(() => new ShaderPass(Shader), [])
  const renderPass = useMemo(
    () => new RenderPass(scene, camera),
    [camera, scene]
  )
  const controls = useMemo(
    () => new OrbitControls(camera, renderer.domElement),
    [renderer, camera]
  )
  controls.enableDamping = true
  // controls.enableZoom = false

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

    camera.position.x = 4
    camera.position.y = 4
    camera.position.z = 4
    scene.add(camera)

    renderer.setSize(window.innerWidth, window.innerHeight)

    composer.addPass(renderPass)
    // composer.addPass(shaderPass)

    window.addEventListener('resize', () => {
      // Update camera
      camera.aspect = window.innerWidth / window.innerHeight
      camera.updateProjectionMatrix()
      renderer.setSize(window.innerWidth, window.innerHeight)
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    })

    return () => {
      window.removeEventListener('resize', () => {
        // Update camera
        camera.aspect = window.innerWidth / window.innerHeight
        camera.updateProjectionMatrix()
        renderer.setSize(window.innerWidth, window.innerHeight)
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
      })
    }
  }, [renderer, scene, camera, composer, renderPass, shaderPass])

  useEffect(() => {
    let loopId = 0

    const loop = () => {
      composer.render()
      controls.update()
      // camera.near = c / 0.1
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
