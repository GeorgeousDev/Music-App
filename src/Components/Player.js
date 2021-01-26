import React, { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faPlay,
	faAngleLeft,
	faAngleRight,
	faPause,
} from "@fortawesome/free-solid-svg-icons";

import "../Styles/Player.css";

const Player = ({
	currentSong,
	isPlaying,
	setIsPlaying,
	songInfo,
	setSongInfo,
	audioRef,
	songs,
	setCurrentSong,
	setSongs,
}) => {
	const activLibraryHandler = (nextPrev) => {
		const newSong = songs.map((song) => {
			if (song.id === nextPrev.id) {
				return { ...song, active: true };
			} else {
				return { ...song, active: false };
			}
		});
		setSongs(newSong);
	};
	const skipAudioHandler = async (direction) => {
		let currentIndex = songs.findIndex((song) => song.id === currentSong.id);
		if (direction === "skip-forward") {
			await setCurrentSong(songs[(currentIndex + 1) % songs.length]);
			activLibraryHandler(songs[(currentIndex + 1) % songs.length]);
			if (isPlaying) audioRef.current.play();
		} else if (direction === "skip-backward") {
			if (currentIndex - 1 === -1) {
				await setCurrentSong(songs[songs.length - 1]);
				activLibraryHandler(songs[songs.length - 1]);
				if (isPlaying) audioRef.current.play();
				return;
			}
			await setCurrentSong(songs[(currentIndex - 1) % songs.length]);
			activLibraryHandler(songs[(currentIndex - 1) % songs.length]);
			if (isPlaying) audioRef.current.play();
		}
	};

	const playAudioHandler = () => {
		if (isPlaying) {
			audioRef.current.pause();
			setIsPlaying(!isPlaying);
		} else {
			audioRef.current.play();
			setIsPlaying(!isPlaying);
		}
	};
	const getTime = (time) => {
		return (
			Math.floor(time / 60) + ":" + ("0" + Math.floor(time % 60)).slice(-2)
		);
	};

	const dragHandler = (e) => {
		audioRef.current.currentTime = e.target.value;
		setSongInfo({
			...songInfo,
			currentTime: e.target.value,
		});
	};
	return (
		<div className="player">
			<div className="time-control">
				<p>{getTime(songInfo.currentTime)}</p>
				<input
					onChange={dragHandler}
					min={0}
					max={songInfo.duration || 0}
					value={songInfo.currentTime}
					type="range"
				/>
				<p>{songInfo.duration ? getTime(songInfo.duration) : "0:00"}</p>
			</div>
			<div className="play-control">
				<FontAwesomeIcon
					onClick={() => skipAudioHandler("skip-backward")}
					className="skip-backward"
					size="2x"
					icon={faAngleLeft}
				/>
				<FontAwesomeIcon
					onClick={playAudioHandler}
					className="play"
					size="2x"
					icon={isPlaying ? faPause : faPlay}
				/>
				<FontAwesomeIcon
					onClick={() => skipAudioHandler("skip-forward")}
					className="skip-foward"
					size="2x"
					icon={faAngleRight}
				/>
			</div>
		</div>
	);
};

export default Player;
