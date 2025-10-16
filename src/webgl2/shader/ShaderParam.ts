import { Matrix4, Vector2, Vector3, Vector4 } from "../../core"

export type ShaderParamType = {
    float: number
    bool: boolean
    vec2: Vector2
    vec3: Vector3
    vec4: Vector4
    mat4: Matrix4
}

export type AnyShaderParam = { [K in keyof ShaderParamType]: ShaderParam<K> }[keyof ShaderParamType]

export class ShaderParam<K extends keyof ShaderParamType> {
    type: K
    name: string
    defaultValue: ShaderParamType[K]

    constructor(type: K, name: string, defaultValue: ShaderParamType[K]) {
        this.type = type
        this.name = name
        this.defaultValue = defaultValue
    }

    static default(): AnyShaderParam[] {
        return [
            new ShaderParam("float", "time", 0),
            new ShaderParam("float", "delta_time", 0),
            new ShaderParam("vec2", "resolution", new Vector2(1920, 1080)),
            new ShaderParam("mat4", "projection", Matrix4.identity),
            new ShaderParam("mat4", "view", Matrix4.identity),
            new ShaderParam("mat4", "model", Matrix4.identity),
            new ShaderParam("mat4", "mvp", Matrix4.identity)
        ]
    }
}