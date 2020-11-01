
const UiController = (() => {

  const doms = {
    contianer : document.querySelector('.container'),
    seats : document.querySelectorAll('.row .seat:not(.booked)'),
    movie : document.getElementById('movies'),
    count : document.getElementById('count'),
    total : document.getElementById('total')
  };

  return {

    getDoms : () => {
      return doms;
    },

  }

})();



const MainController = ( UiCtrl => {

  const initialSetup = () => {
    
    let doms = UiCtrl.getDoms();

    // Set localstorage data into UI
    setLocalStorageData(doms);

    let ticket = doms.movie.value;

    // Add eventlistener into dome container
    doms.contianer.addEventListener('click', e => {
      
      if( e.target.classList.contains('seat') && !e.target.classList.contains('booked') ) {

      e.target.classList.toggle('selected');

        updateInfo(doms, ticket)
      }

    });

    // add event listener on movie changing
    doms.movie.addEventListener('change', e => {

      ticket = doms.movie.value;

      // Get selected movie name list arrray index
      let selectedMovie = e.target.selectedIndex;

      // Set Selected movie list arrar index into localstorage
      localStorage.setItem('movie', selectedMovie);

      updateInfo(doms, ticket);

    });

  };

  const updateInfo = (doms, ticket) => {
    
    let selectedSeatArr = document.querySelectorAll('.row .seat.selected'); 

    let selectedSeatIndexArr = [...selectedSeatArr].map( seat => {
      return [...doms.seats].indexOf(seat);
    });

    localStorage.setItem('selectedSeats', JSON.stringify(selectedSeatIndexArr));

    localStorage.setItem('ticket', ticket);

    doms.count.textContent = selectedSeatIndexArr.length;
    doms.total.textContent = selectedSeatIndexArr.length * ticket;

  };

  const setLocalStorageData = (doms) => {

    let LSselectedSeats = JSON.parse(localStorage.getItem('selectedSeats'));
    let ticket = localStorage.getItem('ticket');
    let movie = localStorage.getItem('movie');

    if( LSselectedSeats !== null && LSselectedSeats.length > 0 ) {
      doms.seats.forEach( (seat, index) => {       
        if( LSselectedSeats.indexOf(index) !== -1 ) {
          seat.classList.add('selected');
        }
      });
    }

    if( LSselectedSeats !== null ) {
      doms.count.textContent = LSselectedSeats.length;
      doms.total.textContent = LSselectedSeats.length * ticket;
    }

    if( movie !== null ) {
      doms.movie.selectedIndex = movie;
    }

  };


  return {
    init : () => {
      console.log('App Successfully Start');
      initialSetup();
    }
  }

})(UiController);

MainController.init();




// const contianer = document.querySelector('.container');
// const seats = document.querySelectorAll('.row .seat:not(.booked)');
// const movie = document.getElementById('movies');
// const count = document.getElementById('count');
// const total = document.getElementById('total');

// populateUI();

// let ticket = movie.value;



// movie.addEventListener('change', e => {
//   ticket = movie.value;
//   let movieSelect = (e.target.selectedIndex);
//   console.log(movieSelect);

//   updateInfo();

//   localStorage.setItem('movie', movieSelect);
// });


// contianer.addEventListener('click', e => {

//   if( e.target.classList.contains('seat') && !e.target.classList.contains('booked') ) {
//     e.target.classList.toggle('selected');
//     updateInfo();
//   }

// });

// const updateInfo = () => {
//   const selected = document.querySelectorAll('.row .selected');

//   const selectedIndexArr = Array.from(selected).map( cur => {
//     return [...seats].indexOf(cur);
//   });

//   localStorage.setItem('selectedSeats', JSON.stringify(selectedIndexArr));

//   localStorage.setItem('ticket', ticket);

//   count.textContent = selectedIndexArr.length;
//   total.textContent = selectedIndexArr.length * ticket;
// }



// function populateUI() {
//   let selectedSeats = JSON.parse(localStorage.getItem('selectedSeats'));

//   if( selectedSeats !== null && selectedSeats.length > 0 ) {
//     seats.forEach((seat, index) => {
//       if(selectedSeats.indexOf(index) !== -1) {
//         seat.classList.add('selected');
//       }
//     })
//   };

//   let movieNameIndex = localStorage.getItem('movie');
//   if( movieNameIndex !== null ) {
//     movie.selectedIndex = movieNameIndex;
//   };

//   let ticketPrice = localStorage.getItem('ticket');

//   if( selectedSeats !== null ) {
//     count.textContent = selectedSeats.length;
//     total.textContent = selectedSeats.length * ticketPrice;
//   }
// }
