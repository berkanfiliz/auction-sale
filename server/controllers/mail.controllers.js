const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "berkan212010@gmail.com",
    pass: "lhfotuomqlouyncw",
  },
});
const sendEmail = (req, res) => {
  const { to, subject, text } = req.body;

  const mailOptions = {
    from: "ihale-sitesi@gmail.com",
    to,
    subject,
    text,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
      res.status(500).send("E-posta gönderilirken bir hata oluştu.");
    } else {
      console.log("E-posta gönderildi: " + info.response);
      res.status(200).send("E-posta başarıyla gönderildi.");
    }
  });
};
module.exports = {
  sendEmail,
};
