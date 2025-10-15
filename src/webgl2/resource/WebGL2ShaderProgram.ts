import { Deletable } from "../../core/util"

function compileShader(context: WebGL2RenderingContext, type: GLenum, source: string) {
    const shader = context.createShader(type)

    if (!shader) {
        throw new Error("Could not create shader")
    }

    context.shaderSource(shader, source.trim())
    context.compileShader(shader)

    if (!context.getShaderParameter(shader, context.COMPILE_STATUS)) {
        const error = context.getShaderInfoLog(shader) || "Could not compile shader for an unknown reason"
        context.deleteShader(shader)
        throw new Error(error)
    }

    return shader
}

function linkProgram(context: WebGL2RenderingContext, vertex: WebGLShader, fragment: WebGLShader) {
    const program = context.createProgram()

    if (!program) {
        throw new Error("Could not create shader program")
    }

    context.attachShader(program, vertex)
    context.attachShader(program, fragment)
    context.linkProgram(program)

    if (!context.getProgramParameter(program, context.LINK_STATUS)) {
        const error = context.getProgramInfoLog(program) || "Could not link program for an unknown reason"
        context.deleteProgram(program)
        throw new Error(error)
    }

    return program
}

export class WebGL2ShaderProgram implements Deletable {
    context: WebGL2RenderingContext
    program: WebGLProgram
    vertex: WebGLShader
    fragment: WebGLShader

    constructor(
        context: WebGL2RenderingContext,
        program: WebGLProgram,
        vertex: WebGLShader,
        fragment: WebGLShader
    ) {
        this.context = context
        this.program = program
        this.vertex = vertex
        this.fragment = fragment
    }

    use() {
        this.context.useProgram(this.program)
    }

    getUniformLocation(name: string): WebGLUniformLocation | null {
        return this.context.getUniformLocation(this.program, name)
    }

    delete() {
        this.context.deleteShader(this.vertex)
        this.context.deleteShader(this.fragment)
        this.context.deleteProgram(this.program)
    }

    static compile(context: WebGL2RenderingContext, vertex: string, fragment: string): WebGLProgram {
        const vertexShader = compileShader(context, context.VERTEX_SHADER, vertex)
        const fragmentShader = compileShader(context, context.FRAGMENT_SHADER, fragment)
        const program = linkProgram(context, vertexShader, fragmentShader)

        return new WebGL2ShaderProgram(context, program, vertexShader, fragmentShader)
    }
}