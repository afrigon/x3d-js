import { GameScene } from "../core"
import { Renderer } from "../core/Renderer"
import { Registries } from "./registry/Registries"

export class SceneRenderer extends Renderer<WebGL2RenderingContext> {
    scene?: GameScene
    registries: Registries = new Registries()

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

    init(context: WebGL2RenderingContext) {
        super.init(context)

        this.context = context

        // shader = Shader.compile(context, vertex, fragment)
        context.enable(context.DEPTH_TEST)
        context.enable(context.CULL_FACE)
    }

    deinit() {
        super.deinit()

        const gl = this.context

        if (!gl) {
            return
        }

        this.registries.delete()   
    }

    resize(width: number, height: number) {
        super.resize(width, height)

        const gl = this.context

        if (!gl) {
            return
        }

        gl.viewport(0, 0, width, height)
    }

    draw(now: number) {
        super.draw(now)

        const gl = this.context

        if (!gl) {
            return
        }

        gl.bindBuffer(gl.ARRAY_BUFFER, new Float32Array())

        // gl.drawElements(gl.TRIANGLES, plane.indices.length, context.UNSIGNED_SHORT, 0)
    }
}