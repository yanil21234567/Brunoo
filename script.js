/* ================================================================
   BRUNO — SITE VITRINE
   Script principal
   --------------------------------------------------------------
   Sommaire :
     1. FILTRES de la galerie de travaux
     2. ANIMATION au scroll (apparition des sections)
     3. Bouton "retour en haut" (visible/caché selon scroll)
   ================================================================ */


/* ================================================================
   0. LANGUE — Bascule FR / EN
   ================================================================ */
(function initLang() {
    const translations = {
        fr: {
            'nav.process':          'Process',
            'nav.works':            'Travaux',
            'nav.testimonials':     'Témoignages',
            'nav.contact':          'Contact',
            'hero.eyebrow':         'Rédacteur de scripts YouTube',
            'hero.tagline':         'Le rédacteur qui saura répondre à vos attentes.',
            'hero.desc':            'Salut c\'est Brunoo, rédacteur spécialisé dans les scripts Youtube. J\'écris des shorts et des vidéos longues pour les youtubeurs dont un qui a dépassé les 1M de vues J\'ai pu écrire de nombreux styles allant du storytelling aux shorts d\'actualités.',
            'hero.cta.primary':     'Discuter d\'un projet',
            'hero.cta.secondary':   'Voir mes travaux',
            'works.title':          'Mes Travaux',
            'works.long':           'Vidéo longue',
            'works.shorts':         'Shorts',
            'process.title':        'Mon Process',
            'process.subtitle':     'De ton idée au script final, en 4 étapes claires.',
            'process.s1.title':     'Sujet',
            'process.s1.text':      'Tu m\'envoies ton sujet, ton angle, ta cible. On clarifie le ton, la durée visée et les objectifs de la vidéo.',
            'process.s2.title':     'Recherche',
            'process.s2.text':      'Je creuse le sujet à fond : sources fiables, données récentes, anecdotes marquantes. Le script doit reposer sur du solide.',
            'process.s3.title':     'Validation du plan',
            'process.s3.text':      'Je te propose une structure détaillée : hook, sections, transitions, conclusion. Tu valides ou on ajuste avant l\'écriture finale.',
            'process.s4.title':     'Script fini',
            'process.s4.text':      'Tu reçois un script prêt à tourner, avec rythme, ponctuation orale et indications de ton. Une révision incluse si besoin.',
            'clients.title':        'Ils m\'ont fait confiance',
            'clients.subtitle':     'Des créateurs que j\'ai accompagné dans la conception de script.',
            'testimonials.title':   'Témoignages',
            'testimonials.subtitle':'Ce que disent les créateurs avec qui j\'ai bossé.',
            'testimonials.q1':      '« Super rédacteur, brunoo maitrise et dose hyper bien l\'humour donc je recommande ! »',
            'testimonials.q2':      '« Brunoo progresse de jour en jour ! Il m\'a rendu des shorts rapidement sans pour autant avoir une mauvaise qualité derrière, il arrive à garder une bonne rétention, et il m\'a meme écrit un short au milion de vue ! Je recommande »',
            'contact.subtitle':     'Prêt à l\'aventure ? Écris-moi maintenant.',
            'footer.copy':          '© 2026 Bruno — Rédacteur de scripts YouTube professionnel',
        },
        en: {
            'nav.process':          'Process',
            'nav.works':            'Work',
            'nav.testimonials':     'Testimonials',
            'nav.contact':          'Contact',
            'hero.eyebrow':         'YouTube Script Writer',
            'hero.tagline':         'The writer who will meet your expectations.',
            'hero.desc':            'Hey, I\'m Brunoo, a writer specialized in YouTube scripts. I write shorts and long-form videos for creators — including one that surpassed 1M views. I\'ve covered many styles, from storytelling to news shorts.',
            'hero.cta.primary':     'Discuss a project',
            'hero.cta.secondary':   'See my work',
            'works.title':          'My Work',
            'works.long':           'Long-form video',
            'works.shorts':         'Shorts',
            'process.title':        'My Process',
            'process.subtitle':     'From your idea to the final script, in 4 clear steps.',
            'process.s1.title':     'Topic',
            'process.s1.text':      'You send me your topic, angle, and target audience. We clarify the tone, target length, and video goals.',
            'process.s2.title':     'Research',
            'process.s2.text':      'I dig deep into the subject: reliable sources, recent data, striking anecdotes. The script has to stand on solid ground.',
            'process.s3.title':     'Outline Validation',
            'process.s3.text':      'I propose a detailed structure: hook, sections, transitions, conclusion. You approve or we adjust before final writing.',
            'process.s4.title':     'Final Script',
            'process.s4.text':      'You receive a ready-to-film script, with rhythm, oral punctuation and tone cues. One revision included if needed.',
            'clients.title':        'They trusted me',
            'clients.subtitle':     'Creators I supported in script writing.',
            'testimonials.title':   'Testimonials',
            'testimonials.subtitle':'What the creators I\'ve worked with have to say.',
            'testimonials.q1':      '"Great writer, Brunoo really nails the humour — highly recommend!"',
            'testimonials.q2':      '"Brunoo improves day by day! He delivered shorts to me quickly without compromising on quality, he manages to maintain good retention, and he even wrote me a short that reached a million views! I recommend him"',
            'contact.subtitle':     'Ready for an adventure? Write to me now.',
            'footer.copy':          '© 2026 Bruno — Professional YouTube Script Writer',
        }
    };

    let currentLang = 'fr';

    function applyLang(lang) {
        const dict = translations[lang];
        document.querySelectorAll('[data-i18n]').forEach(el => {
            const key = el.dataset.i18n;
            if (dict[key] !== undefined) el.textContent = dict[key];
        });
        document.documentElement.lang = lang;
        currentLang = lang;
    }

    const toggle = document.getElementById('lang-toggle');
    if (toggle) {
        toggle.addEventListener('click', () => {
            const next = currentLang === 'fr' ? 'en' : 'fr';
            applyLang(next);
            toggle.textContent = next === 'fr' ? 'EN' : 'FR';
        });
    }
})();


