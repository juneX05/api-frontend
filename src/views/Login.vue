<template>
    <v-col cols="12">
        <v-card>
            <v-form>
                <v-row justify-center align-center>
                    <v-col cols="12">
                        <v-text-field
                                label="E-mail"
                                v-model="form.email"
                        ></v-text-field>
                    </v-col>

                    <v-col cols="12">
                        <v-text-field
                                name="password"
                                label="Enter your password"
                                v-model="form.password"
                        ></v-text-field>
                    </v-col>

                </v-row>

                <v-btn color="success" @click="login">Submit</v-btn>
            </v-form>
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
                }
            }
        },
        methods:{
            login() {
                this.$axios.post('login', this.form)
                    .then( ({data}) => {
                        this.$store.dispatch('setToken', data);
                        this.$router.push({name: 'secret'});
                    })
                    .catch(errors => {
                        console.dir(errors);
                    });
            },
        }
    }
</script>

<style>

</style>