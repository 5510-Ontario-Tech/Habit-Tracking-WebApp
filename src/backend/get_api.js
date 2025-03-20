import { Router } from 'express';
const router = Router();
import { join } from 'path';
import { promises as fs } from 'fs';

router.get('/:directory/:webpage', async (req, res) => {
  const webpage = req.params.webpage;
  const directory = req.params.directory;

  const allowedDirectories = ['pages', 'css', 'js', 'assets'];

  if (!allowedDirectories.includes(directory)) {
    return res.status(403).send('Access denied to this directory');
  }

  const filedir = join(__dirname, '..', 'frontend', directory, `${webpage}.html`);

  try {
    const pageContent = await fs.readFile(filedir, 'utf8');
    res.status(200).send(pageContent);
  } catch (error) {
    console.error(`Error loading webpage ${webpage}.html from directory ${directory}:`, error);
    res.status(404).send(`Page ${webpage}.html is not found in directory ${directory}!`);
  }
});

export default router;