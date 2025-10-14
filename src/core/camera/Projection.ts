import { Mat4 } from "../math/Matrix"

export interface Projection {
    get matrix(): Mat4
}