const { reviewCreate } = require("../services/reviewscrud");
const { errorHandler, responseMessage } = require("../utils/errorHandler");

exports.reviewProduct = async (req, res) => {
  try {
    const id = req.params.id;
    const { rating, comment } = req.body;

    // Validate rating
    if (!rating) {
      return responseMessage(
        res,
        400,
        null,
        "Rating is a mandatory field",
        false
      );
    }

    // Call the review service function
    const updatedProduct = await reviewCreate(id, rating, comment);

    return responseMessage(
      res,
      201,
      updatedProduct,
      "Review added successfully",
      true
    );
  } catch (error) {
    return errorHandler(error, res);
  }
};
