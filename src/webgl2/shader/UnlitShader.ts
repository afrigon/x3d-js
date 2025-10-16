import { Color } from "../../core"
import vertex from "./assets/default_vertex.glsl?raw"
import unlit from "./assets/unlit_fragment.glsl?raw"

import { ManagedShader } from "./ManagedShader"
import { ShaderParam } from "./ShaderParam"

export class UnlitShader extends ManagedShader {
    constructor() {
        super({
            id: "builtin-unlit",
            vertex,
            fragment: unlit,
            params: [
                ...ShaderParam.default(),
                new ShaderParam("vec4", "color", Color.white.vector)
            ]
        })
    }
}