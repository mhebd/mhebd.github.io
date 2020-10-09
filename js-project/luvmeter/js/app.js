
/**
 * Set all questions into a array
 */

 var fStart = `<form action="#" class="quest-form" id="q-form">`;
 var fEnd = `<div class="input-group pt-4">
 <input type="submit" value="Next" class="submit-btn btn form-control">
 <input type="button" value="Skip" class="skip-btn btn form-control">
</div>
</form>`;

  var q1 = fStart + `
      <p class="quest lead">০১। আপনার রাতের ঘুম কি কমে গিয়েছে?</p>
      <div class="ans-wrap">
        <label class="ans-container">হ্যা কমেছে
          <input type="radio" name="ans" value="9">
          <span class="checkmark"></span>
        </label>
        <label class="ans-container">সামান্য কমেছে
          <input type="radio" name="ans" value="6">
          <span class="checkmark"></span>
        </label>
        <label class="ans-container">পূর্বের মতই রয়েছে
          <input type="radio" name="ans" value="3">
          <span class="checkmark"></span>
        </label>
        <label class="ans-container">আমার ঘুম বেড়েছে
          <input type="radio" name="ans" value="0">
          <span class="checkmark"></span>
        </label>
      </div>
  ` + fEnd;

  var q2 = fStart + `
      <p class="quest lead">০২।আপনার দৈহিক ও মানসিক অস্থিরতা কি বৃদ্ধিপেয়েছে?</p>
      <div class="ans-wrap">
        <label class="ans-container">হ্যা বৃদ্ধি পেয়েছে
          <input type="radio" name="ans" value="9">
          <span class="checkmark"></span>
        </label>
        <label class="ans-container">আমি বুঝতে পারছিনা
          <input type="radio" name="ans" value="3">
          <span class="checkmark"></span>
        </label>
        <label class="ans-container">সামান্য পেয়েছে
          <input type="radio" name="ans" value="6">
          <span class="checkmark"></span>
        </label>
        <label class="ans-container">না, কোন পরিবর্তন নেয়
          <input type="radio" name="ans" value="1">
          <span class="checkmark"></span>
        </label>
      </div>
  ` + fEnd;

  var q3 = fStart + `
      <p class="quest lead">০৩। আপনি কি মনে করছেন আপনার হৃৎপিন্ডের গতি বেড়ে গিয়েছে?</p>
      <div class="ans-wrap">
        <label class="ans-container">হ্যা তাই মনে হচ্ছে
          <input type="radio" name="ans" value="9">
          <span class="checkmark"></span>
        </label>
        <label class="ans-container">সামান্য বেড়েছে
          <input type="radio" name="ans" value="6">
          <span class="checkmark"></span>
        </label>
        <label class="ans-container">আমি বুঝতে পারছিনা
          <input type="radio" name="ans" value="2">
          <span class="checkmark"></span>
        </label>
        <label class="ans-container">কোন পরিবর্তন নেয়
          <input type="radio" name="ans" value="0">
          <span class="checkmark"></span>
        </label>
      </div>
  ` + fEnd;

  var q4 = fStart + `
      <p class="quest lead">০৪। আপনার কাছে কি খাবারের স্বাদের কোন পরিবর্তন মনে হয়েছে ?</p>
      <div class="ans-wrap">
        <label class="ans-container">খাবারের স্বাদ কমেছে
          <input type="radio" name="ans" value="0">
          <span class="checkmark"></span>
        </label>
        <label class="ans-container">খাবারের স্বাদ বেশি লাগচ্ছে
          <input type="radio" name="ans" value="10">
          <span class="checkmark"></span>
        </label>
        <label class="ans-container">খাবারের স্বাদ সামান্য বেশি লাগচ্ছে
          <input type="radio" name="ans" value="6">
          <span class="checkmark"></span>
        </label>
        <label class="ans-container">স্বাদের কোন পরিবর্তন নেয়
          <input type="radio" name="ans" value="1">
          <span class="checkmark"></span>
        </label>
      </div>
  ` + fEnd;

  var q5 = fStart + `
      <p class="quest lead">০৫। আপনার কি সম্প্রতি সব কিছু ভুলে যাওয়া শুরু হয়েছে ?</p>
      <div class="ans-wrap">
        <label class="ans-container">সর্বদা ভুলে যায়
          <input type="radio" name="ans" value="10">
          <span class="checkmark"></span>
        </label>
        <label class="ans-container">মাঝে মাঝে ভুলে যায়
          <input type="radio" name="ans" value="7">
          <span class="checkmark"></span>
        </label>
        <label class="ans-container">সবকিছু আগের মতই
          <input type="radio" name="ans" value="0">
          <span class="checkmark"></span>
        </label>
        <label class="ans-container">খুব বেশি ভুলে যায় না
          <input type="radio" name="ans" value="3">
          <span class="checkmark"></span>
        </label>
      </div>
  ` + fEnd;

  var q6 = fStart + `
      <p class="quest lead">০৫। আপনি আপনার দেহের বিচ্ছিন্ন ব্যাথা বেদনা পূর্বের থেকে কেমন বোধ করছেন?</p>
      <div class="ans-wrap">
        <label class="ans-container">ভাল হয়ে গিয়েছে
          <input type="radio" name="ans" value="10">
          <span class="checkmark"></span>
        </label>
        <label class="ans-container">বেড়েছে
          <input type="radio" name="ans" value="0">
          <span class="checkmark"></span>
        </label>
        <label class="ans-container">সামান্য কমেছে
          <input type="radio" name="ans" value="5">
          <span class="checkmark"></span>
        </label>
        <label class="ans-container">কোন পরিবর্তন হয়নি
          <input type="radio" name="ans" value="2">
          <span class="checkmark"></span>
        </label>
      </div>
  ` + fEnd;

  var q7 = fStart + `
      <p class="quest lead">০৭। আপনি কি পূর্বের মত চিন্তা ভাবনা করতে পারছেন না ? </p>
      <div class="ans-wrap">
        <label class="ans-container">চিন্তা ভবনা পরিবর্তন হয়েছে
          <input type="radio" name="ans" value="9">
          <span class="checkmark"></span>
        </label>
        <label class="ans-container">সবকিছু এলোমেলো হয়ে যাচ্ছে
          <input type="radio" name="ans" value="7">
          <span class="checkmark"></span>
        </label>
        <label class="ans-container">সবকিছু ঠিক ঠাক রয়েছে
          <input type="radio" name="ans" value="0">
          <span class="checkmark"></span>
        </label>
        <label class="ans-container">কিছুটা পরিবর্তন এসেছে
          <input type="radio" name="ans" value="4">
          <span class="checkmark"></span>
        </label>
      </div>
  ` + fEnd;

  var q8 = fStart + `
      <p class="quest lead">০৮। আপনি কি অতিরিক্ত আবেগি হয়ে যাচ্ছেন ?</p>
      <div class="ans-wrap">
        <label class="ans-container">আমার আবেগ বেড়েছে
          <input type="radio" name="ans" value="7">
          <span class="checkmark"></span>
        </label>
        <label class="ans-container">সবকিছু আবেগ দ্বারা নিয়ন্ত্রিত হচ্ছে
          <input type="radio" name="ans" value="9">
          <span class="checkmark"></span>
        </label>
        <label class="ans-container">কোন আবেগ নেয়
          <input type="radio" name="ans" value="0">
          <span class="checkmark"></span>
        </label>
        <label class="ans-container">পূর্বের মতই রয়েছে
          <input type="radio" name="ans" value="2">
          <span class="checkmark"></span>
        </label>
      </div>
  ` + fEnd;

  var q9 = fStart + `
      <p class="quest lead">০৯। আপনি দিনে আপনার প্রিয়তম কে কতবার মনে করেন ?</p>
      <div class="ans-wrap">
        <label class="ans-container">কখনও মনে হয় না
          <input type="radio" name="ans" value="0">
          <span class="checkmark"></span>
        </label>
        <label class="ans-container">মাঝে মাঝে মনে হয়
          <input type="radio" name="ans" value="5">
          <span class="checkmark"></span>
        </label>
        <label class="ans-container">কখনও ভুলতে পারি না
          <input type="radio" name="ans" value="10">
          <span class="checkmark"></span>
        </label>
        <label class="ans-container">ঘটনা ক্রমে মনে হয়
          <input type="radio" name="ans" value="3">
          <span class="checkmark"></span>
        </label>
      </div>
  ` + fEnd;

  var q10 = fStart + `
      <p class="quest lead">১০। এখন আন্য কেহ যদি আপনাকে প্রপোজ করে, তবে আপনি কি করবেন ?</p>
      <div class="ans-wrap">
        <label class="ans-container">তা গ্রহণ করবেন
          <input type="radio" name="ans" value="0">
          <span class="checkmark"></span>
        </label>
        <label class="ans-container">ভেবে দেখবেন
          <input type="radio" name="ans" value="3">
          <span class="checkmark"></span>
        </label>
        <label class="ans-container">তা প্রত্যাখান করবেন
          <input type="radio" name="ans" value="10">
          <span class="checkmark"></span>
        </label>
        <label class="ans-container">তাকে বুঝিয়ে বলবেন
          <input type="radio" name="ans" value="7">
          <span class="checkmark"></span>
        </label>
      </div>
  ` + fEnd;

  var questions = [q1, q2, q3, q4, q5, q6, q7, q8, q9, q10];


