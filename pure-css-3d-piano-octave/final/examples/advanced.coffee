`// http://stackoverflow.com/questions/901115/how-can-i-get-query-string-values-in-javascript
function getParam(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(location.search);
    return results == null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}`

window.scene = null
window.renderer = null
window.camera = null


initScene = (element)->
  window.scene = new THREE.Scene()

  window.renderer = new THREE.WebGLRenderer(alpha: true)
  renderer.setClearColor(0x000000, 1)

  renderer.setSize(window.innerWidth, window.innerHeight)
  element.appendChild(renderer.domElement)

  axis = new THREE.AxisHelper(40)
  scene.add axis

  scene.add new THREE.AmbientLight(0x888888)

  pointLight = new THREE.PointLight(0xFFffff)
  pointLight.position = new THREE.Vector3(-20, 10, 0)
  pointLight.lookAt new THREE.Vector3(0, 0, 0)
  scene.add(pointLight)

  window.camera = new THREE.PerspectiveCamera(
    45,
    window.innerWidth / window.innerHeight,
    1,
    1000
  )


  camera.position.fromArray([0,160,400])
  camera.lookAt(new THREE.Vector3(0, 0, 0))
  window.controls = new THREE.TrackballControls( camera )
  scene.add(camera)

  window.addEventListener( 'resize', ->
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()

    renderer.setSize( window.innerWidth, window.innerHeight )

    controls.handleResize()

    renderer.render(scene, camera)
  , false );

  renderer.render(scene, camera)


`// via Detector.js:
var webglAvailable  = ( function () { try { var canvas = document.createElement( 'canvas' ); return !! window.WebGLRenderingContext && ( canvas.getContext( 'webgl' ) || canvas.getContext( 'experimental-webgl' ) ); } catch( e ) { return false; } } )()`

if webglAvailable
  initScene(document.body)

stats = new Stats();

stats.domElement.style.position = 'absolute';
stats.domElement.style.left = '0px';
stats.domElement.style.top = '0px';

document.body.appendChild( stats.domElement );


window.controller = controller = (new Leap.Controller)
controller.use('handHold')
  .use('transform', {
#    quaternion: (new THREE.Quaternion).setFromEuler(new THREE.Euler(0, Math.PI / 2, Math.PI / 2))
    position: new THREE.Vector3(1,0,0)
#    scale: ->
#      new THREE.Vector3(0.5,0.5,0.5)
  })
  .use('handEntry')
  .use('screenPosition')
  .use('riggedHand', {
    parent: scene
    renderer: renderer # needed for screenPosition later
    scale: getParam('scale')                  # a number, default of 1
    positionScale: getParam('positionScale')  # a number, default of 1
    helper: true

#    This allows individual hand offsets
#    offset: (leapHand)->
      # create a "breathing" effect..
#      new THREE.Vector3(0, Math.sin( (new Date).getTime() / 1000 * 3), 0)

    offset: new THREE.Vector3(0, 0, 0)

    renderFn: ()->
      renderer.render(scene, camera)
      controls.update()

    materialOptions: {
      wireframe: getParam('wireframe')
    }
    # set ?dots=true in the URL to show raw joint positions
    dotsMode: getParam('dots')
    stats: stats
    camera: camera
    boneLabels: (boneMesh, leapHand)->
#      return boneMesh.name
      if boneMesh.name.indexOf('Finger_03') == 0
        leapHand.pinchStrength
    boneColors: (boneMesh, leapHand)->
      if (boneMesh.name.indexOf('Finger_0') == 0) || (boneMesh.name.indexOf('Finger_1') == 0)
        return {
          hue: 0.6,
          saturation: leapHand.pinchStrength
        }
    checkWebGL: true
  })
  .connect()


if getParam('screenPosition')
  cursor = document.createElement('div');
  cursor.style.width = '50px'
  cursor.style.height = '50px'
  cursor.style.position = 'absolute'
  cursor.style.zIndex = '10'

  cursor.style.backgroundColor = 'green'
  cursor.style.opacity = '0.8'
  cursor.style.color = 'white'
  cursor.style.fontFamily = 'curior'
  cursor.style.textAlign = 'center'
  cursor.innerHTML = "&lt;div&gt;"

  document.body.appendChild(cursor)

  controller.on 'frame', (frame)->
    if hand = frame.hands[0]
      handMesh = frame.hands[0].data('riggedHand.mesh')
      # to use screenPosition, we pass in any leap vector3 and the camera
      screenPosition = handMesh.screenPosition(hand.fingers[1].tipPosition, camera)
      cursor.style.left = screenPosition.x
      cursor.style.bottom = screenPosition.y

if getParam('scenePosition')

  window.sphere = new THREE.Mesh(
    new THREE.SphereGeometry(1),
    new THREE.MeshBasicMaterial(0x0000ff)
  )
  scene.add(sphere)

  controller.on 'frame', (frame)->
    if hand = frame.hands[0]
      handMesh = frame.hands[0].data('riggedHand.mesh')
      handMesh.scenePosition(hand.indexFinger.tipPosition, sphere.position)


if getParam('playback')
  controller.use('playback', {
    recording: 'examples/confidence2-49fps.json.lz'
    autoPlay: true
    pauseOnHand: true
  })


if getParam('boneHand')
  riggedHand = controller.plugins.riggedHand

  controller.use('boneHand', {
    renderer: riggedHand.renderer
    scene: riggedHand.parent
    camera: riggedHand.camera
    render: ->
  })
