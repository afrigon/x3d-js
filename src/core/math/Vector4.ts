export class Vector4 {
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

    magnitude(): number {
        return Math.sqrt(Vector4.dot(this, this))
    }

    normalized(): Vector4 {
        const m = this.magnitude()

        if (m == 0) {
            return Vector4.zero
        }

        return new Vector4(this.x / m, this.y / m, this.z / m, this.w / m)
    }

    static add(a: Vector4, b: Vector4, ...rest: Vector4[]): Vector4 {
        const result = new Vector4(a.x + b.x, a.y + b.y, a.z + b.z, a.w + b.w)

        const next = rest[0]

        if (!next) {
            return result
        } 

        return Vector4.add(result, next, ...rest.slice(1))
    }

    static dot(a: Vector4, b: Vector4): number {
        return a.x * b.x + a.y * b.y + a.z * b.z + a.w * b.w
    }

    static get zero(): Vector4 {
        return new Vector4(0, 0, 0, 0)
    }

    static get one(): Vector4 {
        return new Vector4(1, 1, 1, 1)
    }
}