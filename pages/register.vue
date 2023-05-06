<template>
  <v-app>
    <v-dialog v-model="dialog" persistent max-width="600px" min-width="360px">
      <div>
        <v-tabs v-model="tab" show-arrows background-color="deep-purple accent-4" icons-and-text dark grow>
          <v-tabs-slider color="purple darken-4"></v-tabs-slider>
          <v-tab v-for="(i, index) in tabs" :key="index">
            <nuxt-link class="nuxt_link" :to="i.urlTo">
              <v-icon large>{{ i.icon }}</v-icon>
              <div class="caption py-1">{{ i.name }}</div>
            </nuxt-link>
          </v-tab>
          <v-tab-item>
          <v-card class="px-4">
            <v-card-text>
              <v-form ref="registerForm" v-model="valid" lazy-validation>
                <v-row>
                  <v-col cols="12">
                    <m-input
                      v-model="name"
                      :rules="[rules.required]"
                      type="text"
                      label="Name"
                      maxlength="20"
                      required
                    />
                  </v-col>
                  <v-col cols="12">
                    <m-input
                      v-model="email"
                      :rules="emailRules"
                      type="email"
                      label="E-mail"
                      required
                    />
                  </v-col>
                  <v-col cols="12">
                    <m-input
                      v-model="password"
                      :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                      :rules="[rules.required, rules.min]"
                      :type="show1 ? 'text' : 'password'"
                      label="Password"
                      hint="At least 6 characters"
                      counter
                      @click:append="show1 = !show1"
                    />
                  </v-col>
                  <v-col cols="12">
                    <m-input
                      v-model="verify"
                      block
                      :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                      :rules="[rules.required, passwordMatch]"
                      :type="show1 ? 'text' : 'password'"
                      name="input-10-1" label="Confirm Password"
                      counter @click:append="show1 = !show1"
                    />
                  </v-col>
                  <v-spacer></v-spacer>
                  <v-col class="d-flex ml-auto" cols="12" sm="3" xsm="12">
                    <v-btn x-large block :disabled="!valid" color="success" @click="validate">Register</v-btn>
                  </v-col>
                </v-row>
              </v-form>
            </v-card-text>
          </v-card>
          </v-tab-item>
        </v-tabs>
      </div>
    </v-dialog>
  </v-app>
</template>

<script>
import { mapActions } from "vuex";
import MInput from "~/components/M-Input.vue";
export default {
  name: "Register",
  components: {MInput},
  auth: 'guest',
  data: () => ({
    dialog: true,
    tab: 0,
    tabs: [
      {name:"Login", icon:"mdi-account", urlTo: '/login'},
      {name:"Register", icon:"mdi-account-outline", urlTo: '/register'}
    ],
    valid: true,

    name: "",
    email: "",
    password: "",
    verify: "",
    loginEmailRules: [
      v => !!v || "Required",
      v => /.+@.+\..+/.test(v) || "E-mail must be valid"
    ],
    emailRules: [
      v => !!v || "Required",
      v => /.+@.+\..+/.test(v) || "E-mail must be valid"
    ],

    show1: false,
    rules: {
      required: value => !!value || "Required.",
      min: v => (v && v.length >= 6) || "Min 6 characters"
    }
  }),
  computed: {
    passwordMatch() {
      return () => this.password === this.verify || "Password must match";
    }
  },
  methods: {
    ...mapActions('authcustom', ['registerUser']),
    async validate() {
      if (this.$refs.registerForm.validate()) {
        await this.registerUser({
          name: this.name,
          email: this.email,
          password: this.password,
          confirm_password: this.verify
        })
        this.$router.push('/login')
      }
    },
    reset() {
      this.$refs.form.reset();
    },
    resetValidation() {
      this.$refs.form.resetValidation();
    }
  },
}
</script>

<style scoped>
.nuxt_link{
  text-decoration: none;
  color: white;
}
</style>
