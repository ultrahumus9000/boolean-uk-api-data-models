function getRamdomInt(array) {
  return Math.floor(Math.random() * array.length);
}
function errorHandler(error) {
  return error.message ? error.message : error;
}
async function checker(client, id) {
  const result = await client.findUnique({
    where: {
      id,
    },
  });
  return result ? result : false;
}
module.exports = { errorHandler, getRamdomInt, checker };
