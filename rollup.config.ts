import typescript from "@rollup/plugin-typescript"
import resolve from "@rollup/plugin-node-resolve"
import { readFileSync } from 'fs'

const raw = () => {
  return {
    name: 'raw',
    load(id) {
      if (id.endsWith('?raw')) {
        const content = readFileSync(id.replace('?raw', '')).toString('utf-8')
        return `export default \`${content.replace(/`/g, '\\`')}\``
      }
    }
  }
}

export default [
    {
        input: "src/index.ts",
        output: { file: "dist/index.js", format: "esm", sourcemap: true },
        plugins: [
            resolve(),
            raw(),
            typescript({ tsconfig: "./tsconfig.json" })
        ]
    }
]