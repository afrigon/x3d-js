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

    params(): Record<string, MaterialValue> {
        return {
            "color": { type: "vector3", value: this.color.rgbFloat() }
        }
    }
}