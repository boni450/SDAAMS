import Link from 'next/link'
import Image from 'next/image'
import { useContext } from 'react'
import { useRouter } from 'next/router'
import { Context } from '@/lib/context'
import { eraseCookie } from '@/lib/cookie'
import { Navbar, Container, Nav, NavDropdown, Badge } from 'react-bootstrap'

const Header = ({ fluid, notifications }) => {
  const router = useRouter()
  const { state, dispatch } = useContext(Context)

  return (
    <Navbar bg="dark" variant="dark" expand="lg" className="mb-4 shadow">
      <Container fluid={fluid}>
        <Image src="/img/auca.jpg" width="32" height="32" className='rounded-pill' />
        <Link href="/">
          <a className="navbar-brand mx-2">
            {typeof state?.user?.id !== 'undefined'
              ? state?.user?.firstName + ' ' + state?.user?.lastName
              : process.env.TITLE}
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
          {state?.user?.id ? (
            <Nav>
              {state?.user?.role !== 'admin' ? (
                <>
                  <Link href="/dashboard">
                    <a className="nav-link">Dashboard</a>
                  </Link>
                  <Link href="/dashboard/chat">
                    <a className="nav-link">Chat</a>
                  </Link>
                  <Link href="/dashboard/notifications">
                    <a className="nav-link">
                      Notifications{' '}
                      {notifications != 0 && (
                        <Badge pill>{notifications}</Badge>
                      )}
                    </a>
                  </Link>
                  <Link href="/dashboard/settings">
                    <a className="nav-link">Settings</a>
                  </Link>
                </>
              ) : (
                <Link href="/dashboard">
                  <a className="nav-link">Dashboard</a>
                </Link>
              )}
              <button
                className="btn btn-outline-light rounded-pill ms-1"
                onClick={() => {
                  eraseCookie('payload')
                  localStorage.removeItem('payload')
                  dispatch({ type: 'AUTHENTICATE', payload: null })
                  router.push('/')
                }}
              >
                Logout
              </button>
            </Nav>
          ) : (
            <>
              <Link href="/guest/login">
                <a className="btn btn-outline-light rounded-pill me-1">
                  Sign in
                </a>
              </Link>
              <Link href="/guest/register">
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
