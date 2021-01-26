import React, { useState, useRef } from "react";
import "./Styles/App.css";
import Player from "./Components/Player";
import Song from "./Components/Song";
import data from "./data.js";
import Library from "./Components/Library";
import Nav from "./Components/Nav";


const App = () => {
	const [songs, setSongs] = useState(data());
	const [currentSong, setCurrentSong] = useState(songs[0]);
	const [isPlaying, setIsPlaying] = useState(false);
	const [songInfo, setSongInfo] = useState({ currentTime: 0 }, { duration: 0 });
	//Ref
	const audioRef = useRef(null);
	//TimeupdateHandler
	const timeUpdateHandler = (e) => {
		const current = e.target.currentTime;
		const duration = e.target.duration;
		setSongInfo({ ...songInfo, currentTime: current, duration });
	};
	const [libraryStatus, setLibraryStatus] = useState(false);

	const songEndHandler = async () => {
		let currentIndex = songs.findIndex((song) => song.id === currentSong.id);
		await setCurrentSong(songs[(currentIndex + 1) % songs.length]);
		if (isPlaying) audioRef.current.play();
	}

	return (
		<div className={`app ${libraryStatus? 'library-active': ''}`}>
			<Nav libraryStatus={libraryStatus} setLibraryStatus={setLibraryStatus} />
			<Song currentSong={currentSong} />
			<Player
				isPlaying={isPlaying}
				setIsPlaying={setIsPlaying}
				currentSong={currentSong}
				songInfo={songInfo}
				setSongInfo={setSongInfo}
				timeUpdateHandler={timeUpdateHandler}
				audioRef={audioRef}
				songs={songs}
				setCurrentSong={setCurrentSong}
				setSongs={setSongs}
			/>
			<Library
				libraryStatus={libraryStatus}
				songs={songs}
				setSongs={setSongs}
				setCurrentSong={setCurrentSong}
				audioRef={audioRef}
				isPlaying={isPlaying}
			/>
			<audio
				onTimeUpdate={timeUpdateHandler}
				ref={audioRef}
				src={currentSong.audio}
				onEnded={songEndHandler}
			></audio>
			;
		</div>
	);
};

export default App;
