import React from 'react'
import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader'
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls'
import * as THREE from 'three'

export default function threeD() {
  const [scene, setScene] = React.useState(null)
  const [loaded, setLoaded] = React.useState(false)
  const loader = new GLTFLoader()
  const canva = React.useRef(null)

  React.useEffect(() => {
    loader.load(
      '/assets/models/scalp.gltf',
      function (gltf) {
        console.log(gltf.scene)
        gltf.scene.position.set(0.6, -0.4, 1)
        gltf.scene.scale.set(0.3, 0.3, 0.3)
        gltf.scene.rotateY(-0.5)
        setScene(gltf.scene)
      },
      undefined,
      function (error) {
        console.error(error)
      },
    )
  }, [])
  React.useEffect(() => {
    const renderer = new THREE.WebGLRenderer({
      canvas: canva.current,
      alpha: true,
    })
    renderer.setSize(900, 900)
    const camera = new THREE.PerspectiveCamera(
      40,
      canva.current.clientWidth / canva.current.clientHeight,
      0.01,
      20000,
    )
    camera.position.set(2, 3, 5)

    const controls = new OrbitControls(camera, renderer.domElement)
    controls.target.set(0, 0.2, 0)
    controls.update()
    controls.enablePan = true
    controls.enableDamping = true
    var ambientLight = new THREE.AmbientLight(0xffffff, 0.6)

    var directionalLight = new THREE.DirectionalLight(0xdddddd, 0.8)
    directionalLight.position.set(0, 1, 1)
    function render() {
      requestAnimationFrame(render)
      if (scene) {
        // camera.lookAt(scene.position)
        scene.background = new THREE.Color('0xff0000')
        scene.add(ambientLight)
        scene.add(directionalLight)
        renderer.setClearColor(0xffffff, 0)
        renderer.render(scene, camera)
        setLoaded(true)
      }
    }
    render()
  }, [scene])

  return (
    <div style={{display: 'flex', justifyContent: 'center'}}>
      <canvas ref={canva}></canvas>
    </div>
  )
}
