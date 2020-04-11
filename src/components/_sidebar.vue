<template>
  <v-list dense>
      <template v-for="(item, index) in sidebar_items">
              <v-list-item v-if="authRoute(item) && !item.children" :exact="item.meta.exact" :to="{name:item.name}" :key="index">
                  <v-list-item-action>
                      <v-icon>{{item.meta.icon}}</v-icon>
                  </v-list-item-action>
                  <v-list-item-content>
                      <v-list-item-title>{{item.meta.title}}</v-list-item-title>
                  </v-list-item-content>
              </v-list-item>


              <v-list-group v-if="authRoute(item) && item.children" :value="$route.name === item.name" no-action :key="index">
                  <template v-slot:activator>
                      <v-list-item-action>
                          <v-icon>{{item.meta.icon}}</v-icon>
                      </v-list-item-action>
                      <v-list-item-content>
                          <v-list-item-title>{{item.meta.title}}</v-list-item-title>
                      </v-list-item-content>
                  </template>

                  <template v-for="(child,child_index) in item.children">
                      <v-list-item v-if="!child.children" :exact="child.meta.exact" :to="{name:child.name}" :key="child_index">
                          <v-list-item-action>
                              <v-icon>{{child.meta.icon}}</v-icon>
                          </v-list-item-action>
                          <v-list-item-content>
                              <v-list-item-title>{{child.meta.title}}</v-list-item-title>
                          </v-list-item-content>
                      </v-list-item>

                      <v-list-group :value="$route.name === child.name" v-if="child.children" no-action sub-group prepend-icon="mdi-chevron-down" :key="child_index">
                          <template v-slot:activator>
                              <v-list-item-action>
                                  <v-icon>{{child.meta.icon}}</v-icon>
                              </v-list-item-action>
                              <v-list-item-content>
                                  <v-list-item-title>{{child.meta.title}}</v-list-item-title>
                              </v-list-item-content>
                          </template>

                          <template v-for="(kid,kid_index) in child.children">
                              <v-list-item :exact="kid.meta.exact" :to="{name:kid.name}" :key="kid_index">
                                  <v-list-item-action>
                                      <v-icon>{{kid.meta.icon}}</v-icon>
                                  </v-list-item-action>
                                  <v-list-item-content>
                                      <v-list-item-title>{{kid.meta.title}}</v-list-item-title>
                                  </v-list-item-content>
                              </v-list-item>
                          </template>
                      </v-list-group>
                  </template>
              </v-list-group>
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


