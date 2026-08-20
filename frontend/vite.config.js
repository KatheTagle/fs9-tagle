import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import plugin from 'eslint-plugin-react-hooks'

export default defineConfig({
  plugins: [
   react(), tailwindcss(),
  ],
})