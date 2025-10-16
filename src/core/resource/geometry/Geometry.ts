import { Identifiable } from "../../util"

export abstract class Geometry implements Identifiable {
    abstract id: string

    vertices: number[] = []
    indices: number[] = []
    normals: number[] = []
    uvs: number[] = []
}