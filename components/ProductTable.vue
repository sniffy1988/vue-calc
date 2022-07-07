<template>
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
      <v-btn v-if="selected.length" @click="deleteSelected">{{
        $t('app.delete')
      }}</v-btn>
      <v-spacer></v-spacer>
      <v-text-field
        name="Total"
        :value="getTotal"
        readonly
        :prefix="$t('app.product_total')"
        solo
        dense
        flat
        class="text-right total-input"
      ></v-text-field>
    </v-card-actions>
  </v-card>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapGetters, mapState } from 'vuex'

export default Vue.extend({
  data(): {
    selected: Products
  } {
    return {
      selected: [],
    }
  },
  computed: {
    ...mapGetters({
      getTotal: 'getTotal',
    }),
    ...mapState({
      products: (state: any): Products => state.products,
    }),
    headers(): Array<any> {
      return [
        {
          text: this.$t('app.product_name'),
          align: 'start',
          value: 'name',
        },
        { text: this.$t('app.product_price'), value: 'price' },
        { text: this.$t('app.product_quantity'), value: 'quantity' },
        {
          text: this.$t('app.total_text'),
          value: 'total',
          sortable: false,
        },
      ]
    },
  },
  watch: {
    products: {
      handler(): void {
        this.selected = []
      },
      deep: true,
    },
  },
  methods: {
    async deleteSelected(): Promise<void> {
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
})
</script>

<style lang="scss" scoped>
.total-input {
  width: 300px;
  flex-grow: 0;
}
</style>
