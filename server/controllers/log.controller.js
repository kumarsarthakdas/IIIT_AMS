import Log from "../mongodb/models/log.js";

const getAllLogs = async (req, res) => {
  const { _end, _start } = req.query;
  const query = {};
  try {
    const count = await Log.countDocuments({ query });
    const logs = await Log.find(query)
      .sort({ logDate: -1 })
      .limit(_end)
      .skip(_start)
      .populate("creatorName");

    res.header("x-total-count", count);
    res.header("Access-Control-Expose-Headers", "x-total-count");
    res.status(200).json(logs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export { getAllLogs };
