import { Vector2 } from "../math";

export class Input {
    store: Set<string> = new Set()
    pressed: Set<string> = new Set()
    released: Set<string> = new Set()

    cursorDelta: Vector2 = Vector2.zero
    scrollDelta: Vector2 = Vector2.zero

    isLocked: boolean = false

    addCursorDelta(x: number, y: number) {
        this.cursorDelta = new Vector2(this.cursorDelta.x + x, this.cursorDelta.y + y)
    }

    addScrollDelta(x: number, y: number) {
        this.scrollDelta = new Vector2(this.scrollDelta.x + x, this.scrollDelta.y + y)
    }

    clearDelta() {
        this.cursorDelta = Vector2.zero
        this.scrollDelta = Vector2.zero
    }

    clearButtonUpdates() {
        this.pressed.clear()
        this.released.clear()
    }

    clearButtons() {
        this.store.clear()
        this.clearButtonUpdates()
    }

    didPress(key: string) {
        this.store.add(key)
        this.pressed.add(key)
    }

    didRelease(key: string) {
        this.store.delete(key)
        this.released.add(key)
    }

    isHeld(key: string): boolean {
        return this.store.has(key)
    }
}