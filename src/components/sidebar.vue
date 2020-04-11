<template>
  <v-list dense>
      <template v-for="(item, index) in navbar_items">
              <v-list-item v-if="!$vuetify.breakpoint.mdAndUp" :exact="item.meta.exact" :to="{name:item.name}" :key="'nav'+index">
                  <v-list-item-action>
                      <v-icon>{{item.meta.icon}}</v-icon>
                  </v-list-item-action>
                  <v-list-item-content>
                      <v-list-item-title>{{item.meta.title}}</v-list-item-title>
                  </v-list-item-content>
              </v-list-item>
      </template>
      <template v-for="(item, index) in sidebar_items">
              <v-list-item v-if="authRoute(item) && !item.children" :exact="item.meta.exact" :to="{name:item.name}" :key="index">
                  <v-list-item-action>
                      <v-icon>{{item.meta.icon}}</v-icon>
                  </v-list-item-action>
                  <v-list-item-content>
                      <v-list-item-title>{{item.meta.title}}</v-list-item-title>
                  </v-list-item-content>
              </v-list-item>
      </template>
  </v-list>
</template>


<script>
    import sidebar_items from '../router/sidebar_routes'
    import navbar_items from '../router/navbar_routes'
export default {
    data: () => ({
        sidebar_items:sidebar_items,
        navbar_items:navbar_items,
    }),
    methods:{
        authRoute(item){
            if(item.meta.auth){
                return this.$store.state.token !== null;
            }
            else{
                return this.$store.state.token === null
            }
        }
    }
}

</script>


