/**
 *  [ES - 6] code
 */

// Budget controller modules
const BudgetController = (function() {

  class Inputs {

    constructor(id, description, value) {
      this.id = id;
      this.description = description;
      this.value = value;
    }

  };

  class Expenses extends Inputs {

    constructor(id, description, value) {
      super(id, description, value);
      this.percentage = -1;
    }

    calcPercentage(totals) {

      if(totals > 0) {
        this.percentage = Math.round((this.value / totals) * 100);
      } else {
        this.percentage = -1;
      }


    }

    getPercentage() {

      return this.percentage;

    }


  };

  class Income extends Inputs {

    constructor(id, description, value) {
      super(id, description, value);
      this.percentage = -1;
    }

  };

  let calcTotals = (type) => {

    totals = data.allItems[type].reduce((sum, cur) => {
      return sum + cur.value;
    }, 0); 

    data.totals[type] = totals;

  }

  var data =  {
    allItems : {
      inc : [],
      exp : []
    },
    totals : {
      inc : 0,
      exp : 0
    },
    budget : 0,
    percentage : -1
  };



  return {

    addItem : (type, des, val) => {

      let newItem, ID;

      if( data.allItems[type].length > 0) {
        ID = data.allItems[type][data.allItems[type].length - 1].id + 1; 
      } else {
        ID = 0;
      }

      if( type === 'inc' ) {
        newItem = new Income(ID, des, val);
      } else if( type === 'exp' ) {
        newItem = new Expenses(ID, des, val);
      };

      data.allItems[type].push(newItem);

      return newItem;

    },

    calculateBudget : () => {

      calcTotals('inc');
      calcTotals('exp');

      data.budget = data.totals.inc - data.totals.exp;

      if( data.totals.inc > 0 ) {
        data.percentage = Math.round((data.totals.exp / data.totals.inc) * 100 )
      } else {
        data.percentage = -1;
      }

    },

    getBudget : () => {

      return {
        budget : data.budget,
        income : data.totals.inc,
        expenses : data.totals.exp,
        percentage : data.percentage
      }

    },

    calculatePercentage : () => {

      data.allItems.exp.forEach((cur) => {
        cur.calcPercentage(data.totals.inc);
      });

    },

    getPercentage : () => {

      var allPercent = data.allItems.exp.map((cur) => {
       return cur.getPercentage()
      });

      return allPercent;

    },

    deleteItem : (type, id) => {

      let ids, index;

      ids = data.allItems[type].map((cur) => {
        return cur.id;
      });

      index = ids.indexOf(id);

      if( index !== -1 ){
        data.allItems[type].splice(index, 1);
      }

    },

  }

}());



