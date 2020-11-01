
const UIController = (() => {

  let domid = {
    form : 'form',
    username : 'username',
    email : 'email',
    password : 'password',
    password2 : 'password2'
  };



  return {
    getDOM : () => {
      return domid;
    }
  }

})();



const Maincontroller = ((UiCtrl) => {


  // Check all the input value
  const checkInputValue = (input) => {

    input.forEach((cur) => {
      const parent = cur.parentNode,
            small = parent.querySelector('small');

      if( cur.value === '' || cur.value === null ) {
        showError(cur, `${fieldName(cur)} field is required.`)
      } else {
        showSuccess(cur)
        checkEmail(input[1]);
        checkLength(input[0], 3, 15);
        checkLength(input[2], 6, 20);
        validPassword(input[2], input[3]);
      }
    })

  };

  const checkEmail = (email) => {

      if( email.value.indexOf('@') === -1 || email.value.indexOf('.') === -1 ) {
        showError(email, `This is not a valid ${fieldName(email)}.`)
      } else {
        showSuccess(email);
      }
  };

  const checkLength = (name, min, max) => {

      if( name.value.length < min ) {
        showError(name, `${fieldName(name)} field required at least ${min} charecter.`);
      } else if( name.value.length > max ) {
        showError(name, `${fieldName(name)} field required less than ${max} charecter.`);
      } else {
        showSuccess(name);
      };

  };

  const validPassword = (pass, pass2) => {

    if( pass.value !== pass2.value ) {
      showError(pass2, `${fieldName(pass2)} did not match with your ${fieldName(pass)}.`);
    } else {
      showSuccess(pass2);
    }

  };



  const showError = (input, message) => {
    const parent = input.parentNode;
    const  small = parent.querySelector('small');

    parent.className = 'input-group error';
    small.textContent = message;
  };

  const showSuccess = (input) => {
    const parent = input.parentNode;
    parent.className = 'input-group success';
  }

  const fieldName = (cur) => {
    let name = cur.name.charAt(0).toUpperCase() + cur.name.slice(1);
    return name;
  };





  // Initial start the proccess
  const initialSetup = () => {

    let dom = UiCtrl.getDOM();

    document.getElementById(dom.form).addEventListener('submit', (e) => {
      e.preventDefault();
      
      const username = document.getElementById(dom.username),
            email = document.getElementById(dom.email),
            password = document.getElementById(dom.password),
            password2 = document.getElementById(dom.password2);

      checkInputValue([username, email, password, password2]);




    });

  };




  return {
    init : () => {

      console.log('App Start Successfully');
      initialSetup();
      
    }
  }

})(UIController);

Maincontroller.init();
