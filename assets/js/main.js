document.addEventListener('DOMContentLoaded', () => {
    // Show home section by default
    document.getElementById('home').classList.add('active');

    // Handle navigation clicks
    document.querySelectorAll('nav a').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            
            // Get current and target sections
            const currentSection = document.querySelector('section.active');
            const targetId = link.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            
            // Skip if clicking the current section
            if (currentSection === targetSection) return;
            
            // Remove active class from current section
            if (currentSection) {
                currentSection.classList.remove('active');
            }
            
            // Add active class to target section
            targetSection.classList.add('active');
        });
    });

    const video = document.getElementById('homeVideo');
    
    // Function to handle autoplay with sound
    async function playVideoWithSound() {
        try {
            await video.play();
            video.muted = false;  // Unmute after successful play
        } catch (err) {
            console.log('Autoplay failed, waiting for user interaction:', err);
            
            // Add one-time click handler to start playing
            document.addEventListener('click', function startPlayback() {
                video.play();
                video.muted = false;
                document.removeEventListener('click', startPlayback);
            }, { once: true });
        }
    }

    // Try to play immediately
    playVideoWithSound();

    // Ensure video plays when it's ready
    video.addEventListener('canplaythrough', () => {
        playVideoWithSound();
    });
});
