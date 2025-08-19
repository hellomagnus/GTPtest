const fs = require('fs');
const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

const DATA_FILE = './data.json';

function readData() {
  try {
    const data = fs.readFileSync(DATA_FILE, 'utf8');
    return JSON.parse(data);
  } catch (err) {
    return {
      hero_title: 'Discover the Best Lego Sets',
      hero_subtitle:
        'In-depth reviews, build tips, and the latest Lego news. Join our community and connect on social media!',
      reviews: [
        {
          img:
            'https://www.lego.com/cdn/cs/set/assets/bltf25b86a7ad8b93c6/PAB_Mobile_750x750_3.jpg?format=webply&fit=crop&quality=75&width=600&height=600&dpr=1',
          title: 'Lego Star Wars X-Wing',
          text:
            "A detailed review of the iconic X-Wing set. Find out why it's a must-have for Star Wars fans!",
        },
        {
          img:
            'https://www.lego.com/cdn/cs/set/assets/bltf513a3746b8267e9/10358_Prod_en-gb.png?format=webply&fit=bounds&quality=75&width=528&height=528&dpr=1',
          title: 'Lego Technic Bugatti',
          text: 'Explore the engineering marvel of the Technic Bugatti. Perfect for advanced builders!',
        },
        {
          img: 'https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=600&q=80',
          title: 'Lego Friends Heartlake City',
          text: 'A fun and colorful set for creative minds. See what makes Heartlake City so special!',
        },
      ],
    };
  }
}

function writeData(data) {
  fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
}

app.get('/content', (req, res) => {
  const data = readData();
  res.json(data);
});

app.post('/content', (req, res) => {
  const { hero_title, hero_subtitle, reviews } = req.body;
  const data = { hero_title, hero_subtitle, reviews };
  try {
    writeData(data);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
