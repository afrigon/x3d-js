struct Globals {
    float now;
    float deltaTime;
    vec2 resolution;
    mat4 projection;
    mat4 view;
    mat4 model;
    mat4 vp;
    mat4 mvp;
};

uniform Globals globals;