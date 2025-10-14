import { UUID, randomUUID } from "crypto"
import { GameObject } from "../GameObject"
import { Togglable, Updatable } from "../util"

export type GameComponentType = 
    | "mesh-renderer"
    | "camera"

export abstract class GameComponent implements Updatable, Togglable {
    id: UUID = randomUUID()
    enabled: boolean = true
    parent?: GameObject

    abstract type: GameComponentType

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    update(delta: number) {
        
    }
}