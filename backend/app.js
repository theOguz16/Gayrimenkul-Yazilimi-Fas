require("dotenv").config();

const express = require("express");
const path = require("path");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const port = process.env.PORT;
const secretkey = process.env.SECRET_KEY;

const middlewareAuth = require("./middlewares/auth");

app.use(bodyParser.json());

// JWT için gizli anahtar (bu gizli anahtar güvenli bir yerde saklanmalıdır)

const corsOptions = {
  origin: "*", // İzin verilen kökeni güncelleyin
  optionsSuccessStatus: 204, // İsteği başarılı olarak işaretlemek için HTTP durum kodu
};

app.use(cors(corsOptions));

//KIRACI LINKINE GONDER

app.get("/profile", middlewareAuth, async function (req, res) {
  return res.json({
    user: req.user,
  });
});

// Örnek özel bir rotaya erişim (test)
app.get("/private-route", middlewareAuth, (req, res) => {
  // Eğer middleware JWT token'ı doğrulamışsa, bu kod çalışır
  res.json({ message: "Bu özel rotaya erişim sağlandı.", user: req.user });
});

// JWT doğrulama middleware'i
function authenticateJWT(req, res, next) {
  const token = req.header("x-auth-token"); // veya başka bir header adı
  if (!token) {
    return res
      .status(401)
      .json({ message: "Erişim yetkiniz yok. JWT token eksik." });
  }

  jwt.verify(token, secretkey, (err, user) => {
    if (err) {
      return res
        .status(403)
        .json({ message: "Erişim yetkiniz yok. Geçersiz token." });
    }
    req.user = user; // İstek nesnesine kullanıcı bilgilerini ekleyin
    next();
  });
}

const { MongoClient } = require("mongodb");
const uri = "mongodb://localhost:27017/FAS"; // MongoDB URI
const client = new MongoClient(uri);

// JWT oluşturmak için işlev
function generateToken(buildName) {
  const payload = { buildName };
  return jwt.sign(payload, secretkey, { expiresIn: "1h" });
}

// Şema tanımlanmış yerin yolunu ekleyin

const User = require("./schema/User.js");

//img
// const multer = require("multer"); //dosya kaydetmek icin
// const upload = multer({ dest: "uploads/" });

//db bağlanma
const mongoose = require("mongoose");
const { log } = require("console");
const { build } = require("vite");

mongoose.connect("mongodb://localhost:27017/FAS", {});

const db = mongoose.connection;

db.on("error", console.error.bind(console, "Bağlantı hatası:"));
db.once("open", () => {
  console.log("Veritabanına başarıyla bağlandı!");
});

//istekler

//Login
app.post("/login", async (req, res) => {
  const { buildName, password } = req.body;

  try {
    // Kullanıcı kimlik doğrulama işlemini çağırın
    const user = await User.findOne({ buildName });

    if (!user) {
      // Kullanıcı bulunamazsa hata mesajını gönderin
      return res.status(401).json({ message: "Kullanıcı bulunamadı." });
    }

    if (user.password !== password) {
      // Şifre yanlışsa hata mesajını gönderin
      return res.status(401).json({ message: "Kimlik doğrulama başarısız." });
    }

    // Kimlik doğrulama başarılı ise kullanıcı bilgilerini ve token'ı döndürün
    const token = jwt.sign({ buildName }, secretkey, {
      expiresIn: "1h",
    });

    delete user.password;

    return res.json({
      message: "Kimlik doğrulama başarılı.",
      user: user,
      token: token,
    });
  } catch (error) {
    console.error("Bir hata oluştu:", error);
    return res.status(500).json({ message: "Sunucu hatası." });
  }
});

//logout
app.post("/logout", middlewareAuth, (req, res) => {
  res.status(200).json({ message: "Çıkış başarılı." });
});

//Register

