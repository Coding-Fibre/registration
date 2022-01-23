<template>
  <label class="theme" for="theme">
    <ThemeSwitcher />
  </label>
  <form>
    <h3>Sign up with your email</h3>
    <div class="input">
      <input
        type="text"
        id="username"
        :class="getInputClass('username')"
        v-model="form.username"
        @input="onInput"
        @change="onInputChange($event, 'username')"
      />
      <label class="placeholder" for="username">
        <span>Enter username</span>
      </label>
      <ul class="errors" v-if="errors.username && errors.username.length">
        <li v-for="(error, index) in errors.username" :key="index">
          {{ error }}
        </li>
      </ul>
    </div>
    <div class="input">
      <input
        type="password"
        id="password"
        :class="getInputClass('password')"
        v-model="form.password"
        @input="onInput"
        @change="onInputChange($event, 'password')"
      />
      <label class="placeholder" for="password">
        <span>Enter password</span>
      </label>
      <ul class="errors" v-if="errors.password && errors.password.length">
        <li v-for="(error, index) in errors.password" :key="index">
          {{ error }}
        </li>
      </ul>
    </div>
    <div class="input">
      <input
        type="text"
        id="email"
        :class="getInputClass('email')"
        v-model="form.email"
        @input="onInput"
        @change="onInputChange($event, 'email')"
      />
      <label class="placeholder" for="email">
        <span>Enter email</span>
      </label>
      <ul class="errors" v-if="errors.email && errors.email.length">
        <li v-for="(error, index) in errors.email" :key="index">
          {{ error }}
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
import validationMixin from "../mixins/validationMixin.js";
import ThemeSwitcher from "../components/ThemeSwitcher.vue";

export default {
  name: "HelloWorld",
  props: ["msg"],
  data: () => ({
    form: {
      username: "",
      password: "",
      email: "",
    },
    errors: {},
  }),
  mixins: [validationMixin],
  computed: {
    isFormValid() {
      return this.validateForm(this.form).formIsValid;
    }
  },
  methods: {
    switchTheme(e) {
      e.target.checked
        ? document.documentElement.classList.add("white")
        : document.documentElement.classList.remove("white");
    },
    onInputChange(e, inputName) {
      const inputValue = e.target.value;
      const inputErrors = this.validateField(inputName, inputValue);
      if (inputErrors && inputErrors.length) {
        this.errors[inputName] = inputErrors;
      } else {
        this.errors[inputName] = null;
      }
      this.setInputClass(e, inputName);
    },
    setInputClass(e, inputName) {
      if(this.errors[inputName]) {
        document.getElementById(inputName).classList.add("invalid");
        document.getElementById(inputName).classList.remove("valid");
      } else {
        document.getElementById(inputName).classList.add("valid");
        document.getElementById(inputName).classList.remove("invalid");
      }
    },
    getInputClass(inputName) {
      return this.form[inputName].length ? "filled" : "";
    },
    fillData(e) {
      e.preventDefault();
      this.form.username = "John";
      this.form.password = "Qwerty123()/";
      this.form.email = "john@doe.com"
      this.$nextTick(() => {
        Object.keys(this.form).forEach(inputName => {
          console.log(inputName)
          this.setInputClass(null, inputName);
        });
      });
    }
  },
  components: {
    ThemeSwitcher
  }
};
</script>

<style lang="scss" scoped>
@import "../styles/_global.scss";

.theme {
  color: var(--text-color);
  position: fixed;
  top: 20px;
  right: 20px;
}

form {
  @include flex;
  gap: 20px;
  width: clamp(300px, 30%, 400px);
  padding: 20px;
  box-sizing: border-box;
  color: var(--text-color);
  box-shadow: 0px 14px 20px 12px #00000012;
  border-radius: 8px;
  h3 {
    color: var(--text-color);
    font-size: 22px;
    width: 100%;
    font-weight: 400;
    margin: 0;
  }
}
.input {
  @include flex;
  position: relative;
  gap: 4px;
  flex: 1;
  input[type="text"], input[type="password"] {
    width: 100%;
    border: 2px solid var(--secondary-color);
    padding: 10px 12px;
    box-sizing: border-box;
    border-radius: 8px;
    background: var(--secondary-color);
    font-size: 14px;
    transition: all 0.3s ease-in-out;
    outline: none;
    color: var(--text-color);
    &:focus + .placeholder span,
    &.filled + .placeholder span {
      transform: translateY(-100%);
    }
    &.valid {
      border: 2px solid var(--success-color) !important;
      color: var(--success-color);
    }
    &.invalid {
      border: 2px solid var(--danger-color) !important;
      color: var(--danger-color);
    }
    &:focus,
    &:hover {
      border: 2px solid var(--info-color);
    }
  }
  .placeholder {
    width: calc(100% - 24px);
    position: absolute;
    top: 10px;
    left: 12px;
    border: 2px solid transparent;
    box-sizing: border-box;
    display: flex;
    pointer-events: none;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    color: var(--text-color);
    span {
      z-index: 9;
      font-size: 14px;
      pointer-events: none;
      transition: all 0.3s ease;
    }
  }
  .errors {
    @include flex;
    gap: 4px;
    top: 100%;
    list-style: none;
    padding: 0;
    margin: 0;
    font-size: 12px;
    color: var(--danger-color);
    li {
      animation: swipeDown 0.3s ease-in-out forwards;
    }
  }
  &::before {
    position: absolute;
    z-index: 100;
    top: 2px;
    height: 8px;
    left: 8px;
    width: calc(100% - 16px);
    background: var(--secondary-color);
    transition: all 0.3s ease;
  }
}
.actions {
  @include flex-row;
  gap: 4px;
  button {
    border: none;
    border-radius: 4px;
    padding: 10px 12px;
    position: relative;
    background-color: var(--info-color);
    transition: all 0.3s ease;
    color: var(--white-color);
    overflow: hidden;
    cursor: pointer;
    &:disabled {
      cursor: not-allowed;
      &::after {
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        background-color: #fff;
        opacity: .5;
        width: 100%;
        height: 100%;
      }
    }
    &[type=submit] {
      flex: 1;
    }
  }
}

@keyframes swipeDown {
  0% {
    opacity: 0;
    transform: translateY(-10px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
