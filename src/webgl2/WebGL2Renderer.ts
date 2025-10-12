export default class WebGL2Renderer {
    setup_vao(
        context: WebGL2RenderingContext, 
        program: WebGLProgram, 
        vao: WebGLVertexArrayObject, 
        name: string, 
        data: AllowSharedBufferSource,
        componentCount: 1 | 2 | 3 | 4
    ) {
        const buffer = context.createBuffer()
        context.bindBuffer(context.ARRAY_BUFFER, buffer)
        context.bufferData(context.ARRAY_BUFFER, data, context.STATIC_DRAW)
        const location = context.getAttribLocation(program, name)

        if (location >= 0) {
            context.enableVertexAttribArray(location)
            context.vertexAttribPointer(location, componentCount, context.FLOAT, false, 0, 0)
        }
    }

    init(context: WebGL2RenderingContext, program: WebGLProgram) {
        // shader = Shader.compile(context, vertex, fragment)
        context.enable(context.DEPTH_TEST)
        context.enable(context.CULL_FACE)

        const vao = context.createVertexArray()
        context.bindVertexArray(vao)

        // setup_vao(context, program, vao, "vertex", plane.vertices, 3)
        // setup_vao(context, program, vao, "normal", plane.normals, 3)
        // setup_vao(context, program, vao, "uv", plane.uvs, 2)

        // const indicesBuffer = context.createBuffer()
        // context.bindBuffer(context.ELEMENT_ARRAY_BUFFER, indicesBuffer)
        // context.bufferData(context.ELEMENT_ARRAY_BUFFER, plane.indices, context.STATIC_DRAW)

        context.bindVertexArray(null)
    }

    deinit(context: WebGL2RenderingContext) {
        // shader.delete()
    }

    resize(context: WebGL2RenderingContext, width: number, height: number) {

    }

    draw(context: WebGL2RenderingContext) {
        context.bindBuffer(context.ARRAY_BUFFER, new Float32Array())

        // context.drawElements(context.TRIANGLES, plane.indices.length, context.UNSIGNED_SHORT, 0)
    }
}