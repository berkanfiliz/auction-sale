const ihaleServices = require("../services/ihale.services");

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

const createIhale = async (req, res) => {
  try {
    const ihale = await ihaleServices.createihale(req.body);
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

const joinIhale = (req, res) => {
  //Burda ihaleye katılım gerçekleştirilecek. Bu işlemi yaparken, İhaleye katıl diyen user'ın
};

module.exports = {
  fetchAll,
  fetch,
  createIhale,
  updateIhale,
  deleteIhale,
  joinIhale,
  fetchWithCategoryFilter,
};