/* ================================================================
   1. LECTURE VIDÉO — Clic sur vignette → iframe YouTube
   ================================================================ */
(function initVideoPlay() {
    const thumb = document.querySelector('.work-thumb-yt[data-youtube-id]');
    if (!thumb) return;

    thumb.addEventListener('click', () => {
        try {
            const videoId = thumb.dataset.youtubeId;
            if (!videoId) {
                console.error('No YouTube video ID found');
                return;
            }

            const iframe = document.createElement('iframe');
            iframe.src = `https://www.youtube.com/embed/${videoId}?rel=0&modestbranding=1`;
            iframe.frameBorder = '0';
            iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture';
            iframe.allowFullscreen = true;
            iframe.style.cssText = 'position:absolute;inset:0;width:100%;height:100%;border:none;';
            iframe.loading = 'lazy';

            // Clear the thumbnail and add the iframe
            thumb.innerHTML = '';
            thumb.appendChild(iframe);

            // Add error handling
            iframe.onerror = function() {
                console.error('Failed to load YouTube video');
                thumb.innerHTML = '<div style="display:flex;align-items:center;justify-content:center;height:100%;color:#666;">Erreur de chargement de la vidéo</div>';
            };

        } catch (error) {
            console.error('Error creating YouTube embed:', error);
            thumb.innerHTML = '<div style="display:flex;align-items:center;justify-content:center;height:100%;color:#666;">Erreur de chargement de la vidéo</div>';
        }
    });
})();


/* ================================================================
   2. FILTRES — Galerie de travaux
   ----------------------------------------------------------------
   Filtre les .work-card selon leur attribut data-category.
   Pour ajouter une catégorie : ajouter un bouton .filter-btn
   avec data-filter="ma-categorie" dans le HTML, puis donner
   data-category="ma-categorie" aux cartes correspondantes.
   ================================================================ */
(function initFilters() {
    const buttons = document.querySelectorAll('.filter-btn');
    const cards   = document.querySelectorAll('.work-card');

    buttons.forEach(btn => {
        btn.addEventListener('click', () => {
            // Mise à jour visuelle de l'onglet actif
            buttons.forEach(b => b.classList.remove('is-active'));
            btn.classList.add('is-active');

            const filter = btn.dataset.filter;

            cards.forEach(card => {
                const matches = (filter === 'all') || (card.dataset.category === filter);
                card.classList.toggle('is-hidden', !matches);
            });
        });
    });
})();


/* ================================================================
   2. ANIMATION au scroll
   ----------------------------------------------------------------
   Ajoute la classe .reveal à toutes les sections principales,
   puis observe leur entrée dans le viewport.
   ================================================================ */
(function initScrollReveal() {
    const targets = document.querySelectorAll('[data-section]');
    targets.forEach(el => el.classList.add('reveal'));

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.12 });

    targets.forEach(el => observer.observe(el));
})();


/* ================================================================
   3. DÉGRADÉ ROUGE → BLEU selon la progression du scroll
   ----------------------------------------------------------------
   Interpole la teinte (hue) de 354° (rouge) à 218° (bleu) au fil
   du défilement. Toutes les variables --color-accent* sont mises
   à jour sur :root, ce qui affecte boutons, bordures, taches, etc.
   ================================================================ */
(function initColorScroll() {
    const HUE_TOP    = 354;
    const HUE_BOTTOM = 218;

    function update() {
        const scrolled  = window.scrollY;
        const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
        const progress  = maxScroll > 0 ? Math.min(1, scrolled / maxScroll) : 0;
        const hue       = HUE_TOP - progress * (HUE_TOP - HUE_BOTTOM);
        const root      = document.documentElement;

        root.style.setProperty('--color-accent',      `hsl(${hue}, 68%, 42%)`);
        root.style.setProperty('--color-accent-soft',  `hsl(${hue}, 68%, 52%)`);
        root.style.setProperty('--color-accent-deep',  `hsl(${hue}, 68%, 28%)`);
    }

    window.addEventListener('scroll', update, { passive: true });
    update();
})();


/* ================================================================
   3. RETOUR EN HAUT — visible uniquement après scroll
   ================================================================ */
(function initBackToTop() {
    const btn = document.querySelector('.back-to-top');
    if (!btn) return;

    btn.style.opacity = '0';
    btn.style.pointerEvents = 'none';
    btn.style.transition = 'opacity 0.3s ease, transform 0.2s ease';

    window.addEventListener('scroll', () => {
        const visible = window.scrollY > 600;
        btn.style.opacity = visible ? '1' : '0';
        btn.style.pointerEvents = visible ? 'auto' : 'none';
    });
})();
