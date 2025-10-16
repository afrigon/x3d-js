export class Vector3 {
    x: number
    y: number
    z: number

    constructor(x: number, y: number, z: number) {
        this.x = x
        this.y = y
        this.z = z
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