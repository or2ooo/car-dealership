const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 3001;

app.use(cors());
app.use(bodyParser.json());

// In-memory data store
const users = [
    { id: 1, username: 'user1', password: 'pass1' },
    { id: 2, username: 'user2', password: 'pass2' },
    { id: 3, username: 'user3', password: 'pass3' },
    { id: 4, username: 'user4', password: 'pass4' },
    { id: 5, username: 'user5', password: 'pass5' }
];

const cars = [
    { id: 1, make: 'Toyota', model: 'Corolla', year: 2020 },
    { id: 2, make: 'Honda', model: 'Civic', year: 2021 },
    { id: 3, make: 'Ford', model: 'Fusion', year: 2019 },
    { id: 4, make: 'Chevrolet', model: 'Malibu', year: 2018 },
    { id: 5, make: 'Nissan', model: 'Sentra', year: 2020 },
    { id: 6, make: 'Hyundai', model: 'Elantra', year: 2021 },
    { id: 7, make: 'Kia', model: 'Forte', year: 2019 },
    { id: 8, make: 'Volkswagen', model: 'Jetta', year: 2018 },
    { id: 9, make: 'Subaru', model: 'Impreza', year: 2020 },
    { id: 10, make: 'Mazda', model: 'Mazda3', year: 2021 }
];

// Routes
app.get('/users', (req, res) => {
    res.json(users);
});

app.get('/cars', (req, res) => {
    res.json(cars);
});

app.post('/users', (req, res) => {
    const newUser = { id: users.length + 1, ...req.body };
    users.push(newUser);
    res.status(201).json(newUser);
});

app.post('/cars', (req, res) => {
    const newCar = { id: cars.length + 1, ...req.body };
    cars.push(newCar);
    res.status(201).json(newCar);
});

app.post('/login', (req, res) => {
    const { username, password } = req.body;
    const user = users.find(u => u.username === username && u.password === password);
    if (user) {
        res.json({ message: "Login successful", user });
    } else {
        res.status(401).json({ message: "Invalid credentials" });
    }
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
