export class Matrix4 {
    n11: number; n12: number; n13: number; n14: number
    n21: number; n22: number; n23: number; n24: number
    n31: number; n32: number; n33: number; n34: number
    n41: number; n42: number; n43: number; n44: number

    constructor(
        n11: number, n12: number, n13: number, n14: number,
        n21: number, n22: number, n23: number, n24: number,
        n31: number, n32: number, n33: number, n34: number,
        n41: number, n42: number, n43: number, n44: number
    ) {
        this.n11 = n11
        this.n12 = n12
        this.n13 = n13
        this.n14 = n14
        this.n21 = n21
        this.n22 = n22
        this.n23 = n23
        this.n24 = n24
        this.n31 = n31
        this.n32 = n32
        this.n33 = n33
        this.n34 = n34
        this.n41 = n41
        this.n42 = n42
        this.n43 = n43
        this.n44 = n44
    }

    static get identity(): Matrix4 {
        return new Matrix4(
            1, 0, 0, 0,
            0, 1, 0, 0,
            0, 0, 1, 0,
            0, 0, 0, 1
        )
    }

    static multiply(a: Matrix4, b: Matrix4, ...rest: Matrix4[]): Matrix4 {
        const result = new Matrix4(
            a.n11 * b.n11 + a.n12 * b.n21 + a.n13 * b.n31 + a.n14 * b.n41,
            a.n21 * b.n11 + a.n22 * b.n21 + a.n23 * b.n31 + a.n24 * b.n41,
            a.n31 * b.n11 + a.n32 * b.n21 + a.n33 * b.n31 + a.n34 * b.n41,
            a.n41 * b.n11 + a.n42 * b.n21 + a.n43 * b.n31 + a.n44 * b.n41,
            a.n11 * b.n12 + a.n12 * b.n22 + a.n13 * b.n32 + a.n14 * b.n42,
            a.n21 * b.n12 + a.n22 * b.n22 + a.n23 * b.n32 + a.n24 * b.n42,
            a.n31 * b.n12 + a.n32 * b.n22 + a.n33 * b.n32 + a.n34 * b.n42,
            a.n41 * b.n12 + a.n42 * b.n22 + a.n43 * b.n32 + a.n44 * b.n42,

            a.n11 * b.n13 + a.n12 * b.n23 + a.n13 * b.n33 + a.n14 * b.n43,
            a.n21 * b.n13 + a.n22 * b.n23 + a.n23 * b.n33 + a.n24 * b.n43,
            a.n31 * b.n13 + a.n32 * b.n23 + a.n33 * b.n33 + a.n34 * b.n43,
            a.n41 * b.n13 + a.n42 * b.n23 + a.n43 * b.n33 + a.n44 * b.n43,
            a.n11 * b.n14 + a.n12 * b.n24 + a.n13 * b.n34 + a.n14 * b.n44,
            a.n21 * b.n14 + a.n22 * b.n24 + a.n23 * b.n34 + a.n24 * b.n44,
            a.n31 * b.n14 + a.n32 * b.n24 + a.n33 * b.n34 + a.n34 * b.n44,
            a.n41 * b.n14 + a.n42 * b.n24 + a.n43 * b.n34 + a.n44 * b.n44
        )

        const next = rest[0]

        if (!next) {
            return result
        } 

        return Matrix4.multiply(result, next, ...rest.slice(1))
    }

    determinant(): number {
        const a = this.n23 * this.n34 * this.n42 - this.n24 * this.n33 * this.n42 + this.n24 * this.n32 * this.n43 - this.n22 * this.n34 * this.n43 - this.n23 * this.n32 * this.n44 + this.n22 * this.n33 * this.n44
        const b = this.n14 * this.n33 * this.n42 - this.n13 * this.n34 * this.n42 - this.n14 * this.n32 * this.n43 + this.n12 * this.n34 * this.n43 + this.n13 * this.n32 * this.n44 - this.n12 * this.n33 * this.n44
        const c = this.n13 * this.n24 * this.n42 - this.n14 * this.n23 * this.n42 + this.n14 * this.n22 * this.n43 - this.n12 * this.n24 * this.n43 - this.n13 * this.n22 * this.n44 + this.n12 * this.n23 * this.n44
        const d = this.n14 * this.n23 * this.n32 - this.n13 * this.n24 * this.n32 - this.n14 * this.n22 * this.n33 + this.n12 * this.n24 * this.n33 + this.n13 * this.n22 * this.n34 - this.n12 * this.n23 * this.n34

        return this.n11 * a + this.n21 * b, + this.n31 * c + this.n41 * d
    }

