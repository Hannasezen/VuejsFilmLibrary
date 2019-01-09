<template lang="pug">
  .content-wrapper
    section
      .container
        .auth
          .auth__banner
            h1.ui-title-2  Banner
          .auth__form
            span.ui-title-2  Registartion
            form(@submit.prevent="onSubmit")
              .form-item(:class="{ 'errorInput': $v.email.$error }")
                input(
                  type="email"
                  placeholder="Email"
                  v-model="email"
                  :class="{ 'error': $v.email.$error }"
                  @change="$v.email.$touch()"
                )
                .error(v-if="!$v.email.required") Field is required
                .error(v-if="!$v.email.email") Email is not correct
              .form-item(:class="{ 'errorInput': $v.password.$error }")
                input(
                  type="password"
                  placeholder="Password"
                  v-model="password"
                  :class="{ 'error': $v.password.$error }"
                  @change="$v.password.$touch()"
                )
                .error(v-if="!$v.password.required") Password is required.
                .error(v-if="!$v.password.minLength")
                  | Password must have at least {{ $v.password.$params.minLength.min }} letters.
              .form-item(:class="{ 'errorInput': $v.repeatPassword.$error }")
                input(
                  type="password"
                  placeholder="Repeat password"
                  v-model="repeatPassword"
                  :class="{ 'error': $v.repeatPassword.$error }"
                  @change="$v.repeatPassword.$touch()"
                )
                .error(v-if="!$v.repeatPassword.sameAsPassword") Passwords must be identical.
              .buttons-list
                button.button.button-primary(
                  type="submit"
                  :disabled='submitStatus==="PENDING"'
                ) Registration
              .buttons-list.buttons-list--info
                p.typo__p(v-if="submitStatus === 'OK'") Thanks for your submission!
                p.typo__p(v-if="submitStatus === 'ERROR'") Please fill the form correctly.
                p.typo__p(v-if="submitStatus === 'PENDING'") Sending...
              .buttons-list.buttons-list--info
                span Do you have accaunt?
                  router-link(to="/login")   Login
</template>

<script>
import { required, email, minLength, sameAs } from 'vuelidate/lib/validators'

export default {
  data () {
    return {
      email: '',
      password: '',
      repeatPassword: '',
      submitStatus: null
    }
  },
  validations: {
    email: {
      required,
      email
    },
    password: {
      required,
      minLength: minLength(6)
    },
    repeatPassword: {
      sameAsPassword: sameAs('password')
    }
  },
  methods: {
    onSubmit () {
      this.$v.$touch()
      if (this.$v.$invalid) {
        this.submitStatus = 'ERROR'
        console.log('error!')
      } else {
        console.log('submit!')
        const user = {
          email: this.email,
          password: this.password
        }
        console.log(user)
        // do your submit logic here
        this.submitStatus = 'PENDING'
        setTimeout(() => {
          this.submitStatus = 'OK'
        }, 5000)
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
  .auth
    display flex
  .auth__banner,
  .auth__form
    width 50%
  .form-item
    .error
      display none
    &.errorInput
      .error
        display block
        margin-bottom 8px
        font-size 14px
        color red
  input
    &.error
      border-color red
  .buttons-list
    text-align right
    margin-bottom 20px
    &.buttons-list--info
      text-align center
      &:last-child
        margin-bottom 0
  a
    color blue
</style>
