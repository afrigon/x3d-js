export class Vector2 {
    x: number
    y: number

    constructor(x: number, y: number) {
        this.x = x
        this.y = y
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