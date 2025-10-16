import { Angle } from "./Angle"
import { Matrix4 } from "./Matrix4"
import { Quaternion } from "./Quaternion"
import { Vector3 } from "./Vector3"

export class Transformation {
    static compose(position: Vector3, rotation: Quaternion, scale: Vector3): Matrix4 {
        const x2 = rotation.x + rotation.x
        const y2 = rotation.y + rotation.y
        const z2 = rotation.z + rotation.z
		const xx = rotation.x * x2
        const xy = rotation.x * y2
        const xz = rotation.x * z2
		const yy = rotation.y * y2
        const yz = rotation.y * z2
        const zz = rotation.z * z2
		const wx = rotation.w * x2
        const wy = rotation.w * y2
        const wz = rotation.w * z2

        return new Matrix4(
            (1 - (yy + zz)) * scale.x,
            (xy + wz) * scale.x,
            (xz - wy) * scale.x,
            0,

            (xy - wz) * scale.y,
            (1 - (xx + zz)) * scale.y,
            (yz + wx) * scale.y,
            0,

            (xz + wy) * scale.z,
            (yz - wx) * scale.z,
            (1 - (xx + yy)) * scale.z,
            0,

            position.x,
            position.y,
            position.z,
            1
        )
    }

    static translate(x: number | Vector3, y: number, z: number): Matrix4 {
        if (x instanceof Vector3) {
            return new Matrix4(
                1, 0, 0, 0,
                0, 1, 0, 0,
                0, 0, 1, 0,
                x.x, x.y, x.z, 1
            )
        } else {
            return new Matrix4(
                1, 0, 0, 0,
                0, 1, 0, 0,
                0, 0, 1, 0,
                x, y, z, 1
            )
        }
    }

    static scale(x: number | Vector3, y: number, z: number): Matrix4 {
        if (x instanceof Vector3) {
            return new Matrix4(
                x.x, 0, 0, 0,
                0, x.y, 0, 0,
                0, 0, x.z, 0,
                0, 0, 0, 1
            )
        } else {
            return new Matrix4(
                x, 0, 0, 0,
                0, y, 0, 0,
                0, 0, z, 0,
                0, 0, 0, 1
            )
        }
    }

    static rotate(x: number | Vector3 | Quaternion, y: number, z: number): Matrix4 {
        if (x instanceof Quaternion) {
            return Transformation.compose(Vector3.zero, x, Vector3.one)
        } else {
            if (x instanceof Vector3) {
                z = x.z
                y = x.y
                x = x.x
            }

            const sx = Math.sin(Angle.degrees(x).toRadians())
            const cx = Math.cos(Angle.degrees(x).toRadians())
            const sy = Math.sin(Angle.degrees(y).toRadians())
            const cy = Math.cos(Angle.degrees(y).toRadians())
            const sz = Math.sin(Angle.degrees(z).toRadians())
            const cz = Math.cos(Angle.degrees(z).toRadians())

            return new Matrix4(
                cy * cz, cy * sz, -sy, 0,
                sx * sy * cz - cx * sz, sx * sy * sz + cx * cz, sx * cy, 0,
                cx * sy * cz + sx * sz, cx * sy * sz - sx * cz, cx * cy, 0,
                0, 0, 0, 1
            )
        }
    }
}