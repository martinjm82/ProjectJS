const axios = require("axios");

async function getProducts() {
  const response = await axios.get("https://fakestoreapi.com/products");
  return response.data;
}

module.exports = { getProducts };