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
        ui_prototyping: resolve(__dirname, "pages/ui-prototyping.html"),
        ui_design_projects: resolve(__dirname, "pages/ui-design-projects.html"),
        mira_course_detail: resolve(__dirname, "pages/mira-course-detail.html"),
        package_monitoring_frontend: resolve(__dirname, "pages/package-monitoring-frontend.html"),
      },
    },
  },
})

