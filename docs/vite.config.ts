import react from '@vitejs/plugin-react';
import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vite';

// The docs import the library straight from ../src so edits to the
// components hot-reload here without a publish/link step.
export default defineConfig({
    plugins: [react()],
    resolve: {
        alias: [
            { find: 'samsara/styles.css', replacement: fileURLToPath(new URL('../src/styles.css', import.meta.url)) },
            { find: 'samsara', replacement: fileURLToPath(new URL('../src/index.ts', import.meta.url)) },
        ],
        // ../src sits outside this package, so its bare imports must resolve
        // to the docs copy — and to a single React instance.
        dedupe: ['react', 'react-dom', '@radix-ui/react-dialog', '@radix-ui/react-toast', '@radix-ui/react-tooltip', '@radix-ui/react-slot'],
    },
    server: {
        fs: { allow: ['..'] },
    },
});
