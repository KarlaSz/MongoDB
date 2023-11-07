const mongo = require('mongodb')
const MongoClient = mongo.MongoClient;


//laczenie z nasza baza w kompasie
async function processDb() {
    const url = 'mongodb://127.0.0.1:27017'
    const client = new MongoClient(url);

    try {
        //polaczenie z baza
        await client.connect()


        //pokazanie wszystkich dostepnych baz
        const dbList = await client.db().admin().listDatabases();

        console.log("Databases:");

        dbList.databases.forEach(db => console.log(db.name))
    } catch(err) {
        console.error(err)
    } finally {
        await client.close()
    }
}

processDb()
//listowanie dostepnych baz