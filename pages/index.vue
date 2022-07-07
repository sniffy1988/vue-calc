<template>
  <v-row justify="center" align="center">
    <v-col cols="12" sm="8" md="10">
      <v-card class="mb-16">
        <v-card-title class="ma-4">
          <product-adder />
        </v-card-title>
      </v-card>
      <product-table />
    </v-col>
  </v-row>
</template>

<script>
import ProductAdder from '~/components/ProductAdder.vue'
import ProductTable from '~/components/productTable.vue'

export default {
  name: 'IndexPage',
  components: { ProductAdder, ProductTable },
  data() {
    return {}
  },
}
</script>
