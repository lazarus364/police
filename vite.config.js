// import { defineConfig } from "vite";
// import react from "@vitejs/plugin-react";
// import themePlugin from "@replit/vite-plugin-shadcn-theme-json";
// import path, { dirname } from "path";
// import runtimeErrorOverlay from "@replit/vite-plugin-runtime-error-modal";
// import { fileURLToPath } from "url";

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = dirname(__filename);

// export default defineConfig({
//   plugins: [
//     react(),
//     runtimeErrorOverlay(),
//     themePlugin(),
//     ...(process.env.NODE_ENV !== "production" &&
//     process.env.REPL_ID !== undefined
//       ? [
//           await import("@replit/vite-plugin-cartographer").then((m) =>
//             m.cartographer(),
//           ),
//         ]
//       : []),
//   ],
//   resolve: {
//     alias: {
//       "@": path.resolve(__dirname, "client", "src"),
//       "@shared": path.resolve(__dirname, "shared"),
//     },
//   },
//   root: path.resolve(__dirname, "client"),
//   build: {
//     outDir: path.resolve(__dirname, "dist/public"),
//     emptyOutDir: true,
//   },
// });


import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import themePlugin from "@replit/vite-plugin-shadcn-theme-json";
import path, { dirname } from "path";
import runtimeErrorOverlay from "@replit/vite-plugin-runtime-error-modal";
import { fileURLToPath } from "url";

// This part should be outside of the config definition
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Conditionally import the cartographer plugin
let cartographerPlugin = [];
if (process.env.NODE_ENV !== "production" && process.env.REPL_ID !== undefined) {
  cartographerPlugin = [
    await import("@replit/vite-plugin-cartographer").then((m) =>
      m.cartographer(),
    ),
  ];
}

export default defineConfig({
  plugins: [
    react(),
    runtimeErrorOverlay(),
    themePlugin(),
    ...cartographerPlugin,  // Include the plugin conditionally
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "client", "src"),
      "@shared": path.resolve(__dirname, "shared"),
    },
  },
  root: path.resolve(__dirname, "client"),
  build: {
    outDir: path.resolve(__dirname, "dist"),  // Remove "public" from path
    emptyOutDir: true,
    rollupOptions: {
      input: path.resolve(__dirname, "client", "src", "main.jsx"),
    }
  },
  
  server: {
    proxy: {
      "/api": "http://localhost:5000",  // Adjust if your backend runs on a different port
    }
  }
  

});
