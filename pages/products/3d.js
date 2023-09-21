import * as React from 'react'
import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader'
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls'
import * as THREE from 'three'

export default function ThreeD() {
  const [scene, setScene] = React.useState(null)
  const [setLoaded] = React.useState(false)
  const loader = new GLTFLoader()
  const canva = React.useRef(null)

  React.useEffect(() => {
    loader.load(
      '/assets/models/scalp.gltf',
      function (gltf) {
        gltf.scene.position.y = -2 // gltf.scene.scale.set(0.3, 0.3, 0.3)
        const model = gltf.scene // gltf.scene.axis
        // model.rotateY(-1.2)
        setScene(model)
      },
      undefined,
      function (error) {
        console.error(error)
      },
    )
  }, [])
  React.useEffect(() => {
    const sizes = {
      width: window.innerWidth,
      height: window.innerHeight,
      camera: {
        position: {
          x: 29,
          y: 10,
          z: 20,
        },
        lookAt: {
          x: 100,
          y: 3,
          z: 0,
        },
      },
      ambientLight: {
        color: 0xffffff,
        intensity: 0.9,
      },
      directionalLight: {
        color: 0xffffff,
        intensity: 0.5,
        position: {
          x: 6,
          y: 0,
          z: 4,
        },
      },
      renderer: {
        pixelRatio: 6,
      },
    }

    // renderer
    const renderer = new THREE.WebGLRenderer({
      canvas: canva.current,
      alpha: true,
    })

    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(sizes.renderer.pixelRatio)
    // camera
    const camera = new THREE.PerspectiveCamera(
      50,
      sizes.width / sizes.height,
      0.1,
      20000,
    )
    camera.position.set(
      sizes.camera.position.x,
      sizes.camera.position.y,
      sizes.camera.position.z,
    )

    // ambientLight
    var ambientLight = new THREE.AmbientLight(
      sizes.ambientLight.color,
      sizes.ambientLight.intensity,
    )
    var directionalLight = new THREE.DirectionalLight(
      sizes.directionalLight.color,
      sizes.directionalLight.intensity,
    )

    // scene.position.x = camera.position.x
    if (scene) {
      // Box3

      // const gridHelper = new THREE.GridHelper(size, divisions)
      // scene.add(gridHelper)
      // // axis helper
      // const axesHelper = new THREE.AxesHelper(5)
      // scene.add(axesHelper)
      // // camera helper
      // const cameraHelper = new THREE.CameraHelper(camera)
      // scene.add(cameraHelper)
      // // box helper
      // const boxHelper = new THREE.Box3Helper(box, 0xffff00)
      // scene.add(boxHelper)
      // camera.position.set(boundingBox.max)
      camera.lookAt(
        sizes.camera.lookAt.x,
        sizes.camera.lookAt.y,
        sizes.camera.lookAt.z,
      )
      directionalLight.position.set(
        sizes.directionalLight.position.x,
        sizes.directionalLight.position.y,
        sizes.directionalLight.position.z,
      )
    }

    // renderer.setScissor(1, 1, 1, 1)
    // renderer.setClearColor(0xd2d2d2, 0.5) // border color
    // renderer.clearColor() // clear color buffer
    // controls
    const controls = new OrbitControls(camera, canva.current)
    // controls.target.set(0, 0.2, 0)

    controls.update()
    controls.enablePan = false
    controls.enableZoom = true
    controls.enableDamping = true
    controls.autoRotate = true
    controls.autoRotateSpeed = 5
    function render() {
      requestAnimationFrame(render)
      if (scene) {
        // scene.background = new THREE.Color('0xff0000')

        scene.add(ambientLight)
        scene.add(directionalLight)
        renderer.setClearColor(0xffffff, 1)
        renderer.render(scene, camera)
        setLoaded(true)
      }
    }
    render()
  }, [scene])

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        border: '1px solid red',
      }}
    >
      <canvas ref={canva}></canvas>
    </div>
  )
}
