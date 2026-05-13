import { defineConfig } from "vite"
import tailwindcss from "@tailwindcss/vite"
import { resolve } from "path"

export default defineConfig({
  plugins: [
    tailwindcss(),
  ],
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, "index.html"),
        proto: resolve(__dirname, "pages/proto.html"),
        ui28: resolve(__dirname, "pages/28ui.html"),
        mira: resolve(__dirname, "pages/mira.html"),
        package: resolve(__dirname, "pages/package.html"),
      },
    },
  },
})

