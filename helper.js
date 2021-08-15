const { outfit } = require("./src/database");

function getRamdomInt(array) {
  return Math.floor(Math.random() * array.length);
}
function errorHandler(error) {
  return error.message ? error.message : error;
}
async function idExsitingchecker(client, id) {
  const result = await client.findUnique({
    where: {
      id,
    },
  });
  return result ? result : false;
}

async function outfitChecker(outfitId) {
  const outfitChecker = await outfit.findUnique({
    where: {
      id: outfitId,
    },
  });
  const outfitCheckerResult = outfitChecker.purchaseId;
  const type = typeof outfitCheckerResult;
  if (type === "number") {
    return false;
  } else {
    return true;
  }
}
module.exports = {
  errorHandler,
  getRamdomInt,
  idExsitingchecker,
  outfitChecker,
};
