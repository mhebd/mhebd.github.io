/**
 * Shopping address form validation
 * 
 */


//variabls 
const sForm = document.sform;

let requireds = document.querySelectorAll('.required');



//event listener
sForm.addEventListener('submit', sFormValidation);


//functions
function sFormValidation(e) {

    requireds.forEach(function(required){
        if( required.value === null || required.value === '' ){
            required.style.borderBottom = '2px solid red';
            e.preventDefault();
        }
        if( required.type.toLowerCase() === 'email' ){
            if(required.value.indexOf('@') === -1 ){
                required.style.borderBottom = '2px solid red';
                e.preventDefault();
            }
        }
        if( required.classList.contains('phone-number') ){
            if( isNaN(required.value) ){
                required.style.borderBottom = '2px solid red';
                e.preventDefault();
            }
        }
        if( required.classList.contains('card-number') ){
            if( isNaN(required.value) ){
                required.style.borderBottom = '2px solid red';
                e.preventDefault();
            }
        }
        
    })
 
};



requireds.forEach(function(required){
    required.addEventListener('keyup', function(){
        required.style.borderBottom = '1px solid #1bd41b';
    })
})












/**
 * show full cart list in chackout page
 */

let cartListCont = document.querySelector('.checkout-item-info');

    loadeEvent();
function loadeEvent(){
    let cartArr = getEmptyArry();

        if(cartArr.length > 0){
            cartArr.forEach(function(singleListObj){
                let div = document.createElement('div');
                div.innerHTML = `
                        <div class="row">
                        <div class="col-md-6 col-lg-5 mb-4">
                            <div class="item-img">
                                <img src="${singleListObj.image}" alt="" style="max-height:250px" class="img-fluid">
                            </div>
                        </div>
    
                        <div class="col-md-6 col-lg-7">
                            <div class="item-info">
                                <table class="table item-info-table">
                                    <tbody>
                                        <tr>
                                            <th>Name</th>
                                            <td>:</td>
                                            <td><span class="text-uppercase">${singleListObj.title}</span></td>
                                        </tr>
                                        <tr>
                                            <th>Price</th>
                                            <td>:</td>
                                            <td>TK <span class="co-price">${singleListObj.price}</span></td>
                                        </tr>
                                        <tr>
                                            <th>ID</th>
                                            <td>:</td>
                                            <td>${singleListObj.id}</td>
                                        </tr>
                                        <tr>
                                            <th>Quantity</th>
                                            <td>:</td>
                                            <td>
                                                <div class="quantity-box">
                                                    <input type="button" value="-" class="quantity-prev btn btn-success">
                                                    <input type="text" value="1" name="quantityN" id="" class="quantity-number">
                                                    <input type="button" value="+" class="quantity-next btn btn-success">
                                                </div>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                `;
    
                cartListCont.appendChild(div);
    
            })
        } else {
            cartListCont.innerHTML = `
                <div class="display-1 text-warning text-center">
                    Opps!!
                    
                    Your Cart List Is Empty!!
                </div>
            `;
        }
        
}








/**
 * quantity increase ans decrease 
 */

    let qprevs = document.querySelectorAll('.quantity-prev'),
        qnexts = document.querySelectorAll('.quantity-next');

    qprevs.forEach(function(qprev, index){
        qprev.addEventListener('click',function(){
            let quantityN = document.querySelectorAll('.quantity-number');
            if(quantityN[index].value > 1){
                quantityN[index].value--;
            }
        });
    });

    

    qnexts.forEach(function(qnext, index){
        qnext.addEventListener('click', function(){
            let quantityN = document.querySelectorAll('.quantity-number');
                quantityN[index].value++;
        });
    });
    



