import { Deletable, GameScene } from "../core"
import { Registries } from "./registry/Registries"

interface SceneRendererProps {
    canvas: HTMLCanvasElement
}

export class SceneRenderer implements Deletable {
    private _canvas: HTMLCanvasElement
    private _width: number
    private _height: number

    get canvas(): HTMLCanvasElement {
        return this._canvas
    }

    get width(): number {
        return this._width
    }

    get height(): number {
        return this._height
    }

    private gl: WebGL2RenderingContext
    private registries: Registries = new Registries()

    constructor({ 
        canvas
    }: SceneRendererProps) {
        this._canvas = canvas
        this._width = canvas.clientWidth
        this._height = canvas.clientHeight
        const gl = canvas.getContext("webgl2")

        if (!gl) {
            throw new Error("x3d: could not create webgl2 context from canvas.")
        }

        this.gl = gl
    }

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

    resize(width: number, height: number) {
        this._width = width
        this._height = height
        this.canvas.width = width
        this.canvas.height = height
        this.gl.viewport(0, 0, width, height)
    }

    draw(scene: GameScene) {
        const camera = scene.root.getComponent("camera")
    }

    delete() {
        this.registries.delete()
    }
}