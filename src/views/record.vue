<template>
  <div>
    <div class="page-title">
      <h3>{{'Menu_NewRecord' | localize}}</h3>
    </div>
    <Loader v-if="loading" />
     <p class="center" v-else-if="!category.length">
      {{'NoCategories'|localize}}.
      <router-link to="/categories">{{'AddFirst'|localize}}</router-link>
    </p>
    <form class="form" v-else @submit.prevent="submitHandler">
      <div class="input-field">
        <select ref="select" v-model="catVal">
          <option v-for="c in category" :key="c.id" :value="c.id">
            {{ c.title }}
          </option>
        </select>
        <label>{{'SelectCategory' | localize}}</label>
      </div>

      <p>
        <label>
          <input
            class="with-gap"
            name="type"
            type="radio"
            value="income"
            v-model="type"
          />
          <span>{{'Income' | localize}}</span>
        </label>
      </p>

      <p>
        <label>
          <input
            class="with-gap"
            name="type"
            type="radio"
            value="outcome"
            v-model="type"
          />
          <span>{{'Outcome' | localize}}</span>
        </label>
      </p>

      <div class="input-field">
        <input
          id="amount"
          type="number"
          v-model.number="amount"
          :class="{ invalid: $v.amount.$dirty && !$v.amount.minValue }"
        />
        <label for="amount">{{'Amount' | localize}}</label>
        <span
          v-if="$v.amount.$dirty && !$v.amount.minValue"
          class="helper-text invalid"
          >{{'Message_MinLength' | localize}} {{$v.amount.$params.minValue.min}}</span
        >
      </div>

      <div class="input-field">
        <input
          id="description"
          type="text"
          v-model="description"
          :class="{
            invalid: $v.description.$dirty && !$v.description.required
          }"
        />
        <label for="description">{{'Description' | localize}}</label>
        <span
          class="helper-text invalid"
          v-if="$v.description.$dirty && !$v.description.required"
          >{{'Message_EnterDescription' | localize}}</span
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
// import Loader from "../components/app/Loader.vue";
import { required, minValue } from "vuelidate/lib/validators";
import { mapGetters } from "vuex";
import localizeFilter from '@/filters/localize.filter'

export default {
  name: "record",
  data: () => ({
    loading: true,
    category: [],
    select: null,
    catVal: null,
    type: "outcome",
    amount: 1,
    description: "",
    
  }),
  validations: {
    amount: { minValue: minValue(1) },
    description: { required }
  },
  async mounted() {
    this.category = await this.$store.dispatch("fetchCategories");
    this.loading = false;
    if (this.category.length) {
      this.catVal = this.category[0].id;
    }
    setTimeout(() => {
      this.select = M.FormSelect.init(this.$refs.select);
      M.updateTextFields();
    }, 0);
  },
  destroyed() {
    if (this.select && this.select.destroy) {
      this.select.destroy();
    }
  },
  computed:{
    ...mapGetters(['info']),
    canCreateRecord(){
      if(this.type === 'income'){
        return true
      }
      return this.info.bill >= this.amount
    }
  },
  methods:{
    async submitHandler(){
      if (this.$v.$invalid) {
        this.$v.$touch();
        return;
      }
      if(this.canCreateRecord){
        try {
          await this.$store.dispatch('createRecord',{
            categoryId : this.catVal,
            amount:this.amount,
            description: this.description,
            type:this.type,
            data:new Date().toJSON()
          })
          const bill = this.type === 'income'
            ? this.info.bill + this.amount
            : this.info.bill - this.amount
          // const limit = this.type === 'income'
          const cat = this.category.find(c => c.id === this.catVal)
          const limit = this.type === 'income'
            ? cat.limit + this.amount
            : cat.limit - this.amount
          await this.$store.dispatch('updateCategories', {
            ...cat,
            limit: limit
          })
          await this.$store.dispatch('updateInfo', {bill})
          this.$message(localizeFilter('RecordHasBeenCreated'))
          this.$v.$reset()
          this.amount = 1
          this.description = ''
        } catch (error) {
          console.log(error);
        }
        
      }else{
        this.$message(`${localizeFilter('NotEnoughMoney')} (${this.amount -
            this.info.bill})`)
      }
    }
  }
};
</script>
