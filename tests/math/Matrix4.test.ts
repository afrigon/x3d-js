/* eslint-disable @typescript-eslint/no-floating-promises */
import test from "node:test"
import assert from "node:assert/strict"
import { Matrix4 } from "../../src/core/math/Matrix4"

function sample(): Matrix4 {
    return new Matrix4(
        1, 2, 3, 4,
        5, 6, 7, 8,
        9, 10, 11, 12,
        13, 14, 15, 16
    )
}

test("equal", () => {
    const A = sample()
    assert.equal(Matrix4.equal(A, A), true)
})

test("non equal", () => {
    const A = sample()
    const B = sample()

    B.m[0] = 17

    assert.equal(Matrix4.equal(A, B), false)
})

test("identity", () => {
    assert.equal(
        Matrix4.equal(
            Matrix4.identity,
            new Matrix4(
                1, 0, 0, 0,
                0, 1, 0, 0,
                0, 0, 1, 0,
                0, 0, 0, 1
            )
        ),
        true
    )
})

test("multiply: identity is neutral", () => {
    const A = sample()

    assert.equal(Matrix4.equal(Matrix4.multiply(Matrix4.identity, A), A), true)
    assert.equal(Matrix4.equal(Matrix4.multiply(A, Matrix4.identity), A), true)
})

test("multiply: associativity", () => {
    const A = new Matrix4(
        1, 2, 3, 4, 
        0, 1, 4, 5, 
        2, 6, 1, 0, 
        0, 0, 0, 1
    )
    const B = new Matrix4(
        2, 0, 1, 0, 
        0, 1, 0, 3, 
        4, 0, 1, 0, 
        0, 0, 0, 1
    )
    const C = new Matrix4(
        1, 0, 0, 5, 
        0, 2, 0, 0, 
        0, 0, 3, 0, 
        0, 0, 0, 1
    ) 

    const left = Matrix4.multiply(Matrix4.multiply(A, B), C)
    const right = Matrix4.multiply(A, Matrix4.multiply(B, C))

    assert.equal(Matrix4.equal(left, right), true)
})

test("determinant: identity, translation, scaling", () => {
    assert.equal(Matrix4.identity.determinant(), 1)

    const T = new Matrix4(
        1,0,0,0, 
        0,1,0,0, 
        0,0,1,0, 
        5,6,7,1
    )
    assert.equal(T.determinant(), 1)

    const S = new Matrix4(
        2,0,0,0, 
        0,3,0,0, 
        0,0,4,0, 
        0,0,0,1
    )
    assert.equal(S.determinant(), 24)
})

test("inverse: scale", () => {
    const S = new Matrix4(
        2, 0, 0, 0,
        0, 1, 0, 0,
        0, 0, 4, 0,
        0, 0, 0, 1
    )

    const iS = new Matrix4(
        0.5, 0, 0, 0,
        0, 1, 0, 0,
        0, 0, 0.25, 0,
        0, 0, 0, 1
    )

    assert.ok(Matrix4.equal(S.inverse(), iS))
    assert.ok(Matrix4.equal(Matrix4.multiply(S, S.inverse()), Matrix4.identity))
})

test("inverse: rotation", () => {
    const c = 0
    const s = 1

    const R = new Matrix4(
        0, -1, 0, 0,
        1, 0, 0, 0,
        0, 0, 1, 0,
        0, 0, 0, 1
    )

    const iR = new Matrix4(
        0, 1, 0, 0,
        -1, 0, 0, 0,
        0, 0, 1, 0,
        0, 0, 0, 1
    )

    assert.ok(Matrix4.equal(R.inverse(), iR))
    assert.ok(Matrix4.equal(Matrix4.multiply(R, R.inverse()), Matrix4.identity))
})

test("inverse: translation", () => {
    const T = new Matrix4(
        1, 0, 0, 0,
        0, 1, 0, 0,
        0, 0, 1, 0,
        3, -2, 5, 1
    )

    const iT = new Matrix4(
        1, 0, 0, 0,
        0, 1, 0, 0,
        0, 0, 1, 0,
        -3, 2, -5, 1
    )

    assert.ok(Matrix4.equal(T.inverse(), iT))
    assert.ok(Matrix4.equal(Matrix4.multiply(T, iT), Matrix4.identity))
})

test("inverse: singular matrix returns identity", () => {
    const M = new Matrix4(
        1, 2, 3, 4,
        5, 6, 7, 8,
        1, 1, 1, 1,
        0, 0, 0, 0
    )
    assert.ok(Matrix4.equal(M.inverse(), Matrix4.identity))
})
