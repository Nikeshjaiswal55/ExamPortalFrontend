import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({

  plugins: [react()],
  build: {
    rollupOptions: {
      external: ['@tensorflow/tfjs-data','@tensorflow/tfjs-layers','@tensorflow-models/speech-commands',' @tensorflow-models/facemesh@0.0.5']
    }
  }
})
