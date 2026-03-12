const esbuild = require("esbuild")

esbuild.build({
  entryPoints: [
    "src/tests/load.test.ts",
    "src/tests/stress.test.ts",
    "src/tests/spike.test.ts",
    "src/tests/soak.test.ts"
  ],
  bundle: true,
  outdir: "dist",
  platform: "neutral",
  target: "es2019",

  // PENTING
  external: [
    "k6",
    "k6/*"
  ]
}).catch(() => process.exit(1))