// Middleware'ı "/register" endpoint'i ile birleştirin
app.post("/register", async (req, res) => {
  try {
    // Gelen verileri kullanarak yeni bir user oluşturun
    const newUser = new User({
      buildName: req.body.buildName,
      name: req.body.name,
      surname: req.body.surname,
      dateOfBirth: req.body.dateOfBirth,
      gender: req.body.gender,
      kiraMiktari: req.body.kiraMiktari,
      aidatMiktari: req.body.aidatMiktari,
      aidatTarihi: req.body.aidatTarihi,
      kiraTarihi: req.body.kiraTarihi,
      emailAddres: req.body.emailAddres,
      telNo: req.body.telNo,
      password: req.body.password,
      role: req.body.role || "User", // Eğer role belirtilmediyse "Student" olarak ayarla
    });

    // User'ı veritabanına kaydedin
    await newUser.save();

    // Kullanıcıyı kimlik doğrulama için kullanacağınız bir JWT token oluşturun
    const token = jwt.sign({ buildName: newUser.buildName }, secretkey);

    res.status(201).json({
      mesaj: "user başarıyla kaydedildi.",
      token,
    });
  } catch (error) {
    res.status(500).json({ hata: "user kaydedilirken bir hata oluştu." });
  }
});

app.get("/register", async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
// Tüm binaları listeleyen rota: /binalar
app.get("/binalar", middlewareAuth, async (req, res) => {
  try {
    const binalar = await User.find(); // Kullanıcı modelinin tüm verilerini alıyoruz

    return res.json(binalar);
  } catch (error) {
    console.error("Hata:", error);
    res.status(500).json({ message: "Sunucu hatası" });
  }
});

// Dinamik rota: /binalar/:buildName
app.get("/binalar/:buildName", middlewareAuth, async (req, res) => {
  const { buildName } = req.params;

  try {
    // buildName'e göre kullanıcıyı buluyoruz
    const user = await User.findOne({ buildName });

    return res.json({ user });
  } catch (error) {
    console.error("Hata:", error);
    res.status(500).json({ message: "Sunucu hatası" });
  }
});

// Aidatları toplama fonksiyonu
app.get("/toplam-aidat", middlewareAuth, async (req, res) => {
  try {
    // Tüm kullanıcıları veritabanından çek ve aidat miktarlarını topla
    const users = await User.find({});
    const toplamAidat = users.reduce((total, user) => {
      return total + (user.aidatMiktari || 0); // AidatMiktari yoksa 0 kabul et
    }, 0);

    res.json({ toplamAidat: toplamAidat });
  } catch (error) {
    console.error("Hata:", error);
    res.status(500).json({ error: "Aidatları toplarken bir hata oluştu" });
  }
});

app.post("/binalar/:bina/kiraCheckbox", middlewareAuth, async (req, res) => {
  const { kiraCheckbox } = req.body;
  const { bina } = req.params; // Parametredeki bina adı alınır
  try {
    // Binayı güncelleyin
    const updatedUser = await User.findOneAndUpdate(
      { buildName: bina }, // Bina adına göre bul
      { kiraCheckbox: kiraCheckbox }, // Güncellenen alanlar
      { new: true } // Yeni bina nesnesini döndür
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User bulunamadı." });
    }

    res.json({
      message: "Bina başarıyla güncellendi.",
      user: updatedUser,
    });
  } catch (error) {
    console.error("Güncelleme hatası:", error); // Detaylı hata mesajı
    res.status(500).json({ message: "Güncelleme sırasında bir hata oluştu." });
  }
});

app.post("/binalar/:bina/aidatCheckbox", middlewareAuth, async (req, res) => {
  const { aidatCheckbox } = req.body;
  const { bina } = req.params; // Parametredeki bina adı alınır

  try {
    // Binayı güncelleyin
    const updatedUser = await User.findOneAndUpdate(
      { buildName: bina }, // Bina adına göre bul
      { aidatCheckbox: aidatCheckbox }, // Güncellenen alanlar
      { new: true } // Yeni bina nesnesini döndür
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "Bina bulunamadı." });
    }

    res.json({
      message: "Bina başarıyla güncellendi.",
      user: updatedUser,
    });
  } catch (error) {
    console.error("Güncelleme hatası:", error); // Detaylı hata mesajı
    res.status(500).json({ message: "Güncelleme sırasında bir hata oluştu." });
  }
});

//BINA EKLE KISMI YAP

