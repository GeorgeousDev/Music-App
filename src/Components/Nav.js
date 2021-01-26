import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMusic } from "@fortawesome/free-solid-svg-icons";
import "../Styles/Nav.css";

const Nav = ({ libraryStatus, setLibraryStatus }) => {
	return (
		<nav>
			<h1>Georgeous Dev</h1>
			<button onClick={() => setLibraryStatus(!libraryStatus)}>
				Library
				<FontAwesomeIcon icon={faMusic} />
			</button>
		</nav>
	);
};

export default Nav;