// UI Controller modules
const UIController = (function() {

  const DOMString = {
    inputType: '.add__type',
    inputDescription: '.add__description',
    inputValue: '.add__value',
    inputBtn: '.add__btn',
    incomeContainer: '.income__list', 
    expensesContainer: '.expenses__list', 
    budgetLabel: '.budget__value',
    incomeLabel: '.budget__income--value',
    expensesLabel: '.budget__expenses--value',
    percentageLabel: '.budget__expenses--percentage',
    container: '.container',
    expensesPercLabel: '.item__percentage',
    dateLabel: '.budget__title--month'
  };


  let formateNumber = (type, num) => {

    let splitNum, int, dec;

    num = Math.abs(num);
    num = num.toFixed(2);

    splitNum = num.split('.');
    int = splitNum[0];
    dec = splitNum[1];

    if( int.length > 3 ) {
      int = int.substr(0, int.length - 3) + ',' + int.substr(int.length - 3, 3 );
    };

    return (type === 'inc' ? '+ ' : '- ') +  int + '.' + dec;

  };

  const setMonth = () => {
    const months = ['January', 'February', 'March', 'April', 'May', 'Jun', 'July', 'August', 'September', 'October', 'November', 'December'];

    const d = new Date();
    document.querySelector(DOMString.dateLabel).textContent = months[d.getMonth()] + ', ' + d.getFullYear();
  };


  return {

    addItem : () => {
      return {
        type : document.querySelector(DOMString.inputType).value,
        description : document.querySelector(DOMString.inputDescription).value,
        value : parseInt(document.querySelector(DOMString.inputValue).value),
      }
    },

    displayItem : (type, obj) => {

      let html, el;

      if( type === 'inc' ) {
        el = DOMString.incomeContainer;
        let formateN = formateNumber('inc', obj.value);
        html = 
          `<div class="item clearfix" id="inc-${obj.id}">
            <div class="item__description">${obj.description}</div>
            <div class="right clearfix">
                <div class="item__value">${formateN}</div>
                <div class="item__delete">
                    <button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button>
                </div>
            </div>
          </div>`;
      } else if( type === 'exp' ) {
        el = DOMString.expensesContainer;
        let formateN = formateNumber('exp', obj.value);
        html = 
          `<div class="item clearfix" id="exp-${obj.id}">
              <div class="item__description">${obj.description}</div>
              <div class="right clearfix">
                  <div class="item__value">${formateN}</div>
                  <div class="item__percentage">21%</div>
                  <div class="item__delete">
                      <button class="item__delete--btn"><i  class="ion-ios-close-outline"></i></button>
                  </div>
              </div>
        </div>`;
      };

      document.querySelector(el).insertAdjacentHTML('beforeend', html);


    },

    clearFields : () => {

      let fields, fieldsArr;

      fields = document.querySelectorAll(DOMString.inputDescription + ',' + DOMString.inputValue);

      fieldsArr = Array.from(fields);
      
      fieldsArr.forEach((cur) => {
        return cur.value = '';
      });

      return fieldsArr[0].focus();

    },

    displayBudget : (obj) => {

      let type;
      if( obj.budget >= 0 ) {
        type = 'inc';
      }

      document.querySelector(DOMString.budgetLabel).textContent = formateNumber(type, obj.budget) ;
      document.querySelector(DOMString.incomeLabel).textContent = formateNumber('inc', obj.income) ;
      document.querySelector(DOMString.expensesLabel).textContent = formateNumber('exp', obj.expenses) ;

      if(obj.percentage > 0) {
        document.querySelector(DOMString.percentageLabel).textContent = obj.percentage + '%';
      } else {
        document.querySelector(DOMString.percentageLabel).textContent = '---';
      };

    },

    displayPercentage : (percentages) => {

      let percentDom = document.querySelectorAll(DOMString.expensesPercLabel);

      Array.from(percentDom).forEach((cur, index) => {
        
        if(percentages[index] > 0) {
          cur.textContent = percentages[index] + '%';
        } else {
          cur.textContent = '---';
        }

      })

    },

    deleteItem : (itemId) => {
      
      let el = document.getElementById(itemId);

      el.parentNode.removeChild(el);

    },

    getSetMonth : () => {
      return setMonth();
    },


    domString : () => {
      return DOMString;
    }

  }  
    
}());



