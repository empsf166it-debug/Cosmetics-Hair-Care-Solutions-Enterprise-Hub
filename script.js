document.addEventListener('DOMContentLoaded', () => {
    // --- Theme Toggle ---
    const htmlElement = document.documentElement;
    const themeToggleBtn = document.getElementById('theme-toggle');
    const mobileThemeToggleBtn = document.getElementById('mobile-theme-toggle');
    
    // Check local storage or system preference
    if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
        htmlElement.classList.add('dark');
    }

    const toggleTheme = () => {
        htmlElement.classList.toggle('dark');
        if (htmlElement.classList.contains('dark')) {
            localStorage.theme = 'dark';
        } else {
            localStorage.theme = 'light';
        }
    };

    themeToggleBtn.addEventListener('click', toggleTheme);
    if (mobileThemeToggleBtn) {
        mobileThemeToggleBtn.addEventListener('click', toggleTheme);
    }



    // --- Sticky Header ---
    const header = document.getElementById('main-header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled', 'py-2');
            header.classList.remove('py-4');
        } else {
            header.classList.remove('scrolled', 'py-2');
            header.classList.add('py-4');
        }
    });

    // --- ScrollSpy for Navigation ---
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link, .mobile-link');

    const scrollSpy = () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (window.scrollY >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });

        if (!current && sections.length > 0) {
            current = sections[0].getAttribute('id');
        }

        navLinks.forEach(link => {
            link.classList.remove('text-primary-500', 'font-bold');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('text-primary-500', 'font-bold');
            }
        });
    };

    window.addEventListener('scroll', scrollSpy);
    scrollSpy(); // Initial check

    // --- Mobile Menu ---
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileLinks = document.querySelectorAll('#mobile-menu a');
    
    let isMenuOpen = false;

    const toggleMenu = () => {
        isMenuOpen = !isMenuOpen;
        if (isMenuOpen) {
            mobileMenu.classList.remove('translate-x-full');
            document.body.style.overflow = 'hidden';
            mobileMenuBtn.innerHTML = '<i class="ph ph-x"></i>';
        } else {
            mobileMenu.classList.add('translate-x-full');
            document.body.style.overflow = '';
            mobileMenuBtn.innerHTML = '<i class="ph ph-list"></i>';
        }
    };

    mobileMenuBtn.addEventListener('click', toggleMenu);
    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (isMenuOpen) toggleMenu();
        });
    });

    // --- Cart Button ---
    const cartBtn = document.querySelector('button[aria-label="Cart"]');
    if (cartBtn) {
        cartBtn.addEventListener('click', () => {
            alert('Your cart contains 2 items. Cart checkout functionality coming soon!');
        });
    }

    // --- 3D Hero Parallax ---
    const heroScene = document.getElementById('hero-3d-scene');
    if (heroScene && window.innerWidth > 1024) {
        window.addEventListener('mousemove', (e) => {
            const x = (e.clientX / window.innerWidth - 0.5) * 20;
            const y = (e.clientY / window.innerHeight - 0.5) * 20;
            
            const layers = heroScene.querySelectorAll('.3d-layer');
            layers.forEach((layer, index) => {
                const depth = index + 1;
                layer.style.transform = `rotateY(${x * depth}deg) rotateX(${-y * depth}deg) translateZ(${depth * 20}px)`;
            });
        });
    }

    // --- Hair Type Discovery Data ---
    const typeData = {
        curly: {
            title: "Curly + Dry Hair",
            desc: "Requires intense hydration, curl definition, and frizz control without weighing down the natural pattern.",
            ingredients: ["Shea Butter", "Argan Oil", "Hyaluronic Acid", "Aloe Vera"],
            action: ["Deep Conditioning", "Leave-in Moisture", "Sulfate-Free Cleansing"]
        },
        straight: {
            title: "Straight + Fine Hair",
            desc: "Needs lightweight volume, oil balancing at the roots, and gentle detangling.",
            ingredients: ["Rice Protein", "Green Tea Extract", "Peppermint", "Panthenol"],
            action: ["Volumizing Wash", "Lightweight Condition", "Scalp Detox"]
        },
        colored: {
            title: "Color-Treated Hair",
            desc: "Requires UV protection, cuticle sealing, and color-preserving gentle surfactants.",
            ingredients: ["Quinoa Protein", "Sunflower Seed Extract", "Vitamin E", "Amla Oil"],
            action: ["Color Protect Wash", "Weekly Mask", "UV Shield Spray"]
        },
        damaged: {
            title: "Damaged + Brittle Hair",
            desc: "Needs structural repair, protein bonding, and extreme moisture retention.",
            ingredients: ["Keratin Amino Acids", "Bonding Peptides", "Ceramides", "Rosehip Oil"],
            action: ["Bond Repair Treatment", "Gentle Cleansing", "Heat Protectant"]
        },
        oily: {
            title: "Oily Scalp / Dry Ends",
            desc: "Requires scalp microbiome balancing and targeted end hydration without heavy silicones.",
            ingredients: ["Salicylic Acid", "Tea Tree Oil", "Kaolin Clay", "Squalane"],
            action: ["Clarifying Wash", "Scalp Serum", "End-only Conditioning"]
        }
    };

    const typeButtons = document.querySelectorAll('.hair-type-selector button');
    const resultContent = document.getElementById('type-result-content');

    typeButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active classes
            typeButtons.forEach(b => {
                b.classList.remove('active-type', 'bg-white', 'dark:bg-primary-900/30', 'border-primary-500', 'shadow-md', 'text-primary-900', 'dark:text-white');
                b.classList.add('border-transparent', 'text-gray-500');
            });
            
            // Add active to clicked
            btn.classList.add('active-type', 'bg-white', 'dark:bg-primary-900/30', 'border-primary-500', 'shadow-md', 'text-primary-900', 'dark:text-white');
            btn.classList.remove('border-transparent', 'text-gray-500');

            // Animate out
            resultContent.style.opacity = 0;
            resultContent.style.transform = 'translateY(10px)';
            
            setTimeout(() => {
                const data = typeData[btn.dataset.type];
                
                // Build HTML
                let ingHTML = '';
                data.ingredients.forEach(ing => {
                    ingHTML += `<li class="flex items-center"><i class="ph-fill ph-check-circle text-primary-500 mr-2"></i> ${ing}</li>`;
                });
                
                let actHTML = '';
                data.action.forEach(act => {
                    actHTML += `<span class="px-3 py-1 bg-primary-100 dark:bg-primary-900/40 rounded-full text-sm">${act}</span>`;
                });

                resultContent.innerHTML = `
                    <h3 class="text-3xl font-serif font-bold mb-2">${data.title}</h3>
                    <p class="text-gray-600 dark:text-gray-400 mb-8">${data.desc}</p>
                    
                    <div class="grid md:grid-cols-2 gap-8">
                        <div>
                            <h4 class="font-bold text-sm uppercase tracking-wider text-primary-600 dark:text-primary-400 mb-4">Recommended Ingredients</h4>
                            <ul class="space-y-3">${ingHTML}</ul>
                        </div>
                        <div>
                            <h4 class="font-bold text-sm uppercase tracking-wider text-primary-600 dark:text-primary-400 mb-4">Action Plan</h4>
                            <div class="flex flex-wrap gap-2">${actHTML}</div>
                        </div>
                    </div>
                    <div class="mt-8 pt-6 border-t border-gray-200 dark:border-gray-800">
                        <a href="#shop" class="text-primary-600 dark:text-primary-400 font-bold hover:underline inline-flex items-center">
                            View Collection <i class="ph ph-arrow-right ml-2"></i>
                        </a>
                    </div>
                `;

                // Animate in
                resultContent.style.transition = 'all 0.3s ease';
                resultContent.style.opacity = 1;
                resultContent.style.transform = 'translateY(0)';
            }, 300);
        });
    });

    // --- Diagnostic Quiz Logic ---
    const quizOptions = document.querySelectorAll('.quiz-option');
    const quizNextBtn = document.getElementById('quiz-next');
    const quizPrevBtn = document.getElementById('quiz-prev');
    const progressBar = document.getElementById('quiz-progress');
    const quizResult = document.getElementById('quiz-result');
    const step1Container = document.getElementById('step-1');
    
    let currentStep = 1;
    let selectedOption = null;

    // Select option logic
    quizOptions.forEach(opt => {
        opt.addEventListener('click', () => {
            quizOptions.forEach(o => {
                o.classList.remove('selected', 'bg-white/20', 'border-white', 'text-white', 'scale-105');
            });
            opt.classList.add('selected', 'bg-white/20', 'border-white', 'text-white', 'scale-105');
            selectedOption = opt;
        });
    });

    quizNextBtn.addEventListener('click', () => {
        if(currentStep === 1) {
            if(!selectedOption) {
                alert("Please select an option.");
                return;
            }
            // Transition to result for demo purposes
            step1Container.classList.remove('active');
            step1Container.style.display = 'none';
            progressBar.style.width = '100%';
            quizPrevBtn.style.visibility = 'hidden';
            quizNextBtn.style.visibility = 'hidden';
            
            setTimeout(() => {
                quizResult.classList.remove('hidden');
                quizResult.classList.add('flex');
            }, 300);
        }
    });

    // --- Dynamic Subscriptions Pricing ---
    const subRadios = document.querySelectorAll('input[name="frequency"]');
    const subPrice = document.getElementById('sub-price');
    
    subRadios.forEach(radio => {
        radio.addEventListener('change', (e) => {
            if(e.target.value === 'monthly') subPrice.textContent = '$68.00';
            if(e.target.value === '6weeks') subPrice.textContent = '$64.00';
            if(e.target.value === '8weeks') subPrice.textContent = '$60.00';
        });
    });

    // --- Before/After Slider ---
    const sliderContainer = document.querySelector('.before-after-container');
    const beforeImage = document.querySelector('.before-image');
    const sliderHandle = document.querySelector('.slider-handle');

    if (sliderContainer) {
        let isSliding = false;

        const moveSlider = (clientX) => {
            const rect = sliderContainer.getBoundingClientRect();
            let x = clientX - rect.left;
            
            // Constrain
            if (x < 0) x = 0;
            if (x > rect.width) x = rect.width;
            
            const percent = (x / rect.width) * 100;
            
            beforeImage.style.width = `${percent}%`;
            sliderHandle.style.left = `${percent}%`;
        };

        // Mouse Events
        sliderContainer.addEventListener('mousedown', () => isSliding = true);
        window.addEventListener('mouseup', () => isSliding = false);
        window.addEventListener('mousemove', (e) => {
            if (!isSliding) return;
            moveSlider(e.clientX);
        });

        // Touch Events
        sliderContainer.addEventListener('touchstart', () => isSliding = true);
        window.addEventListener('touchend', () => isSliding = false);
        window.addEventListener('touchmove', (e) => {
            if (!isSliding) return;
            moveSlider(e.touches[0].clientX);
        });
    }

    // --- Counter Animation ---
    const counters = document.querySelectorAll('.counter');
    const speed = 200; // lower = faster

    const startCounters = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const updateCount = () => {
                    const target = +counter.getAttribute('data-target');
                    const count = +counter.innerText;
                    const inc = target / speed;

                    if (count < target) {
                        counter.innerText = Math.ceil(count + inc);
                        setTimeout(updateCount, 10);
                    } else {
                        counter.innerText = target;
                    }
                };
                updateCount();
                observer.unobserve(counter);
            }
        });
    };

    const counterObserver = new IntersectionObserver(startCounters, {
        threshold: 0.5
    });

    counters.forEach(counter => {
        counterObserver.observe(counter);
    });
});
