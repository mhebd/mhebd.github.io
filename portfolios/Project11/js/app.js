
//Variabls
	const html = new HTMLUI(),
		  form = document.getElementById('request-quote');

//Event Listener
	eventListener();
function eventListener() {
	document.addEventListener('DOMContentLoaded', function(){
		html.displayYears();
	});

	form.addEventListener('submit', function() {
		const make = document.getElementById('make').value;
			year = document.getElementById('year').value;
			radio = document.querySelector('input[name="level"]:checked').value;
		if(make === '' || year === '' || radio === '') {
			html.displayError('All The Section Are Requered!!');
		} else {
			const prevRes = document.querySelector('#result div');
			if(prevRes != null){
				prevRes.remove();
			};
			
			const insurance = new Insurance(make, year, radio);
			const price = insurance.calculation(insurance);
			
			html.showResult(price, insurance);
		}
	});
}
//Functions

function Insurance(make, year, radio) {
	this.make = make;
	this.year = year;
	this.level = radio;
}
	Insurance.prototype.calculation = function(insurance) {
		let price;
		const base = 2000;
		
		make = insurance.make;
		
		switch(make){
			case '1':
				price = base * 1.15;
				break;
			case '2':
				price = base * 1.05;
				break;
			case '3':
				price = base * 1.35;
				break;
		}
		
		year = insurance.year
		const deferance = new Date().getFullYear() - year;
		
		price = price - ((deferance * 3) * price) / 100;
		
		level = insurance.level;
		if(level === 'basic'){
			price = price * 1.30;
		} else {
			price = price * 1.50;
		}
		
		return price;
	};

// This all uses for html 

function HTMLUI() {};

	HTMLUI.prototype.displayYears = function() {
		const maxYear = new Date().getFullYear(),
			minYear = maxYear - 20;
			
		const years = document.getElementById('year');
			
		for( let i = maxYear; i >= minYear; i-- ){
			const option = document.createElement('option');
				option.value = i;
				option.textContent = i;
			years.appendChild(option);
		}
	};
	
	HTMLUI.prototype.displayError = function(message) {
		const div = document.createElement('div');
			div.classList = 'error';
			div.innerHTML = `<p>${message}</p>`;
		form.insertBefore(div, document.querySelector('.form-group'));
		
		setTimeout(function(){
			document.querySelector('.error').remove();
		},3000)
	};
	
	HTMLUI.prototype.showResult = function(price, insurance){
		const result = document.getElementById('result');
		
		const	div = document.createElement('div');
		
		let make = insurance.make;
		switch(make){
			case '1':
				make = 'American';
				break;
			case '2': 
				make = 'Asian';
				break;
			case '3':
				make = 'European';
				break;
		}
		
		
			  
			div.innerHTML = `
				<p class="summary">Summary</p>
				<p class="make">Type: ${make}</p>
				<p class="year">Year: ${insurance.year}</p>
				<p class="level">Level: ${insurance.level}</p>
				<p class="total">Total: ${price}$</p>
			`;
			
			
		const spinner = document.querySelector('#loading img');
			spinner.style.display = 'block';
			
		setTimeout(function(){
			spinner.style.display = 'none';
			result.appendChild(div);
		},3000)
			
		
			
	}


















