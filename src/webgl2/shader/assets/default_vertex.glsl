in vec3 input_vertex;
in vec3 input_normal;
in vec2 input_uv;

out vec3 output_normal;
out vec2 output_uv;

void main() {
    output_normal = mat3(model) * input_normal;
    output_uv = input_uv;
    gl_Position = mvp * vec4(input_vertex, 1.0);
}
