export interface Shader {
    id: string
    get vertex(): string
    get fragment(): string
}