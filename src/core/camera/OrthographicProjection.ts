import { Matrix4 } from "../math"
import { Projection } from "./Projection"

export class OrthographicProjection implements Projection {
    _top: number
    _bottom: number
    _left: number
    _right: number
    _near: number
    _far: number

    get top(): number {
        return this._top
    }

    set top(value: number) {
        this._top = value
        this.dirty = true
    }

    get bottom(): number {
        return this._bottom
    }

    set bottom(value: number) {
        this._bottom = value
        this.dirty = true
    }

    get left(): number {
        return this._left
    }

    set left(value: number) {
        this._left = value
        this.dirty = true
    }

    get right(): number {
        return this._right
    }

    set right(value: number) {
        this._right = value
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

    get matrix() {
        if (this.dirty) {
            this.dirty = false
            
            this._matrix = this.recalculate()
        }

        return this._matrix
    }

    constructor(
        top: number,
        bottom: number,
        left: number,
        right: number,
        near: number,
        far: number
    ) {
        this._top = top
        this._bottom = bottom
        this._left = left
        this._right = right
        this._near = near
        this._far = far
        this._matrix = this.recalculate()
    }

    static fromScreen(
        width: number,
        height: number,
        near: number,
        far: number
    ): OrthographicProjection {
        const halfWidth = width / 2
        const halfHeight = height / 2

        const projection = new OrthographicProjection(
            halfHeight,
            -halfHeight,
            -halfWidth,
            halfWidth,
            near,
            far
        )

        return projection
    }

    private recalculate(): Matrix4 {
        const xt = -(this.right + this.left) / (this.right - this.left)
        const yt = -(this.top + this.bottom) / (this.top - this.bottom)
        const zt = -(this.far + this.near) / (this.far - this.near)

        const xs = 2 / (this.right - this.left)
        const ys = 2 / (this.top - this.bottom)
        const zs = 2 / (this.far - this.near)

        return new Matrix4(
            xs, 0, 0, 0,
            0, ys, 0, 0,
            0, 0, zs, 0,
            xt, yt, zt, 1
        )
    }
}
