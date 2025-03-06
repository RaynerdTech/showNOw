document.addEventListener('DOMContentLoaded', () => {
    const sharedLayout = document.getElementById('sharedLayout');
    const footershare = document.getElementById('footershare');

    // Fetch the shared layout HTML file
    fetch('/sharedfile.html')
        .then(response => response.text())
        .then(html => {
            sharedLayout.innerHTML = html;

            // Dispatch a custom event once the shared layout is loaded
            document.dispatchEvent(new Event('sharedLayoutLoaded'));
        })
        .catch(err => console.error('Error loading shared content:', err));

    // Fetch footershare.html
    fetch('/sharedFooter.html')
        .then(response => response.text())
        .then(html => {
            footershare.innerHTML = html;

            // Dispatch a custom event once the footer share is loaded
            document.dispatchEvent(new Event('footershareLoaded'));
        })
        .catch(err => console.error('Error loading footer share:', err));


});
