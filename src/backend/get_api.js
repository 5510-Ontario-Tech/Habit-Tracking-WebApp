import { Router } from 'express';
const router = Router();
import { join } from 'path';
import { promises as fs } from 'fs';

router.get('/frontend/pages/:webpage', async (req,res) => {
    const webpage = req.params.webpage;
    const filedir = join(__dirname,'..','frontend','pages','${webpage}.html');
    try{
        const pageContent = await fs.readFile(filedir,'utf8');
        res.status(200).send(pageContent);
    }
    catch(error){
        console.error("Error loading webpage",error);
        res.status(404).send("Page ${webpage} is not found!");
    }
});
export default router;