import { GameObject } from "../GameObject"
import { Input } from "../input"
import { Togglable, Updatable } from "../util"

export type GameComponentType = 
    | "main-camera"
    | "mesh-renderer"
    | "transform"
    | "fps-controller"

export abstract class GameComponent implements Updatable, Togglable {
    id: string = crypto.randomUUID()
    enabled: boolean = true
    parent?: GameObject

    abstract type: GameComponentType

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    update(input: Input, delta: number) {
        
    }
}