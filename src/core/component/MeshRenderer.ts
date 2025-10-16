import { Material } from "../resource"
import { GameComponentType } from "./GameComponent"
import { RendererComponent } from "./RendererComponent"

export class MeshRenderer extends RendererComponent {
    type: GameComponentType = "mesh-renderer"

    geometry: string
    material: Material

    constructor(geometry: string, material: Material) {
        super()

        this.geometry = geometry
        this.material = material
    }
}