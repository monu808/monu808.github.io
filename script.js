document.getElementById('searchBtn').addEventListener('click', () => {
    const searchTerm = document.getElementById('searchInput').value;
    searchSong(searchTerm);
});

async function searchSong(searchTerm) {
    const apiKey = 'BQClSwSjoEMLeSHn6bqzMk2kCv48I_Ie8OuEcEV3qcxO6F5hwglTiy8Ee9GLPovszD6-64Fh8EQXN-5cWyYYAHCnG_Xbwh-M_J-txUdR8MpvTHIOzyKulzJYF1uB_nU-IZeoFfYoV_Ahk3VCBekQG77p-W7vExmH66YmvdN7oNgA2oS88KHginEumFlWvaXStLyb3HPyk-bhUgqlAwdkCQFgYPt_oMhP0_WlvG_OnBf7oly13lpG5I7qf4-iN9btelykPmpcu8_zxjNjgVcRhW1t';
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
