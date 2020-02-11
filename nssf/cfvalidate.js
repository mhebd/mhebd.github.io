
/** 
 * Form validation start
 */
//variabls
const form = document.querySelector('.form');
let inputs = document.querySelectorAll('input'),
    message = document.querySelector('.message');
    


//event linstener
events();
function events(){
    form.addEventListener('submit', validate);
}


//functions
function validate(e){

    inputs.forEach(function(input){
        if(input.value === null || input.value === '' ){
            input.style.borderBottom = '2px solid red';
            e.preventDefault();
        }
        if(input.classList.contains('phone-number')){
            if(input.value === '' || input.value === null || isNaN(input.value) ){
                input.style.borderBottom = '2px solid red';
                e.preventDefault();
            }
        }
        if(input.type.toLowerCase() === 'email'){
            let emailValu = input.value;
            if(emailValu.indexOf('@') == -1 ){
                input.style.borderBottom = '2px solid red';
                e.preventDefault();
            }
        }
        if(message.value === null || message.value === ''){
            message.style.borderBottom = '2px solid red';
            e.preventDefault();
        }
    })
};



inputs.forEach(function(input){
    input.addEventListener('keyup', function(){
        input.style.borderBottom = '1px solid #1bd41b';
    })
});

message.addEventListener('keyup', function(){
    message.style.borderBottom = '1px solid #1bd41b';
})