/**
 * Main app calculation start
 */
  var warning = `<p class="alert alert-danger">অনুগ্রহ পূর্বক একটি উত্তর সিলেক্ট করুন</p>`;
  var mainContent = document.getElementById('mcw');

  var formDOM = document.getElementById('q-form');

  formDOM.addEventListener('submit', function(e){
    e.preventDefault();
    var value = formDOM.ans.value;
    if( value == '' || value == null ){
      message.innerHTML = warning;
    } else {
      if( value == 'yes' ){
        mainContent.innerHTML = `<img src="img/loading-1.gif" class="loading" />`;
        message.innerHTML = '';
        setTimeout(() => {
          mainContent.innerHTML = `
          <div class="text-center">
            <h3>মুখবন্ধ</h3>
            <p>এই প্রোগ্রামটি সম্পুর্ন মজা করার জন্য তৈরি করা হয়েছে। যদিও এখানে যে অ্যালগরিদম ব্যবহার করা হয়েছে তার সম্পুর্নই বিঙ্গান সম্মত। অর্থাত আপনি সত্য তথ্য দিলে সত্য ফলাফল পাবেন।</p>
            <p><b>বিঃ দ্রঃ</b> <em>এই প্রোগ্রাম দ্বার যদি কোন ভুল ত্রূটি হয়ে থাকে তবে তা ক্ষমা সুন্দর দৃষ্টিতে দেখার অনুরধ রইল।</em></p>
          </div>
          `;
          setTimeout(() => {
            nextQuest();
          }, 5000);
        }, 2000);
      } else {
        mainContent.innerHTML = `<img src="img/loading-1.gif" class="loading" />`;
        message.innerHTML = '';
        setTimeout(() => {
          mainContent.innerHTML = `<p class="lead">আমরা আন্তরিক ভাবে দুঃখিত, যে এই এই প্রোগ্রামটি আপনার জন্য নয়। অনুগ্রহ পূর্বক পরবর্তিতে আবার চেষ্টা করবেন।</p>`;
        message.innerHTML = '';
        }, 2000);
      }
    };
  });


 var i = 0;
 var score = 0;
 var message = document.querySelector('.message');

 
 

 function nextQuest(){
  message.textContent = '';
  var mainContent = document.getElementById('mcw');

      mainContent.innerHTML = questions[i];

  var formDOM = document.getElementById('q-form');
  var skip = document.querySelector('.skip-btn');

  skip.addEventListener('click', function(){
    i++;
    mainContent.innerHTML = `<img src="img/loading-3.gif" class="loading" />`;
    message.innerHTML = '';
    setTimeout(() => {
      if( i <= 9){
        nextQuest();
      } else {
        mainContent.innerHTML = `<p>Your Score is:`+ score +`</p>`;
      }
    }, 1000);
  });

  formDOM.addEventListener('submit', function(e){
     e.preventDefault();
     var value = formDOM.ans.value;
     if( value == '' || value == null ){
       message.innerHTML = warning;
     } else {
       score += parseInt(value);
       i++;
       mainContent.innerHTML = `<img src="img/loading-4.gif" class="loading" />`;
        message.innerHTML = '';
        setTimeout(() => {
          if( i <= 9){
            nextQuest();
          } else {
            var twitterBtn = `<a href="https://twitter.com/share?ref_src=twsrc%5Etfw" class="twitter-share-button" data-text="Hello there, This is very awesome and enjoyable program. You can try this program to make your darling pleased on you." data-show-count="false">Tweet</a><script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>`;

            var facebookBtn = `<iframe src="https://www.facebook.com/plugins/share_button.php?href=https%3A%2F%2Fmhebd.github.io%2Fjs-project%2Fluvmeter%2F&layout=button&size=large&width=77&height=28&appId" width="77" height="28" style="border:none;overflow:hidden" scrolling="no" frameborder="0" allowTransparency="true" allow="encrypted-media"></iframe>`;

            var rose = Math.floor(Math.random() * 6) + 1;
            if( score >= 50 ){
              mainContent.innerHTML = `<div class="text-center">
              <img src="img/rose-${rose}.jpg" class="loading" />
              <p>অভিনন্দন!!!</p>
              <p>আপনার ভালবাসা ${score}% ভাগ খাটি।</p>
              <p>আপনার ভালবাসার গভিরতা আর বেশি হোক।</p>
              <p>আপনার জন্য শুভকামনা রইল।</p> 
              
              <p class="">বন্ধুদের সাথে শেয়ার করুন </p>
              <p class="">${facebookBtn} | ${twitterBtn}</p> 
              </div>`; 
            } else {
              mainContent.innerHTML = `<div class="text-center">
              <img src="img/rose-${rose}.jpg" class="loading" />
              <p>অভিনন্দন!</p>
              <p>আপনার ভালবাসা ${score}% ভাগ খাটি। যা মোটেও একটা ভাল খবর নয়।</p>
              <p>তাই, ভালবাসার মানুষটিকে আপন করে পেতে চাইলে তার সাথে আর বেশি বেশি সময় কাটান, তাকে আর বেশি করে সময় দিন।</p>
              <p>আপনার জন্য শুভকামনা রইল।</p>

              <p class="">বন্ধুদের সাথে শেয়ার করুন</p> 
              <p class="">${facebookBtn} | ${twitterBtn}</p> 
              </div>`;
            };
          }
        }, 1000);
     };
  });
 };





















