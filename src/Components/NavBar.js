import React from 'react';

import { Navbar, Nav, NavDropdown } from 'react-bootstrap';

const NavBar = () => {
	return (
		<Navbar bg="dark" expand="lg" variant="dark" className="px-4 py-2 fs-1">
			<Navbar.Brand>Dashboard</Navbar.Brand>
		</Navbar>
	);
};

export default NavBar;
