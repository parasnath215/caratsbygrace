import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;
const distPath = path.join(__dirname, 'dist');

// Serve static files from Vite build output
if (fs.existsSync(distPath)) {
  app.use(express.static(distPath));
}

// SPA fallback for React Router
app.get('*', (req, res) => {
  const indexPath = path.join(distPath, 'index.html');
  if (fs.existsSync(indexPath)) {
    res.sendFile(indexPath);
  } else {
    res.status(200).send('Carats by Grace — Build output not found. Please run npm run build first.');
  }
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Carats by Grace production server running on port ${PORT}`);
});
