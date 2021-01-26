import React from "react";
import LibrarySong from "./LibrarySong";
import "../Styles/Library.css";

const Library = ({ songs, setCurrentSong, audioRef, isPlaying, setSongs,libraryStatus }) => {
	return (
		<div className={`library ${libraryStatus ? 'activLibrary' : ''}`}>
			<h2>Library</h2>
			<div className="library-songs">
				{songs.map((song) => (
					<LibrarySong
						songs={songs}
						setSongs={setSongs}
						isPlaying={isPlaying}
						audioRef={audioRef}
						song={song}
						setCurrentSong={setCurrentSong}
						name={song.name}
						artist={song.artist}
						cover={song.cover}
						key={song.id}
						id={song.id}
					/>
				))}
			</div>
		</div>
	);
};

export default Library;
