document.addEventListener('DOMContentLoaded', () => {
    const sharedLayout = document.getElementById('sharedLayout');

    // Fetch the shared layout HTML file
    fetch('/sharedfile.html')
        .then(response => response.text())
        .then(html => {
            sharedLayout.innerHTML = html;

            // Dispatch a custom event once the shared layout is loaded
            const event = new Event('sharedLayoutLoaded');
            document.dispatchEvent(event);
        })
        .catch(err => console.error('Error loading shared content:', err));
});
