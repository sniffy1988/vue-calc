<template>
  <v-row justify="center" align="center">
    <v-col cols="12" sm="8" md="10">
      <v-card class="mb-16">
        <v-card-title class="ma-4">
          <product-adder />
        </v-card-title>
      </v-card>
      <v-card>
        <v-card-text>
          <v-data-table
            v-model="selected"
            :headers="headers"
            :items="products"
            item-key="name"
            show-select
            class="elevation-1"
          >
            <template #item.total="{ item }">
              {{ item.price * item.quantity }}
            </template>
          </v-data-table>
        </v-card-text>
        <v-card-actions class="px-4 pb-4">
          <v-btn v-if="selected.length" @click="deleteSelected">Delete</v-btn>
          <v-spacer></v-spacer>
          <v-text-field
            name="Total"
            :value="getTotal"
            readonly
            prefix="Total: $"
            solo
            dense
            flat
            class="text-right total-input"
          ></v-text-field>
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import { mapGetters, mapState } from 'vuex'
import ProductAdder from '~/components/ProductAdder.vue'

export default {
  name: 'IndexPage',
  components: { ProductAdder },
  data() {
    return {
      selected: [],
      headers: [
        {
          text: 'Product Name',
          align: 'start',
          value: 'name',
        },
        { text: 'Price', value: 'price' },
        { text: 'Qty', value: 'quantity' },
        {
          text: 'Total',
          value: 'total',
          sortable: false,
        },
      ],
    }
  },
  computed: {
    ...mapGetters({
      getTotal: 'getTotal',
    }),
    ...mapState({
      products: (state) => state.products,
    }),
  },
  watch: {
    products: {
      handler() {
        this.selected = []
      },
      deep: true,
    },
  },
  methods: {
    async deleteSelected() {
      const message = await this.$store.dispatch(
        'deleteProducts',
        this.selected
      )
      this.$toast.success(message)

      setTimeout(() => {
        this.$toast.clear()
      }, 2000)
    },
  },
}
</script>

<style lang="scss" scoped>
.total-input {
  width: 300px;
  flex-grow: 0;
}
</style>
