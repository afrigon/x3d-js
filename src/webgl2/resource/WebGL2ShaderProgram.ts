import { MaterialPrimitives } from "../../core"
import { Deletable, Identifiable } from "../../core/util"
import { Shader } from "../shader"

export class WebGL2ShaderProgram implements Identifiable, Deletable {
    id: string
    context: WebGL2RenderingContext
    shader: Shader

    vertex: WebGLShader
    fragment: WebGLShader
    program: WebGLProgram

    constructor(
        context: WebGL2RenderingContext,
        shader: Shader
    ) {
        this.id = shader.id
        this.context = context
        this.shader = shader

        this.vertex = this.compile(context.VERTEX_SHADER, shader.vertex)
        this.fragment = this.compile(context.FRAGMENT_SHADER, shader.fragment)
        this.program = this.link()
    }

    private compile(type: GLenum, source: string): WebGLShader {
        console.debug(`x3d: compiling shader: \n\n${source}`)

        const shader = this.context.createShader(type)
        
        if (!shader) {
            throw new Error("x3d: could not create shader")
        }

        this.context.shaderSource(shader, source.trim())
        this.context.compileShader(shader)

        if (!this.context.getShaderParameter(shader, this.context.COMPILE_STATUS)) {
            const error = this.context.getShaderInfoLog(shader) || "x3d: could not compile shader for an unknown reason"
            this.context.deleteShader(shader)
            throw new Error(`x3d: ${error}`)
        }

        return shader
    }

    private link(): WebGLProgram {
        const program = this.context.createProgram()

        if (!program) {
            throw new Error("x3d: could not create shader program")
        }

        this.context.attachShader(program, this.vertex)
        this.context.attachShader(program, this.fragment)
        this.context.linkProgram(program)

        if (!this.context.getProgramParameter(program, this.context.LINK_STATUS)) {
            const error = this.context.getProgramInfoLog(program) || "x3d: could not link program for an unknown reason"
            this.context.deleteProgram(program)
            throw new Error(error)
        }

        return program
    }

    setup(params: MaterialPrimitives) {
        this.context.useProgram(this.program)

        for (const key in params) {
            // TODO: uniform location cache
            const location = this.context.getUniformLocation(this.program, key)

            if (!location) {
                continue
            }

            const { type, value } = params[key]

            switch (type) {
                case "boolean":
                    this.context.uniform1f(location, value ? 1 : 0)
                    break
                case "float":
                    this.context.uniform1f(location, value)
                    break
                case "integer":
                    this.context.uniform1i(location, value)
                    break
                case "vector2":
                    this.context.uniform2f(location, value.x, value.y)
                    break
                case "vector3":
                    this.context.uniform3f(location, value.x, value.y, value.z)
                    break
                case "vector4":
                    this.context.uniform4f(location, value.x, value.y, value.z, value.w)
                    break
                case "matrix4":
                    this.context.uniformMatrix4fv(location, false, value.m)
                    break
            }
        }
    }

    delete() {
        this.context.deleteShader(this.vertex)
        this.context.deleteShader(this.fragment)
        this.context.deleteProgram(this.program)
    }
}