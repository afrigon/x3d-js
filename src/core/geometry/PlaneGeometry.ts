export class PlaneGeometry {
    vertices: Float32Array
    indices: Uint16Array
    normals: Float32Array
    uvs: Float32Array

    constructor(
        width: number = 1,
        height: number = 1,
        horizontalResolution: number = 1,
        verticalResolution: number = 1
    ) {
        const vertices = []
        const indices = []
        const normals = []
        const uvs = []

        const halfWidth = width / 2
        const halfHeight = height / 2

        const horizontalSegmentCount = Math.floor(horizontalResolution)
        const verticalSegmentCount = Math.floor(verticalResolution)

        const horizontalVextexCount = horizontalSegmentCount + 1
        const verticalVertexCount = verticalSegmentCount + 1

        const segmentWidth = width / horizontalSegmentCount
        const segmentHeight = height / verticalSegmentCount

        for (let i = 0; i < verticalVertexCount; i++) {
            const y = i * segmentHeight - halfHeight

            for (let j = 0; j < horizontalVextexCount; j++) {
                const x = j * segmentWidth - halfWidth

                vertices.push(x, y, 0)
                normals.push(0, 0, 1)
                uvs.push(j / (horizontalSegmentCount - 1))
                uvs.push(1 - i / (verticalSegmentCount - 1))
            }
        }

        for (let y = 0; y < verticalSegmentCount; y++) {
            for (let x = 0; x < horizontalSegmentCount; x++) {
                const p1 = x + horizontalVextexCount * y
                const p2 = x + horizontalVextexCount * (y + 1)
                const p3 = (x + 1) + horizontalVextexCount * (y + 1)
                const p4 = (x + 1) + horizontalVextexCount * y

                indices.push(p1, p2, p3)
                indices.push(p1, p3, p4)
            }
        }

        this.vertices = new Float32Array(vertices)
        this.indices = new Uint16Array(indices)
        this.normals = new Float32Array(normals)
        this.uvs = new Float32Array(uvs)
    }
}