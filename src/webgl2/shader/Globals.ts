import { Structure } from "./Structure";

export const globals: Structure = { name: "Globals", fields: {
    now: { type: "float" },
    deltaTime: { type: "float" },
    resolution: { type: "vec2" },
    projection: { type: "mat4" },
    view: { type: "mat4" },
    model: { type: "mat4" },
    vp: { type: "mat4" },
    mvp: { type: "mat4" }
}}