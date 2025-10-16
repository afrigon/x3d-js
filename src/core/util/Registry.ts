import { Deletable } from "./Deletable"
import { Identifiable } from "./Identifiable"

export abstract class Registry<T extends Identifiable & Deletable> implements Deletable {
    items: Map<string, T> = new Map()

    register(item: T) {
        this.items.set(item.id, item)
    }

    has(key: string): boolean {
        return this.items.has(key)
    }

    get(key: string): T | undefined {
        return this.items.get(key)
    }

    remove(key: string) {
        const item = this.items.get(key)

        if (item) {
            item.delete()
        }

        this.items.delete(key)
    }

    delete() {
        for (const key of this.items.keys()) {
            this.remove(key)
        }
    }
}