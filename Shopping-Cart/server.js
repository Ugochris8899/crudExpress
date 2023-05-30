const express = require('express');
const mongoose = require('mongoose');
const app = express();
const PORT = 4000;

// Connect to MongoDB
mongoose.connect("mongodb+srv://amagbaugochukwu:Mm0jHiyEfo18BRqs@cluster0.yd7f1ze.mongodb.net/")
.then( () =>{
    console.log("connection to the database is successful");
})


  

const itemSchema = new mongoose.Schema({
   name: String,
   price: Number,
   quantity: Number,
    
  
});

const Item = mongoose.model('Item', itemSchema);

app.use(express.json());

app.get("/")

// Create a new item
app.post("/updateitem", async (req, res) => {
  try {
    const { name, price } = req.body;
    const newItem = new Item({ name, price });
    const savedItem = await newItem.save();
    res.status(201).json(savedItem);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create item' });
  }
});

// Get all items
app.get("/GetAllItems", async (req, res) => {
  try {
    const items = await Item.find();
    res.json(items);
  } catch (error) {
    res.status(500).json({ error: 'Failed to get items' });
  }
});

// Get a single item by ID
app.get("/GetOneItem", async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);
    if (!item) {
      return res.status(404).json({ error: 'Item not found' });
    }
    res.json(item);
  } catch (error) {
    res.status(500).json({ error: 'Failed to get item' });
  }
});

// Update an item
app.put("/updateItem/:id", async (req, res) => {
    const {id} = req.params;
    const { name, price, quantity } = req.body;
  Item.findByIdAndUpdate(id, {name, price, quantity}, {new:true})
  .then((updatedItem)=>{
    if(!updatedItem) {
        return res.status(404).json(
            {message: "Item not found"}
        )
    }
    res.json(updatedItem);
  })
  .catch((error) =>{
    console.log("Error updating item:", error);
    res.status(500).json({message: "Error updating item"});
  })
});

// delete item
app.delete("/deleteItem/:id", async(req, res)=>{
    const id = req.params.id
    const deleteItem = await Item.findByIdAndDelete((id))

    res.status(200).json(
        {message:`the information of the user with the id of ${id}, has been deleted`,
    data: deleteItem}
    )
 })

 app.listen(PORT, () => {
    console.log(`server is listening on port: ${PORT}`);
    // console.log("server is listening on port" +PORT);
});

    
   
