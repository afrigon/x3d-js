import vertex from "./assets/default_vertex.glsl?raw"
import unlit from "./assets/unlit_fragment.glsl?raw"

import { ManagedShader } from "./ManagedShader"

export class UnlitShader extends ManagedShader {
    constructor() {
        super({
            id: "builtin-unlit",
            vertex,
            fragment: unlit,
            structures: [],
            uniforms: {
                color: { type: "vec4" }
            },
            globals: true
        })
    }
}