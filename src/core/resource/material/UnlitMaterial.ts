import { Color } from "../../util"
import { Material, MaterialProps } from "./Material"
import { MaterialValue } from "./MaterialValue"

export interface UnlitMaterialProps {
    color: Color
}

export class UnlitMaterial extends Material {
    shader: string = "builtin-unlit"
    color: Color

    constructor(props: UnlitMaterialProps & MaterialProps) {
        super(props)

        this.color = props.color
    }

    params(): Map<string, MaterialValue> {
        return new Map(Object.entries({
            color: this.color
        }))
    }
}