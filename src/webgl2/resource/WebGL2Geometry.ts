import { Identifiable, Deletable, Geometry } from "../../core"

export class WebGL2Geometry implements Identifiable, Deletable {
    id: string
    context: WebGL2RenderingContext
    geometry: Geometry

    vao: WebGLVertexArrayObject
    vertices: WebGLBuffer
    normals: WebGLBuffer
    uvs: WebGLBuffer
    indices: WebGLBuffer

    constructor(context: WebGL2RenderingContext, geometry: Geometry) {
        this.id = geometry.id
        this.context = context
        this.geometry = geometry

        this.vao = context.createVertexArray()

        context.bindVertexArray(this.vao)

        this.vertices = this.configureAttribute(0, new Float32Array(geometry.vertices), 3)
        this.normals = this.configureAttribute(1, new Float32Array(geometry.normals), 3)
        this.uvs = this.configureAttribute(2, new Float32Array(geometry.uvs), 2)

        this.indices = this.context.createBuffer()
        this.context.bindBuffer(context.ELEMENT_ARRAY_BUFFER, this.indices)
        this.context.bufferData(this.context.ARRAY_BUFFER, new Int32Array(geometry.indices), this.context.STATIC_DRAW)

        context.bindVertexArray(null)
    }

    private configureAttribute(
        location: number, 
        data: AllowSharedBufferSource,
        componentCount: 1 | 2 | 3 | 4
    ) {
        const buffer = this.context.createBuffer()
        this.context.bindBuffer(this.context.ARRAY_BUFFER, buffer)
        this.context.bufferData(this.context.ARRAY_BUFFER, data, this.context.STATIC_DRAW)

        this.context.enableVertexAttribArray(location)
        this.context.vertexAttribPointer(location, componentCount, this.context.FLOAT, false, 0, 0)

        return buffer
    }

    delete() {
        this.context.deleteBuffer(this.vertices)
        this.context.deleteBuffer(this.normals)
        this.context.deleteBuffer(this.uvs)
        this.context.deleteBuffer(this.indices)
        this.context.deleteVertexArray(this.vao)
    }
}
