//wyszukiewanie rekordow w bazie

const mongo = require("mongodb");
const MongoClient = mongo.MongoClient;

function createRandClient() {
  const names = ["Kasia", "Ela", "Zuza", "Ola"];
  const balance = Math.random() * 10000;

  return {
    name: names[Math.floor(Math.random() * names.length)],
    balance: balance,
    age: 18 + Math.floor(Math.random() * 50),
  };
}

async function processDb() {
  const url = "mongodb://127.0.0.1:27017";
  const client = new MongoClient(url);

  try {
    await client.connect();

    //jesli nie ma danej bazy to zostanie utworzona
    const db = client.db("marketdb");
    const collection = db.collection("clients");

    const clients = [];
    clients.push(createRandClient());
    clients.push(createRandClient());
    clients.push(createRandClient());

    await collection.insertMany(clients);
    const data = client
      .db("marketdb")
      .collection("clients")
      .find({
        //chcemy wyszukac ze wzgledu na wartosc balance i chcemy miec miec wartosc wieksza $gt greater wiecej, lt less then, lte lesss then equel, gte greater than equeal
        //
        balance: { $lte: 1500 },
       /*  name: "Ela", */
      });

    const results = await data.toArray();

    if (results.length > 0) {
      console.log("Num results found:", results.length);
      results.forEach((result) => {
        console.log(result);
      });
    }
  } catch (err) {
    console.error(err);
  } finally {
    await client.close();
  }
}

processDb();
//przy kazdy odpalaniu polcenie node find.js dodaja sie nowe rekordy
