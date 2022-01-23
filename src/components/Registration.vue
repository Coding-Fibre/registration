<template>
  <form>
    <h3>Sign up with your email</h3>
    <div class="input">
      <input 
        type="text" 
        name="username" 
        id="username"
        v-model="form.username"
        :class="getInputClass('username')"
        @change="onInputChange($event, 'username')"
      >
      <label for="username" class="placeholder">
        <span>Enter username</span>
      </label>
      <ul class="errors" v-if="errors.username && errors.username.length">
        <li v-for="(error, index) in errors.username" :key="index">
          {{ error}}
        </li>
      </ul>
    </div>
    <div class="input">
      <input 
        type="password" 
        name="password" 
        id="password"
        v-model="form.password"
        :class="getInputClass('password')"
        @change="onInputChange($event, 'password')"
      >
      <label for="password" class="placeholder">
        <span>Enter password</span>
      </label>
      <ul class="errors" v-if="errors.password && errors.password.length">
        <li v-for="(error, index) in errors.password" :key="index">
          {{ error}}
        </li>

      </ul>
    </div>
    <div class="input">
      <input 
        type="text" 
        name="email" 
        id="email"
        v-model="form.email"
        :class="getInputClass('email')"
        @change="onInputChange($event, 'email')"
      >
      <label for="email" class="placeholder">
        <span>Enter email</span>
      </label>
      <ul class="errors" v-if="errors.email && errors.email.length">
        <li v-for="(error, index) in errors.email" :key="index">
          {{ error}}
        </li>

      </ul>
    </div>
    <div class="actions">
      <button @click="fillData">Fill</button>
      <button type="submit" :disabled="!isFormValid">Create account</button>
    </div>
  </form>
</template>

<script>
import validationMixin from '../mixins/validationMixin.js'

export default {
  name: "registration",
  data: () => ({
    form: {
      username: '',
      password: '',
      email: '',
    },
    errors: {}
  }),
  computed: {
    isFormValid() {
      return this.validateForm(this.form).formIsValid;
    }
  },
  methods: {
    getInputClass(inputName) {
      return this.form[inputName].length ? "filled" : "";
    },
    onInputChange(e, inputName) {
      const inputValue = e.target.value;
      const inputErrors = this.validateField(inputName, inputValue);
      if(inputErrors && inputErrors.length) {
        this.errors[inputName] = inputErrors;
      } else {
        this.errors[inputName] = null;
      }
      this.setInputClass(e, inputName);
    },
    setInputClass(e, inputName) {
      if(this.errors[inputName]) {
        document.getElementById(inputName).classList.add("danger");
        document.getElementById(inputName).classList.remove("valid");
      } else {
        document.getElementById(inputName).classList.remove("danger");
        document.getElementById(inputName).classList.add("valid");
      }
    },
    fillData(e) {
      e.preventDefault();
      this.form = {
        username: "John",
        password: "Qwerty123()/",
        email: "john@doe.com"
      }
      this.$nextTick(() => {
        Object.keys(this.form).forEach(inputName => {
          this.setInputClass(null, inputName);
        })
      })
    }
  },
  mixins: [validationMixin]
}
</script>

<style lang="scss" scoped>
@import "../styles/_global.scss";

form {
  @include flex;
  gap: 20px;
  width: clamp(300px, 30%, 400px);
  padding: 20px;
  box-sizing: border-box;
  box-shadow: 0px 14px 20px 12px #00000012;
  border-radius: 8px;
  color: var(--text-color);
  h3 {
    font-size: 22px;
    font-weight: 400;
    margin: 0;
  }
  .input {
    position: relative;
    @include flex;
    gap: 4px;
    input {
      border: 2px solid var(--secondary-color);
      border-radius: 8px;
      background-color: var(--secondary-color);
      outline: none;
      color: var(--text-color);
      padding: 10px 12px;
      box-sizing: border-box;
      font-size: 14px;
      transition: all .3s ease;
      &:focus, &:hover, &.filled {
        border: 2px solid var(--info-color);
      }
      &:focus + .placeholder span, &.filled + .placeholder span {
        transform: translateY(-100%);
      }
      &.danger {
        border: 2px solid var(--danger-color) !important;
        color: var(--danger-color);
      }
      &.valid {
        border: 2px solid var(--success-color) !important;
        color: var(--success-color);
      }
    }
    .placeholder {
      @include flex;
      position: absolute;
      width: calc(100% - 24px);
      top: 10px;
      left: 12px;
      pointer-events: none;
      overflow: hidden;
      span {
        transition: all .3s ease;
        font-size: 14px;
      }
    }
    .errors {
      @include flex;
      gap: 4px;
      list-style: none;
      padding: 0;
      margin: 0;
      font-size: 12px;
      color: var(--danger-color);
      li {
        animation: swipeDown .3s ease forwards
      }
    }
  }
  .actions {
    @include flex-row;
    gap: 4px;
    button {
      border: none;
      border-radius: 4px;
      padding: 10px 12px;
      background-color: var(--info-color);
      color: var(--white-color);
      cursor: pointer;
      position: relative;
      transition: all .3s ease;
      &:disabled {
        cursor: not-allowed;
        &::after {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-color: #fff;
          opacity: .5;
        }
      }
      &[type=submit] {
        flex: 1;
      }
    }
  }
} 

@keyframes swipeDown {
  from {
    opacity: 0;
    tranform: translateY(-10px);
  } to {
    opacity: 1;
    tranform: translateY(0px);
  }
}
</style>
