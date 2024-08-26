let btn1 = document.getElementById("btn1");
let btn2 = document.getElementById("btn2");
let btns = Array.from(document.querySelectorAll(".countries .btn"));
let btns2 = Array.from(document.querySelectorAll(".cities .btn"));
let collapseTwo = document.getElementById("collapseTwo");
let time = Array.from(document.getElementsByClassName("time"));
let cities = document.querySelectorAll(".cities .btn");
let country = "Egypt";
let city = "Cairo";
let eg = document.querySelectorAll(".eg");
let sa = document.querySelectorAll(".sa");
let usa = document.querySelectorAll(".usa");
let jp = document.querySelectorAll(".jp");
let en = document.querySelectorAll(".en");
let today = document.getElementById("today");


function hide() {
  for (x = 0; x < cities.length; x++) {
    cities[x].style.display = "none";
  }
}
function show(xd) {
  for (x = 0; x < xd.length; x++) {
    xd[x].style.display = "inline-block";
  }
}
hide();
show(eg);
btns.forEach((ele) => {
  ele.addEventListener("click", () => {
    btns.forEach((ele) => {
      btns2.forEach((ele) => {
        ele.classList.remove("active");
      });
      ele.classList.remove("active");
    });
    country = ele.dataset.country;
    hide();
    if (country == "Egypt") {
      show(eg);
      eg[0].classList.add("active");
      timings(eg[0].dataset.city, country);
    } else if (country == "Saudi") {
      show(sa);
      sa[0].classList.add("active");
      timings(sa[0].dataset.city, country);
    } else if (country == "America") {
      show(usa);
      usa[0].classList.add("active");
      timings(usa[0].dataset.city, country);
    } else if (country == "Japan") {
      show(jp);
      jp[0].classList.add("active");
      timings(jp[0].dataset.city, country);
    } else if (country == "Englend") {
      show(en);
      en[0].classList.add("active");
      timings(en[0].dataset.city, country);
    }
    ele.classList.add("active");
  });
});

//changing cities
function changeCity(country) {
  if (country == "Egypt") {
    for (x = 0; x < btns2.length; x++) {
      console.log(btn2[x]);
    }
  }
}

// for (btn of btns) {
//   btn.addEventListener("click", () => {
//     collapseTwo.classList.toggle("show");
//     btn2.classList.toggle("collapsed");
//   });
// }
btns2.forEach((ele) => {
  ele.addEventListener("click", () => {
    btns2.forEach((ele) => {
      ele.classList.remove("active");
    });
    ele.classList.add("active");
    city = ele.dataset.city;
    timings(city, country);
  });
});

//get prayers timing
function timings(city, country) {
  console.log(city, country);
  
  axios
    .get(
      `http://api.aladhan.com/v1/timingsByCity/:date?city=${city}&country=${country}`
    )
    .then((response) => {
      let prayers = [
        response.data.data.timings.Fajr,
        response.data.data.timings.Sunrise,
        response.data.data.timings.Dhuhr,
        response.data.data.timings.Asr,
        response.data.data.timings.Maghrib,
        response.data.data.timings.Isha,
      ];
      prayers1 = [];
      for (i = 0; i < prayers.length; i++) {
        const regex = /^\d{2}:\d{2}/;
        const p = /^\d{2}/;
        let t = prayers[i].match(regex)
        if(t[0]>12){
          k-=12
          k+=" صباحا"
        }
        prayers1.push(prayers[i].match(regex)[0]);
      }
      for (x = 0; x < prayers1.length; x++) {
        time[x].innerHTML = prayers1[x];
      }
    })
    .catch((error) => {
      console.log(error);
    });
}

timings(city, country);
