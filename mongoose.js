//ustawienie ograniczen przed neichcianymi danymi z zewnatrz
//schemat rekordu bazy telefonu
const mongoose = require("mongoose");
const url = "mongodb://127.0.0.1:27017/mongoosetelephones";
mongoose.connect(url);

//schemat, jak ma wygladac rekord w naszej bazie kompass
const telephoneSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  brand: {
    type: String,
    required: true,
    trim: true, //kasowane znaki na poczatku i na koncu
    minLength: 1,
    maxLength: 24,
  },
  name: {
    type: String,
    required: true,
    trim: true, //kasowane znaki na poczatku i na koncu
    minLength: 1,
    maxLength: 32,
  },
  color: {
    type: String,
    required: false,
    enum: ["red", "yellow", " green", "gold", "silver"],
  },
  age: {
    type: Number,
    required: false,
    default: 0,
    validate: {
      validator: function (v) {
        return v >= 0;
      },
      message: "Age can't be negative",
    },
  },
  created: {
    type: Date,
    default: Date.now,
  },
});

//model na bazie schematu, sa tu wszsytkie metody na komunikacje z baza tego schmeatu

//na podst. tej nazwy powstanie nazwa kolekcji
const Telephone = mongoose.model("Telephone", telephoneSchema);

const telephone1 = new Telephone({
  _id: new mongoose.Types.ObjectId(),
  brand: "Nokia",
  name: "X1",
  color: "red", // z enum
  age: 1,
});
const telephone2 = new Telephone({
  _id: new mongoose.Types.ObjectId(),
  brand: "Sony",
  name: "kSmart",
  color: "silver", // z enum
  age: 1,
});
const telephone3 = new Telephone({
  _id: new mongoose.Types.ObjectId(),
  brand: "Lenovo",
  name: "K5",
  color: "gold", // z enum
  age: 1,
});

async function main() {
  try {
    await Telephone.deleteOne({ brand: "Nokia" });
    await Telephone.deleteMany({});

    const telephone1Db = await telephone1.save();
    const telephoneArr = [telephone2, telephone3];

    await Telephone.insertMany(telephoneArr);

    const telephoneByBrand = await Telephone.findById(telephone1Db._id);
    console.log(telephoneByBrand);

    //szukanie po innych warunkach
    const telDb = await Telephone.findOne({
      brand: "Sony",
      name: " kSmart",
    });
    console.log(telDb);

    const updatedTelDb = await Telephone.findOneAndUpdate(
      {
        brand: "Sony",
        name: " kSmart",
      },
      {
        color: "yellow",
        age: 5,
      },
      {
        //ten obiekt mowi o tym zeby zaktualizowany rekord ten zostal tez zwrocony
        new: true,
      }
    );
    console.log(updatedTelDb);
  } catch (err) {
    console.error(err);
  } finally {
    await mongoose.disconnect();
  }
}

main();
//okresla wymagania schemat, typy i ograniczenia i automatycznie tworzy model za pomoca ktorego mozemy odwolowyac sie do bazy. mozemy kasowac lub aktualizowac rekordy