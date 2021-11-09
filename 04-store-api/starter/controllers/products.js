const Product = require('../models/product')

const getAllProductsStatic = async(req, res) => {
  
  const products = await Product.find({
    price: { $gt: 30 }
  })
    .sort('price')
    .select('name price')
    // .limit(10)
    // .skip(1)
  res.status(200).json({ products, nbHits: products.length })
}
const getAllProducts = async(req, res) => {
  const { 
    featured, 
    company, 
    name,
    sort,
    fields,
    numericFilters,
  } = req.query

  const queryObject = {}
  
  if(featured) {
    queryObject.featured = featured === 'true' ? true : false
  }
  if(company) {
    queryObject.company = company
  }
  if(name){
    queryObject.name = { $regex: name, $options: 'i'}
  }

  // looking at operators in the query coming from req.query. 
  // converting them to regEx operators so that mongoose operators can parse them and 
  // read and operate them in the program
  if(numericFilters) {
    const operatorMap = {
      '>' : '$gt',
      '>=' : '$gte',
      '=' : '$eq',
      '<' : '$lt',
      '<=': '$lte'
    }
    const regEx = /\b(>|>=|=|<|<=)\b/g
    let filters = numericFilters.replace(regEx, (match) => `-${operatorMap[match]}-`)
    
    const options = ['price', 'rating']
    filters = filters.split(',').forEach(item => {
      // spliting the field
      const [field, operator, value] = item.split('-') 
      if(options.includes(field)){
        queryObject[field] = {[operator]: Number(value)}
      }
    })
  }

  console.log(queryObject)
  let result = Product.find(queryObject)
  
  // SORT FUNCTIONALITY
  // client may not be sending in sort, so we conditionally sort them out
  if(sort) {
    const sortList = sort.split(',').join(' ');
    result = result.sort(sortList)
  } else {
    result = result.sort('createdAt')
  }

  if(fields){
    console.log(fields)
    const fieldsList = fields.split(',').join(' ')
    result = result.select(fieldsList)
  }

  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  result = result.skip(skip).limit(limit);
  // 23 products
  // 23 / 7 pages = 4 pages (7, 7, 7, 2)

  const products = await result;
  res.status(200).json({ nbHits: products.length, products })
}

module.exports = { getAllProducts, getAllProductsStatic }