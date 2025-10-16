import { GameComponent, GameComponentType, MainCamera } from "./component"
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

        const camera = new GameObject("main-camera")
        camera.addComponent(MainCamera.perspective(16 / 9, Angle.degrees(90), -1000, 1000))
        scene.root.addChild(camera)

        const cube = new GameObject("cube")
        // cube.addComponent(new MeshRenderer()) // TODO: add geometry + default shader
        scene.root.addChild(cube)

        return scene
    }

    update(delta: number) {
        if (!this.root.enabled) {
            return    
        }

        this.root.update(delta)
    }

    query(type: GameComponentType): GameComponent[] {
        return this.root.query(type)
    }
}