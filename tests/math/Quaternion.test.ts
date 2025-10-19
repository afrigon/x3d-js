/* eslint-disable @typescript-eslint/no-floating-promises */
import test from "node:test"
import assert from "node:assert/strict"
import { Angle, Quaternion, Vector3 } from "../../src/core/math"

test("Quaternion.identity", () => {
    assert.equal(Quaternion.equal(
        Quaternion.identity,
        new Quaternion(0, 0, 0, 1)
    ), true)
})

test("Quaternion.act with identity is no-op", () => {
    const p = new Vector3(1, 2, 3)
    const r = Quaternion.identity.act(p)

    assert.ok(Vector3.equal(r, p))
})

test("Quaternion.act 180° about Z (exact)", () => {
    const qz180 = new Quaternion(0, 0, 1, 0)

    assert.ok(Vector3.equal(qz180.act(new Vector3(1, 0, 0)), new Vector3(-1, 0, 0)))
    assert.ok(Vector3.equal(qz180.act(new Vector3(0, 1, 0)), new Vector3(0, -1, 0)))
    assert.ok(Vector3.equal(qz180.act(new Vector3(0, 0, 1)), new Vector3(0, 0, 1)))
})

test("Quaternion.fromAxis with zero angle equals identity", () => {
    const q = Quaternion.fromAxis(new Vector3(0, 1, 0), Angle.degrees(0))
    assert.ok(Quaternion.equal(q, Quaternion.identity))
})


test("Quaternion.equal basic symmetry", () => {
    const a = new Quaternion(0.1, -0.2, 0.3, 0.9)
    const b = new Quaternion(0.1, -0.2, 0.3, 0.9)
    assert.ok(Quaternion.equal(a, b))
    assert.ok(Quaternion.equal(b, a))
})

test("Quaternion.equal: reflexive and symmetry", () => {
    const q = new Quaternion(0, 0, 0, 1)
    assert.equal(Quaternion.equal(q, q), true)

    const a = new Quaternion(0.1, -0.2, 0.3, 0.9)
    const b = new Quaternion(0.1, -0.2, 0.3, 0.9)
    assert.equal(Quaternion.equal(a, b), true)
    assert.equal(Quaternion.equal(b, a), true)
})

test("Quaternion.equal: detects differing component", () => {
    const a = new Quaternion(0, 0, 0, 1)
    const b = new Quaternion(0, 0, 0, 0.999999)
    assert.equal(Quaternion.equal(a, b), false)
})

test("Quaternion.multiply identity neutrality", () => {
    const q = Quaternion.fromAxis(new Vector3(0, 1, 0), Angle.degrees(45))
    assert.ok(Quaternion.equal(Quaternion.multiply(Quaternion.identity, q), q))
    assert.ok(Quaternion.equal(Quaternion.multiply(q, Quaternion.identity), q))
})

test("Quaternion.multiply: identity is neutral", () => {
    const q = new Quaternion(0.1, -0.2, 0.3, 0.9)
    assert.ok(Quaternion.equal(Quaternion.multiply(Quaternion.identity, q), q))
    assert.ok(Quaternion.equal(Quaternion.multiply(q, Quaternion.identity), q))
})

test("Quaternion.multiply: qx*qy equals apply qy then qx", () => {
    const qx180 = new Quaternion(1, 0, 0, 0)
    const qy180 = new Quaternion(0, 1, 0, 0)
    const composed = Quaternion.multiply(qx180, qy180)

    const p = new Vector3(1, 2, 3)
    const afterQy = qy180.act(p)
    assert.equal(afterQy.x, -1)
    assert.equal(afterQy.y,  2)
    assert.equal(afterQy.z, -3)

    const seq = qx180.act(afterQy)
    assert.equal(seq.x, -1)
    assert.equal(seq.y, -2)
    assert.equal(seq.z,  3)

    const one = composed.act(p)
    assert.equal(one.x, seq.x)
    assert.equal(one.y, seq.y)
    assert.equal(one.z, seq.z)
})

test("Quaternion.multiply: associativity", () => {
    const a = new Quaternion(1, 2, 3, 4)
    const b = new Quaternion(-2, 1, 0, 3)
    const c = new Quaternion(0, -1, 2, -2)

    const left = Quaternion.multiply(Quaternion.multiply(a, b), c)
    const right = Quaternion.multiply(a, Quaternion.multiply(b, c))

    assert.equal(left.x, right.x)
    assert.equal(left.y, right.y)
    assert.equal(left.z, right.z)
    assert.equal(left.w, right.w)
})