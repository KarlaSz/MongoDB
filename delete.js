const mongo = require("mongodb");

const MongoClient = mongo.MongoClient;

async function initDb() {
  const url = "mongodb://127.0.0.1:27017";

  let client = null;

  try {
    client = await new MongoClient(url);

    return client;
  } catch (err) {
    console.error(err);
  }
}

function randElFromArr(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function getRandCar() {
  const names = [
    "Focus",
    "Explorer",
    "F-150",
    "Transit",
    "Escort",
    "Mustang",
    "Ranger",
  ];

  return {
    brand: "Ford",

    name: randElFromArr(names),

    age: Math.floor(Math.random() * 50),

    mileage: Math.floor(Math.random() * 500000),

    color: randElFromArr([
      "blue",
      "green",
      "white",
      "red",
      "yellow",
      "silver",
      "orange",
    ]),
  };
}

async function addDataToDb(client) {
  try {
    const db = client.db("marketdb");

    const collection = db.collection("cars");

    const carsArr = [];

    for (let i = 0; i < 20; i++) {
      carsArr.push(getRandCar());
    }

    const results = await collection.insertMany(carsArr, { ordered: true });

    console.log("Num cars saved:", results.insertedCount);
  } catch (err) {
    console.error(err);
  }
}

async function updateCarsByName(collection, name, updateFields) {
  await collection.updateMany({ name }, { $set: updateFields });
}

async function updateOneCar(collection, options, updateFields) {
  await collection.updateOne(options, { $set: updateFields });
}

async function deleteByName(collection, name) {
  await collection.deleteMany({ name });
}

async function main() {
  let client = null;

  try {
    client = await initDb();

    //await addDataToDb(client);

    const collection = client.db("marketdb").collection("cars");

    //await updateCarsByName(collection, "Focus", { color: "dark lime", topSpeed: 200 });

    await updateOneCar(
      collection,
      {
        brand: "Ford",

        name: "F-150",

        mileage: 324518,
      },
      {
        color: "dark red",

        topSpeed: 150,

        engine: {
          numCylinders: 8,
        },
      }
    );

    await deleteByName(collection, "Ranger");
  } catch (err) {
    console.error(err);
  } finally {
    await client.close();
  }
}

main();
