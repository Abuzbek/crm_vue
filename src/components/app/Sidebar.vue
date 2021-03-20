<template>
  <ul class="sidenav app-sidenav" :class="{open: value}">
     <router-link 
      v-for="link in links"
      :key="link.url"
      tag="li"
      exact
      active-class="active"
      :to="link.url"
     >
      <a href="#" class="waves-effect waves-orange pointer">{{link.title}}</a>
    </router-link>
  </ul>
</template>
<script>
export default {
  props:['value'],
  data:()=>({
    links:[
      {title:'Счет',url:'/'},
      {title:'История',url:'/history'},
      {title:'Планирование',url:'/planning'},
      {title:'Новая запись',url:'/record'},
      {title:'Категории',url:'/categories'},
    ]
  })
}
</script>
