const mongoose = require("mongoose");
const Campground = require("../models/campground");
const { places, descriptors } = require("./seedHelpers");
const cities = require("./cities");

mongoose.connect("mongodb://localhost:27017/yelp-camp", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("Database connected");
});

const sample = (array) => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
  await Campground.deleteMany({});
  //   const c = new Campground({ title: "purple field" });
  //   await c.save();
  for (let i = 0; i < 200; i++) {
    const random1000 = Math.floor(Math.random() * 1000);
    const price = Math.floor(Math.random() * 20) + 10;
    const camp = new Campground({
      author: "625923df235953230d5e4e71",
      location: `${cities[random1000].city}, ${cities[random1000].state}`,
      title: `${sample(descriptors)} ${sample(places)}`,
      images: [
        {
          url: "https://res.cloudinary.com/dqm2clkmu/image/upload/v1650277124/YelpCamp/gbzdptzahtj8jo4wtxdw.jpg",
          filename: "YelpCamp/gbzdptzahtj8jo4wtxdw",
        },
        {
          url: "https://res.cloudinary.com/dqm2clkmu/image/upload/v1650277124/YelpCamp/ln7opodxkhmrandcgrfs.jpg",
          filename: "YelpCamp/ln7opodxkhmrandcgrfs",
        },
      ],
      description:
        "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Magnam aliquam perferendis perspiciatis ipsum iusto inventore. Sed voluptatibus recusandae eligendi aliquid ducimus nihil modi, odio voluptates, similique alias expedita ex quae!",
      price,
      geometry: { type: "Point", coordinates: [cities[random1000].longitude, cities[random1000].latitude] },
    });
    await camp.save();
  }
};

seedDB().then(() => {
  mongoose.connection.close();
});
