/**
 * Shopping address form validation
 * 
 */


//variabls 
const sForm = document.sform;

let fName = document.sform.fname,
    lName = document.sform.lname,
    uName = document.sform.uname,
    email = document.sform.email,
    fNumber = document.sform.fnumber,
    addr = document.sform.addr1,
    cName = document.sform.cname,
    cNumber = document.sform.cnumber,
    cPass = document.sform.cpass;



//event listener
sForm.addEventListener('submit', sFormValidation);


//functions
function sFormValidation(e) {


    if (fName.value === '' || fName.value === null) {
        fName.style.borderColor = 'red';
        e.preventDefault();
    }
    if (lName.value === '' || lName.value === null) {
        lName.style.borderColor = 'red';
        e.preventDefault();
    }
    if (uName.value === '' || uName.value === null) {
        uName.style.borderColor = 'red';
        e.preventDefault();
    }
    if (email.value === '' || email.value === null) {
        email.style.borderColor = 'red';
        e.preventDefault();
    }
    if (fNumber.value === '' || isNaN(fNumber.value) || fNumber.value === null) {
        fNumber.style.borderColor = 'red';
        e.preventDefault();
    }
    if (addr.value === '' || addr.value === null) {
        addr.style.borderColor = 'red';
        e.preventDefault();
    }
    if (cName.value === '' || cName.value === null) {
        cName.style.borderColor = 'red';
        e.preventDefault();
    }
    if (cNumber.value === '' || isNaN(cNumber.value) || cNumber.value === null) {
        cNumber.style.borderColor = 'red';
        e.preventDefault();
    }
    if (cPass.value === '' || cPass.value.length < 8 || cPass.value === null) {
        cPass.style.borderColor = 'red';
        e.preventDefault();
    }
};















/**
 * quantity increase ans decrease 
 */

let qprev = document.querySelector('.quantity-prev'),
    qnext = document.querySelector('.quantity-next');

    qprev.addEventListener('click',function(){
        let quantityN = document.querySelector('.quantity-number');
        if(quantityN.value > 1){
            quantityN.value--;
        }
        
    });


    qnext.addEventListener('click', function(){
        let quantityN = document.querySelector('.quantity-number');
        quantityN.value++;
    })
