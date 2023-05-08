const ihaleModel = require("../models/ihale.model");
const userModel = require("../models/user.model");
const ihaleKazancModel = require("../models/ihalekazanc.model");
const ihaleKazancServices = require("../services/ihalekazanc.services");
const { sendMail } = require("../services/mail.services");

const endControl = () => {
  setInterval(async function () {
    console.log("Kontrol edildi");
    const currentTime = new Date();
    const ihaleler = await ihaleModel.find({ bitis_tarih: { $lt: currentTime }, durum: true });
    ihaleler.forEach(async (ihale) => {
      //İhale teklifi gelmez ise ihale durumu false yapılacak
      if (ihale.teklifler.length === 0) {
        await ihaleModel.updateOne({ _id: ihale._id }, { durum: false });
        console.log("Ihale durumu güncellendi. Teklif mevcut degil");
        return;
      }
      await ihaleKazancModel.create({ ihale_id: ihale._id, kazanan_id: ihale.teklifler[0].id, kazanan_teklif: ihale.teklifler[0].teklif });
      await ihaleModel.updateOne({ _id: ihale._id }, { durum: false });
      console.log("Ihale durumu güncellendi.");
      // Kazanan kullanıcıya mail gönderme
      const kazananUser = await userModel.findOne({ _id: ihale.teklifler[0]._id });
      console.log("Kazanan user ", kazananUser);
      console.log("Kazanan user mail = " + kazananUser.email);
      sendMail(kazananUser.email, ihale);
    });
  }, 10000 * 10);
};

module.exports = {
  endControl,
};
