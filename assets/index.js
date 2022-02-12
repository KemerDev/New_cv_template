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

function scrollTop(){
    const scrollTop = document.getElementById('scroll-top');
    // When the scroll is higher than 560 viewport height, add the show-scroll class to the a tag with the scroll-top class
    if(this.scrollY >= 200) scrollTop.classList.add('show-scroll'); else scrollTop.classList.remove('show-scroll')
}
window.addEventListener('scroll', scrollTop)

function scaleCv() {
    document.body.classList.add('scale-cv')
}

function removeScale() {
    document.body.classList.remove('scale-cv')
}

let areaCv = document.getElementById('area-cv')
let areaHeight = document.getElementById('area-cv').offsetHeight
let heightcm = areaHeight / 35.35

let resumeButton = document.getElementById('resume-button')

let opt = {
    margin: 0,
    filename: 'GeorgiosCV.pdf',
    html2canvas: {dpi: 192, letterRendering: true },
    jsPDF: {orientation: 'portrait', unit: 'cm', format: [heightcm, 60]}
}


function generateResume() {
    html2pdf(areaCv, opt)
}

resumeButton.addEventListener('click', () => {
    scaleCv()

    generateResume()

    setTimeout(removeScale, 5000)

})

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
            } else if(count == 1){
                $('.social__container').append("<a href='"+data.Person.Social[x]+"' target='_blank' class='social__link'><i class='bx bxl-github social__icon' ></i>"+x+"</a>");
                count += 1;
            } else {
                $('.social__container').append("<a href='"+data.Person.Social[x]+"' target='_blank' class='social__link'><i class='bx bx-globe social__icon' ></i>"+x+"</a>");
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
            if(x != "Languages") {
                $('.skills__content').append("<ul class='skills__data' id='"+x+"'></ul>");
                $('#'+x+'').append("<h3 class='skills__title'>"+x+"</h3>")
                for (y in data.Person.Skills[x]){
                    $('#'+x+'').append("<li class='skills__name'><span class='skills__circle'></span>"+y+"</li>");
                }
            }
        }
    });

    $(document).ready(function() {
        for (x in data.Person.Portfolio.Working_Experience) {
            for (y in data.Person.Portfolio.Working_Experience[x]){
                $('.experience__container').append('<div class="experience__content"><div class="experience__time"><span class="experience__rounder"></span><span class="experience__line"></span></div><div class="experience__data c-grid"><h3 class="experience__title">'+x+'</h3><span class="experience__company">'+y+'</span><p class="experience_decription">'+data.Person.Portfolio.Working_Experience[x][y]+'</p></div></div>');
            }
        }
    });

    $(document).ready(function() {
        for (x in data.Person.Portfolio.Projects) {
            for(y in data.Person.Portfolio.Projects[x])
            $('.project__container').append('<div class="project__content"><div class="project__time"></div><div class="project__data c-grid"><h3 class="project__title">'+x+'</h3><span class="project__date">'+data.Person.Portfolio.Projects[x][y]+'</span><p class="project_decription">'+y+'</p></div></div>');
        }
    });

    $(document).ready(function() {
        for (x in data.Person.Portfolio.Volunteering) {
            for(y in data.Person.Portfolio.Volunteering[x])
            $('.volunteer__container').append('<div class="volunteer__content"><div class="volunteer__time"></div><div class="volunteer__data c-grid"><h3 class="volunteer__title">'+x+'</h3><span class="volunteer__date">'+data.Person.Portfolio.Volunteering[x][y]+'</span><p class="volunteer_decription">'+y+'</p></div></div>');
        }
    });

    /*volunteer__container*/

    $(document).ready(function() {
        for (x in data.Person.Portfolio.Certificates) {
            $('.certificate__container').append('<div class="certificate__content"><h3 class="certificate__title">'+x+ ' | ' +data.Person.Portfolio.Certificates[x]+'</h3></div>');
        }
    });

    $(document).ready(function() {
        for(x in data.Person.Skills.Languages) {
            $('.languages__content').append('<li class="languages__name"><span class="languages__circle"></span>'+x+'</li>');
        }
    });
  });