export class Vector3 {
    x: number
    y: number
    z: number

    constructor(x: number, y: number, z: number) {
        this.x = x
        this.y = y
        this.z = z
    }

    scaled(x: number): Vector3 {
        return new Vector3(this.x * x, this.y * x, this.z * x)
    }

    magnitude(): number {
        return Math.sqrt(Vector3.dot(this, this))
    }

    normalized(): Vector3 {
        const m = this.magnitude()

        return new Vector3(this.x / m, this.y / m, this.z / m)
    }

    static add(a: Vector3, b: Vector3, ...rest: Vector3[]): Vector3 {
        const result = new Vector3(a.x + b.x, a.y + b.y, a.z + b.z)

        const next = rest[0]

        if (!next) {
            return result
        } 

        return Vector3.add(result, next, ...rest.slice(1))
    }

    static dot(a: Vector3, b: Vector3): number {
        return a.x * b.x + a.y * b.y + a.z * b.z
    }

    static cross(a: Vector3, b: Vector3): Vector3 {
        return new Vector3(
            a.y * b.z - a.z * b.y,
            a.z * b.z - a.x * b.z,
            a.x * b.y - a.y * b.x
        )
    }

    static get zero(): Vector3 {
        return new Vector3(0, 0, 0)
    }

    static get one(): Vector3 {
        return new Vector3(1, 1, 1)
    }

    static get up(): Vector3 {
        return new Vector3(0, 1, 0)
    }

    static get down(): Vector3 {
        return new Vector3(0, -1, 0)
    }

    static get forward(): Vector3 {
        return new Vector3(0, 0, 1)
    }

    static get back(): Vector3 {
        return new Vector3(0, 0, -1)
    }

    static get left(): Vector3 {
        return new Vector3(-1, 0, 0)
    }

    static get right(): Vector3 {
        return new Vector3(1, 0, 0)
    }
}