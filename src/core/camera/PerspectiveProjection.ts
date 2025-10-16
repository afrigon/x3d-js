import { Angle, Matrix4 } from "../math"
import { Projection } from "./Projection"

export class PerspectiveProjection implements Projection {
    _fov: Angle
    _aspectRatio: number
    _near: number
    _far: number

    get fov(): Angle {
        return this._fov
    }

    set fov(value: Angle) {
        this._fov = value
        this.dirty = true
    }

    get aspectRatio(): number {
        return this._aspectRatio
    }

    set aspectRatio(value: number) {
        this.aspectRatio = value
        this.dirty = true
    }

    get near(): number {
        return this._near
    }

    set near(value: number) {
        this._near = value
        this.dirty = true
    }

    get far(): number {
        return this._far
    }

    set far(value: number) {
        this._far = value
        this.dirty = true
    }

    private _matrix: Matrix4 = Matrix4.identity
    private dirty: boolean = false

    get matrix(): Matrix4 {
        if (this.dirty) {
            this.dirty = false
            
            this._matrix = this.recalculate()
        }

        return this._matrix
    }

    constructor(
        fov: Angle,
        aspectRatio: number,
        near: number,
        far: number
    ) {
        this._fov = fov
        this._aspectRatio = aspectRatio
        this._near = near
        this._far = far
        this._matrix = this.recalculate()
    }

    recalculate(): Matrix4 {
        const ys = 1 / Math.tan(this.fov.toRadians() * 0.5)
        const xs = ys / this.aspectRatio
        const zs = 1 / (this.near - this.far)

        return new Matrix4(
            xs, 0, 0, 0,
            0, ys, 0, 0,
            0, 0, (this.near + this.far) * zs, 1,
            0, 0, 2 * this.near * this.far * zs, 0
        )
    }
}