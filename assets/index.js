const showMenu = (toggleId, navId) =>{
    const toggle = document.getElementById(toggleId),
    nav = document.getElementById(navId)
    
    // Validate that variables exist
    if(toggle && nav){
        toggle.addEventListener('click', ()=>{
            // We add the show-menu class to the div tag with the nav__menu class
            nav.classList.toggle('show-menu')
        })
    }
}
showMenu('nav-toggle','nav-menu')

/* ------------------------------------------------------------ */

const navLink = document.querySelectorAll('.nav__link')

function linkAction(){
    const navMenu = document.getElementById('nav-menu')
    // When we click on each nav__link, we remove the show-menu class
    navMenu.classList.remove('show-menu')
}
navLink.forEach(n => n.addEventListener('click', linkAction))

/* ------------------------------------------------------------ */

const sections = document.querySelectorAll('section[id]')

function scrollActive(){
    const scrollY = window.pageYOffset

    sections.forEach(current =>{
        const sectionHeight = current.offsetHeight
        const sectionTop = current.offsetTop - 50;
        sectionId = current.getAttribute('id')

        if(scrollY > sectionTop && scrollY <= sectionTop + sectionHeight){
            document.querySelector('.nav__menu a[href*=' + sectionId + ']').classList.add('active-link')
        }else{
            document.querySelector('.nav__menu a[href*=' + sectionId + ']').classList.remove('active-link')
        }
    })
}
window.addEventListener('scroll', scrollActive)

/* -----------------------------Some Json Stuff------------------------------- */
$.getJSON("assets\info.json", function(data) {
    document.getElementById("title").innerHTML = data.Person.Name + " " + data.Person.Surname;
    document.getElementById("profession").innerHTML = data.Person.Info;
    document.getElementById("description").innerHTML = data.Person.About;

    $(document).ready(function() {
      for(x in data.Person.Contact) {
        $('.home__address').append('<div class="cInfo">' + data.Person.Contact[x] + '</div>');
      }
    });

    $(document).ready(function() {
      for(f in data.Person.Skills) {
        $('#skillsInfo').append('<div class="cKindSkills"><h3 style="margin: 0;">' + f + '</h3></div>');
        for(g in data.Person.Skills[f]) {
          var skillCount = data.Person.Skills[f][g];

          $('#skillsInfo').append('<div class="cSkills" style="background: linear-gradient(to right, #003b36 '+skillCount+'%, #e98a15 0);">'+ g +'</div>');
        }
      }
    });

    $(document).ready(function() {
      for(var i = 0; i < data.Person.Strengths.length; i++) {
        $('#softInfo').append('<div class="cSoft">' + data.Person.Strengths[i] + '</div>');
      }
    });

    $(document).ready(function() {
      for(x in data.Person.Portfolio) {
        $('#education').append('<div class="educlsHead"><h2>' + x +'</h2></div>');
        for(j in data.Person.Portfolio[x]) {
          $('#education').append('<div class="eduText"><h4>'+ data.Person.Portfolio[x][j] +'</h4></div><div class="eduDate">'+ j +'</div>');
        }
      }
    });

  });