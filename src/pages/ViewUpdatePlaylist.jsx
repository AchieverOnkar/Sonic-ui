import React from 'react';

export default function ViewUpdatePlaylist({ playlist, removeSongs }) {
  return (
    <div>
      <form >
        <label htmlFor="playlistId">PlayList id: </label>
        <input type="text" id="playlistId" name="id" value={playlist.id} />
        <br />
        <label htmlFor="name">PlayList Name: </label>
        <input type="text" id="name" name="name" value={playlist.name} />
        <br />
        <label htmlFor="posterLink">PlayList Poster: </label>
        <img src={playlist.posterLink} alt="poster" />
        <input type="text" id="posterLink" name="posterLink" value={playlist.posterLink} />
        <br />
        <label htmlFor="genre">PlayList Genre: </label>
        <input type="text" id="genre" name="genre" value={playlist.genre} />
        <br />

        <div className="SongList">
          {playlist.songs.map((song) => (
            <div key={song.id}>
              <img src={song.posterLink} alt="poster" />
              <label>{song.artist}</label>
              <br />
              <label>{song.name}</label>
              <input type="checkbox" name="removeSongs" value={song.id} />
            </div>
          ))}
        </div>
        {removeSongs != null && <input type="hidden" name="removeSongs" value={removeSongs} />}

        <br />
        <input type="submit" value="Update Playlist" />
      </form>
    </div>
  );
}
