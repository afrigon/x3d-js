import { CullingMode, Winding } from "../../util"
import { MaterialValue } from "./MaterialValue"

export interface MaterialProps {
    opaque?: boolean
    cullingMode?: CullingMode
    frontFacing?: Winding
    wireframe?: boolean
}

export abstract class Material {
    abstract shader: string

    opaque: boolean
    cullingMode: CullingMode
    frontFacing: Winding
    wireframe: boolean

    abstract params(): Record<string, MaterialValue>

    constructor({ 
        opaque, 
        cullingMode, 
        frontFacing,
        wireframe
    }: MaterialProps) {
        this.opaque = opaque ?? false
        this.cullingMode = cullingMode ?? "back"
        this.frontFacing = frontFacing ?? "clockwise"
        this.wireframe = wireframe ?? false
    }
}