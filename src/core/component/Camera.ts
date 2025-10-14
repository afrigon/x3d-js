import { OrthographicProjection, PerspectiveProjection } from "../camera"
import { Projection } from "../camera/Projection"
import { Angle } from "../math"
import { GameComponent, GameComponentType } from "./GameComponent"

export class Camera extends GameComponent {
    type: GameComponentType = "camera"

    projection: Projection

    constructor(projection: Projection) {
        super()

        this.projection = projection
    }

    static perspective(
        aspectRatio: number, 
        angle: Angle, 
        near: number, 
        far: number
    ): Camera {
        const projection = new PerspectiveProjection(aspectRatio, angle, near, far)
        const camera = new Camera(projection)

        return camera
    }

    static orthographic(
        top: number, 
        bottom: number, 
        left: number, 
        right: number, 
        near: number, 
        far: number
    ): Camera {
        const projection = new OrthographicProjection(top, bottom, left, right, near, far)
        const camera = new Camera(projection)

        return camera
    }
}