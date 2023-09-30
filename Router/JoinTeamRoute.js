const express = require('express');
const router = express.Router();
const joinTeam = require("../Controller/JoinTeamController")

const multer = require('multer');
const dataProducts = require("../Module/allData"); // Import your database connection
const path = require('path');

// Define storage for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const destinationPath = path.join(__dirname,'../attaches'); // Use dirname to get the current script's directory
    cb(null, destinationPath);
  },
  filename: (req, file, cb) => {
    // Rename the file to prevent conflicts (you can use a unique name generator)
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + '-' + file.originalname);
  },
});

// Create the multer instance
const upload = multer({ storage: storage });

// API endpoint to upload a file and save its path in the database
router.post('/add', upload.single('attach_cv'), async (req, res) => {
  const { first_name, last_name, email, phone, position_id } = req.body;

  // Check if a file was uploaded
  if (!req.file) {
    return res.status(400).json({ error: 'Missing CV file' });
  }

  const attach_cv = req.file.path; // Get the path to the uploaded file

  dataProducts.query(
    'INSERT INTO join_our_team (first_name, last_name, email, phone, position_id, attach_cv) VALUES (?, ?, ?, ?, ?, ?)',
    [first_name, last_name, email, phone, position_id, attach_cv],
    (error, results) => {
      if (error) {
        console.error(error);
        // Handle the error
        res.status(500).json({ error: 'Internal Server Error' });
      } else {
        console.log('Item added successfully');
        // You can access the inserted ID using results.insertId
        res.status(200).json({ message: 'Item added successfully' });
      }
    }
  );
});

router.put('/edit/:id', joinTeam.editjoinTeam);


router.delete('/delete/:id', joinTeam.deletejoinTeam);

router.get('/getjointeam' , joinTeam.getjoinTeam)

router.get('/download/:id', (req, res) => {
    const itemId = req.params.id;
    
    // Fetch the file path from the database based on the provided ID
    dataProducts.query(
      'SELECT attach_cv FROM join_our_team WHERE id = ?',
      [itemId],
      (err, results) => {
        if (err) {
          console.error('Error executing SQL query:', err);
          res.status(500).json({ error: 'Internal server error' });
          return;
        }
  
        if (results.length === 0) {
          res.status(404).json({ error: 'File not found' });
          return;
        }
  
        const filePath = results[0].attach_cv;
  
        // Send the file for download
        res.download(filePath);
      }
    );
  });
  


module.exports = router