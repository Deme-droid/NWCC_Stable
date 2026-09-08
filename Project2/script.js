const introVideo = document.querySelector("#intro-video");
const videoSource = document.querySelector("#video-source");
const themeButton = document.querySelector("#hero-theme-toggle");
const revealElements = document.querySelectorAll(".reveal");

let darkMode = localStorage.getItem("profile-theme") !== "light";

function applyTheme() {
    document.body.classList.toggle("light", !darkMode);

    themeButton.textContent = darkMode ? "☀" : "☾";
    themeButton.setAttribute(
        "aria-label",
        darkMode ? "Switch to light mode" : "Switch to dark mode"
    );

    // Update both the <source> and <img> so the body-class theme always wins
    // over the browser's prefers-color-scheme setting.

    // Swap the hero video too, preserving playback position where possible.
    const videoAsset = darkMode ? "assets/intro-dark.mp4" : "assets/intro-light.mp4";
    const absoluteVideoAsset = new URL(videoAsset, window.location.href).href;

    if (videoSource.src !== absoluteVideoAsset) {
        const wasPlaying = !introVideo.paused;
        const currentTime = introVideo.currentTime;
        videoSource.src = videoAsset;
        introVideo.load();
        introVideo.addEventListener("loadedmetadata", () => {
            if (Number.isFinite(currentTime)) {
                introVideo.currentTime = Math.min(currentTime, introVideo.duration || currentTime);
            }
            if (wasPlaying) introVideo.play().catch(() => {});
        }, { once: true });
    }

    introVideo.play().catch(() => {});
}

themeButton.addEventListener("click", () => {
    darkMode = !darkMode;
    localStorage.setItem("profile-theme", darkMode ? "dark" : "light");
    applyTheme();
});

const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) entry.target.classList.add("visible");
    });
}, { threshold: 0.18 });

revealElements.forEach(element => observer.observe(element));

applyTheme();
