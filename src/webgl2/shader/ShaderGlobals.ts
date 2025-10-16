import { Matrix4, Vector2 } from "../../core"

export type ShaderGlobals = {
    time: number
    deltaTime: number
    resolution: Vector2
    projection: Matrix4
    view: Matrix4
    model: Matrix4
    vp: Matrix4
    mvp: Matrix4
}