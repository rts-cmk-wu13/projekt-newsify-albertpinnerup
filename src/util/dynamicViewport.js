export default function setVh() {
    console.log('setVh is being executed');
    const vh = window.innerHeight * 0.01;
    console.log(`Setting --vh: ${vh}px`); 
    document.documentElement.style.setProperty('--vh', `${vh}px`);
}

// Call this function on page load and when the window is resized
window.addEventListener('resize', setVh);
document.addEventListener('DOMContentLoaded', setVh); // Ensure it runs after DOM is loaded