// Main controller modules
const MainController = (function(budgetCtrl, UiCtrl) {

  const initialSetup = () => {

    let doms = UiCtrl.domString();

    document.querySelector(doms.inputBtn).addEventListener('click', ctrlAddItem );

    document.addEventListener('keypress', (e) => {
      if( e.keyCode === 13 || e.which === 13 ) {
        ctrlAddItem();
      }
    });

    document.querySelector(doms.container).addEventListener('click', ctrlDeleteItem);

  };

  let updateBudget = () => {

    // Calculate budget
    budgetCtrl.calculateBudget();

    // Get budget object
    let budget = budgetCtrl.getBudget();

    UiCtrl.displayBudget(budget);

  };

  let updatePercentage = () => {

    budgetCtrl.calculatePercentage();

    let percentages = budgetCtrl.getPercentage();

    UiCtrl.displayPercentage(percentages);

  };

  let ctrlAddItem = () => {

    // load ui input value
    let input = UiCtrl.addItem();

    if( input.description !== '' && input.value > 0 && !isNaN(input.value) ) {

      // put all the input value into a array object container
      let addItem = budgetCtrl.addItem(input.type, input.description, input.value);

      // Display item in UI list
      UiCtrl.displayItem(input.type, addItem);

      // Clear input fields
      UiCtrl.clearFields();

      // Calculate and Display budget into budget interface
      updateBudget();

      // calculate and update percentage
      updatePercentage();

    }


  };

  let ctrlDeleteItem = (e) => {

    let itemId, splitId, type, id;

    itemId = e.target.parentNode.parentNode.parentNode.parentNode.id;
    
   if( itemId ) {
    splitId = itemId.split('-');

    type = splitId[0];

    id = parseInt(splitId[1]);
   }

   budgetCtrl.deleteItem(type, id);

   UiCtrl.deleteItem(itemId);

   updateBudget();

   updatePercentage();

  };




  return {

    init : () => {

      console.log('Apps Successfully Start');
      initialSetup();
      UiCtrl.getSetMonth();

      UiCtrl.displayBudget(

        {
          budget : 0,
          income : 0,
          expenses : 0,
          percentage : -1
        }

      );

    }

  }

}(BudgetController, UIController));

MainController.init();






















/**
 *  [ES - 5] code
 */


// // Budget controller modules
// var BudgetController = (function() {

//   var Expenses = function(id, desc, val) {
//     this.id = id;
//     this.description = desc;
//     this.value = val;
//     this.percentage = -1;
//   };

//   Expenses.prototype.calcPercentage = function(totalInc) {
    
//     if( totalInc > 0 ) {
//       this.percentage = Math.round((this.value / totalInc) * 100);
//     } else {
//       this.percentage = -1;
//     }

//   };

//   Expenses.prototype.getPercentage = function() {
//     return this.percentage;
//   }

//   var Income = function(id, desc, val) {
//     this.id = id;
//     this.description = desc;
//     this.value = val;
//   };

//   var calculateTotals = function(type) {

//     var sum = 0;
//     data.allItems[type].forEach(function(cur) {
//       sum += cur.value;
//     })
//     data.totals[type] = sum;

//   };

//   var data = {
//     allItems : {
//       inc : [],
//       exp : []
//     },
//     totals : {
//       inc : 0,
//       exp : 0
//     }, 
//     budget : 0,
//     percentage : 0
//   };


//   // All public method goes here
//   return {

//     addItem : function(type, des, val) {

//       var newItem, ID;

//       if( data.allItems[type].length > 0 ) {
//         ID = data.allItems[type][data.allItems[type].length -1].id + 1;
//       } else {
//         ID = 0;
//       }

//       if( type === 'inc' ) {
//         newItem = new Income(ID, des, val);
//       } else if( type === 'exp' ) {
//         newItem = new Expenses(ID, des, val);
//       };

//       data.allItems[type].push(newItem);

//       return newItem;

//     },

//     calculateBudgets : function() {

//       calculateTotals('inc');
//       calculateTotals('exp');

//       data.budget = data.totals.inc - data.totals.exp;

//       if( data.totals.inc > 0) {
//         data.percentage = Math.round((data.totals.exp / data.totals.inc) * 100);
//       } else {
//         data.percentage = -1;
//       };

//     },

//     calculatePercentage : function() {

//       data.allItems.exp.forEach(function(cur) {
//         cur.calcPercentage(data.totals.inc);
//       });

//     },

//     getPercentage : function() {
      
//       var allPercent = data.allItems.exp.map(function(cur) {
//         return cur.getPercentage();
//       });

//       return allPercent;
//     },

//     deleteItem : function(type, ID) {

//       var ids, index;

