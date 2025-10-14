export abstract class Renderer<Context extends RenderingContext> {
    context?: Context

    onInit?: () => void
    onDeinit?: () => void
    onResize?: (width: number, height: number) => void
    onDraw?: (now: number) => void

    constructor(
        onInit?: () => void, 
        onDeinit?: () => void, 
        onResize?: (width: number, height: number) => void,
        onDraw?: (now: number) => void
    ) {
        this.onInit = onInit
        this.onDeinit = onDeinit
        this.onResize = onResize
        this.onDraw = onDraw
    }

    init(context: Context) {
        this.context = context

        if (this.onInit) {
            this.onInit()
        }
    }

    deinit() {
        if (this.onDeinit) {
            this.onDeinit()
        }
    }

    resize(width: number, height: number) {
        if (this.onResize) {
            this.onResize(width, height)
        }
    }

    draw(now: number) {
        if (this.onDraw) {
            this.onDraw(now)
        }
    }
}