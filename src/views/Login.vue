<template>
    <v-col cols="12" sm="8" md="6">
        <v-card>
            <v-row justify="center" align="center">
                <v-card-title>Login</v-card-title>
            </v-row>
            <v-divider />
            <v-col cols="12">
                <v-form>
                    <v-row justify-center align-center >
                        <v-col cols="12">
                            <v-text-field
                                    label="E-mail"
                                    v-model="form.email"
                            ></v-text-field>
                        </v-col>

                        <v-col cols="12">
                            <v-text-field
                                    name="password"
                                    label="Password"
                                    v-model="form.password"
                            ></v-text-field>
                        </v-col>

                    </v-row>
                </v-form>
            </v-col>
            <v-divider />
            <v-card-actions>
                <v-row align="center" justify="center">
                    <v-btn color="success" :loading="loading" @click="login">Login</v-btn>
                </v-row>
            </v-card-actions>
        </v-card>
    </v-col>
</template>

<script>
    export default {
        data(){
            return{
                form:{
                    email:'',
                    password:'',
                },
                loading:false
            }
        },
        methods:{
            login() {
                this.loading = true;
                this.$axios.post('login', this.form)
                    .then( ({data}) => {
                        this.$store.dispatch('setToken', data);
                        this.$router.push({name: 'secret'});
                        this.loading = false;
                    })
                    .catch(() => {
                        this.loading = false;
                    });
            },
        }
    }
</script>

<style>

</style>