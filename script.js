/* ================================================
   PORTIFÓLIO - Thiago Collaço Kioshima
   script.js
   ================================================ */


/* --- TEMA CLARO / ESCURO --- */
const themeToggle = document.getElementById('theme-toggle');
const body = document.body;

// Carrega preferência salva
if (localStorage.getItem('theme') === 'light') {
    body.classList.add('light-mode');
    themeToggle.textContent = '☀️ Tema Claro';
} else {
    themeToggle.textContent = '🌙 Tema Escuro';
}

themeToggle.addEventListener('click', () => {
    body.classList.toggle('light-mode');

    if (body.classList.contains('light-mode')) {
        localStorage.setItem('theme', 'light');
        themeToggle.textContent = '☀️ Tema Claro';
    } else {
        localStorage.setItem('theme', 'dark');
        themeToggle.textContent = '🌙 Tema Escuro';
    }
});


/* --- MENU HAMBURGUER --- */
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobile-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    mobileMenu.classList.toggle('open');
});

// Fecha o menu ao clicar em qualquer link
mobileMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('open');
        mobileMenu.classList.remove('open');
    });
});

// Fecha o menu ao clicar fora dele
document.addEventListener('click', (e) => {
    const navbar = document.getElementById('navbar');
    if (!navbar.contains(e.target)) {
        hamburger.classList.remove('open');
        mobileMenu.classList.remove('open');
    }
});


/* --- LINK ATIVO NO NAVBAR CONFORME A SEÇÃO VISÍVEL --- */
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a, .mobile-menu a');

const observerOptions = {
    root: null,
    rootMargin: '-40% 0px -55% 0px',
    threshold: 0
};

const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const id = entry.target.getAttribute('id');
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${id}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}, observerOptions);

sections.forEach(section => sectionObserver.observe(section));


/* --- FORMULÁRIO DE CONTATO --- */
const contactForm = document.getElementById('contactForm');
const formMessage = document.getElementById('formMessage');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const name    = document.getElementById('name').value.trim();
    const email   = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();

    // Validação simples
    if (!name || !email || !message) {
        showFormMessage('Por favor, preencha todos os campos.', 'error');
        return;
    }

    if (!isValidEmail(email)) {
        showFormMessage('Por favor, insira um e-mail válido.', 'error');
        return;
    }

    // Simulação de envio (substitua por fetch/EmailJS/etc.)
    const submitBtn = contactForm.querySelector('button[type="submit"]');
    submitBtn.textContent = 'Enviando...';
    submitBtn.disabled = true;

    setTimeout(() => {
        showFormMessage(`Obrigado, ${name}! Sua mensagem foi enviada com sucesso. 🚀`, 'success');
        contactForm.reset();
        submitBtn.textContent = 'Enviar Mensagem';
        submitBtn.disabled = false;
    }, 1500);
});

function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function showFormMessage(text, type) {
    formMessage.textContent = text;
    formMessage.className = `form-msg form-msg--${type}`;

    // Remove a mensagem após 5 segundos
    setTimeout(() => {
        formMessage.textContent = '';
        formMessage.className = '';
    }, 5000);
}


/* --- ANIMAÇÃO DE ENTRADA DAS SEÇÕES (SCROLL REVEAL) --- */
const revealElements = document.querySelectorAll(
    '.formation-item, .project-card, .box-about, #contact .container'
);

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
            revealObserver.unobserve(entry.target); // anima só uma vez
        }
    });
}, { threshold: 0.15 });

revealElements.forEach(el => {
    el.classList.add('reveal');
    revealObserver.observe(el);
});