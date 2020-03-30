//variabls
const form = document.getElementById('form'),
    result = document.getElementById('result'),
    wraning = document.querySelector('.warning');


//eventListeners
form.addEventListener('submit', formSubmitation);


//functions
function formSubmitation(e) {
    e.preventDefault();
    let year = Number(document.getElementById('year').value);
    let month = document.getElementById('month').value;
    let day = Number(document.getElementById('day').value);

    //validation
    if (year === 0 || isNaN(year)) {
        wranings();
    } else {
        if (day === 0 || isNaN(day) || day > 31) {
            wranings();
        } else {
            if (month === '') {
                wranings();
            } else {
                let presentDate = new Date();
                let birthDate = new Date(year, month, day);

                //calculating 
                let diff = presentDate - birthDate;
                let floatY = diff / (1000 * 60 * 60 * 24 * 365.25);
                let Y = Math.floor(floatY);
                let floatM = ((floatY - Y) * 365.25) / 30.5;
                let M = Math.floor(floatM);
                let D = Math.floor((floatM - M) * 30.5);


                //Show spinner
                let spinn = document.querySelector('.spinner');
                spinn.innerHTML = `
                        <div class="spinner-border"></div>
                    `;

                setTimeout(function () {
                    //remone Spinner
                    spinn.innerHTML = '';
                    //Show Result
                    let li = document.createElement('li');
                    li.classList = 'list-group-item';
                    li.innerHTML = `
                        <h2 class="heading text-center text-success">Your Age </h2>
                        <hr>
                        <p class="lead text-center text-success">
                            ${Y} Years | ${M} Months | ${D} Days
                        </p>
                    `;
                    result.innerHTML = '';
                    result.appendChild(li);
                    setTimeout(function () {
                        result.innerHTML = '';
                    }, 20000);
                }, 3000)


                form.reset();
            }

        }
    }





};


function wranings() {
    let p = document.createElement('p');
    p.classList = 'lead text-center p-3 alert alert-warning text-danger';
    p.innerText = `All Input Is Requerd!!
            &&
        Input Right Date!!
    `;
    wraning.appendChild(p);
    setTimeout(function () {
        wraning.innerHTML = '';
    }, 3000)
}