//       ids = data.allItems[type].map(function(cur) {
//         return cur.id;
//       });

//       index = ids.indexOf(ID);

//       if(index !== -1) {
//         data.allItems[type].splice(index, 1);
//       }

//     },

//     getBudget : function() {

//       return {
//         budget: data.budget,
//         income: data.totals.inc,
//         expenses: data.totals.exp,
//         percentage: data.percentage
//       };

//     },

//     dataTest : function() {
//       return data;
//     }

//   }

// })();





// // UI Controller modules
// var UIController = (function() {

//   var DOMString = {
//     inputType: '.add__type',
//     inputDescription: '.add__description',
//     inputValue: '.add__value',
//     inputBtn: '.add__btn',
//     incomeContainer: '.income__list', 
//     expensesContainer: '.expenses__list', 
//     budgetLabel: '.budget__value',
//     incomeLabel: '.budget__income--value',
//     expensesLabel: '.budget__expenses--value',
//     percentageLabel: '.budget__expenses--percentage',
//     container: '.container',
//     expensesPercLabel: '.item__percentage',
//     dateLabel: '.budget__title--month'
//   };

//   var numberFormate = function(num, type) {

//     var numSplit, int, dec ;

//     num = Math.abs(num);

//     num = num.toFixed(2);

//     numSplit = num.split('.');

//     int = numSplit[0];

//     if(int.length > 3) {
//       int = int.substr(0, int.length -3) + ',' + int.substr(int.length - 3, int.length);
//     }

//     dec = numSplit[1];

//     return (type === 'exp' ? '-' : '+') + int + '.' + dec;

//   };

//   var nodeListForeach = function(list, callback){
//     for( var i = 0; i < list.length ; i++ ){
//       callback(list[i], i);
//     };
//   };



//   // All public method goes here
//   return {

//     getInput : function() {

//       return {
//         type : document.querySelector(DOMString.inputType).value,
//         description : document.querySelector(DOMString.inputDescription).value,
//         value : parseFloat(document.querySelector(DOMString.inputValue).value),
//       }

//     },

//     displayItem : function(obj, type) {

//       var html, el, value;

//       value = numberFormate(obj.value, type);

//       if( type === 'inc' ) {
//         el = DOMString.incomeContainer;
//         html = 
//           `<div class="item clearfix" id="inc-${obj.id}">
//             <div class="item__description">${obj.description}</div>
//             <div class="right clearfix">
//                 <div class="item__value">${value}</div>
//                 <div class="item__delete">
//                     <button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button>
//                 </div>
//             </div>
//           </div>`;
//       } else if( type === 'exp' ) {
//         el = DOMString.expensesContainer;
//         html = 
//           `<div class="item clearfix" id="exp-${obj.id}">
//               <div class="item__description">${obj.description}</div>
//               <div class="right clearfix">
//                   <div class="item__value">${value}</div>
//                   <div class="item__percentage">21%</div>
//                   <div class="item__delete">
//                       <button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button>
//                   </div>
//               </div>
//         </div>`;
//       };

//       document.querySelector(el).insertAdjacentHTML('beforeend', html);

//     },

    
//     deleteItem : function(selector) {

//       var el = document.getElementById(selector);
//       el.parentNode.removeChild(el);

//     },

//     clearFields : function() {

//       var fields, fieldsArr;

//       fields = document.querySelectorAll( DOMString.inputDescription + ',' + DOMString.inputValue );

//       fieldsArr = Array.prototype.slice.call(fields);

//       fieldsArr.forEach(function(cur) {
//         return cur.value = '';
//       });

//       fieldsArr[0].focus();

//     },

//     displayBudget : function(obj) {

//       var type = obj.budget >= 0 ? 'inc' : 'exp';

//       document.querySelector(DOMString.budgetLabel).textContent = numberFormate(obj.budget, type);
//       document.querySelector(DOMString.incomeLabel).textContent = numberFormate(obj.income, 'inc');
//       document.querySelector(DOMString.expensesLabel).textContent = numberFormate(obj.expenses, 'exp');

