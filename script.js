/* =========================================================
   FR CREATIVE STUDIO
   RAFAEL & JOSUÉ
   PREMIUM BOTANICAL WEDDING INVITATION

   SCRIPT.JS
========================================================= */

"use strict";


/* =========================================================
   01. WEDDING CONFIGURATION

   Change the wedding date here.

   IMPORTANT:
   This is a demonstration date.
   Replace it with the actual wedding date.
========================================================= */

const WEDDING_CONFIG = {

    couple: {
        firstName: "Rafael",
        secondName: "Josué"
    },

    wedding: {

        // YYYY-MM-DDTHH:mm:ss±HH:mm

        date: "2027-04-14T17:00:00-05:00",

        // Time zone of the wedding location.
        // Replace when the actual venue is confirmed.

        timeZone: "America/Chicago",

        locale: "en-US"

    },

    music: {
        enabled: true,
        volume: 0.35
    },

    animations: {
        enabled: true,
        threshold: 0.12
    }

};


/* =========================================================
   02. DOCUMENT READY
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    initializeWeddingInvitation();

});


/* =========================================================
   03. INITIALIZE INVITATION
========================================================= */

function initializeWeddingInvitation() {

    console.log(
        "FR Creative Studio | Rafael & Josué"
    );

    updateWeddingDate();

    initializeCountdown();

    initializeScrollAnimations();

    initializeBackgroundMusic();

    initializeSmoothScrolling();

    initializeImageLoading();

}


/* =========================================================
   04. UPDATE WEDDING DATE
========================================================= */

function updateWeddingDate() {

    const weddingDate = new Date(
        WEDDING_CONFIG.wedding.date
    );

    if (Number.isNaN(weddingDate.getTime())) {

        console.error("Invalid wedding date.");

        return;

    }

    const locale = WEDDING_CONFIG.wedding.locale;

    const timeZone = WEDDING_CONFIG.wedding.timeZone;

    const month = new Intl.DateTimeFormat(locale, {
        month: "long",
        timeZone
    }).format(weddingDate);

    const weekday = new Intl.DateTimeFormat(locale, {
        weekday: "long",
        timeZone
    }).format(weddingDate);

    const day = new Intl.DateTimeFormat(locale, {
        day: "numeric",
        timeZone
    }).format(weddingDate);

    const year = new Intl.DateTimeFormat(locale, {
        year: "numeric",
        timeZone
    }).format(weddingDate);

    setElementText(
        "weddingMonth",
        month.toUpperCase()
    );

    setElementText(
        "weddingDay",
        weekday.toUpperCase()
    );

    setElementText(
        "weddingDate",
        day
    );

    setElementText(
        "weddingYear",
        year
    );

}


/* =========================================================
   05. HELPER — UPDATE ELEMENT TEXT
========================================================= */

function setElementText(elementId, value) {

    const element = document.getElementById(elementId);

    if (!element) {
        return;
    }

    element.textContent = value;

}


/* =========================================================
   06. COUNTDOWN
========================================================= */

function initializeCountdown() {

    const targetDate = new Date(
        WEDDING_CONFIG.wedding.date
    ).getTime();

    if (Number.isNaN(targetDate)) {

        console.error("Invalid countdown date.");

        return;

    }

    let countdownInterval;

    function updateCountdown() {

        const currentTime = Date.now();

        const difference = targetDate - currentTime;

        if (difference <= 0) {

            clearInterval(countdownInterval);

            setElementText("days", "00");

            setElementText("hours", "00");

            setElementText("minutes", "00");

            setElementText("seconds", "00");

            showWeddingDayMessage();

            return;

        }

        const days = Math.floor(
            difference / (1000 * 60 * 60 * 24)
        );

        const hours = Math.floor(
            (difference / (1000 * 60 * 60)) % 24
        );

        const minutes = Math.floor(
            (difference / (1000 * 60)) % 60
        );

        const seconds = Math.floor(
            (difference / 1000) % 60
        );

        setElementText(
            "days",
            formatCountdownNumber(days)
        );

        setElementText(
            "hours",
            formatCountdownNumber(hours)
        );

        setElementText(
            "minutes",
            formatCountdownNumber(minutes)
        );

        setElementText(
            "seconds",
            formatCountdownNumber(seconds)
        );

    }

    updateCountdown();

    countdownInterval = setInterval(
        updateCountdown,
        1000
    );

}


/* =========================================================
   07. FORMAT COUNTDOWN NUMBERS
========================================================= */

function formatCountdownNumber(number) {

    return String(number).padStart(2, "0");

}


/* =========================================================
   08. WEDDING DAY MESSAGE
========================================================= */

function showWeddingDayMessage() {

    const countdownSection = document.querySelector(
        ".countdown-section"
    );

    if (!countdownSection) {
        return;
    }

    const description = countdownSection.querySelector(
        ".countdown-description"
    );

    if (description) {

        description.textContent =
            "Our forever begins today. Thank you for celebrating with us!";

    }

}


