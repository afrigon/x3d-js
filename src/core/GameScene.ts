import { Camera } from "./component"
import { MeshRenderer } from "./component/MeshRenderer"
import { GameObject } from "./GameObject"
import { Angle } from "./math"
import { Updatable } from "./util"

export class GameScene implements Updatable {
    name: string
    root: GameObject

    constructor(name: string) {
        this.name = name
        this.root = new GameObject("root")
    }

    static default(name: string): GameScene {
        const scene = new GameScene(name)

        const camera = new GameObject("MainCamera")
        camera.addComponent(Camera.perspective(16 / 9, Angle.degrees(90), 0.01, 1000))
        scene.root.addChild(camera)

        const cube = new GameObject("Cube")
        cube.addComponent(new MeshRenderer())
        scene.root.addChild(cube)

        return scene
    }

    update(delta: number) {
        if (!this.root.enabled) {
            return    
        }

        this.root.update(delta)
    }
}