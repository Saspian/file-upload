const router = require('express').Router();
const multer = require('multer');
const fs = require('fs');
// const mongoose = require('../uploads')

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './upload-file-view/public/uploads');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + file.originalname);
  },
});
const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
    //saves the file
    cb(null, true);
  } else {
    //does not save the file
    cb(null, false);
  }
};
const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 1000 * 1000 * 7,
  },
});

const Card = require('../Model/Card');

router.post('/addCard', upload.single('profile'), async (req, res) => {
  console.log(req.file);
  const card = new Card({
    username: req.body.username,
    email: req.body.email,
    profile: `uploads/${req.file.filename}`,
  });
  try {
    await card.save();
    res.send({ card: card._id });
    console.log('card added successfully');
  } catch (err) {
    res.status(400).send(err);
  }
});

//BACK UP ROUTE
router.get('/getCard', async (req, res) => {
  try {
    const cards = await Card.find();
    res.json(cards);
  } catch (err) {
    res.json({ message: err });
  }
});

// GETTING A SINGLE CARD
router.get('/getCard/:id', async (req, res) => {
  try {
    const card = await Card.findById(req.params.id);
    res.json(card);
  } catch (err) {
    res.json({ message: err });
  }
});

// DELETING CARD
router.delete('/deleteCard/:id', upload.single('profile'), async (req, res) => {
  try {
    const file = await Card.findById(req.params.id);
    const path = `upload-file-view/public/${file.profile}`;
    fs.unlink(path, (error) => {
      if (error) {
        console.error(error);
        return error;
      }
      console.log('File deleted');
    });
    const card = await Card.findByIdAndDelete(req.params.id);
    res.json({
      details: 'Details of the file Deleted' + card,
      message: 'Successfully deleted',
    });
  } catch (err) {
    res.json({ message: err });
  }
});

// UPDATING USERNAME CARD
router.post(
  '/editCard/username/:id',
  upload.single('profile'),
  async (req, res) => {
    try {
      const card = await Card.findOneAndUpdate(
        { _id: req.params.id },
        { username: req.body.newusername }
      );
      res.json({ details: card, message: 'Successfully updated' });
    } catch (err) {
      res.json({ message: err });
    }
  }
);

// UPDATING EMAIL
router.post(
  '/editCard/email/:id',
  upload.single('profile'),
  async (req, res) => {
    try {
      const card = await Card.findOneAndUpdate(
        { _id: req.params.id },
        { email: req.body.newemail }
      );
      res.json({ details: card, message: 'Successfully updated' });
    } catch (err) {
      res.json({ message: err });
    }
  }
);

// UPDATING IMAGE
router.post(
  '/editcard/image/:id',
  upload.single('profile'),
  async (req, res) => {
    try {
      const file = await Card.findById(req.params.id);
      const path = `upload-file-view/public/${file.profile}`;
      fs.unlink(path, (error) => {
        if (error) {
          console.error(error);
          return error;
        }
        console.log('File deleted');
      });
      const card = await Card.findOneAndUpdate(
        { _id: req.params.id },
        { profile: `uploads/${req.file.filename}` }
      );
      res.json({ details: card, message: 'Successfully image updated' });
    } catch (err) {
      res.json({ message: err });
    }
  }
);

module.exports = router;
