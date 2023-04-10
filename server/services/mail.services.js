// Mail gönderme işlemi

const nodemailer = require("nodemailer");

const PDFDocument = require("pdfkit");
const fs = require("fs");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "berkan212010@gmail.com",
    pass: "lhfotuomqlouyncw",
  },
});

const sendMail = (kazanan, ihale) => {
  const doc = new PDFDocument({ font: "Times-Roman" });
  const filename = `ihale_${ihale._id}.pdf`;
  const outputDir = "./public/files";
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir);
  }
  doc.pipe(fs.createWriteStream(`${outputDir}/${filename}`));
  doc.fontSize(20).fillColor("red").text("Ihale Bilgileri", { align: "center" }).moveDown();
  doc.fontSize(14).fillColor("red").text("Ihale No: ", { continued: true }).fillColor("black").text(ihale._id).moveDown();
  doc.fontSize(14).fillColor("red").text("Baslik: ", { continued: true }).fillColor("black").text(ihale.baslik).moveDown();
  doc.fontSize(14).fillColor("red").text("Aciklama: ").fillColor("black").text(ihale.aciklama).moveDown();
  doc.fontSize(14).fillColor("red").text("Baslangic Fiyat: ", { continued: true }).fillColor("black").text(ihale.baslangic_fiyat).moveDown();
  doc.fontSize(14).fillColor("red").text("Kategori: ", { continued: true }).fillColor("black").text(ihale.kategori).moveDown();
  doc.image(`./public/${ihale.image_urls[0]}`, {
    fit: [500, 500],
    align: "center",
  });
  doc.font("Times-Roman");

  // doc.font("Helvetica");
  doc.fillColor("black");
  doc.end();

  const mailOptions = {
    from: "berkan212010@gmail.com",
    to: kazanan,
    subject: "Ihaleyi Kazandınız",
    text: `Tebrikler ${ihale._id} numaralı ihaleyi kazandınız.\nTeklif Detayları aşağıda mevcuttur\nİYİ GUNLERDE KULLANIN`,
    attachments: [
      {
        filename: filename,
        path: `${outputDir}/${filename}`,
        // content: fs.createReadStream(`${outputDir}/${filename}`),
      },
    ],
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("E-posta gönderildi: " + info.response);
    }
    fs.unlinkSync(`${outputDir}/${filename}`);
  });
};

module.exports = {
  sendMail,
};