// app.post("/soru-ekle", async (req, res) => {
//   try {
//     //  Gelen verileri kullanarak yeni bir soru nesnesi oluşturun
//     const yeniSoru = new Soru({
//       soruBasligi: req.body.title,
//       soruAciklamasi: req.body.explain,
//       konu: req.body.konuListesi,
//       imageUrl: req.body.img,
//       likeCount: req.body.likeCount,
//       isLiked: req.body.isLiked,
//       yorumCount: req.body.yorumCount,
//       isCommanted: req.body.isCommanted,
//       username: req.body.username,
//       token: req.body.token, // Kullanıcının token'ını ekleyin
//       yorumlar: [
//         // {
//         //   type: Schema.Types.ObjectId,
//         //   ref: "Yorum", // 'Yorum' modeline referans veriyoruz
//         // },
//       ],
//     });

//     // const oturumKimligi = req.body.token;
//     // const kullaniciAdi = req.body.username;
//     // console.log(oturumKimligi, kullaniciAdi);

//     //  Soruyu veritabanına kaydedin
//     await yeniSoru.save();

//     // Bu kod kullanıcının sorularına ekler
//     const user = await User.findOne({ username: req.body.username });
//     user.sorulanSoru++;

//     if (user) {
//       user.addSoru(yeniSoru._id);
//     }

//     res.status(201).json({ mesaj: "Soru başarıyla kaydedildi." });
//   } catch (error) {
//     console.error("Soru kaydetme hatası:", error);
//     res.status(500).json({ hata: "Soru kaydedilirken bir hata oluştu." });
//   }
// });

//BACKENDDE BINALARA BAK

//Ana sayfaya tüm verileri getirme
// app.get("/sorular", async (req, res) => {
//   try {
//     // Veritabanından tüm soruları çekin
//     const sorular = await Soru.find({});
//     res.status(200).json(sorular);

//     const sorularWUsername = sorular.filter((soru) => ({
//       ...soru._doc,
//       username: soru.username,
//     }));

//     // Kullanıcının adına göre tüm soruları bulun
//     // console.log("sorularwidth" + sorularWUsername);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ hata: "Soruları alma sırasında bir hata oluştu." });
//   }
// });
// app.get("/soru/:soruID", async (req, res) => {
//   const soruID = req.params.soruID;
//   // SoruID'ye ait sorunun ayrıntılarını veritabanından çekmek için "populate" kullanın
//   const soru = await Soru.findById(soruID);
//   if (soru) {
//     // Kullanıcı adı ve token gibi ek bilgileri istemciye gönderin
//     res.status(200).json({
//       soru: soru,
//       username: soru.username,
//       token: soru.token,
//     });
//   } else {
//     res.status(404).json({ hata: "Soru bulunamadı." });
//   }
// });

//BİNA SİL
// app.delete("/sorular/:soruID", async (req, res) => {
//   try {
//     const soruID = req.params.soruID;
//     // const { username } = req.body;
//     // const username = req.body.username;

//     const user = await User.findOne({ username: req.body.username });
//     user.sorulanSoru--;

//     user.Sorular.pull(soruID);

//     await user.save();

//     // MongoDB'den soruyu silmek için gerekli sorguyu çalıştırın
//     const silinenSoru = await Soru.findByIdAndDelete(soruID);

//     // Silinen sorunun bağlantılı yorumlarını alın
//     const baglantiliYorum = silinenSoru.yorumlar;

//     // Bağlantılı yorumları silebilirsiniz
//     for (const yorumID of baglantiliYorum) {
//       await Yorum.findByIdAndDelete(yorumID);
//     }

//     // Eğer soru kullanıcının sahip olduğu bir soru ise, silinmesine izin verin
//     if (req.username === req.user.username) {
//       // Soruyu veritabanından silin
//       await Soru.findByIdAndDelete(soruID);
//       return res.json({ mesaj: "Soru başarıyla silindi." });
//     } else {
//       return res.status(403).json({ hata: "Bu soruyu silme izniniz yok." });
//     }

//     res.status(204).send(); // Başarılı yanıt, içerik olmadan (No Content)
//   } catch (error) {
//     console.error("Soru silme hatası:", error);
//     res.status(500).json({ error: "Soru silinemedi." });
//   }
// });

//BINADAKI UYELER

// app.get("/bina-uyeleri/:buildName", async (req, res) => {
//   try {
//     const buildName = req.params.buildName;
//     // Veritabanından konuya göre filtrelenmiş userlari çekin
//     const users = await User.find({ buildName: buildName });
//     res.status(200).json(users);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ hata: "Useri alma sırasında bir hata oluştu." });
//   }
// });

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
