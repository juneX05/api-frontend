<template>
    <v-app dark>
        <v-navigation-drawer
                v-if="!$vuetify.breakpoint.mdAndUp || isLoggedIn"
                v-model="drawer"
                :mini-variant="miniVariant"
                :clipped="clipped"
                style="max-height: 100%;"
                app
        >
            <v-list>
                <sidebar></sidebar>
            </v-list>
        </v-navigation-drawer>
        <v-app-bar
                :clipped-left="clipped"
                fixed
                app
        >
            <v-app-bar-nav-icon v-if="!$vuetify.breakpoint.mdAndUp || isLoggedIn" @click.stop="drawer = !drawer" />

            <v-toolbar-title v-text="title"/>
            <v-spacer/>

            <v-toolbar-items v-if="$vuetify.breakpoint.mdAndUp">
                <v-list-item :exact="item.meta.exact" :to="{name:item.name}" v-for="(item,index) in items"
                             :key=" 'topnav' + index ">
                    <v-list-item-content>
                        <v-list-item-title>{{item.meta.title}}</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
            </v-toolbar-items>
            <v-spacer/>
            <v-toolbar-items v-if="!isLoggedIn">
                <v-list-item :exact="true" :to="{name:'login'}">
                    <v-list-item-action>
                        <v-icon>mdi-lock</v-icon>
                    </v-list-item-action>
                    <v-list-item-content>
                        <v-list-item-title>Login</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
            </v-toolbar-items>
            <v-btn @click.prevent="logout" color="error" v-if="isLoggedIn">Logout</v-btn> &nbsp;
            <!-- <v-btn
                    text v-if="isLoggedIn"
                    @click.stop="rightDrawer = !rightDrawer"
            >
                <v-icon left>mdi-menu</v-icon>
                <div>Profile</div>
            </v-btn> -->
        </v-app-bar>
        <v-content style="padding-bottom: 0px">
            <v-container style="margin-bottom: 50px" fluid>
                <v-row align="center" justify="center">
                    <router-view :key="$route.path"></router-view>
                    <v-footer
                            absolute
                            app
                    >
                        <v-row align="center" justify="center" class="text-center">
                            <span>&copy; {{ new Date().getFullYear() }}</span>
                        </v-row>
                    </v-footer>
                </v-row>
            </v-container>
        </v-content>
        <!-- <v-navigation-drawer
                v-model="rightDrawer"
                :right="right"
                temporary
                fixed
        >
            <v-list>
                <v-list-item @click.native="right = !right">
                    <v-list-item-action>
                        <v-icon light>
                            mdi-repeat
                        </v-icon>
                    </v-list-item-action>
                    <v-list-item-title>Switch drawer (click me)</v-list-item-title>
                </v-list-item>
            </v-list>
        </v-navigation-drawer> -->
    </v-app>
</template>

<script>
    import sidebar from "./components/sidebar";
    import navbar_items from "./router/navbar_routes";
    import cookies from 'js-cookie';
    export default {
        name:'App',
        components: {sidebar},
        data() {
            return {
                items:navbar_items,
                clipped: true,
                drawer: false,
                fixed: false,
                miniVariant: false,
                right: true,
                rightDrawer: false,
                title: 'Auth in SPA'
            }
        },
        computed: {
            isLoggedIn() {
                return this.$store.state.token;
            },
        },
        created() {
            this.checkAuth();
        },
        methods: {
            navDrawer(){
                if(this.$vuetify.breakpoint.mdAndUp)
                    this.drawer = true;
                else
                    return false;
            },
            checkAuth(){
                const token = cookies.get('x-access-token');
                if (token === undefined){
                    this.$axios.post('/refresh-token')
                    .then(({data}) => {
                        this.$store.dispatch('setToken',data);
                    })
                    .catch(() => {
                        //error
                    });
                }
                else{
                    this.$store.commit('SET_TOKEN',token);
                }
            },
            logout() {
                this.$axios.post('logout')
                    .then( () => {
                        this.$store.dispatch('logout');
                        this.$router.push('/');
                    })
                    .catch(errors => {
                        console.dir(errors);
                    });
            }
        }
    }
</script>

<style>
    .v-application--is-ltr .v-list-item__action:first-child, .v-application--is-ltr .v-list-item__icon:first-child {
        margin-right: 10px;
    }
    .v-application--is-ltr .v-list-group--no-action>.v-list-group__items>.v-list-item {
        padding-left: 52px;
    }
    .v-application--is-ltr .v-list--dense .v-list-group--sub-group .v-list-group__header {
        padding-left: 52px;
    }
    .v-list-group--sub-group .v-list-item__action{
        margin-right: 10px;
    }
    .v-application--is-ltr .v-list-group--sub-group .v-list-item__action:first-child, .v-application--is-ltr .v-list-group--sub-group .v-list-item__avatar:first-child, .v-application--is-ltr .v-list-group--sub-group .v-list-item__icon:first-child {
        margin-right: 16px;
        align-self: center;
    }
    .v-list-item--link:before {
        background-color: gray;
    }
    .v-application a {
        color: #ffffff !important;
    }
</style>