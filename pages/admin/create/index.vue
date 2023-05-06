<template>
  <v-app>
    <v-container fluid>
      <v-row justify="center" align="center">
        <v-col cols="12">
          <m-header page-title="Home" :nav-data="navItems" />
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" sm="8" md="6">
          <notifications type="success" group="created" position="top center" />
          <notifications type="error" group="error" position="top center" />
        </v-col>
      </v-row>
      <v-row>
        <v-col xl="6" lg="6" md="6" cols="12">
          <v-card>
            <v-card-text>
              <v-form ref="createForm" v-model="valid">
                <v-file-input
                  v-model="form.image"
                  accept="image/*"
                  label="File input"
                  :rules="fileRules"
                  multiple
                  @click="onImageChange"
                ></v-file-input>
                <v-select
                  v-model="form.categories"
                  :items="items"
                  label="Select Categories"
                  :rules="selectRules"
                ></v-select>
                <m-input
                  v-model="form.title"
                  type="text"
                  label="Title"
                  :rules="[rules.required, rules.min]"
                />
                <m-input
                  v-model="form.description"
                  type="text"
                  label="Description"
                  :rules="[rules.required, rules.min]"
                />
                <m-input
                  v-model="form.price"
                  type="text"
                  label="Price"
                  :rules="numberRules"
                />
                <v-btn color="success" type="success" @click.prevent="createProd"
                  >Create</v-btn
                >
              </v-form>
            </v-card-text>
          </v-card>
        </v-col>
        <v-col xl="6" lg="6" md="6" cols="12">
          <v-card>
            <v-card-text>
              <v-form ref="categoryForm" v-model="validCategory">
                <v-file-input
                  v-model="categoryForm.image"
                  accept="image/*"
                  label="File input"
                  :rules="fileRules"
                  multiple
                  @click="onCategoryImageChange"
                ></v-file-input>
                <m-input
                  v-model="categoryForm.name"
                  type="text"
                  label="Category"
                  :rules="[rules.required, rules.min]"
                />
                <m-input
                  v-model="categoryForm.description"
                  type="text"
                  label="Description"
                  :rules="[rules.required, rules.min]"
                />
                <v-btn color="success" @click="createCategories"
                  >Create Categories</v-btn
                >
              </v-form>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from 'vuex'
import MHeader from '~/components/layout/M-Header'
import MInput from '@/components/M-Input'
export default {
  name: 'Index',
  components: { MHeader, MInput },
  // middleware: 'admin-middleware',
  data() {
    return {
      valid: true,
      validCategory: true,
      category: '',
      form: {
        categories: '',
        title: '',
        image: [],
        description: '',
        price: '',
        quantity: '',
      },
      categoryForm: {
        image: [],
        name: '',
        description: '',
      },
      navItems: [
        { title: 'Home', linkTo: '/admin' },
        { title: 'Create Product', linkTo: '/admin/create' },
        { title: 'Categories', linkTo: '/admin/category'}
      ],
      items: [],
      rules: {
        required: (value) => !!value || 'This field may not be empty.',
        min: (v) => (v && v.length >= 3) || 'Min 3 characters',
      },
      fileRules: [
        (v) => !!v || 'File is required',
        (v) => (v && v.size > 0) || 'File is required',
      ],
      selectRules: [(v) => !!v || 'Item is required'],
      numberRules: [
        (v) => v.length > 0 || 'This field may not be empty',
        (v) => v > 0 || 'The value must be greater than zero',
      ],
    }
  },
  computed: {
    ...mapGetters('categories', ['getCategory']),
  },
  async mounted() {
    await this.fetchCategories()
    this.selectItems()
  },
  methods: {
    ...mapActions('products', ['createProduct']),
    ...mapActions('categories', ['fetchCategories', 'createCategory']),
    ...mapMutations('products', ['setError']),
    onImageChange(e) {
      this.form.image = e.target.files[0]
    },
    onCategoryImageChange(e) {
      this.categoryForm.image = e.target.files[0]
    },

    selectItems() {
      if (this.getCategory) {
        // eslint-disable-next-line no-console
        console.log(this.getCategory, 'wedqweqwe')
        for (const item of this.getCategory) {
          this.items.push({
            text: item.name,
            value: item.id,
          })
        }
      }
    },

    message() {
      this.$notify({
        group: 'created',
        title: 'Product created',
        text: '',
        type: 'success',
        duration: 3000,
        speed: 1000,
        data: {},
      })
    },
    errorMessage() {
      this.$notify({
        group: 'error',
        title: 'Field',
        text: '',
        type: 'error',
        duration: 3000,
        speed: 1000,
        data: {},
      })
    },

    async createProd() {
      if (this.$refs.createForm.validate()) {
        const formData = new FormData()
        formData.append('image', this.form.image)
        formData.append('title', this.form.title)
        formData.append('description', this.form.description)
        formData.append('price', this.form.price)
        formData.append('categories', this.form.categories)

        const isCreated = await this.createProduct(formData)
        if (isCreated) {
          this.message()
          setTimeout(() => {
            this.form.title = ''
            this.form.description = ''
            this.form.price = ''
            this.form.categories = ''
            this.$router.push('/admin')
          }, 3000)
        } else {
          this.errorMessage()
        }
      }
    },

    async createCategories() {
      if (this.$refs.categoryForm.validate()) {
        const formData = new FormData();
        formData.append('image', this.categoryForm.image);
        formData.append('description', this.categoryForm.description);
        formData.append('name', this.categoryForm.name);

        const isCategory = await this.createCategory(formData)

        if (isCategory) {
          this.message()
          setTimeout(() => {
            this.categoryForm.name = ''
            this.categoryForm.image = ''
            this.categoryForm.description = ''
            this.$router.push('/admin')
          }, 3000)
        } else {
          this.errorMessage()
        }
      }
    },
  },
}
</script>

<style scoped></style>
