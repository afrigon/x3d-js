import { Mat4 } from "../math/Vector"
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

    recalculate(): Mat4 {
        return Mat4.identity()
    }
}