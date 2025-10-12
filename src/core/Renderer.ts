export interface Renderer {
    init(context: RenderingContext): void
    deinit(context: RenderingContext): void
    resize(context: RenderingContext, width: number, height: number): void
    draw(context: RenderingContext, now: DOMHighResTimeStamp): void
}