
/** 
 * Form validation start
 */
//variabls
const form = document.querySelector('.form');
    


//event linstener
events();
function events(){
    form.addEventListener('submit', validate);
}


//functions
function validate(e){
    let fName = document.querySelector('.first-name'),
    lName = document.querySelector('.last-name'),
    email = document.querySelector('.email'),
    phone = document.querySelector('.phone-number'),
    subject = document.querySelector('.subject'),
    message = document.querySelector('.message');

    if(fName.value === '' ){
        fName.style.borderColor = 'red';
        e.preventDefault();
    } 
    if(lName.value === ''){
        lName.style.borderColor = 'red';
        e.preventDefault();
    }
    if(email.value === ''){
        email.style.borderColor = 'red';
        e.preventDefault();
    }
    if(phone.value === '' || isNaN(phone.value)){
        phone.style.borderColor = 'red';
        e.preventDefault();
    } 
    if(subject.value === ''){
        subject.style.borderColor = 'red';
        e.preventDefault();
    }
    if(message.value === ''){
        message.style.borderColor = 'red';
        e.preventDefault();
    } 

};
