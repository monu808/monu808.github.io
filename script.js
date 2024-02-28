document.getElementById('searchBtn').addEventListener('click', () => {
    const searchTerm = document.getElementById('searchInput').value;
    searchSong(searchTerm);
});

async function searchSong(searchTerm) {
    const apiKey = 'BQD2pYPj6ftY7uldb8OXi0cGLVe6QdFoQEiNw1eDNUo0DNXsjns86JOITp716vVTRL6K66pT5GZyFmOFiPkum0QEowUz1eAYaB1pru03365EFXqdywSVqrXki718RwCz96oWySQPoNObn7zEb18XeRNLDTPV5_ENMF3QeIN82ALmMf3618HATt9Jz1STYa_iyNZNoisM7bV9m5LsE6eJDv9CzpAV6hoI6neVJIfjV2qdbEIwl68VZv3dehO0mPR1GbEHhSXengGCsI2h8Pz_-WCj';
    const apiUrl = `https://api.spotify.com/v1/search?q=${searchTerm}&type=track`;

    try {
        const response = await fetch(apiUrl, {
            headers: {
                'Authorization': `Bearer ${apiKey}`
            }
        });
        const data = await response.json();

        displayResults(data.tracks.items);
    } catch (error) {
        console.error('Error fetching search results:', error);
    }
}

function displayResults(tracks) {
    const resultsContainer = document.getElementById('results');
    resultsContainer.innerHTML = '';

    tracks.forEach(track => {
        const trackName = track.name;
        const artistName = track.artists[0].name;
        const previewUrl = track.preview_url;

        const trackDiv = document.createElement('div');
        trackDiv.classList.add('music-card');
        trackDiv.innerHTML = `
            <p><strong>${trackName}</strong> - ${artistName}</p>
            <button onclick="playPreview('${previewUrl}')">Play Preview</button>
        `;
        resultsContainer.appendChild(trackDiv);
    });
}

function playPreview(previewUrl) {
    const audioPlayer = document.getElementById('audioPlayer');
    audioPlayer.src = previewUrl;
    audioPlayer.play();
}
