const express = require('express');
const mongoose = require('mongoose');
const PORT = 8080;

const app = express();
app.use(express.json());

// Connect to MongoDB
mongoose.connect("mongodb+srv://amagbaugochukwu:KcqRyVexEnTOMWLI@cluster0.dppyto6.mongodb.net/")
.then( () =>{
    console.log("connection to the database is successful");
})

// Define the employee schema
const employeeSchema = new mongoose.Schema({
  name: String,
  age: Number,
  position: String,
});

const Employee = mongoose.model('Employee', employeeSchema);

// Add a new employee
app.post('/employees', (req, res) => {
  const { name, age, position } = req.body;
  const employee = new Employee({ name, age, position });
  employee.save((err, savedEmployee) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error saving employee');
    } else {
      res.status(201).json(savedEmployee);
    }
  });
});

// Get all employees
app.get('/employees', (req, res) => {
  Employee.find((err, employees) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error retrieving employees');
    } else {
      res.json(employees);
    }
  });
});

// Update an employee
app.put('/employees/:id', (req, res) => {
  const { id } = req.params;
  const { name, age, position } = req.body;
   Employee.findByIdAndUpdate(
    id,
    { name, age, position },
    { new: true },
    (err, updatedEmployee) => {
      if (err) {
        console.error(err);
        res.status(500).send('Error updating employee');
      } else {
        res.json(updatedEmployee);
      }
    }
  );
});

// Delete an employee
app.delete('/employees/:id', (req, res) => {
  const { id } = req.params;
  Employee.findByIdAndDelete(id, (err, deletedEmployee) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error deleting employee');
    } else {
      res.json(deletedEmployee);
    }
  });
});

// Start the server
app.listen(PORT, () => {
  console.log('Server is running on port: ${PORT}');
});