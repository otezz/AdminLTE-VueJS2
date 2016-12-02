<template>
  <div class="login-box">
    <div class="login-logo">
      <router-link to="/"><b>Admin</b> LTE</router-link>
    </div>
    <!-- /.login-logo -->
    <div class="login-box-body">
      <p class="login-box-msg">Sign in to start your session</p>
      <form @submit.prevent="login">

        <div v-if="error" class="alert alert-danger">
          <a class="close" data-dismiss="alert">&times;</a>
          {{ error }}
        </div>

        <div class="form-group has-feedback">
          <input type="text" class="form-control" placeholder="Username" v-model="credentials.username">
          <span class="glyphicon glyphicon-user form-control-feedback"></span>
        </div>
        <div class="form-group has-feedback">
          <input type="password" class="form-control" placeholder="Password" v-model="credentials.password">
          <span class="glyphicon glyphicon-lock form-control-feedback"></span>
        </div>
        <div class="row">
          <div class="col-xs-8">
            <div class="checkbox icheck">
            <label>
            <div class="icheckbox_square-blue" aria-checked="false" aria-disabled="false" style="position: relative;"><input type="checkbox" style="position: absolute; top: -20%; left: -20%; display: block; width: 140%; height: 140%; margin: 0px; padding: 0px; border: 0px; opacity: 0; background: rgb(255, 255, 255);"><ins class="iCheck-helper" style="position: absolute; top: -20%; left: -20%; display: block; width: 140%; height: 140%; margin: 0px; padding: 0px; border: 0px; opacity: 0; background: rgb(255, 255, 255);"></ins></div> Remember Me
            </label>
            </div>
          </div>
          <!-- /.col -->
          <div class="col-xs-4">
            <button type="submit" class="btn btn-primary btn-block btn-flat">Sign In</button>
          </div>
          <!-- /.col -->
        </div>
      </form>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Login',
    data: function () {
      return {
        credentials: {
          username: '',
          password: ''
        },
        error: ''
      }
    },
    methods: {
      login: function () {
        var store = this.$store

        var credentials = {
          username: this.credentials.username,
          password: this.credentials.password
        }

        this.$http.get('/static/auth.json', credentials)
          .then(function (data) {
            var token = data.body.token
            store.commit('SET_TOKEN', token)

            // Save to local storage as well
            if (window.localStorage) {
              window.localStorage.setItem('token', token)
            }

            this.$router.push('/dashboard')
          },
          function (data) {
            this.error = data.body.message
          }
        )
      }
    },
    mounted: function () {
      require('icheck')

      $('input').iCheck({
        checkboxClass: 'icheckbox_square-blue',
        radioClass: 'iradio_square-blue',
        increaseArea: '20%' // optional
      })
    }
  }
</script>
