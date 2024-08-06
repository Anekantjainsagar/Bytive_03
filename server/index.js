const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const User = require("./models/User"); // Assuming your User model is in models/User.js

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

mongoose
  .connect(
    "mongodb+srv://anekantjainsagar:anekantjainsagar@cluster0.clobkuu.mongodb.net/"
  )
  .then((res) => {
    console.log("DB Connected");
  })
  .catch((err) => {
    console.log(err);
  });

// Create a new user
app.post("/users", async (req, res) => {
  try {
    let username = req.body.name?.toLowerCase()?.replaceAll(" ", "");
    console.log({ ...req.body, username });
    const newUser = new User({ ...req.body, username });
    await newUser.save();
    res.status(201).send(newUser);
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
});

// Get all users
app.get("/users", async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).send(users);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Update a user by ID
app.patch("/users/:id", async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!user) {
      return res.status(404).send({ error: "User not found" });
    }
    res.send(user);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Delete a user by ID
app.delete("/users/:id", async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);

    if (!user) {
      return res.status(404).send();
    }

    res.send(user);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Increment likes for a user by ID
app.patch("/users/:id/like", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).send();
    }

    user.likes += 1;
    await user.save();
    res.send(user);
  } catch (error) {
    res.status(400).send(error);
  }
});

app.patch("/users/:id/dislike", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).send();
    }

    user.likes -= 1;
    await user.save();
    res.send(user);
  } catch (error) {
    res.status(400).send(error);
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
