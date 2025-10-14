import { Deletable } from "../../core/util"
import { ShaderRegistry } from "./ShaderRegistry"

export class Registries implements Deletable {
    shaders: ShaderRegistry = new ShaderRegistry()

    delete() {
        this.shaders.delete()
    }
}