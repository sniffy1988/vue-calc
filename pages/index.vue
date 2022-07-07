<template>
  <v-row justify="center" align="center">
    <v-col cols="12" sm="8" md="10">
      <v-card class="mb-16">
        <v-card-title class="ma-4">
          <div class="headline flex row items-center pt-4">
            <v-text-field placeholder="Search for products" filled  class="mr-3"/>
            <v-text-field placeholder="price"   class="mr-3" filled />
            <v-text-field placeholder="Qty"  class="mr-3" filled />
            <v-btn>Add</v-btn>
          </div>
        </v-card-title>
      </v-card>
      <v-card>
        <v-card-text>
          <v-data-table
            v-model="selected"
            :headers="headers"
            :items="desserts"
            :single-select="false"
            item-key="name"
            show-select
            class="elevation-1"
          >
          </v-data-table>
        </v-card-text>
        <v-card-actions class="px-4 pb-4">
          <v-btn>Delete</v-btn>
          <v-spacer></v-spacer>
          <div>Total: 1020</div>
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: 'IndexPage',
    data () {
      return {
        selected: [],
        headers: [
          {
            text: 'Product Name',
            align: 'start',
            sortable: false,
            value: 'name',
          },
          { text: 'Price', value: 'calories' },
          { text: 'Qty', value: 'fat' },
          { text: 'Total', value: 'carbs' },
        ],
        desserts: [
          {
            name: 'Frozen Yogurt',
            calories: 159,
            fat: 6.0,
            carbs: 24,
            protein: 4.0,
            iron: '1%',
          },
          {
            name: 'Ice cream sandwich',
            calories: 237,
            fat: 9.0,
            carbs: 37,
            protein: 4.3,
            iron: '1%',
          },
          {
            name: 'Eclair',
            calories: 262,
            fat: 16.0,
            carbs: 23,
            protein: 6.0,
            iron: '7%',
          },
          {
            name: 'Cupcake',
            calories: 305,
            fat: 3.7,
            carbs: 67,
            protein: 4.3,
            iron: '8%',
          },
          {
            name: 'Gingerbread',
            calories: 356,
            fat: 16.0,
            carbs: 49,
            protein: 3.9,
            iron: '16%',
          },
          {
            name: 'Jelly bean',
            calories: 375,
            fat: 0.0,
            carbs: 94,
            protein: 0.0,
            iron: '0%',
          },
          {
            name: 'Lollipop',
            calories: 392,
            fat: 0.2,
            carbs: 98,
            protein: 0,
            iron: '2%',
          },
          {
            name: 'Honeycomb',
            calories: 408,
            fat: 3.2,
            carbs: 87,
            protein: 6.5,
            iron: '45%',
          },
          {
            name: 'Donut',
            calories: 452,
            fat: 25.0,
            carbs: 51,
            protein: 4.9,
            iron: '22%',
          },
          {
            name: 'KitKat',
            calories: 518,
            fat: 26.0,
            carbs: 65,
            protein: 7,
            iron: '6%',
          },
        ],
      }
    },
  }
</script>
}
</script>
