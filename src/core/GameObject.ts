import { GameComponent, GameComponentType, Transform } from "./component"
import { Input } from "./input"
import { Togglable, Updatable } from "./util"

export class GameObject implements Updatable, Togglable {
    id: string = crypto.randomUUID()
    name: string
    enabled: boolean
    parent?: GameObject
    children: GameObject[]

    transform: Transform
    components: GameComponent[]

    constructor(name: string) {
        this.name = name
        this.enabled = true
        this.transform = new Transform()
        this.transform.parent = this
        this.components = []
        this.children = []
    }

    addChild(child: GameObject) {
        child.parent = this
        this.children.push(child)
    }

    removeFromParent() {
        const index = this.parent?.children.findIndex(o => o.id == this.id)

        if (index && index >= 0) {
            this.parent?.children.splice(index, 1)
        }

        this.parent = undefined
    }

    addComponent<T extends GameComponent>(component: T) {
        component.parent = this
        this.components.push(component)
    }

    getComponent(type: GameComponentType): GameComponent | undefined {
        return this.components.find(c => c.type == type)
    }

    getComponents(type: GameComponentType): GameComponent[] {
        return this.components.filter(c => c.type == type)
    }

    update(input: Input, delta: number) {
        for (const component of this.components) {
            if (!component.enabled) {
                continue
            }

            component.update(input, delta)
        }

        for (const child of this.children) {
            if (!child.enabled) {
                continue
            }

            child.update(input, delta)
        }
    }

    query(type: GameComponentType): GameComponent[] {
        const components = this.getComponents(type)

        for (const child of this.children) {
            components.push(...child.query(type))
        }

        return components
    }
}