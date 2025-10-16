import { Matrix4, Quaternion, Transformation, Vector3 } from "../math"
import { GameComponent, GameComponentType } from "./GameComponent"

export class Transform extends GameComponent {
    type: GameComponentType = "transform"

    _position: Vector3 = Vector3.zero
    _rotation: Quaternion = Quaternion.identity
    _scale: Vector3 = Vector3.one

    set position(value: Vector3) {
        this._position = value
        this.dirty = true
    }

    get position(): Vector3 {
        return this._position
    }

    set rotation(value: Quaternion) {
        this._rotation = value
        this.dirty = true
    }

    get rotation(): Quaternion {
        return this._rotation
    }

    set scale(value: Vector3) {
        this._scale = value
        this.dirty = true
    }

    get scale(): Vector3 {
        return this._scale
    }

    get matrix(): Matrix4 {
        if (this.dirty) {
            this.dirty = false
            
            const old = this._matrix
            this._matrix = this.recalculate()
            this.propagate(old, this._matrix)
        }

        return this._matrix
    }

    set matrix(value: Matrix4) {
        this._position = new Vector3(value.n41, value.n42, value.n43)
        this._scale = new Vector3(value.n41, value.n42, value.n43)

        this._matrix = value
    }

    private _matrix: Matrix4 = Matrix4.identity
    private dirty: boolean = false

    private recalculate(): Matrix4 {
        return Transformation.compose(this._position, this._rotation, this._scale)
    }

    propagate(from: Matrix4, to: Matrix4) {
        if (!this.parent) {
            return
        }

        for (const child of this.parent.children) {
            const oldChildMatrix = child.transform.matrix
            const newChildMatrix = Matrix4.multiply(from.inverse(), oldChildMatrix, to)

            child.transform._matrix = newChildMatrix
            child.transform.propagate(oldChildMatrix, newChildMatrix)
        }
    }
}