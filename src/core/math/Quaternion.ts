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
}