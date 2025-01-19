// Playlist
const playlists = document.querySelector("#playlists")
const playlistLabel = document.querySelector("#playlistLabel")

playlistLabel.addEventListener("mouseenter", () => playlists.style.display = "flex");
playlists.addEventListener("mouseenter", () => playlists.style.display = "flex");

playlistLabel.addEventListener("mouseleave", () => playlists.style.display = "none");
playlists.addEventListener("mouseleave", () => playlists.style.display = "none");