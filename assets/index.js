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
$.getJSON("assets/info.json", function(data) {
    document.getElementById("title").innerHTML = data.Person.Name + " " + data.Person.Surname;
    document.getElementById("profession").innerHTML = data.Person.Info;
    document.getElementById("description").innerHTML = data.Person.About;

    $(document).ready(function() {
        let count = 0
        for(x in data.Person.Contact) {
            if (count == 0) {
                $('.home__address').append("<span class='home__information' id='address'><i class='bx bx-map home__icon'></i>"+data.Person.Contact[x]+"</span>");
                count += 1;
            } else if(count == 1) {
                $('.home__address').append("<span class='home__information' id='email'><i class='bx bx-envelope home__icon'></i>"+data.Person.Contact[x]+"</span>");
                count += 1;
            } else {
                $('.home__address').append("<span class='home__information' id='number'><i class='bx bx-phone home__icon'></i>"+data.Person.Contact[x]+"</span>");
            }
        }
    });

    $(document).ready(function() {
        let count = 0
        for(x in data.Person.Social) {
            if (count == 0) {
                $('.social__container').append("<a href='"+data.Person.Social[x]+"' target='_blank' class='social__link'> <i class='bx bxl-linkedin social__icon' ></i>"+x+"</a>");
                count += 1;
            } else {
                $('.social__container').append("<a href='"+data.Person.Social[x]+"' target='_blank' class='social__link'><i class='bx bxl-github social__icon' ></i>"+x+"</a>");
            }
        }
    });

    $(document).ready(function() {
        const last_obj = Object.keys(data.Person.Portfolio.Education)[Object.keys(data.Person.Portfolio.Education).length-1];
        for(x in data.Person.Portfolio.Education) {
            for (y in data.Person.Portfolio.Education[x]) {
                if(x != last_obj) {
                    $('.education__container').append("<div class='education__content'><div class='education__time'><span class='education__rounder'></span><span class='education__line'></span></div><div class='education__data c-grid'><h3 class='education__title'>"+y+"</h3><span class='education__studies'>"+x+"</span><span class='education__year'>"+data.Person.Portfolio.Education[x][y]+"</span></div></div>");
                } else {
                    $('.education__container').append("<div class='education__content'><div class='education__time'><span class='education__rounder'></span></div><div class='education__data c-grid'><h3 class='education__title'>"+y+"</h3><span class='education__studies'>"+x+"</span><span class='education__year'>"+data.Person.Portfolio.Education[x][y]+"</span></div></div>");
                }
            }
        }
    });

    $(document).ready(function() {
        for(x in data.Person.Skills) {
            $('.skills__content').append("<ul class='skills__data' id='"+x+"'></ul>");
            for (y in data.Person.Skills[x]){
                $('#'+x+'').append("<li class='skills__name'><span class='skills__circle'>"+y+"</span></li>");
            }
        }
    });
  });