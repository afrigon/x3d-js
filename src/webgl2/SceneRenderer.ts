import { Deletable, GameScene, Geometry, MainCamera, Matrix4, MeshRenderer, Vector2 } from "../core"
import { Registries } from "./registry/Registries"
import { WebGL2Geometry, WebGL2ShaderProgram } from "./resource"
import { Shader, ShaderGlobals } from "./shader"

interface SceneRendererProps {
    canvas: HTMLCanvasElement
}

export class SceneRenderer implements Deletable {
    private _canvas: HTMLCanvasElement
    private _width: number
    private _height: number
    private _previous?: DOMHighResTimeStamp

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

    resize(width: number, height: number) {
        this._width = width
        this._height = height
        this.canvas.width = width
        this.canvas.height = height
        this.gl.viewport(0, 0, width, height)
    }

    draw(scene: GameScene) {
        const camera = scene.query("main-camera")[0] as MainCamera

        // TODO: change this to support texture rendering
        if (!camera || !camera.enabled) {
            return
        }

        this.gl.clearColor(...camera.backgroundColor.rgbaFloat())
        this.gl.clearDepth(1)
        this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT)

        const projection = camera.projection?.matrix ?? Matrix4.identity
        const view = camera.parent?.transform.matrix ?? Matrix4.identity

        const meshes = scene.query("mesh-renderer")

        const now = performance.now()
        const deltaTime = now - (this._previous ?? now)
        this._previous = now

        const vp = Matrix4.multiply(projection, view)

        const globals: ShaderGlobals = {
            time: now,
            deltaTime,
            resolution: new Vector2(this._width, this._height),
            projection,
            view,
            model: Matrix4.identity,
            vp,
            mvp: Matrix4.identity,
        }

        for (const mesh of meshes) {
            const component = mesh as MeshRenderer
            
            if (!component.enabled) {
                continue
            }

            globals.model = mesh.parent?.transform.matrix ?? Matrix4.identity
            globals.mvp = Matrix4.multiply(vp, globals.model)

            const material = component.material
            const shader = this.registries.shaders.get(material.shader)

            if (!shader) {
                continue
            }

            shader.setup({
                ...globals,
                ...component.material.params()
            })

            const geometry = this.registries.geometries.get(component.geometry)

            if (!geometry) {
                continue
            }

            this.gl.bindVertexArray(geometry.vao)
            this.gl.drawElements(
                material.wireframe ? this.gl.LINES : this.gl.TRIANGLES,
                geometry.geometry.indices.length,
                this.gl.UNSIGNED_INT,
                0
            )
            this.gl.bindVertexArray(null)
        }
    }

    delete() {
        this.registries.delete()
    }

    registerGeometry(geometry: Geometry) {
        if (this.registries.geometries.has(geometry.id)) {
            return
        }

        const item = new WebGL2Geometry(this.gl, geometry)
        this.registries.geometries.register(item)
    }

    registerShader(shader: Shader) {
        if (this.registries.shaders.has(shader.id)) {
            return
        }

        const item = new WebGL2ShaderProgram(this.gl, shader)
        this.registries.shaders.register(item)
    }
}