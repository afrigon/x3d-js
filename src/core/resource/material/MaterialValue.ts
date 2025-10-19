import { Vector2, Vector3, Vector4, Matrix4 } from "../../math"

export type MaterialPrimitive = 
    | { type: "float", value: number }
    | { type: "integer", value: number }
    | { type: "boolean", value: boolean }
    | { type: "vector2", value: Vector2 }
    | { type: "vector3", value: Vector3 }
    | { type: "vector4", value: Vector4 }
    | { type: "matrix4", value: Matrix4 }

export type MaterialArray = { type: "array", of: Omit<MaterialValue, "value">, value: MaterialValue[] }
export type MaterialStruct = { type: "struct", fields: Record<string, MaterialValue> }
export type MaterialValue = MaterialPrimitive | MaterialArray | MaterialStruct

export type MaterialPrimitives = Record<string, MaterialPrimitive>
export type MaterialValues = Record<string, MaterialValue>

export function flatten(values: MaterialValues): MaterialPrimitives {
    const flat: MaterialPrimitives = {}

    const visit = (key: string, value: MaterialValue) => {
        if (value.type == "struct") {
            for (const field in value.fields) {
                visit(`${key}.${field}`, value.fields[field])
            }

            return
        }

        if (value.type == "array") {
            for (let i = 0; i < value.value.length; ++i) {
                visit(`${key}[${i}]`, value.value[i])
            }

            return
        }

        flat[key] = value
    }

    for (const key in values) {
        const value = values[key]

        visit(key, value)
    }

    return flat
}
