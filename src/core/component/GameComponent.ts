import { GameObject } from "../GameObject"
import { Togglable, Updatable } from "../util"

export type GameComponentType = 
    | "main-camera"
    | "mesh-renderer"
    | "transform"

export abstract class GameComponent implements Updatable, Togglable {
    id: string = crypto.randomUUID()
    enabled: boolean = true
    parent?: GameObject

    abstract type: GameComponentType

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    update(delta: number) {
        
    }
}