import Link from 'next/link'
import { useContext } from 'react'
import { Context } from '@/lib/context'
import { Navbar, Container, Nav, NavDropdown } from 'react-bootstrap'

const Header = () => {
	const { state, dispatch } = useContext(Context)

	return (
		<Navbar bg="dark" variant="dark" expand="lg" className="mb-4 shadow">
			<Container>
				<Link href="/">
					<a className="navbar-brand">
						{typeof state?.user?.email !== 'undefined'
							? state?.user?.firstName + ' ' + state?.user?.lastName
							: process.env.title}
					</a>
				</Link>
				<Navbar.Toggle aria-controls="basic-navbar-nav" />
				<Navbar.Collapse id="basic-navbar-nav">
					<Nav className="me-auto">
						<Link href="/">
							<a className="nav-link">Home</a>
						</Link>
						<Link href="/about">
							<a className="nav-link">About</a>
						</Link>
						<NavDropdown title="Support" id="collasible-nav-dropdown">
							<Link href="/help">
								<a className="dropdown-item">Get Started</a>
							</Link>
							<Link href="/privacy">
								<a className="dropdown-item">Privacy Policy</a>
							</Link>
							<Link href="/terms">
								<a className="dropdown-item">Terms & Conditions</a>
							</Link>
							<NavDropdown.Divider />
							<Link href="/contact">
								<a className="dropdown-item">Contact Us</a>
							</Link>
						</NavDropdown>
					</Nav>
					{state?.user?.email ? (
						<button
							className="btn btn-outline-light rounded-pill"
							onClick={() => {
								localStorage.removeItem('payload')
								dispatch({ type: 'AUTHENTICATE', payload: null })
							}}
						>
							Logout
						</button>
					) : (
						<>
							<Link href="/login">
								<a className="btn btn-outline-light rounded-pill me-1">
									Sign in
								</a>
							</Link>
							<Link href="/register">
								<a className="btn btn-outline-light rounded-pill">Register</a>
							</Link>
						</>
					)}
				</Navbar.Collapse>
			</Container>
		</Navbar>
	)
}

export default Header