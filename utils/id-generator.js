const generator_unique_verID = async (model) => {
  try {
    let ID = await model.findOne().sort({ _id: -1 }).limit(1);
    if (!ID) {
      ID = 1243;
    } else {
      const { verID } = ID;
      ID = verID + 4;
    }
    return ID;
  } catch (error) {
    throw error;
  }
};

module.exports = { generator_unique_verID };