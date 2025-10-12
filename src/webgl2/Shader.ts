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

export class Shader {
    program: WebGLProgram
    vertex: WebGLShader
    fragment: WebGLShader

    constructor(
        program: WebGLProgram,
        vertex: WebGLShader,
        fragment: WebGLShader
    ) {
        this.program = program
        this.vertex = vertex
        this.fragment = fragment
    }

    bind(context: WebGL2RenderingContext) {
        context.useProgram(this.program)
    }

    getUniformLocation(context: WebGL2RenderingContext, name: string): WebGLUniformLocation | null {
        return context.getUniformLocation(this.program, name)
    }

    delete(context: WebGL2RenderingContext) {
        context.deleteShader(this.vertex)
        context.deleteShader(this.fragment)
        context.deleteProgram(this.program)
    }

    static compile(context: WebGL2RenderingContext, vertex: string, fragment: string): WebGLProgram {
        const vertexShader = compileShader(context, context.VERTEX_SHADER, vertex)
        const fragmentShader = compileShader(context, context.FRAGMENT_SHADER, fragment)
        const program = linkProgram(context, vertexShader, fragmentShader)

        return new Shader(program, vertexShader, fragmentShader)
    }
}