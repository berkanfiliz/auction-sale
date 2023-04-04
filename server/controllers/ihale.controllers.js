const ihaleServices = require("../services/ihale.services");
const userServices = require("../services/user.services");
const ihaleModel = require("../models/ihale.model");

const fetchAll = async (req, res) => {
  try {
    const ihale = await ihaleServices.getAllihale();
    res.status(200).json({ success: true, ihale });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

const fetch = async (req, res) => {
  try {
    const ihale = await ihaleServices.getihale(req.params.id);
    if (!ihale) {
      throw Error("Geçersiz id");
    }
    return res.status(200).json({ success: true, ihale });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// const createIhale = async (req, res) => {
//   try {
//     const ihale = await ihaleServices.createihale(req.body);
//     res.status(201).json({ success: true, message: "Successfully created", ihale });
//   } catch (error) {
//     res.status(400).json({ success: false, message: error.message });
//   }
// };
const createIhale = async (req, res) => {
  try {
    const { body, files } = req;

    // Map uploaded images to image_url array
    const image_url = files.map((file) => file.path.replace("public/", ""));

    const ihale = await ihaleModel.create({ ...body, image_urls: image_url });

    res.status(201).json({ success: true, message: "Successfully created", ihale });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

const updateIhale = async (req, res) => {
  try {
    const ihale = await ihaleServices.updateihale(req.params.id, req.body);
    if (!ihale) {
      throw Error("Geçersiz id");
    }
    return res.status(200).json({ success: true, message: "Successfully updated ", data: ihale });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

const deleteIhale = async (req, res) => {
  try {
    const ihale = await ihaleServices.deleteihale(req.params.id);
    if (!ihale) {
      throw Error("Geçersiz id");
    }
    res.status(200).json({ success: true, message: "Successfully deleted" });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

const fetchWithCategoryFilter = async (req, res) => {
  try {
    const categori = req.params.id;
    const ihale = await ihaleServices.getwithcategoryfilter(categori);
    if (!ihale) {
      throw Error("Kategori bulunamadi");
    }
    res.status(200).json({ success: true, ihale });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};
const fetchIhaleWithCreatorId = async (req, res) => {
  try {
    const user = await userServices.getuserwithid(req.params.id);
    if (!user) {
      throw Error("Kullanici bulunamadi");
    }
    const ihaleler = await ihaleModel.find({ olusturan_id: req.params.id });
    res.status(200).json({ success: true, ihaleler });
    //const ihale = ihaleModel.
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

module.exports = {
  fetchAll,
  fetch,
  createIhale,
  updateIhale,
  deleteIhale,
  fetchWithCategoryFilter,
  fetchIhaleWithCreatorId,
};
