//// General Configuration
const q = (element) => document.querySelector(element)
const qA = (element) => document.querySelectorAll(element)


//// Mobile hamburger & Nav 
const MHN = (() => {
    const menu = q(".menu")
    const mobileNav = q(".mobileNav")
    
    menu.addEventListener("click", () => {
        menu.classList.toggle("opened")
        document.body.classList.toggle("noScroll")

        menu.setAttribute('aria-expanded', menu.classList.contains('opened'))
        mobileNav.classList.toggle("hide")
    })

    mobileNav.querySelectorAll(".navigation__item, .contact").forEach(item => item.addEventListener("click", () => {
        mobileNav.classList.add("hide")
        menu.classList.remove("opened")
        menu.setAttribute('aria-expanded', menu.classList.contains('opened'))
    
    }));
})()


//// contact copy functionality 
const contact = (() => {
    const contact = qA(".mail, .tel")
    const toolTip = qA(".tooltip")
    const email = contact[0].querySelector('a').textContent
    const tel = contact[1].querySelector('a').textContent

    const copy = (str) => {
        const el = document.createElement("textarea")
        el.textContent = str
        document.body.appendChild(el).select()
        document.execCommand('copy')
        document.body.removeChild(el)
    }

    for (let i = 0; i < contact.length; i++) {
        if (i === 0) {contact[i].querySelector("svg").addEventListener("click", () => copy(email))} 
        if (i === 1) {contact[i].querySelector("svg").addEventListener("click", () => copy(tel))}

        contact[i].querySelector("svg").addEventListener("click", () => {
            toolTip[i].style.top = "0";
            setTimeout(() => toolTip[i].style.top = "-100%", 500)
        })        
    }
    
})()

//// Theme switch funtion
const themeSwitch = (() => {
    let state = localStorage.getItem('darkMode')
    
    const button = q(".theme")
    const wrapper = q(".wrapper")

    const enable = () => {
        wrapper.classList.add("switchImage")
        q("body").classList.add("lightModeColor")
        localStorage.setItem("darkMode", "enabled")
    }

    const disable = () => {
        wrapper.classList.remove("switchImage")
        q("body").classList.remove("lightModeColor")
        localStorage.setItem("darkMode", null)
    }

    if(state === "enabled") enable()

    button.addEventListener("click", () => {
        state = localStorage.getItem("darkMode")
        state !== "enabled" ? enable() : disable()
    })
})()


//// Name animation 
const animation = (() => {
    const word = q("h1")
    const allLetters = word.textContent.split("")
    word.textContent = ""

    allLetters.forEach(letter => {
        const el = document.createElement("div")
        el.style.display = "inline-block"
        el.style.transition = "all .5s ease"
        el.textContent = letter
        word.appendChild(el)
    })

    let char = 0
    let timer
    const getAllLetters = word.querySelectorAll('div') 
    const anim = () => {
        getAllLetters[char].classList.add("intro")
        char++
        if(char === getAllLetters.length) {
            char = 0
            clearInterval(timer)
            timer = null
        }
    }
    timer = ()=> {setInterval(anim, 100)}
    setTimeout(timer, 3600)

    const preloader = q(".preloader")

    setTimeout(()=>{
        preloader.classList.add("moveUp")
        document.body.classList.add("goBack")
        document.body.classList.remove("noScroll")
    }, 3000)


})()


// Stack Animation
const stackAnimation = (()=> {
    const allStack = document.querySelector(".icons").querySelectorAll("span")

    allStack.forEach(stack => stack.classList.add("allStack__item"))

    gsap.from(".allStack__item", {
        stagger: .1,
        opacity: 0,
        duration: 2,
        delay: 4
    })
    

})()


//// intro animation
const mobileNavAnimation = (() => {
    gsap.registerPlugin(ScrollTrigger);
    gsap.from(".portfolio__item", {
        scrollTrigger: {
            trigger: ".header",
            start: "top 70%",
            // markers: true,
            toggleActions: "restart none none reverse"
        },
        stagger: .2,
        scaleX: 0,
        opacity: 0,
        duration: .5
    })
})()