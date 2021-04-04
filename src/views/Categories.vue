<template>
  <div>
    <div class="page-title">
      <h3>{{'Categories' | localize}}</h3>
    </div>
    <section>
      <Loader v-if="loading" />
      <div class="row" v-else>
        <div class="col s12 m6">
          <CategoryCreate @created="addNewCategories" />
        </div>
        <div class="col s12 m6">
          <CategoryEdit
            v-if="categories.length"
            :categories="categories"
            @updated="updatedC"
            :key="categories.length + updateCount"
          />
          <p v-else class="center">{{'NoCategories' | localize}}</p>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import CategoryCreate from "@/components/CategoryCreate";
import CategoryEdit from "@/components/CategoryEdit";
export default {
  name: "categories",
  components: {
    CategoryCreate,
    CategoryEdit
  },
  data: () => ({
    categories: [],
    loading: true,
    updateCount: 0
  }),
  async mounted() {
    this.categories = await this.$store.dispatch("fetchCategories");
    this.loading = false;
  },
  methods: {
    addNewCategories(category) {
      this.categories.push(category)
    },
    updatedC(e) {
      const idx = this.categories.findIndex(c => c.id === e.id);
      this.categories[idx].title = e.title;
      this.categories[idx].limit = e.limit;
      this.updateCount++;
    }
  }
};
</script>
