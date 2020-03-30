//Variabls
let card = document.querySelector('.calculator');
let date = document.querySelector('.date'),
    time = document.querySelector('.tiem');

//Event listeners
    eventListener();
    function eventListener(){
        card.addEventListener('click', calculate);
        //Show Date N Time
        setInterval(() => {
            let dateObj = new Date();
            let dt = dateObj.toDateString();
            let tim = dateObj.toLocaleTimeString();
            date.innerHTML = `<p class="lead text-primary"> ${dt} </p>`;
            time.innerHTML = `<p class="lead text-primary"> ${tim} </p>`;
        }, 000);
    }
//functions

function calculate(e){
    e.preventDefault();
    if(e.target.classList.contains('number') || e.target.classList.contains('oparetor') || e.target.classList.contains('res-btn')){
        let value = e.target.value;
        document.form.display.value += value;
    } 
    if(e.target.classList.contains('equalSign')){
        document.form.display.value = eval(document.form.display.value)
    }
    if(e.target.classList.contains('clear')){
        document.form.display.value = '';
    }
    if(e.target.classList.contains('delete')){
        document.form.display.value = document.form.display.value.substring(0, document.form.display.value.length - 1);
    }
}

