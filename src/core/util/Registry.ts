import { Deletable } from "./Deletable"

export abstract class Registry<T extends Deletable> implements Deletable {
    items: Map<string, T> = new Map()

    register(key: string, item: T) {
        this.items.set(key, item)
    }

    get(key: string): T | undefined {
        return this.items.get(key)
    }

    getOrRegister(key: string, factory: () => T): T | undefined {
        let item = this.items.get(key)

        if (!item) {
            item = factory()
            this.register(key, item)
        }

        return item
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