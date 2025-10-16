import { OrthographicProjection, PerspectiveProjection } from "../camera"
import { Projection } from "../camera/Projection"
import { Angle } from "../math"
import { Color } from "../util"
import { GameComponent, GameComponentType } from "./GameComponent"

export class MainCamera extends GameComponent {
    type: GameComponentType = "main-camera"

    projection?: Projection
    backgroundColor: Color

    constructor(
        projection?: Projection,
        backgroundColor: Color = Color.rgb(110)
    ) {
        super()

        this.projection = projection
        this.backgroundColor = backgroundColor
    }

    static perspective(
        aspectRatio: number, 
        angle: Angle, 
        near: number, 
        far: number
    ): MainCamera {
        const projection = new PerspectiveProjection(angle, aspectRatio, near, far)
        const camera = new MainCamera(projection)

        return camera
    }

    static orthographic(
        top: number, 
        bottom: number, 
        left: number, 
        right: number, 
        near: number, 
        far: number
    ): MainCamera {
        const projection = new OrthographicProjection(top, bottom, left, right, near, far)
        const camera = new MainCamera(projection)

        return camera
    }
}