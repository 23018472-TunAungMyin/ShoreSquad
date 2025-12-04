"use strict";

// Utility: Smooth scroll for in-page links
function enableSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');
    links.forEach((link) => {
        link.addEventListener("click", (e) => {
            const targetId = link.getAttribute("href");
            if (!targetId || targetId === "#") return;
            const target = document.querySelector(targetId);
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: "smooth", block: "start" });
            }
        });
    });
}

// Mobile nav toggle
function setupNavToggle() {
    const toggle = document.querySelector(".nav__toggle");
    const menu = document.getElementById("nav-menu");
    if (!toggle || !menu) return;

    toggle.addEventListener("click", () => {
        const isOpen = menu.classList.toggle("nav__links--open");
        toggle.setAttribute("aria-expanded", String(isOpen));
    });
}

// Simple event filter logic
function setupEventFilter() {
    const filter = document.getElementById("event-filter");
    const cards = document.querySelectorAll(".event-card");

    if (!filter || !cards.length) return;

    filter.addEventListener("change", () => {
        const value = filter.value;
        cards.forEach((card) => {
            const tags = card.dataset.tags || "";
            if (value === "all" || tags.includes(value)) {
                card.style.display = "";
            } else {
                card.style.display = "none";
            }
        });
    });
}

// IntersectionObserver for subtle "on-scroll" reveal
function setupScrollReveal() {
    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("is-visible");
                    observer.unobserve(entry.target);
                }
            });
        },
        { threshold: 0.15 }
    );

    document
        .querySelectorAll(".card, .section__header, .hero__map-card")
        .forEach((el) => {
            el.classList.add("will-reveal");
            observer.observe(el);
        });
}

// Visual enhancement for reveal
function injectRevealStyles() {
    const style = document.createElement("style");
    style.textContent = `
        .will-reveal {
            opacity: 0;
            transform: translateY(12px);
            transition: opacity 0.25s ease-out, transform 0.25s ease-out;
        }
        .is-visible {
            opacity: 1;
            transform: translateY(0);
        }
    `;
    document.head.appendChild(style);
}

// Footer year
function setCurrentYear() {
    const span = document.getElementById("year");
    if (span) {
        span.textContent = new Date().getFullYear();
    }
}

// Placeholder for future: weather + map integrations
// Example: fetch weather API and hydrate event cards
async function initFutureIntegrations() {
    // Intentionally left as a stub for now to keep bundle light.
    // - Fetch weather data per beach
    // - Use localStorage to remember preferred beaches
    // - Integrate actual map SDK (Mapbox, Leaflet, etc.)
}

document.addEventListener("DOMContentLoaded", () => {
    enableSmoothScroll();
    setupNavToggle();
    setupEventFilter();
    setupScrollReveal();
    injectRevealStyles();
    setCurrentYear();
    // initFutureIntegrations(); // enable when APIs are wired up
});
