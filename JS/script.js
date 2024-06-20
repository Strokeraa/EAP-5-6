document.addEventListener('click', function(event) {
    const popups = document.querySelectorAll('.popup');
    popups.forEach(popup => {
        if (!popup.contains(event.target)) {
            popup.style.display = 'none';
        }
    });
});
