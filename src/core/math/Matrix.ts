export type Mat3 = [
    number, number, number,
    number, number, number,
    number, number, number
]

export const Mat3 = {
    identity(): Mat3 {
        return [
            1, 0, 0,
            0, 1, 0,
            0, 0, 1
        ]
    }
}

export type Mat4 = [
    number, number, number, number,
    number, number, number, number,
    number, number, number, number,
    number, number, number, number
]

export const Mat4 = {
    identity(): Mat4 {
        return [
            1, 0, 0, 0,
            0, 1, 0, 0,
            0, 0, 1, 0,
            0, 0, 0, 1
        ]
    }
}