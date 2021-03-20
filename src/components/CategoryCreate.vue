<template>
  <div>
    <div class="page-subtitle">
      <h4>Создать</h4>
    </div>

    <form @submit.prevent="submitHandler">
      <div class="input-field">
        <input
          id="name"
          type="text"
          v-model.trim="title"
          :class="{ invalid: $v.title.$dirty && !$v.title.required }"
        />
        <label for="name">Название</label>
        <span
          class="helper-text invalid"
          v-if="$v.title.$dirty && !$v.title.required"
          >Введите название</span
        >
      </div>

      <div class="input-field">
        <input
          id="limit"
          type="number"
          v-model.number="limit"
          :class="{ invalid: $v.limit.$dirty && !$v.limit.minValue }"
        />
        <label for="limit">Лимит</label>
        <span
          v-if="$v.limit.$dirty && !$v.limit.minValue"
          class="helper-text invalid"
          >Минимальная величина</span
        >
      </div>

      <button class="btn waves-effect waves-light" type="submit">
        Создать
        <i class="material-icons right">send</i>
      </button>
    </form>
  </div>
</template>
<script>
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
      console.log(this.limit, this.title);
      const categoryData = {
        title: this.title,
        limit: this.limit
      };
      try {
        const category = await this.$store.dispatch("createCategory", categoryData);
        console.log(category);
        this.title = ''
        this.limit = 100
        this.$v.$reset()
        this.$message(`muaffaqwiyatli qo'shildi`)
      } catch (error) {
        console.log(error);
      }
    }
  }
};
</script>
