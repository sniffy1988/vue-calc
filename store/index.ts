import { GetterTree, ActionTree, MutationTree } from 'vuex'

export const state = () => ({
  products: [
    {
      name: 'Iphone',
      price: 1000,
      quantity: 2,
    },
    {
      name: 'Another Product',
      price: 2000,
      quantity: 3,
    },
    {
      name: 'Another Product 2',
      price: 3000,
      quantity: 4,
    },
  ] as Products,
})

export type RootState = ReturnType<typeof state>

export const getters: GetterTree<RootState, RootState> = {
  getTotal: (state): number => {
    return state.products.reduce((total, product) => {
      return total + product.price * product.quantity
    }, 0)
  },
  getProducts: (state) => state.products,
}

export const mutations: MutationTree<RootState> = {
  UPDATE_PRODUCT: (state, product: Product) => {
    const index = state.products.findIndex((p) => p.name === product.name)
    if (index !== -1) {
      state.products = [
        ...state.products.slice(0, index),
        product,
        ...state.products.slice(index + 1),
      ]
    }
  },
  ADD_PRODUCT: (state, product: Product) => {
    state.products.push(product)
  },
}

export const actions: ActionTree<RootState, RootState> = {
  addProduct({ state, commit }, product: Product): Promise<any> {
    // check if we have product with same name and price and if yes increase quantity
    // if new product add to products array
    // if same name and different price - show error
    return new Promise((resolve, reject) => {
      const existedProductIdx = state.products.findIndex(
        (p) => p.name === product.name
      )
      if (existedProductIdx !== -1) {
        const existedProduct = state.products[existedProductIdx]
        const isSamePrice = existedProduct.price === product.price
        if (isSamePrice) {
          const newProduct = {
            ...existedProduct,
            quantity: existedProduct.quantity + product.quantity,
          }
          commit('UPDATE_PRODUCT', newProduct)
          resolve('Product updated')
        } else {
          reject(
            new Error(
              'Items with same name and different price are not allowed'
            )
          )
        }
      } else {
        commit('ADD_PRODUCT', product)
        resolve('Product added')
      }
    })
  },
}
