/**
 * English number to Bangoli number converter
 * @param {*} eng 
 */

export const convertNum = (eng) => {
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


  export const convertText = text => {
    const texts = {
      'clear sky' : 'পরিষ্কার আকাশ',
      'overcast clouds' : 'মেঘাচ্ছন্ন আকাশ',
      'light rain' : 'হালকা বৃষ্টি',
      'broken clouds' : 'ভাঙা মেঘ',
      'few clouds' : 'হাল্কা মেঘ',
      'moderate rain' : 'মাঝারি বৃষ্টি',
      'scattered clouds' : 'বিক্ষিপ্ত মেঘ',
      'haze' : 'কুয়াশা',
    };

    return texts[text] || text;
  }




  export const convertDate = (dt) => {
    const d = new Date(dt * 1000);
    const time = d.toLocaleTimeString('bn-BD', {hour: '2-digit', minute:'2-digit'});
    const date = d.toLocaleDateString('bn-BD', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });

    return {date, time}
  }
