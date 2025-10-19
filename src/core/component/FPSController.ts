import { Input } from "../input"
import { Angle, Quaternion, Vector2, Vector3 } from "../math"
import { GameComponent, GameComponentType } from "./GameComponent"

export class FPSController extends GameComponent {
    type: GameComponentType = "fps-controller"

    speed: number
    sensitivity: number

    private rotation: Vector2 = Vector2.zero

    constructor(
        speed: number = 4,
        sensitivity: number = 0.002
    ) {
        super()

        this.speed = speed
        this.sensitivity = sensitivity
    }

    update(input: Input, delta: number): void {
        if (!this.parent) {
            return
        }

        const maxPitch = Angle.degrees(89).toRadians()

        this.rotation.x += input.cursorDelta.x * this.sensitivity
        this.rotation.y += input.cursorDelta.y * this.sensitivity
        this.rotation.y = Math.min(Math.max(this.rotation.y, -maxPitch), maxPitch)

        const yaw = Quaternion.fromAxis(Vector3.up, Angle.radians(this.rotation.x))
        const pitch = Quaternion.fromAxis(Vector3.right, Angle.radians(this.rotation.y))

        this.parent.transform.rotation = Quaternion.multiply(yaw, pitch)

        const direction = Vector3.zero

        if (input.isHeld("W")) { direction.z += 1 }
        if (input.isHeld("A")) { direction.x -= 1 }
        if (input.isHeld("D")) { direction.x += 1 }
        if (input.isHeld("S")) { direction.z -= 1 }
        if (input.isHeld("Space")) { direction.y += 1 }
        if (input.isHeld("Shift")) { direction.y -= 1 }

        const rotation = this.parent?.transform.rotation ?? Quaternion.identity

        const forward = rotation.act(Vector3.forward)
        const right = rotation.act(Vector3.right)

        forward.y = 0
        right.y = 0

        const movement = Vector3.add(right.normalized().scaled(direction.x), forward.normalized().scaled(direction.z), Vector3.up.scaled(direction.y))

        this.parent.transform.position = Vector3.add(this.parent.transform.position, movement.scaled(this.speed * delta))
    }
}