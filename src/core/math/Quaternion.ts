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

    act(vector: Vector3): Vector3 {
        const v = new Vector3(this.x, this.y, this.z)
        const t = Vector3.cross(v, vector).scaled(2)
        
        return Vector3.add(vector, t.scaled(this.w), Vector3.cross(v, t))
    }
    
    static equal(a: Quaternion, b: Quaternion): boolean {
        return a.x == b.x && a.y == b.y && a.z == b.z && a.w == b.w
    }

    static multiply(a: Quaternion, b: Quaternion, ...rest: Quaternion[]): Quaternion {
        const result = new Quaternion(
            a.w * b.x + a.x * b.w + a.y * b.z - a.z * b.y,
            a.w * b.y - a.x * b.z + a.y * b.w + a.z * b.x,
            a.w * b.z + a.x * b.y - a.y * b.x + a.z * b.w,
            a.w * b.w - a.x * b.x - a.y * b.y - a.z * b.z
        )

        const next = rest[0]

        if (!next) {
            return result
        } 

        return Quaternion.multiply(result, next, ...rest.slice(1))
    }

    static fromAxis(axis: Vector3, angle: Angle): Quaternion {
        const h = angle.toRadians() * 0.5
        const s = Math.sin(h)
        return new Quaternion(axis.x * s, axis.y * s, axis.z * s, Math.cos(h))
    }
}