    inverse(): Matrix4 {
        const determinant = this.determinant() 

        if (determinant == 0) {
            return Matrix4.identity
        }

        const scale = 1 / determinant

        return new Matrix4(
            (this.n23 * this.n34 * this.n42 - this.n24 * this.n33 * this.n42 + this.n24 * this.n32 * this.n43 - this.n22 * this.n34 * this.n43 - this.n23 * this.n32 * this.n44 + this.n22 * this.n33 * this.n44) * scale,
            (this.n24 * this.n33 * this.n41 - this.n23 * this.n34 * this.n41 - this.n24 * this.n31 * this.n43 + this.n21 * this.n34 * this.n43 + this.n23 * this.n31 * this.n44 - this.n21 * this.n33 * this.n44) * scale,
            (this.n22 * this.n34 * this.n41 - this.n24 * this.n32 * this.n41 + this.n24 * this.n31 * this.n42 - this.n21 * this.n34 * this.n42 - this.n22 * this.n31 * this.n44 + this.n21 * this.n32 * this.n44) * scale,
            (this.n23 * this.n32 * this.n41 - this.n22 * this.n33 * this.n41 - this.n23 * this.n31 * this.n42 + this.n21 * this.n33 * this.n42 + this.n22 * this.n31 * this.n43 - this.n21 * this.n32 * this.n43) * scale,

            (this.n14 * this.n33 * this.n42 - this.n13 * this.n34 * this.n42 - this.n14 * this.n32 * this.n43 + this.n12 * this.n34 * this.n43 + this.n13 * this.n32 * this.n44 - this.n12 * this.n33 * this.n44) * scale,
            (this.n13 * this.n34 * this.n41 - this.n14 * this.n33 * this.n41 + this.n14 * this.n31 * this.n43 - this.n11 * this.n34 * this.n43 - this.n13 * this.n31 * this.n44 + this.n11 * this.n33 * this.n44) * scale,
            (this.n14 * this.n32 * this.n41 - this.n12 * this.n34 * this.n41 - this.n14 * this.n31 * this.n42 + this.n11 * this.n34 * this.n42 + this.n12 * this.n31 * this.n44 - this.n11 * this.n32 * this.n44) * scale,
            (this.n12 * this.n33 * this.n41 - this.n13 * this.n32 * this.n41 + this.n13 * this.n31 * this.n42 - this.n11 * this.n33 * this.n42 - this.n12 * this.n31 * this.n43 + this.n11 * this.n32 * this.n43) * scale,

            (this.n13 * this.n24 * this.n42 - this.n14 * this.n23 * this.n42 + this.n14 * this.n22 * this.n43 - this.n12 * this.n24 * this.n43 - this.n13 * this.n22 * this.n44 + this.n12 * this.n23 * this.n44) * scale,
            (this.n14 * this.n23 * this.n41 - this.n13 * this.n24 * this.n41 - this.n14 * this.n21 * this.n43 + this.n11 * this.n24 * this.n43 + this.n13 * this.n21 * this.n44 - this.n11 * this.n23 * this.n44) * scale,
            (this.n12 * this.n24 * this.n41 - this.n14 * this.n22 * this.n41 + this.n14 * this.n21 * this.n42 - this.n11 * this.n24 * this.n42 - this.n12 * this.n21 * this.n44 + this.n11 * this.n22 * this.n44) * scale,
            (this.n13 * this.n22 * this.n41 - this.n12 * this.n23 * this.n41 - this.n13 * this.n21 * this.n42 + this.n11 * this.n23 * this.n42 + this.n12 * this.n21 * this.n43 - this.n11 * this.n22 * this.n43) * scale,

            (this.n14 * this.n23 * this.n32 - this.n13 * this.n24 * this.n32 - this.n14 * this.n22 * this.n33 + this.n12 * this.n24 * this.n33 + this.n13 * this.n22 * this.n34 - this.n12 * this.n23 * this.n34) * scale,
            (this.n13 * this.n24 * this.n31 - this.n14 * this.n23 * this.n31 + this.n14 * this.n21 * this.n33 - this.n11 * this.n24 * this.n33 - this.n13 * this.n21 * this.n34 + this.n11 * this.n23 * this.n34) * scale,
            (this.n14 * this.n22 * this.n31 - this.n12 * this.n24 * this.n31 - this.n14 * this.n21 * this.n32 + this.n11 * this.n24 * this.n32 + this.n12 * this.n21 * this.n34 - this.n11 * this.n22 * this.n34) * scale,
            (this.n12 * this.n23 * this.n31 - this.n13 * this.n22 * this.n31 + this.n13 * this.n21 * this.n32 - this.n11 * this.n23 * this.n32 - this.n12 * this.n21 * this.n33 + this.n11 * this.n22 * this.n33) * scale
        )
    }

    float32Array(): Float32Array {
        return new Float32Array([
            this.n11, this.n12, this.n13, this.n14,
            this.n21, this.n22, this.n23, this.n24,
            this.n31, this.n32, this.n33, this.n34,
            this.n41, this.n42, this.n43, this.n44
        ])
    }
}