//       if( obj.percentage > 0 ) {
//         document.querySelector(DOMString.percentageLabel).textContent = obj.percentage + '%';
//       } else {
//         document.querySelector(DOMString.percentageLabel).textContent = '---';
//       };

//     },

//     displayPercentage : function(percentage) {

//       var fields = document.querySelectorAll(DOMString.expensesPercLabel);

      
//       nodeListForeach(fields, function(current, index) {
        
//         if( percentage[index] > 0 ) {
//           current.textContent = percentage[index] + '%';
//         } else {
//           current.textContent = '---';
//         }

//       });

//     },

//     changeformUI : function() {

//       var fields ;

//       fields = document.querySelectorAll(DOMString.inputType + ',' + DOMString.inputDescription + ',' + DOMString.inputValue);

//       nodeListForeach(fields, function(cur, index) {
//         return cur.classList.toggle('red-focus');
//       });

//       document.querySelector(DOMString.inputBtn).classList.toggle('red');

//     },

//     showDate : function() {

//       var now, month, months, year;

//       now = new Date();

//       months = ['January', 'February', 'March', 'May', 'Jun', 'July', 'August', 'September', 'October', 'November', 'December'];

//       month = months[now.getMonth() - 1];

//       year = now.getFullYear();

//       document.querySelector(DOMString.dateLabel).textContent = month + ' ' + year;

//     },


//     getDomString : function() {
//       return DOMString;
//     }

//   }

// })();




// // Main Controller modules [connector for other modules]
// var MainController = (function(budgetCtrl, UiCtrl) {

//   var initialSetup = function() {

//     var DOM = UiCtrl.getDomString();

//     document.querySelector(DOM.inputBtn).addEventListener('click', ctrlAddItem);

//     document.addEventListener('keypress', function(event) {
//       if( event.keyCode === 13 || event.which === 13 ) {
//         ctrlAddItem();
//       };
//     });

//     document.querySelector(DOM.container).addEventListener('click', ctrlDeleteItem );

//     document.querySelector(DOM.inputType).addEventListener('change', UiCtrl.changeformUI);

//   };

//   var updateBudget = function() {

//     budgetCtrl.calculateBudgets();

//     var budget = budgetCtrl.getBudget();

//     UiCtrl.displayBudget(budget);

//   };

//   var updatePercentage = function() {

//     budgetCtrl.calculatePercentage();

//     var percentage = budgetCtrl.getPercentage();

//     UiCtrl.displayPercentage(percentage);

//   };


//   var ctrlAddItem = function() {

//     var input = UiCtrl.getInput();

//     if( input.description !== '' && input.value > 0 && !isNaN(input.value) ) {

//       var newItem = budgetCtrl.addItem(input.type, input.description, input.value);

//       UiCtrl.displayItem(newItem, input.type);

//       UiCtrl.clearFields();

//       updateBudget();

//       updatePercentage();

//     }

//   };

//   var ctrlDeleteItem = function() {
    
//     var itemId, splitId, type, ID;

//     itemId = event.target.parentNode.parentNode.parentNode.parentNode.id;

//     if(itemId) {
//       splitId = itemId.split('-');
//       type = splitId[0];
//       ID = parseInt(splitId[1]);
//     };

//     budgetCtrl.deleteItem(type, ID);

//     UiCtrl.deleteItem(itemId);

//     updateBudget();

//     updatePercentage();

//   }




//   // All public method goes here
//   return {

//     init : function() {
      
//       console.log('You are ready to go!!')

//       initialSetup();

//       UiCtrl.showDate();

//       UiCtrl.displayBudget(
//         {
//           budget: 0,
//           income: 0,
//           expenses: 0,
//           percentage: -1
//         }
//       );

//     }

//   }

// })(BudgetController, UIController);

// MainController.init();

