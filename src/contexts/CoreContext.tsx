import React, { useEffect, useMemo, useState } from 'react'
import { PerspectiveCamera, Scene, WebGLRenderer } from 'three'
import { v4 } from 'uuid'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

interface Values {
  renderer: WebGLRenderer
  scene: Scene
  camera: PerspectiveCamera
  useRenderLoop: (handler: Handler, name: string, deps?: any[]) => void
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
  const renderer = useMemo(() => new WebGLRenderer(), [])
  const scene = useMemo(() => new Scene(), [])
  const camera = useMemo(
    () =>
      new PerspectiveCamera(
        75,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
      ),
    []
  )
  const controls = useMemo(
    () => new OrbitControls(camera, renderer.domElement),
    [renderer, camera]
  )
  controls.enableDamping = true
  // controls.maxDistance = 3.5
  // controls.minDistance = 3.5
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

    camera.position.x = 2.5
    camera.position.y = 2.5
    camera.position.z = 2.5
    scene.add(camera)

    renderer.setSize(window.innerWidth, window.innerHeight)

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
  }, [renderer, scene, camera])

  useEffect(() => {
    let loopId = 0

    const loop = () => {
      renderer.render(scene, camera)
      controls.update()
      handlers.forEach(({ handler }) => handler())

      loopId = requestAnimationFrame(loop)
    }

    loop()

    return () => {
      cancelAnimationFrame(loopId)
    }
  }, [camera, controls, handlers, renderer, scene])

  return (
    <CoreContext.Provider value={{ renderer, scene, camera, useRenderLoop }}>
      {children}
    </CoreContext.Provider>
  )
}

export const useCoreContext = () => React.useContext(CoreContext)
