const { Router } = require('express');
const router = Router();

const {
    getPhotos,
    getPhotoById,
    addOrUpdatePhoto,
    deletePhotoById
    
} = require('../controllers/photo.controller');


router.get('/', (req, res) => {
    res.send('Hello World');
});

router.get('/photos', async (req, res) => {
    try {
        const photos = await getPhotos();
        res.json(photos);
    } catch (err) {
        console.error(err);
        res.status(500).json({ err: 'Something went wrong' });
    }
});

router.get('/photos/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const photo = await getPhotoById(id);
        res.json(photo);
    } catch (err) {
        console.error(err);
        res.status(500).json({ err: 'Something went wrong' });
    }
});

router.post('/photos', async (req, res) => {
    const character = req.body;
    try {
        const newPhoto = await addOrUpdatePhoto(character);
        res.json(newPhoto);
    } catch (err) {
        console.error(err);
        res.status(500).json({ err: 'Something went wrong' });
    }
});

router.put('/photos/:id', async (req, res) => {
    const character = req.body;
    const { id } = req.params;
    character.id = id;
    try {
        const newCharacter = await addOrUpdatePhoto(character);
        res.json(newCharacter);
    } catch (err) {
        console.error(err);
        res.status(500).json({ err: 'Something went wrong' });
    }
});



router.delete('/photos/:id', async (req, res) => {
    const { id } = req.params;
    try {
        res.json(await deletePhotoById(id));
    } catch (err) {
        console.error(err);
        res.status(500).json({ err: 'Something went wrong' });
    }
});

module.exports = router;