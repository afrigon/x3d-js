export type UniformPrimitive =
    | { type: "float" }
    | { type: "int" }
    | { type: "bool" }
    | { type: "vec2" }
    | { type: "vec3" }
    | { type: "vec4" }
    | { type: "mat4" }

export type UniformArray = { type: "array", of: Uniform, size: number }
export type UniformStruct = { type: "struct", name: string }
export type Uniform = UniformPrimitive | UniformArray | UniformStruct

export type Uniforms = Record<string, Uniform>