/* =========================================================
   09. SCROLL REVEAL ANIMATIONS
========================================================= */

function initializeScrollAnimations() {

    const elements = document.querySelectorAll(
        ".reveal"
    );

    if (!elements.length) {
        return;
    }

    if (
        !WEDDING_CONFIG.animations.enabled ||
        !("IntersectionObserver" in window) ||
        window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        ).matches
    ) {

        elements.forEach(element => {
            element.classList.add("active");
        });

        return;

    }

    const observer = new IntersectionObserver(

        (entries, observerInstance) => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    entry.target.classList.add(
                        "active"
                    );

                    observerInstance.unobserve(
                        entry.target
                    );

                }

            });

        },

        {

            threshold:
                WEDDING_CONFIG.animations.threshold,

            rootMargin: "0px 0px -25px 0px"

        }

    );

    elements.forEach(element => {

        observer.observe(element);

    });

}


/* =========================================================
   10. BACKGROUND MUSIC
========================================================= */

function initializeBackgroundMusic() {

    const music = document.getElementById(
        "backgroundMusic"
    );

    const musicButton = document.getElementById(
        "musicToggle"
    );

    if (!music || !musicButton) {
        return;
    }

    if (!WEDDING_CONFIG.music.enabled) {

        musicButton.style.display = "none";

        return;

    }

    music.volume = WEDDING_CONFIG.music.volume;

    music.loop = true;

    function updateMusicButton() {

        const isPlaying = !music.paused;

        musicButton.classList.toggle(
            "playing",
            isPlaying
        );

        musicButton.setAttribute(
            "aria-pressed",
            String(isPlaying)
        );

        musicButton.setAttribute(
            "aria-label",
            isPlaying
                ? "Pause background music"
                : "Play background music"
        );

        const icon = musicButton.querySelector(
            ".music-icon"
        );

        if (icon) {

            icon.textContent = isPlaying
                ? "♫"
                : "♪";

        }

    }

    musicButton.addEventListener(
        "click",
        async () => {

            if (music.paused) {

                try {

                    await music.play();

                } catch (error) {

                    console.warn(
                        "Music could not be played:",
                        error
                    );

                }

            } else {

                music.pause();

            }

            updateMusicButton();

        }
    );

    music.addEventListener(
        "play",
        updateMusicButton
    );

    music.addEventListener(
        "pause",
        updateMusicButton
    );

    music.addEventListener(
        "ended",
        updateMusicButton
    );

    music.addEventListener(
        "error",
        () => {

            console.warn(
                "Music file unavailable. Check music/wedding.mp3."
            );

            musicButton.setAttribute(
                "aria-label",
                "Background music unavailable"
            );

        }
    );

    updateMusicButton();

}


/* =========================================================
   11. SMOOTH SCROLLING
========================================================= */

function initializeSmoothScrolling() {

    const internalLinks = document.querySelectorAll(
        'a[href^="#"]'
    );

    internalLinks.forEach(link => {

        link.addEventListener("click", event => {

            const targetId = link.getAttribute(
                "href"
            );

            if (!targetId || targetId === "#") {
                return;
            }

            const target = document.getElementById(
                targetId.slice(1)
            );

            if (!target) {
                return;
            }

            event.preventDefault();

            const reducedMotion = window.matchMedia(
                "(prefers-reduced-motion: reduce)"
            ).matches;

            target.scrollIntoView({

                behavior: reducedMotion
                    ? "auto"
                    : "smooth",

                block: "start"

            });

        });

    });

}


/* =========================================================
   12. IMAGE LOADING
========================================================= */

function initializeImageLoading() {

    const images = document.querySelectorAll(
        ".invitation img"
    );

    images.forEach(image => {

        image.decoding = "async";

        image.addEventListener(
            "load",
            () => {

                image.classList.add(
                    "image-loaded"
                );

            }
        );

        image.addEventListener(
            "error",
            () => {

                console.warn(
                    "Unable to load image:",
                    image.getAttribute("src")
                );

            }
        );

        if (image.complete && image.naturalWidth > 0) {

            image.classList.add(
                "image-loaded"
            );

        }

    });

}


/* =========================================================
   13. OPTIONAL CONFIGURATION VALIDATION
========================================================= */

function validateWeddingConfiguration() {

    const weddingDate = new Date(
        WEDDING_CONFIG.wedding.date
    );

    if (Number.isNaN(weddingDate.getTime())) {

        console.error(
            "Please configure a valid wedding date."
        );

        return false;

    }

    return true;

}


/* =========================================================
   14. PAGE VISIBILITY

   Refresh the countdown when the visitor
   returns to the invitation.
========================================================= */

document.addEventListener(
    "visibilitychange",
    () => {

        if (!document.hidden) {

            updateWeddingDate();

        }

    }
);


/* =========================================================
   END OF SCRIPT.JS

   FR CREATIVE STUDIO
   RAFAEL & JOSUÉ
========================================================= */