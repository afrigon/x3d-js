import { Vector4 } from "../math"

export class Color {
    r: number
    g: number
    b: number
    a: number

    private constructor(
        r: number = 255,
        g: number = 255,
        b: number = 255,
        a: number = 255
    ) {
        this.r = r
        this.g = g
        this.b = b
        this.a = a
    }

    static rgb(
        r: number,
        g?: number,
        b?: number
    ): Color {
        return new Color(r, g ?? r, b ?? r)
    }

    static rgba(
        r: number,
        g?: number,
        b?: number,
        a?: number
    ): Color {
        return new Color(r, g ?? r, b ?? r, a ?? 1)
    }

    static get white(): Color {
        return new Color(255, 255, 255)
    }

    static get black(): Color {
        return new Color(0, 0, 0)
    }

    static get red(): Color {
        return new Color(255, 0, 0)
    }

    static get green(): Color {
        return new Color(0, 255, 0)
    }

    static get blue(): Color {
        return new Color(0, 0, 255)
    }

    static get yellow(): Color {
        return new Color(255, 255, 0)
    }

    static get aqua(): Color {
        return new Color(0, 255, 255)
    }

    static get pink(): Color {
        return new Color(255, 0, 255)
    }

    rgbFloat(): [number, number, number] {
        return [
            this.r / 255, 
            this.g / 255,
            this.b / 255
        ]
    }

    rgbaFloat(): [number, number, number, number] {
        return [
            this.r / 255, 
            this.g / 255,
            this.b / 255,
            this.a / 255
        ]
    }

    get vector(): Vector4 {
        return new Vector4(this.r, this.g, this.b, this.a)
    }
}