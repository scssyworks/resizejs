import babel from "rollup-plugin-babel";
import { terser } from "rollup-plugin-terser";

export default [
    {
        input: "index.js",
        output: {
            file: "dist/resize.js",
            format: "umd",
            name: "resizejs",
            sourcemap: true
        },
        plugins: [
            babel({
                exclude: "node_modules/**"
            })
        ]
    },
    {
        input: "index.js",
        output: {
            file: "dist/resize.min.js",
            format: "umd",
            name: "deparam"
        },
        plugins: [
            babel({
                exclude: "node_modules/**"
            }),
            terser()
        ]
    }
]