<template>
  <v-form
    ref="adderForm"
    class="headline flex row items-center pt-4"
    @submit.prevent="addProduct"
  >
    <v-text-field
      v-model="name"
      :placeholder="$t('app.product_name')"
      filled
      class="mr-3"
      :rules="[notEmpty]"
    />
    <v-text-field
      v-model.number="price"
      :placeholder="$t('app.product_price')"
      class="mr-3"
      filled
      :rules="[notEmpty, priceIsValid]"
      type="number"
      suffix="$"
    />
    <v-text-field
      v-model.number="qty"
      :placeholder="$t('app.product_quantity')"
      class="mr-3"
      filled
      :rules="[notEmpty, qtyIsValid]"
      type="number"
    />
    <v-btn class="mt-3" type="sumbit">{{ $t('app.add') }}</v-btn>
  </v-form>
</template>

<script lang="ts">
import { VForm } from 'products-types'
import Vue from 'vue'

export default Vue.extend({
  name: 'ProductAdder',
  data(): {
    name: string
    price: string
    qty: string
  } {
    return {
      name: '',
      price: '',
      qty: '',
    }
  },
  computed: {
    form(): VForm {
      return this.$refs.adderForm as VForm
    },
  },
  methods: {
    async addProduct(): Promise<any> {
      const validation = this.form.validate()

      if (validation) {
        try {
          // second part of validation to check if product exist or if it's new

          const message: string = await this.$store.dispatch('addProduct', {
            name: this.name,
            price: parseFloat(this.price),
            quantity: parseInt(this.qty, 10),
          })
          this.name = ''
          this.price = ''
          this.qty = ''
          this.form.reset()

          this.$toast.success(message)

          setTimeout(() => {
            this.$toast.clear()
          }, 2000)
        } catch (e: any) {
          this.$toast.error(e.message)

          setTimeout(() => {
            this.$toast.clear()
          }, 5000)
        }
      }
    },
    notEmpty(value: any): any {
      return value !== '' || 'Required'
    },
    priceIsValid(value: any): any {
      return value > 0 || 'Price must be greater than 0'
    },
    qtyIsValid(value: any): any {
      return value > 0 || 'Qty must be greater than 0'
    },
  },
})
</script>
