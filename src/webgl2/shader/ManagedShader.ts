import header from "./assets/header.glsl?raw"
import precisionHigh from "./assets/precision_high.glsl?raw"
import globalsDeclaration from "./assets/globals.glsl?raw"

import { RawShader } from "./RawShader"
import { Uniforms, Uniform } from "./Uniform"
import { Structure } from "./Structure"

export interface ManagedShaderProps {
    id: string
    vertex: string
    fragment: string
    structures: Structure[]
    uniforms: Uniforms
    globals: boolean
}

export class ManagedShader extends RawShader {
    constructor({
        id,
        vertex,
        fragment,
        structures = [],
        uniforms = {},
        globals = true
    }: ManagedShaderProps) {
        const structs = structures.map(s => (`
struct ${s.name} {
${
    Object.entries(s.fields).map(([name, type]) => (
        `${this.typeOf(type)} ${name}${this.suffix(type)};`
    ))
    .join("\n")
}
}
`
        )).join("\n\n")

        const _uniforms = Object.entries(uniforms).map(([name, type]) => (
            `uniform ${this.typeOf(type)} ${name}${this.suffix(type)};`
        )).join("\n")

        super({
            id,
            vertex: `
${header}
${precisionHigh}

${globals && globalsDeclaration}

${structs}

${_uniforms}

${vertex}
            `,
            fragment: `
${header}
${precisionHigh}

${globals && globalsDeclaration}

${structs}

${_uniforms}

${fragment}
            `
        })
    }

    private typeOf(uniform: Uniform): string {
        if (uniform.type == "array") {
            return this.typeOf(uniform.of)
        }

        if (uniform.type == "struct") {
            return uniform.name
        }

        return uniform.type
    }

    private suffix(uniform: Uniform): string {
        return uniform.type == "array" ? `[${uniform.size}]${this.suffix(uniform.of)}` : ""
    }
}