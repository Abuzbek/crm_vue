<template>
  <div>
    <div class="page-title">
      <h3>Счет</h3>

      <button class="btn waves-effect waves-light btn-small">
        <i class="material-icons">refresh</i>
      </button>
    </div>
    <Loader v-if="loading" />
    <div class="row" v-else>
      <HomeBill />
      <HomeCurrency />
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import HomeBill from "@/components/HomeBill";
import HomeCurrency from "@/components/HomeCurrency";
export default {
  name: "Home",
  data:()=>({
    loading:true,
    currancy:null
  }),
  components: {
    HomeBill,
    HomeCurrency
  }
};
</script>
