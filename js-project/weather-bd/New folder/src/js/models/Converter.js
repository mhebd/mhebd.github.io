/**
 * English number to Bangoli number converter
 * @param {*} eng 
 */

export const convert = (eng) => {
    const engArr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
    const bnArr = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];

    if(eng) {
      let res = eng.toString().replace(/\s/g, '__').split('');

      const fRes = res.map(e => {
        if(isNaN(e)) {
          return e;
        } else if(!isNaN(e)) {
          const n = Number(e);
          const index = engArr.indexOf(n);
          return bnArr[index];
        }
      }).join('').replace(/__/g, ' ');

      return fRes;
    } else {
      alert('Something wrong in convert!!');
    }
  }
