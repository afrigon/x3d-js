# x3d-js

A component-based toy game engine for the browser, rendering through WebGL2.
A scene is a tree of `GameObject`s composed from components — transforms,
cameras, mesh renderers — and a `SceneRenderer` draws it onto a canvas. Built
to explore engine architecture, not to ship games.

## Usage

```ts
import {
    Angle,
    Color,
    GameObject,
    GameScene,
    Input,
    MainCamera,
    MeshRenderer,
    PlaneGeometry,
    SceneRenderer,
    UnlitMaterial,
    UnlitShader,
    Vector3
} from "x3d"

const canvas = document.querySelector("canvas")!

const renderer = new SceneRenderer({ canvas })
renderer.init()
renderer.registerShader(new UnlitShader())

const scene = new GameScene("main")

const camera = new GameObject("camera")
camera.addComponent(MainCamera.perspective(16 / 9, Angle.degrees(90), 0.1, 1000))
camera.transform.position = new Vector3(0, 1, 2)
scene.root.addChild(camera)

const geometry = new PlaneGeometry(1, 1)
renderer.registerGeometry(geometry)

const plane = new GameObject("plane")
plane.addComponent(new MeshRenderer(geometry.id, new UnlitMaterial({ color: Color.rgb(220, 80, 80) })))
scene.root.addChild(plane)

const input = new Input()
let previous = performance.now()

function frame(now: DOMHighResTimeStamp) {
    scene.update(input, (now - previous) / 1000)
    previous = now

    renderer.draw(scene)
    requestAnimationFrame(frame)
}

requestAnimationFrame(frame)
```

## Development

Scripts run through aube, which installs dependencies when needed:

```sh
aubr build       # bundle to dist/ with rollup
aube test        # run the test suite
aubr lint        # lint with eslint
aubr prettier    # format with prettier
aubr type-check  # type-check with tsc
```
