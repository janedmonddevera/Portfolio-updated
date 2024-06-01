var imageSources = ["/images/DSC_2064.PNG", "/images/DSC_2065.PNG", "/images/DSC_2066.PNG", "/images/DSC_2067.PNG"]

var index = 0;
setInterval (function(){
  if (index === imageSources.length) {
    index = 0;
  }
  document.getElementById("image").src = imageSources[index];
  index++;
} , 2000);


var TxtType = function(el, toRotate, period) {
  this.toRotate = toRotate;
  this.el = el;
  this.loopNum = 1;
  this.period = parseInt(period, 10) || 2000;
  this.txt = ' ';
  this.tick();
  this.isDeleting = false;
};

TxtType.prototype.tick = function() {
  var i = this.loopNum % this.toRotate.length;
  var fullTxt = this.toRotate[i];

  if (this.isDeleting) {
      this.txt = fullTxt.substring(0, this.txt.length - 1);
  } else {
      this.txt = fullTxt.substring(0, this.txt.length + 1);
  }
  this.el.innerHTML = `<span class="wrap">${this.txt}&nbsp;</span>`;


  var that = this;
  var delta = 100 - Math.random() * 100;

  if (this.isDeleting) { delta /= 2; }

  if (!this.isDeleting && this.txt === fullTxt) {
      delta = this.period;
      this.isDeleting = true;
  } else if (this.isDeleting && this.txt === '') {
      this.isDeleting = false;
      this.loopNum++;
      delta = 500;
  }

  setTimeout(function() {
      that.tick();
  }, delta);
};

window.onload = function() {
  var elements = document.getElementsByClassName('typewrite');
  for (var i = 0; i < elements.length; i++) {
      var toRotate = elements[i].getAttribute('data-type');
      var period = elements[i].getAttribute('data-period');
      if (toRotate) {
          new TxtType(elements[i], JSON.parse(toRotate), period);
      }
  }
};


/**
* Utility function to calculate the current theme setting.
* Look for a local storage value.
* Fall back to system setting.
* Fall back to light mode.
*/
function calculateSettingAsThemeString({ localStorageTheme, systemSettingDark }) {
    if (localStorageTheme !== null) {
      return localStorageTheme;
    }
  
    if (systemSettingDark.matches) {
      return "dark";
    }
  
    return "light";
  }
  
  /**
  * Utility function to update the button text and aria-label.
  */
  function updateButton({ buttonEl, isDark }) {
    const newCta = isDark ? "/images/moon.png" : "/images/dark.png"; // Corrected image path
    // Use an aria-label if you are omitting text on the button and using a sun/moon icon, for example
    buttonEl.setAttribute("aria-label", isDark ? "Moon icon" : "Sun icon");
    buttonEl.innerText = ""; // Clear any existing text
    buttonEl.style.backgroundImage = `url(${newCta})`; // Set the background image
    buttonEl.style.backgroundSize = 'contain'; // Ensure the image fits well
    buttonEl.style.backgroundRepeat = 'no-repeat';
    buttonEl.style.backgroundPosition = 'center';
    buttonEl.style.width = '50px'; // Adjust size as needed
    buttonEl.style.height = '50px'; // Adjust size as needed
    buttonEl.style.border = 'none'; // Optional: Remove border if not needed
    buttonEl.style.outline = 'none'; // Optional: Remove outline if not needed
    console.log(isDark);
    var logos = ["fb","linkedin","github"]
    
    for (let i = 0; i < logos.length; i++) {
     

    var fb = document.getElementById(logos[i]);

    fb.classList.remove(isDark ? "hover:bg-gray-900" : "hover:bg-white");
    fb.classList.remove(isDark ? "text-text-black" : "text-white");
    fb.classList.remove(isDark ? "hover:text-white" : "hover:text-black");

    fb.classList.add(isDark ? "hover:bg-white" : "hover:bg-gray-900");
    fb.classList.add(isDark ? "text-white" : "text-black");
    fb.classList.add(isDark ? "hover:text-black" : "hover:text-white");
    }
  
}

  /**
  * Utility function to update the theme setting on the html tag
  */
  function updateThemeOnHtmlEl({ theme }) {
    document.querySelector("html").setAttribute("data-theme", theme);
  }
  
  
  /**
  * On page load:
  */
  
  /**
  * 1. Grab what we need from the DOM and system settings on page load
  */
  const button = document.querySelector("[data-theme-toggle]");
  const localStorageTheme = localStorage.getItem("theme");
  const systemSettingDark = window.matchMedia("(prefers-color-scheme: dark)");
  
  /**
  * 2. Work out the current site settings
  */
  let currentThemeSetting = calculateSettingAsThemeString({ localStorageTheme, systemSettingDark });
  
  /**
  * 3. Update the theme setting and button text accoridng to current settings
  */
  updateButton({ buttonEl: button, isDark: currentThemeSetting === "dark" });
  updateThemeOnHtmlEl({ theme: currentThemeSetting });
  
  /**
  * 4. Add an event listener to toggle the theme
  */
  button.addEventListener("click", (event) => {
    const newTheme = currentThemeSetting === "dark" ? "light" : "dark";
  
    localStorage.setItem("theme", newTheme);
    updateButton({ buttonEl: button, isDark: newTheme === "dark" });
    updateThemeOnHtmlEl({ theme: newTheme });
  
    currentThemeSetting = newTheme;
  }); 

  function contains(text, query) {
    return text.toLowerCase().includes(query.toLowerCase());
  }

  window.addEventListener('load', function () {
    Alpine.data('searchText', () => ({
      searchText: '',
      contains: contains
      
    }));
  });