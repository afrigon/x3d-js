import { Angle } from "../math/Angle"
import { Mat4 } from "../math/Matrix"
import { Projection } from "./Projection"

export class PerspectiveProjection implements Projection {
    _aspectRatio: number
    _fov: Angle
    _near: number
    _far: number

    get aspectRatio(): number {
        return this._aspectRatio
    }

    set aspectRatio(value: number) {
        this.aspectRatio = value
        this.dirty = true
    }

    get fov(): Angle {
        return this._fov
    }

    set fov(value: Angle) {
        this._fov = value
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

    private _matrix: Mat4 = Mat4.identity()
    private dirty: boolean = true

    get matrix() {
        if (this.dirty) {
            this.dirty = false
            
            this._matrix = this.recalculate()
        }

        return this._matrix
    }

    constructor(
        aspectRatio: number,
        fov: Angle,
        near: number,
        far: number
    ) {
        this._aspectRatio = aspectRatio
        this._fov = fov
        this._near = near
        this._far = far
        this._matrix = this.recalculate()
    }

    recalculate(): Mat4 {
        return Mat4.identity()
    }
}