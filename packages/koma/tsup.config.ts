import {defineConfig} from "tsup";

export default defineConfig({
    entry: [
        'src/index.ts',
        'src/migrate.ts',
        'src/dialects/postgres.ts',
        'src/dialects/mysql.ts',
        'src/dialects/sqlite.ts'
    ],

    format: ["esm", "cjs"],
    dts: true,
    clean: true,
    splitting: true,
    treeshake: true,
    minify: true,
    target: "es2023",
})