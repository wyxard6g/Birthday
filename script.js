/* script.js */
document.addEventListener("DOMContentLoaded", function () {
    let slideshowContainer = document.querySelector(".slideshow");

    // Add images
    for (let i = 1; i <= 12; i++) {
        let img = document.createElement("img");
        img.src = `img/img${i}.jpg`;
        img.classList.add("slides", "fade");
        slideshowContainer.appendChild(img);
    }

    // Add videos
    for (let i = 1; i <= 24; i++) {
        let video = document.createElement("video");
        video.src = `videos/video${i}.mp4`;
        video.classList.add("slides", "fade");
        video.muted = true;
        slideshowContainer.appendChild(video);
    }
});

function playMusic() {
    let birthdayMusic = document.getElementById("birthday-music");
    birthdayMusic.play().catch(error => console.log("Autoplay blocked for birthday music:", error));
    document.getElementById("audio-prompt").style.display = "none";
    triggerConfetti();
}

function triggerConfetti() {
    confetti({ particleCount: 100, spread: 70, origin: { x: 0.5, y: 0.5 } });
    let duration = 3 * 1000;
    let end = Date.now() + duration;

    (function frame() {
        confetti({ particleCount: 5, spread: 60, origin: { x: Math.random(), y: Math.random() - 0.2 } });
        if (Date.now() < end) {
            requestAnimationFrame(frame);
        }
    })();
}

function startCelebration() {
    document.getElementById("intro").style.display = "none";
    document.getElementById("content").style.display = "flex";

    let birthdayMusic = document.getElementById("birthday-music");
    birthdayMusic.pause();
    birthdayMusic.currentTime = 0;

    let brunoMarsMusic = document.getElementById("bruno-mars-music");
    brunoMarsMusic.play().catch(error => console.log("Autoplay blocked", error));

    startSlideshow();
}

function startSlideshow() {
    let index = 0;
    let slides = document.getElementsByClassName("slides");

    function showSlides() {
        for (let slide of slides) {
            slide.style.display = "none";
            if (slide.tagName === "VIDEO") {
                slide.pause();
            }
        }
        index = (index + 1) % slides.length;
        slides[index].style.display = "block";
        if (slides[index].tagName === "VIDEO") {
            slides[index].play().catch(error => console.log("Video autoplay blocked", error));
        }
        setTimeout(showSlides, 5000);
    }
    showSlides();
}
