import { Matrix4 } from "../math"

export interface Projection {
    get matrix(): Matrix4
}