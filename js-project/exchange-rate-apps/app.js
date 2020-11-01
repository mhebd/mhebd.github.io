
const UIController = (() => {

  const doms = {
    currencyOne : document.getElementById('currency-one'),
    input : document.getElementById('input'),
    currencyTwo : document.getElementById('currency-two'),
    output : document.getElementById('output'),
    swap : document.getElementById('btn'),
    rate : document.getElementById('rate'),
  };


  return {
    getDoms : () => {
      return doms;
    },
  }

})();



const MainController  = ((UiCtrl) => {

  let doms = UiCtrl.getDoms();

  const evetns = () => {

    doms.currencyOne.addEventListener('change', calculateRates);
    doms.input.addEventListener('input', calculateRates);
    doms.currencyTwo.addEventListener('change', calculateRates);
    doms.output.addEventListener('input', calculateRates);

    doms.swap.addEventListener('click', swapCurrency);

  };

  const calculateRates = () => {

    let currencyOneValue = doms.currencyOne.value;
    let currencyTwoValue = doms.currencyTwo.value;
    let inputValue = doms.input.value;

    // fetch(`https://v6.exchangerate-api.com/v6/0c23d4b7fa28442eda98acb1/latest/${currencyOneValue}`)
    // .then( res => {
    //   return res.json();
    // })
    // .then( data => {
    //   let rate = data.conversion_rates[currencyTwoValue];
    //   doms.rate.textContent = rate;
    //   doms.output.value = (inputValue * rate).toFixed(2);
    // });

    async function calculate() {
      let query = await fetch(`https://v6.exchangerate-api.com/v6/0c23d4b7fa28442eda98acb1/latest/${currencyOneValue}`);

      let data = await query.json(); 

      let rate = data.conversion_rates[currencyTwoValue];
      doms.rate.textContent = rate;
      doms.output.value = (inputValue * rate).toFixed(2);
    };

    calculate();

  };

  const swapCurrency = () => {

    let c2v = doms.currencyTwo.value;

    doms.currencyTwo.value = doms.currencyOne.value;
    doms.currencyOne.value = c2v;

    calculateRates();

  };

  calculateRates();



  return {
    init : () => {
      console.log('Apps Start Successfully');
      evetns();
    }
  }

})(UIController);


MainController.init();