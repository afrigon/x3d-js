import { Vector3, Vector4 } from "../math"

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

    static string(s: string): Color {
        if (!s.startsWith("#")) {
            return Color.white
        }

        const h = s.slice(1)

        if (h.length === 3 || h.length === 4) {
            const r = parseInt(h[0] + h[0], 16)
            const g = parseInt(h[1] + h[1], 16)
            const b = parseInt(h[2] + h[2], 16)

            if (h.length === 4) {
                const a = parseInt(h[3] + h[3], 16)

                return new Color(r, g, b, a)
            }

            return new Color(r, g, b)
        }

        if (h.length === 6 || h.length === 8) {
            const r = parseInt(h.slice(0, 2), 16)
            const g = parseInt(h.slice(2, 4), 16)
            const b = parseInt(h.slice(4, 6), 16)

            if (h.length === 8) {
                const a = parseInt(h.slice(6, 8), 16)

                return new Color(r, g, b, a)
            }

            return new Color(r, g, b)
        }

        return Color.white
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

    rgbFloat(): Vector3 {
        return new Vector3(
            this.r / 255, 
            this.g / 255,
            this.b / 255
        )
    }

    rgbaFloat(): Vector4 {
        return new Vector4(
            this.r / 255, 
            this.g / 255,
            this.b / 255,
            this.a / 255
        )
    }

    rgb(): Vector3 {
        return new Vector3(this.r, this.g, this.b)
    }

    rgba(): Vector4 {
        return new Vector4(this.r, this.g, this.b, this.a)
    }
}