// Mail gönderme işlemi

const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "berkan212010@gmail.com",
    pass: "lhfotuomqlouyncw",
  },
});

const sendMail = (kazanan, teklif, ihaleId) => {
  const mailOptions = {
    from: "berkan212010@gmail.com",
    to: kazanan,
    subject: "Ihaleyi Kazandınız",
    text: `Tebrikler ${ihaleId} numaralı ihaleyi kazandınız.\n Kazandığınız Teklif Miktarı = ${teklif} TL.\n İYİ GUNLERDE KULLANIN`,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("E-posta gönderildi: " + info.response);
    }
  });
};

module.exports = {
  sendMail,
};
