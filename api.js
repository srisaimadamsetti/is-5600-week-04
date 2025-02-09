const path = require("path");
const Products = require("./products");
const autoCatch = require("./lib/auto-catch");

/**
 * Handle the root route
 * @param {object} req
 * @param {object} res
 */
function handleRoot(req, res) {
  res.sendFile(path.join(__dirname, "/index.html"));
}


async function getProduct(req, res, next) {
  const { id } = req.params;
    const product = await Products.get(id);
    if (!product) {
      return next()
    }
    return res.json(product);

}

/**
 * List all products
 * @param {object} req
 * @param {object} res
 */
async function listProducts(req, res) {


  // Extract the limit and offset query parameters
  const { offset = 0, limit = 25, tag } = req.query;
    res.json(await Products.list({
      offset: Number(offset),
      limit: Number(limit),
      tag,
    })); // use products service/model
}

async function createProduct(req, res) {
  console.log("request body:", req.body)
  res.json(req.body)
}

async function editProduct(req, res, next){
  res.json(req.body)
}

async function deleteProduct(req, res) {
  const { id } = req.params;
  await Products.delete(id);
  console.log(`Product ${id} was deleted`);
  res.status(202).json({ message: "Product deleted successfully" });
}

async function updateProduct(req, res) {
  const { id } = req.params;
  const updateData = req.body;
  await Products.update(id, updateData);
  console.log(`Product ${id} was updated`);
  res.status(200).json({ message: "Product updated successfully" });
}


module.exports = autoCatch({
  handleRoot,
  listProducts,
  getProduct,
  createProduct,
  editProduct,
  deleteProduct,
  updateProduct
})