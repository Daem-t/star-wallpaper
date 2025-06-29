// Additional logic for Wallpaper Engine compatibility
// For example, resize canvas on window resize
window.addEventListener('resize', () => {
    const canvas = document.getElementById('starCanvas');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});