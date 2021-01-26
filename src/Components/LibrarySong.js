import React from "react";
import "../Styles/Library.css";

const LibrarySong = ({
	songs,
	song,
	name,
	cover,
	artist,
	setCurrentSong,
	audioRef,
	isPlaying,
	setSongs,
	id,
}) => {
	const songSelectHandler = async() => {
		await setCurrentSong(song);
		const newSong = songs.map((song) => {
			if (song.id === id) {
				return { ...song, active: true };
			} else {
				return { ...song, active: false };
			}
		});
		await setSongs(newSong);
		if(isPlaying) audioRef.current.play();
	};
	return (
		<div
			onClick={songSelectHandler}
			className={`library-song ${song.active ? "selected" : ""}`}
		>
			<img alt={name} src={cover} />
			<div className="song-description">
				<h3>{name}</h3>
				<h4>{artist}</h4>
			</div>
		</div>
	);
};

export default LibrarySong;
