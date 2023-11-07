const mongo = require("mongodb");
const MongoClient = mongo.MongoClient;

async function processDb() {
  const url = "mongodb://127.0.0.1:27017";
  const client = new MongoClient(url);

  try {
    await client.connect();

    //laczenie sie z konkretna baza, na ktorej bedziemy pracowali
    const db = client.db("local");


    //pobieranie kolekcji
    const collections = await db.listCollections().toArray();
    //sformatowany JSON czyli czytelny i ilosc spacji do sformatowania
    console.log(JSON.stringify(collections, null, 4));


  } catch (err) {
    console.error(err);
  } finally {
    await client.close();
  }
}

processDb();
//listowanie dostepnych kolekcji