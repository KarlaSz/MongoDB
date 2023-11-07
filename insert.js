//tworzenie i zapis nowej bazy oraz obiektow do bazy compass

const mongo = require("mongodb");
const MongoClient = mongo.MongoClient;

async function processDb() {
  const url = "mongodb://127.0.0.1:27017";
  const client = new MongoClient(url);

  try {
    await client.connect();

    //jesli nie ma danej bazy to zostanie utworzona
    const db = client.db("marketdb");
    const collection = db.collection("nasdaq");

    await collection.insertOne({
      ticker: "TSLA",
      name: "Tesla",
      website: "tesla.com",
    });
    await collection.insertOne({
      ticker: "GOOGL",
      name: "Alphabet",
      website: "google.com",
    });

    const tickers = [
      {
        ticker: "APPL",
        name: "APPLE",
        address: {
          country: "USA",
          street: "Apple 1",
        },
      },
      {
        ticker: "NVDA",
        name: "NVIDIA",
        products: ["cards", "servers"],
      },
    ];

    const options = {
      ordered: true,
    };

    const result = await collection.insertMany(tickers, options);
    console.log(("Num records save: ", result.insertedCount));
  } catch (err) {
    console.error(err);
  } finally {
    await client.close();
  }
}

processDb();
