export class Vector2 {
    x: number
    y: number

    constructor(x: number, y: number) {
        this.x = x
        this.y = y
    }

    magnitude(): number {
        return Math.sqrt(Vector2.dot(this, this))
    }

    normalized(): Vector2 {
        const m = this.magnitude()

        if (m == 0) {
            return Vector2.zero
        }

        return new Vector2(this.x / m, this.y / m)
    }

    static equal(a: Vector2, b: Vector2): boolean {
        return a.x == b.x && a.y == b.y
    }

    static add(a: Vector2, b: Vector2, ...rest: Vector2[]): Vector2 {
        const result = new Vector2(a.x + b.x, a.y + b.y)

        const next = rest[0]

        if (!next) {
            return result
        } 

        return Vector2.add(result, next, ...rest.slice(1))
    }

    static dot(a: Vector2, b: Vector2): number {
        return a.x * b.x + a.y * b.y
    }

    static get zero(): Vector2 {
        return new Vector2(0, 0)
    }

    static get one(): Vector2 {
        return new Vector2(1, 1)
    }

    static get up(): Vector2 {
        return new Vector2(0, 1)
    }

    static get down(): Vector2 {
        return new Vector2(0, -1)
    }

    static get left(): Vector2 {
        return new Vector2(-1, 0)
    }

    static get right(): Vector2 {
        return new Vector2(1, 0)
    }
}