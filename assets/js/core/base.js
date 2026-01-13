// IDIOMAS
document.addEventListener('DOMContentLoaded', async () => {
    const getUserLanguage = () => {
        const savedLang = localStorage.getItem('site-lang');
        if(savedLang) return savedLang;

        const browserLang = navigator.language || navigator.userLanguage;
        if(browserLang && browserLang.startsWith('en')) return 'en';
        return 'pt'; 
    };

    let currentLang = getUserLanguage();

    const loadTranslations = async (lang) => {
        try{
            const response = await fetch(`/assets/lang/${lang}.json`);
            if(!response.ok) throw new Error(`Erro ao carregar idioma: ${lang}`);
            return await response.json();
        }catch(error){
            console.error("Falha na tradução:", error);
            return null;
        }
    };

    const applyTranslations = (translations) => {
        if(!translations) return;
        
        document.querySelectorAll('[data-i18n]').forEach(element => {
            const key = element.getAttribute('data-i18n');
            if(translations[key]){
                element.textContent = translations[key];
            }
        });
    };

    const setLanguage = async (lang) => {
        const translations = await loadTranslations(lang);
        if(translations){
            applyTranslations(translations);
            localStorage.setItem('site-lang', lang);
            currentLang = lang;
        }
    };

    await setLanguage(currentLang);

    const langBtn = document.getElementById('botao-idioma');
    if(langBtn){
        const updateButtonVisual = (lang) => {
            langBtn.textContent = '';
            langBtn.classList.remove('flag-en', 'flag-pt');
            langBtn.classList.add(`flag-${lang}`);
        };

        updateButtonVisual(currentLang);

        langBtn.addEventListener('click', () => {
            const newLang = currentLang === 'pt' ? 'en' : 'pt';
            setLanguage(newLang);
            updateButtonVisual(newLang);
        });
    }
});

// MENSAGEM DE AVISO
document.addEventListener('DOMContentLoaded', () => {
    const avisoBotao = document.querySelector('.aviso');

    if (avisoBotao) {
        const avisoOverlay = document.createElement('div');
        avisoOverlay.className = 'aviso-overlay';
        avisoOverlay.style.display = 'none';

        const avisoConteudo = document.createElement('div');
        avisoConteudo.className = 'aviso-content';

        const avisoTexto = avisoBotao.querySelector('p');
        if (avisoTexto) {
            const textoClone = avisoTexto.cloneNode(true);
            avisoConteudo.appendChild(textoClone);
        }

        avisoOverlay.appendChild(avisoConteudo);
        document.body.appendChild(avisoOverlay);

        avisoBotao.addEventListener('click', () => {
            avisoOverlay.style.display = 'flex';
        });

        avisoOverlay.addEventListener('click', (e) => {
            if (e.target === avisoOverlay) {
                avisoOverlay.style.display = 'none';
            }
        });

        const avisoTitulo = avisoBotao.querySelector('h1');
        if (avisoTitulo) {
            avisoBotao.addEventListener('mouseenter', () => {
                avisoBotao.style.width = (60 + avisoTitulo.offsetWidth) + 'px';
            });
            avisoBotao.addEventListener('mouseleave', () => {
                avisoBotao.style.width = '60px';
            });
        }
    }
});