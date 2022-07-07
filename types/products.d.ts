interface Product {
  price: Float
  quantity: Int
  name: String
}

type Products = Propduct[]

declare module 'products-types' {
  export default Products
  export type Product = Product
  export type VForm = Vue & { validate: () => boolean; reset: () => void }
}
