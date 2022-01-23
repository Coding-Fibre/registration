const EMAIL_REGEX = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const LOWER_CASE_REGEX = /(.*[a-z].*)/;
const UPPER_CASE_REGEX = /(.*[A-Z].*)/;
const DIGITS_REGEX = /(.*\d.*)/;
const SYMBOLS_REGEX = /[-+_!/\\@#$%^&*.,?()]/;


const validationMixin = {
  data: () => ({
    validationRules: {
      username: {
        rules: [
          value => value.length > 3 || 'Username must be at least 4 characters long',
        ]
      },
      password: {
        rules: [
          value => value.length > 11 || 'Password must be at least 12 characters long',
          value => LOWER_CASE_REGEX.test(value) || 'Password should contain at least one lower case letter',
          value => UPPER_CASE_REGEX.test(value) || 'Password should contain at least one upper case letter',
          value => DIGITS_REGEX.test(value) || 'Password should contain at least one digit',
          value => SYMBOLS_REGEX.test(value) || 'Password should contain at least one symbol',
        ]
      },
      email : {
        rules: [
          value => EMAIL_REGEX.test(value) || 'Please enter a valid email address',
        ]
      }
    }
  }),
  methods: {
    validateField(inputName, value) {
      return this.validationRules[inputName].rules
        .filter(rule => {
          const isValid = rule(value);

          if(isValid !== true) {
            return isValid;
          }
        })
        .map(rule => rule(value));
    },
    validateForm(form) {
      const formErrors = {};
      let formIsValid = true;

      for(let property in form) {
        const errors = this.validateField(property, form[property]);

        if(errors.length) {
          formIsValid = false;
        }

        formErrors[property] = errors;
      }

      formErrors.formIsValid = formIsValid;

      return formErrors
    }
  }
}

export default validationMixin