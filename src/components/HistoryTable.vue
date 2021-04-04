<template>
  <table>
    <thead>
      <tr>
        <th>#</th>
        <th>{{'Amount' | localize}}</th>
        <th>{{'Date' | localize}}</th>
        <th>{{'Category' | localize}}</th>
        <th>{{'Type' | localize}}</th>
        <th>{{'Open' |localize}}</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(rec,i) in records" :key="rec.id">
        <td>{{i + 1}}</td>
        <td>{{rec.amount | currency('RUB')}}</td>
        <td>{{rec.data | date('datetime')}}</td>
        <td>{{rec.categoryName}}</td>
        <td>
          <span class="white-text badge" :class="[rec.typeClass]">{{rec.typeTitle}}</span>
        </td>
        <td>
          <button v-tooltip="'Havolani oching'" class="btn-small btn" @click="$router.push('/detail/'+rec.id)">
            <i class="material-icons">open_in_new</i>
          </button>
        </td>
      </tr>
    </tbody>
  </table>
</template>
<script>
export default {
  name:'HistoryTable',
  props:{
    records:{
      type:Array,
      required:true
    }
  }
}
</script>
