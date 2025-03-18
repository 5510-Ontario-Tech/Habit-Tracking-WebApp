import { Router } from 'express';
import { join, dirname, extname } from 'path';
import { fileURLToPath } from 'url';
import { promises as fs } from 'fs';

const router = Router();
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

router.get('/:directory/:webpage', async (req, res) => {
    const webpage = req.params.webpage;
    const directory = req.params.directory;

    // Ensure only HTML files are served
    if (extname(webpage) !== '.html') {
        return res.status(400).send("Invalid request: Only HTML files are allowed.");
    }

    const filedir = join(__dirname, '..', 'frontend', directory, webpage);

    try {
        const pageContent = await fs.readFile(filedir, 'utf8');
        res.status(200).send(pageContent);
    } catch (error) {
        console.error("Error loading webpage", error);
        res.status(404).send(`Page ${webpage} not found!`);
    }
});

export default router;
