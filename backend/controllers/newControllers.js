const News = require("../models/News");
const mongoose = require("mongoose");

const newControllers = {
  index: async (req, res) => {
    let page = req.query.page;
    let limit = 6;

    let news = await News.find()
      .skip((page - 1) * limit)
      .limit(limit)
      .sort({ createdAt: -1 });

    let totalCount = await News.countDocuments();
    let totalPageCount = Math.ceil(totalCount / limit);

    let datalink = {
      previousPage: page == 1 ? false : true,
      nextPage: totalPageCount == page ? false : true,
      currentPage: page,
      loopLinks: [],
    };

    for (i = 0; i < totalPageCount; i++) {
      let number = i + 1;
      datalink.loopLinks.push({ loopNumber: number });
    }

    let response = {
      datalink: datalink,
      data: news,
    };

    return res.status(200).json(response);
  },
  store: async (req, res) => {
    let { title, description, author, type } = req.body;

    const news = await News.create({ title, description, author, type });

    return res.status(200).json(news);
  },
  show: async (req, res) => {
    try {
      let { id } = req.params;
      if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: "Invalid ID" }); // id not the same
      }
      const news = await News.findById(id);

      if (!news) {
        return res.status(404).json({ message: "News not found" });
      }
      return res.status(200).json(news);
    } catch (error) {
      return res.status(500).json({ message: "Internal Server Error" });
    }
  },
  destory: async (req, res) => {
    try {
      let { id } = req.params;
      if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: "Invalid ID" }); // id not the same
      }
      const news = await News.findByIdAndDelete(id);

      if (!news) {
        return res.status(404).json({ message: "News not found" });
      }
      return res
        .status(200)
        .json({ message: "delete successfully", data: news });
    } catch (error) {
      return res.status(500).json({ message: "Internal Server Error" });
    }
  },
  update: async (req, res) => {
    try {
      let { id } = req.params;
      // let { title, description, author, type } = req.body;
      if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: "Invalid ID" }); // id not the same
      }
      const news = await News.findByIdAndUpdate(id, { ...req.body });

      if (!news) {
        return res.status(404).json({ message: "News not found" });
      }

      let updateNews = await News.findById(id);

      return res.status(200).json({
        message: "update successfully",
        data: updateNews,
      });
    } catch (error) {
      return res.status(500).json({ message: "Internal Server Error" });
    }
  },
};

module.exports = newControllers;
