const { getProducts } = require("./services/api");
const { printProducts } = require("./utils/formatter");

async function main() {
  try {
    const products = await getProducts();
    const cheapProducts = products.filter(p => p.price < 50);

    console.log("Productos menores a USD 50:");
    printProducts(cheapProducts);
  } catch (error) {
    console.error("Error:", error.message);
  }
}

main();