// const dataProducts = require("../Module/allData"); // Import your database connection

// const addTopSelling = async (req, res) => {
//     const {product_id , main_image} = req.body;

//     dataProducts.query(
//         'INSERT INTO top_selling (product_id , main_image) VALUES (?, ?)',
       
//         [product_id , main_image],
//         (error, results) => {
//             if (error) {
//                 console.error(error);
//                 // Handle the error
//                 res.status(500).json({ error: 'Internal Server Error' });
//             } else {
//                 console.log('Item added successfully');
//                 // You can access the inserted ID using results.insertId
//                 res.status(200).json({ message: 'Item added successfully' });
//             }
//         }
//     );
// }


const express = require('express');
const router = express.Router();
const multer = require('multer');
const dataProducts = require("../Module/allData"); // Import your database connection
const storage = multer.memoryStorage(); // Store the image in memory
const upload = multer({ storage });

const fs = require('fs');
const path = require('path');


const uploadMultiple = (req, res, next) => {
   
   
    upload.array('image')(req, res, (err) => {
      if (err) {
        console.error('Error uploading images:', err);
        return res.status(500).json({ error: 'Image upload failed' });
      }
      next();
    });
  };


  addTopSelling = async (req, res) => {
    // const uploadDirectory = 'C:/Users/orana/OneDrive/سطح المكتب/imagesIsys';
    const uploadDirectory = path.join(__dirname, '..', 'imagesists');
    const imagePaths = [];
  
    for (const file of req.files) {
      const fileName = file.originalname;
      const filePath = path.join(uploadDirectory, fileName);
  
      try {
        await fs.promises.writeFile(filePath, file.buffer);
  
        console.log("Image saved successfully:", filePath);
  
        const imagePath = `imagesists/${fileName}`;
        imagePaths.push(imagePath);
      } catch (error) {
        console.error("Error saving an image:", error);
        return res.status(500).json({ error: "Image upload failed" });
      }
    }
  
    // Insert image paths into the database one by one
    const product_id = req.body.product_id;
    const query = 'INSERT INTO top_selling (product_id , main_image) VALUES (?, ?)';
  
    try {
      for (const imagePath of imagePaths) {
        await dataProducts.query(query, [product_id , main_image]);
      }
  
      res.status(200).json({ message: "Images uploaded and saved successfully" });
    } catch (error) {
      console.error("Error inserting image paths into the database:", error);
      return res
        .status(500)
        .json({ error: "Image upload and database update failed" });
    }
  };
  
  

  

router.post('/upload', uploadMultiple,addTopSelling)




const editTopSelling = async (req, res) => {
    const itemId = req.params.id;
    const {product_id , main_image} = req.body;
    console.log(itemId);

      if (!product_id || !main_image) {
        return res.status(400).json({ error: 'Missing parameters in the request body' });
    }

    dataProducts.query(
        'UPDATE top_selling SET product_id = ? , main_image = ? WHERE id = ? ',
        [product_id , main_image, itemId],
        (error, results) => {
            if (error) {
                console.error(error);
                // Handle the error
                res.status(500).json({ error: 'Internal Server Error' });
            } else {
                console.log('Item updated successfully');
                res.status(200).json({ message: 'Item updated successfully' });
            }
        }
    );
}


    deleteTopSelling = async (req, res) => {
        const itemId = req.params.id;
            console.log(itemId);
    
        dataProducts.query(
            'DELETE FROM top_selling WHERE id = ?',
            [itemId],
            (error, results) => {
                if (error) {
                    console.error(error);
                    // Handle the error
                    res.status(500).json({ error: 'Internal Server Error' });
                } else {
                    console.log('Item deleted successfully');
                    res.status(200).json({ message: 'Item deleted successfully' });
                }
            }
        );
    }


    const getTopSelling  = (req, res) => {

        const query = 'SELECT * FROM top_selling';
        dataProducts.query(query, (err, results) => {
          if (err) {
            console.error('Error executing SQL query:', err);
            res.status(500).json({ error: 'Internal server error' });
            return;
          }
          res.json(results);
        });
      }
      


      const getTopSellingById = (req, res) => {
        const itemId =  req.params.id ;
      
        const query = 'SELECT * FROM top_selling  WHERE id = ?'
      
        dataProducts.query(query ,
        [itemId], (err, results) => {
          if (err) {
            console.error('Error executing SQL query:', err);
            res.status(500).json({ error: 'Internal server error' });
            return;
          }
          
           console.log(results);
           res.status(200).json({ results });
        });
      }
      



module.exports = { editTopSelling , deleteTopSelling , getTopSelling , getTopSellingById }