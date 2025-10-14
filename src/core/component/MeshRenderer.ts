import { GameComponentType } from "./GameComponent"
import { RendererComponent } from "./RendererComponent"

export class MeshRenderer extends RendererComponent {
    type: GameComponentType = "mesh-renderer"

    mesh?: string
    materials: string[] = []

    constructor(mesh?: string, materials: string[] = []) {
        super()

        this.mesh = mesh
        this.materials = materials
    }
}