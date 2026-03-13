// FAQ accordion logic
document.querySelectorAll('.faq-question').forEach(button => {
    button.addEventListener('click', () => {
        const faqItem = button.parentElement;
        const isActive = faqItem.classList.contains('active');

        // Închide celelalte panouri
        document.querySelectorAll('.faq-item').forEach(item => {
            item.classList.remove('active');
            item.querySelector('.faq-answer').style.maxHeight = null;
        });

        // Alternare stadiu panou curent
        if (!isActive) {
            faqItem.classList.add('active');
            const answer = faqItem.querySelector('.faq-answer');
            answer.style.maxHeight = answer.scrollHeight + "px";
        }
    });
});

// Parallax Reveal & Scroll Animations
document.addEventListener("DOMContentLoaded", () => {
    const revealElements = document.querySelectorAll('.feature-card, .problem-card, .split-content, .iphone-mockup, .section-title, .section-subtitle, .devices-text, .tablet-mockup, .website-offer');
    
    // Inițializare clase de reveal
    revealElements.forEach(el => el.classList.add('reveal'));

    const revealOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    const revealOnScroll = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('reveal-active');
                observer.unobserve(entry.target);
            }
        });
    }, revealOptions);

    revealElements.forEach(el => {
        revealOnScroll.observe(el);
    });
    
    setTimeout(() => document.body.classList.add('loaded'), 100);
});

// Typewriter effect for Hero section
const dynamicText = document.querySelector('.dynamic-text');
if (dynamicText) {
    const words = ["saloanele de beauty", "cabinetele de masaj", "make-up artiști", "frizerii / barber shop", "terapeuți"];
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    
    function typeEffect() {
        const currentWord = words[wordIndex];
        const currentText = currentWord.substring(0, charIndex);
        
        dynamicText.textContent = currentText;
        
        let typeSpeed = isDeleting ? 40 : 100;

        if (!isDeleting && charIndex === currentWord.length) {
            typeSpeed = 2000; // Pauză când cuvântul este complet
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            wordIndex = (wordIndex + 1) % words.length;
            typeSpeed = 400; // Pauză înainte de următorul cuvânt
        }

        charIndex += isDeleting ? -1 : 1;
        setTimeout(typeEffect, typeSpeed);
    }
    
    // Start effect
    setTimeout(typeEffect, 1000);
}

// 3D Tilt Effect on Feature Cards
const cards = document.querySelectorAll('.feature-card');
cards.forEach(card => {
    card.addEventListener('mousemove', e => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left; //x position within the element.
        const y = e.clientY - rect.top;  //y position within the element.
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        // Calculate tilt
        const tiltX = ((y - centerY) / centerY) * -5; // max 5 deg
        const tiltY = ((x - centerX) / centerX) * 5;  // max 5 deg
        
        card.style.transform = `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) translateY(-8px)`;
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0)`;
    });
});

// Floating parallax for images/mockups
window.addEventListener('scroll', () => {
    const scrolled = window.scrollY;
    
    // Gradient Background parallax in hero
    const hero = document.querySelector('.hero');
    if(hero) {
        hero.style.backgroundPositionY = `${scrolled * 0.5}px`;
    }
});
