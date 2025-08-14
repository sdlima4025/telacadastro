let B7Validator = {
  handleSubmit: (event) => {
    event.preventDefault();
    let send = true;

    let inputs = form.querySelectorAll('input');

    B7Validator.clearErrors();

    for (let i = 0; i < inputs.length; i++) {
      let input = inputs[i];
      let check = B7Validator.checkInput(input);
      if (check !== true) {
        send = false;
        //exibir erro
        B7Validator.showError(input, check);
      }
    }

    if (send) {
      form.submit();
    }
  },
  checkInput: (input) => {
    let rules = input.getAttribute('data-rules');

    if (rules !== null) {
      rules = rules.split('|');
      for (let k in rules) {
        let rDetails = rules[k].split('=');
        switch (rDetails[0]) {
          case 'required':
            if (input.value == '') {
              return 'Campo obrigatório, não pode ser vázio!';
            }
            break;
          case 'min':
            if (input.value.length < rDetails[1]) {
              return 'Campo tem que ter pelo menos' 
               + rDetails + ' Caracters';
            }
            break;
            case 'email':
              if(input.value != '') {
             let regex =  /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/ 
             if(!regex.test(input.value.toLocaleLowerCase())) {
              return 'Digite um Email válido';
             }
            }
            break;
        }
      }
    }
    return true;
  },
  showError: (input, error) => {
    input.style.borderColor = '#FF0000';

    let errorElement = document.createElement('div');
    errorElement.classList.add('error');
    errorElement.innerHTML = error;

    // add menssagem após o input com ElementSimbling
    input.parentElement.insertBefore(errorElement, input.ElementSimbling);
  },
  clearErrors: () => {
    let inputs = form.querySelectorAll('input');
    for (let i = 0; i < inputs.length; i++) {
      inputs[i].style = '';
    }

    let errorElements = document.querySelectorAll('.error');
    for (let i = 0; i < errorElements.length; i++) {
      errorElements[i].remove();
    }
  },
};
let form = document.querySelector('.b7validator');
form.addEventListener('submit', B7Validator.handleSubmit);
