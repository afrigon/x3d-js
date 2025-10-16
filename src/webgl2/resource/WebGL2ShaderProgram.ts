import { MaterialValue, Matrix4, Vector2, Vector3 } from "../../core"
import { Color, Deletable, Identifiable } from "../../core/util"
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
        const shader = this.context.createShader(type)

        if (!shader) {
            throw new Error("x3d: could not create shader")
        }

        this.context.shaderSource(shader, source.trim())
        this.context.compileShader(shader)

        if (!this.context.getShaderParameter(shader, this.context.COMPILE_STATUS)) {
            const error = this.context.getShaderInfoLog(shader) || "x3d: could not compile shader for an unknown reason"
            this.context.deleteShader(shader)
            throw new Error(error)
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

    setup(params: Map<string, MaterialValue>) {
        this.context.useProgram(this.program)

        for (const [ key, value ] of params.entries()) {
            const location = this.context.getUniformLocation(this.program, key)

            if (!location) {
                continue
            }

            if (typeof value == "number") {
                this.context.uniform1f(location, value)
            } else if (typeof value == "boolean") {
                this.context.uniform1f(location, value ? 1 : 0)
            } else if (value instanceof Vector2) {
                this.context.uniform2f(location, value.x, value.y)
            } else if (value instanceof Vector3) {
                this.context.uniform3f(location, value.x, value.y, value.z)
            } else if (value instanceof Color) {
                this.context.uniform4f(location, value.r, value.g, value.b, value.a)
            } else if (value instanceof Matrix4) {
                this.context.uniformMatrix4fv(location, false, value.float32Array())
            }
        }
    }

    delete() {
        this.context.deleteShader(this.vertex)
        this.context.deleteShader(this.fragment)
        this.context.deleteProgram(this.program)
    }
}