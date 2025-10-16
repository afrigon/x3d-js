import header from "./assets/header.glsl?raw"
import precisionHigh from "./assets/precision_high.glsl?raw"

import { RawShader } from "./RawShader"
import { AnyShaderParam } from "./ShaderParam"

export interface ManagedShaderProps {
    id: string,
    vertex: string,
    fragment: string,
    params: AnyShaderParam[]
}

export class ManagedShader extends RawShader {
    constructor({
        id,
        vertex,
        fragment,
        params = []
    }: ManagedShaderProps) {
        const uniforms = params.map(p => (
            `uniform ${p.type} ${p.name};`
        ))

        super({
            id,
            vertex: `
${header}
${precisionHigh}

${uniforms.join("\n")}

${vertex}
            `,
            fragment: `
${header}
${precisionHigh}

${uniforms.join("\n")}

${fragment}
            `
        })
    }
}