<template>
  <div>
    <div class="page-subtitle">
      <h4>{{'Create' | localize}}</h4>
    </div>
    <form @submit.prevent="submitHandler">
      <div class="input-field">
        <input
          id="name"
          type="text"
          v-model.trim="title"
          :class="{ invalid: $v.title.$dirty && !$v.title.required }"
        />
        <label for="name">{{'Message_CategoryTitle' | localize}}</label>
        <span
          class="helper-text invalid"
          v-if="$v.title.$dirty && !$v.title.required"
          >{{'Title' | localize}}</span
        >
      </div>

      <div class="input-field">
        <input
          id="limit"
          type="number"
          v-model.number="limit"
          :class="{ invalid: $v.limit.$dirty && !$v.limit.minValue }"
        />
        <label for="limit">{{'Limit' | localize}}</label>
        <span
          v-if="$v.limit.$dirty && !$v.limit.minValue"
          class="helper-text invalid"
          >{{'Message_MinLength' | localize}}</span
        >
      </div>

      <button class="btn waves-effect waves-light" type="submit">
        {{'Create' | localize}}
        <i class="material-icons right">send</i>
      </button>
    </form>
  </div>
</template>
<script>
import localize from '../filters/localize.filter'
import { required, minValue } from "vuelidate/lib/validators";
export default {
  data: () => ({
    title: "",
    limit: 100
  }),
  validations: {
    title: { required },
    limit: { minValue: minValue(100) }
  },
  mounted() {
    M.updateTextFields();
  },
  methods: {
    async submitHandler() {
      if (this.$v.$invalid) {
        this.$v.$touch();
        return;
      }
      const categoryData = {
        title: this.title,
        limit: this.limit
      };
      try {
        const category = await this.$store.dispatch("createCategory", categoryData);
        this.title = ''
        this.limit = 100
        this.$v.$reset()
        this.$message(`${localize('Category_HasBeenCreated')}`)
        this.$emit('created', category)
      } catch (error) {
        console.log(error);
      }
    }
  }
};
</script>
