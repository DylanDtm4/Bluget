import mongoose from "mongoose";

function validateObjectId(paramName, entityName) {
  return (req, res, next) => {
    const id = req.params[paramName];
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: `Invalid ${entityName} ID` });
    }
    next();
  };
}

export const validateUserId = validateObjectId("userId", "user");
export const validateMonthId = validateObjectId("monthId", "month");
export const validateTransactionId = validateObjectId(
  "transactionId",
  "transaction"
);
