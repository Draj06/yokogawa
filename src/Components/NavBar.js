import React from 'react';

import { Navbar, Nav } from 'react-bootstrap';
import HEaderImg from '../Images/yokoimg.PNG';

const NavBar = () => {
	const ReloadPage = () => {
		window.location.reload(); // will reload the page
	};
	return (
		<Navbar bg="dark" expand="lg" variant="dark" className="px-4 py-2 fs-1">
			<Navbar.Brand
				onClick={ReloadPage}
				title="Reload"
				style={{ cursor: 'pointer' }}>
				Dashboard
			</Navbar.Brand>
			<Nav className="justify-content-end" style={{ width: '100%' }}>
				<img src={HEaderImg} alt="Yokogawa" style={{ height: '60px' }} />
			</Nav>
		</Navbar>
	);
};

export default NavBar;
