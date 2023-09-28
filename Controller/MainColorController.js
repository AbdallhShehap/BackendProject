const dataProducts = require("../Module/allData"); 


addProductColorMain = async (req, res) => {
  const {product_id,color_id} = req.body;

  dataProducts.query(
      'INSERT INTO `product_color` (product_id,color_id ) VALUES (?, ?)',
      [product_id,color_id],
      (error, results) => {
          if (error) {
              console.error(error);
              // Handle the error
              res.status(500).json({ error: 'Internal Server Error' });
          } else {
              console.log('order added successfully');
              // You can access the inserted ID using results.insertId
              res.status(200).json({ message: 'order added successfully' });
          }
      }
  );
}


  editProductColorMain = async (req, res) => {
    const itemId = req.params.id;
    const { product_id,color_id} = req.body;
    console.log(itemId);

      if (!product_id || !color_id  ) {
        return res.status(400).json({ error: 'Missing parameters in the request body' });
    }

    dataProducts.query(
        'UPDATE  product_color SET product_id = ? , color_id = ?  WHERE id = ?',
        [product_id , color_id ,  itemId],
        (error, results) => {
            if (error) {
                console.error(error);
                // Handle the error
                res.status(500).json({ error: 'Internal Server Error' });
            } else {
                console.log('order updated successfully');
                res.status(200).json({ message: 'order updated successfully' });
            }
        }
    );
}


        deleteProductColorMain = async (req, res) => {
          const itemId = req.params.id;
              console.log(itemId);
      
          dataProducts.query(
              'DELETE FROM product_color WHERE id = ?',
              [itemId],
              (error, results) => {
                  if (error) {
                      console.error(error);
                      // Handle the error
                      res.status(500).json({ error: 'Internal Server Error' });
                  } else {
                      console.log('order deleted successfully');
                      res.status(200).json({ message: 'order deleted successfully' });
                  }
              }
          );
      }


              
    const getProductColorMain  = (req, res) => {

        const query = 'SELECT * FROM product_color';
        dataProducts.query(query, (err, results) => {
          if (err) {
            console.error('Error executing SQL query:', err);
            res.status(500).json({ error: 'Internal server error' });
            return;
          }
          res.json(results);
        });
      }
      
  
  
      const getProductColorMainById = (req, res) => {
        const itemId =  req.params.id ;
      
        const query = 'SELECT * FROM product_color  WHERE id  = ?'
      
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

        module.exports = { addProductColorMain,editProductColorMain, deleteProductColorMain ,getProductColorMain , getProductColorMainById };