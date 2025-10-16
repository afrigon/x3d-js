import { Shader } from "./Shader"

export interface RawShaderProps {
    id: string
    vertex: string,
    fragment: string
}

export class RawShader implements Shader {
    id: string
    vertex: string
    fragment: string

    constructor({
        id,
        vertex,
        fragment
    }: RawShaderProps) {
        this.id = id
        this.vertex = vertex
        this.fragment = fragment
    }
}