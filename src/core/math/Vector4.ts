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

    static get zero(): Vector4 {
        return new Vector4(0, 0, 0, 0)
    }

    static get one(): Vector4 {
        return new Vector4(1, 1, 1, 1)
    }
}