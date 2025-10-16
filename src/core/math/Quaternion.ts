import { Angle } from "./Angle"
import { Vector3 } from "./Vector3"

export class Quaternion {
    x: number
    y: number
    z: number
    w: number

    constructor(x: number, y: number, z: number, w: number) {
        this.x = x
        this.y = y
        this.z = z
        this.w = w
    }

    static get identity(): Quaternion {
        return new Quaternion(0, 0, 0, 1)
    }

    static fromAxis(axis: Vector3, angle: Angle): Quaternion {
        const h = angle.toRadians() * 0.5
        const s = Math.sin(h)
        return new Quaternion(axis.x * s, axis.y * s, axis.z * s, Math.cos(h))
    }
}