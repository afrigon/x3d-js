import { Input } from "../input"

export interface Updatable {
    update(input: Input, delta: number): void
}