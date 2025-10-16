import { CullingMode, Winding } from "../../util"
import { MaterialValue } from "./MaterialValue"

export interface MaterialProps {
    opaque: boolean
    cullingMode: CullingMode
    frontFacing: Winding
    wireframe: boolean
}

export abstract class Material {
    abstract shader: string

    opaque: boolean
    cullingMode: CullingMode
    frontFacing: Winding
    wireframe: boolean

    abstract params(): Map<string, MaterialValue>

    constructor({ 
        opaque, 
        cullingMode, 
        frontFacing,
        wireframe
    }: MaterialProps) {
        this.opaque = opaque
        this.cullingMode = cullingMode
        this.frontFacing = frontFacing
        this.wireframe = wireframe
    }
}