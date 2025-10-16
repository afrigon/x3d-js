import { Deletable } from "../../core/util"
import { GeometryRegistry } from "./GeometryRegistry"
import { ShaderRegistry } from "./ShaderRegistry"

export class Registries implements Deletable {
    shaders: ShaderRegistry = new ShaderRegistry()
    geometries: GeometryRegistry = new GeometryRegistry()

    delete() {
        this.shaders.delete()
        this.geometries.delete()
    }
}