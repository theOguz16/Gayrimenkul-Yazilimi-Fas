require("dotenv").config();

const express = require("express");
const nodemailer = require("nodemailer");
// const twilio = require("twilio");
const path = require("path");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const port = process.env.PORT;
const secretkey = process.env.SECRET_KEY;
const mail_port = process.env.MAIL_PORT;
const secure = process.env.SECURE;
const host = process.env.HOST;
const admin_mail = process.env.ADMIN_MAIL;
const admin_pass = process.env.ADMIN_PASS;

const middlewareAuth = require("./middlewares/auth");

//SMS İşlemleri

// const twilioClient = twilio(
//   process.env.TWILIO_ACCOUNT_SID,
//   process.env.TWILIO_AUTH_TOKEN
// );
// function sendSMS(phoneNumber, message) {
//   return twilioClient.messages.create({
//     body: message,
//     from: process.env.TWILIO_PHONE_NUMBER,
//     to: phoneNumber,
//   });
// }
// function formatPhoneNumber(phoneNumber) {
//   // Numaradaki tüm boşlukları ve tire işaretlerini kaldır
//   let cleaned = phoneNumber.replace(/\s+/g, "").replace(/-/g, "");

//   // Eğer numara 0 ile başlıyorsa, onu kaldır
//   if (cleaned.startsWith("0")) {
//     cleaned = cleaned.substring(1);
//   }

//   // Eğer numara henüz +90 ile başlamıyorsa, ekle
//   if (!cleaned.startsWith("+90")) {
//     cleaned = "+90" + cleaned;
//   }

//   return cleaned;
// }

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

const { MongoClient } = require("mongodb");
const uri = "mongodb://localhost:27017/FAS"; // MongoDB URI
const client = new MongoClient(uri);

// Şema tanımlanmış yerin yolunu ekleyin

const User = require("./schema/User.js");

//img
// const multer = require("multer"); //dosya kaydetmek icin
// const upload = multer({ dest: "uploads/" });

//db bağlanma
const mongoose = require("mongoose");

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

app.post("/send-email", async (req, res) => {
  const { email, subject, message } = req.body;

  // Nodemailer transporter ayarları
  let transporter = nodemailer.createTransport({
    host: `${host}`, // Hosting sağlayıcınızdan alacağınız SMTP sunucusu
    port: mail_port, // Genellikle SSL için 465, TLS için 587 kullanılır
    secure: secure, // true for SSL (465 portu), false for TLS (587 portu)
    auth: {
      user: `${admin_mail}`, // Kendi domain email adresiniz
      pass: `${admin_pass}`, // E-posta adresiniz için oluşturduğunuz şifre
    },
  });

  try {
    // Mail gönderimi
    await transporter.sendMail({
      from: `"FAS" <${admin_mail}>`, // Kimden
      to: email, // Kime (kullanıcının email adresi)
      subject: subject, // Konu
      text: message, // Mesaj
    });

    res.status(200).json({ message: "Email başarıyla gönderildi!" });
  } catch (error) {
    console.error("Email gönderim hatası:", error);
    res
      .status(500)
      .json({ message: "Email gönderiminde bir hata oluştu.", error });
  }
});
//Duyuruları e-mail ile
app.post("/duyuru-email", async (req, res) => {
  const { email, subject, message } = req.body;

  // Nodemailer transporter ayarları
  let transporter = nodemailer.createTransport({
    host: `${host}`, // Hosting sağlayıcınızdan alacağınız SMTP sunucusu
    port: mail_port, // Genellikle SSL için 465, TLS için 587 kullanılır
    secure: secure, // true for SSL (465 portu), false for TLS (587 portu)
    auth: {
      user: `${admin_mail}`, // Kendi domain email adresiniz
      pass: `${admin_pass}`, // E-posta adresiniz için oluşturduğunuz şifre
    },
  });

  try {
    // Mail gönderimi
    await transporter.sendMail({
      from: `"FAS" <${admin_mail}>`, // Kimden
      to: email, // Kime (kullanıcının email adresi)
      subject: subject, // Konu
      text: message, // Mesaj
    });

    res.status(200).json({ message: "Email başarıyla gönderildi!" });
  } catch (error) {
    console.error("Email gönderim hatası:", error);
    res
      .status(500)
      .json({ message: "Email gönderiminde bir hata oluştu.", error });
  }
});
//contact e-mail ile
app.post("/contact-email", async (req, res) => {
  const { name, surname, emailAddres, telNo, subject, buildName, message } =
    req.body;

  let transporter = nodemailer.createTransport({
    host: `${host}`, // Hosting sağlayıcınızdan alacağınız SMTP sunucusu
    port: mail_port, // Genellikle SSL için 465, TLS için 587 kullanılır
    secure: secure, // true for SSL (465 portu), false for TLS (587 portu)
    auth: {
      user: `${admin_mail}`, // Kendi domain email adresiniz
      pass: `${admin_pass}`, // E-posta adresiniz için oluşturduğunuz şifre
    },
  });

  const mailOptions = {
    from: `"${name} ${surname}" <${admin_mail}>`, // Kullanıcının adını gösteriyoruz, ama gönderici admin maili
    replyTo: emailAddres, // Yanıt adresi kullanıcı e-postası
    to: `${admin_mail}`, // Admin e-postası
    subject: `Yeni İletişim Mesajı: ${subject}`,
    text: `
      İsim: ${name} ${surname}
      E-Posta: ${emailAddres}
      Telefon: ${telNo}
      Bina: ${buildName}
      Mesaj: ${message}
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).send("E-posta başarıyla gönderildi!");
  } catch (error) {
    res.status(500).send("E-posta gönderilirken bir hata oluştu.");
  }
});

//E-postaları bulmak için
app.post("/get-emails", middlewareAuth, async (req, res) => {
  const { buildings } = req.body; // İstek gövdesinden bina isimlerini al
  try {
    // Bina isimlerine göre kullanıcıları bul
    const users = await User.find({ buildName: { $in: buildings } });

    // Kullanıcıların e-posta adreslerini çıkar
    const emails = users.map((user) => user.emailAddres);
    return res.json({ emails });
  } catch (error) {
    console.error("Hata:", error);
    return res.status(500).json({ message: "Sunucu hatası" });
  }
});

//Kira&Aidat SMS
// app.post("/send-kira-sms", middlewareAuth, async (req, res) => {
//   let { phoneNumber, message } = req.body;

//   phoneNumber = formatPhoneNumber(phoneNumber);

//   try {
//     await sendSMS(phoneNumber, message);
//     res.status(200).json({ message: "SMS başarıyla gönderildi" });
//   } catch (error) {
//     console.error("SMS gönderme hatası:", error);
//     res.status(500).json({ error: "SMS gönderilirken bir hata oluştu" });
//   }
// });
// app.post("/send-aidat-sms", middlewareAuth, async (req, res) => {
//   let { phoneNumber, message } = req.body;

//   phoneNumber = formatPhoneNumber(phoneNumber);

//   try {
//     await sendSMS(phoneNumber, message);
//     res.status(200).json({ message: "SMS başarıyla gönderildi" });
//   } catch (error) {
//     console.error("SMS gönderme hatası:", error);
//     res.status(500).json({ error: "SMS gönderilirken bir hata oluştu" });
//   }
// });

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
