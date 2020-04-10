<template>
  <div class="about">
    <h1>This is an secret page</h1>
  </div>
</template>

<script>
  export default {
    name:'secret',
    data () {
      return {
        roles: [],
      }
    },
    created(){
      this.getRoles();
    },
    methods:{
      async getRoles(){
        this.$axios.get('/roles')
        .then(({data}) => {
          this.roles = data.data;
        });
      }
    }
  }
</script>
