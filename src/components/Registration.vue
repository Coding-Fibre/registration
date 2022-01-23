<template>
  <form>
    <h3>Sign up with your email</h3>
    <div class="input">
      <input 
        type="text" 
        name="username" 
        id="username"
      >
      <label for="username" class="placeholder">
        <span>Enter username</span>
      </label>
    </div>
    <div class="input">
      <input 
        type="password" 
        name="password" 
        id="password"
      >
      <label for="password" class="placeholder">
        <span>Enter password</span>
      </label>
    </div>
    <div class="input">
      <input 
        type="text" 
        name="email" 
        id="email"
      >
      <label for="email" class="placeholder">
        <span>Enter email</span>
      </label>
    </div>
    <div class="actions">
      <button type="submit">Create account</button>
    </div>
  </form>
</template>

<script>
export default {
  name: "registration",
  data: () => ({
  }),
  methods: {
    getInputClass(inputName) {
      return this.form[inputName].length ? "filled" : "";
    },
  },
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
      &:focus + .placeholder span {
        transform: translateY(-100%);
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
  }
  button {
    border: none;
    border-radius: 4px;
    padding: 10px 12px;
    background-color: var(--info-color);
    color: var(--white-color);
    cursor: pointer;
    position: relative;
    transition: all .3s ease;
  }
} 
</style>
