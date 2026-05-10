export function printProducts(products) {
  products.forEach(product => {
    console.log(`${product.id} - ${product.title} - $${product.price}`);
  });
}