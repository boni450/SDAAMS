import Link from 'next/link'
import { Row, Container, Col } from 'react-bootstrap'

const Footer = () => {
	return (
		<>
			<hr />
			<Container>
				<Row>
					<Col md={6} sm={12}>
						<h3>Why work with us</h3>
						<p>
							Lorem ipsum dolor, sit amet consectetur adipisicing, elit. Esse
							maiores perferendis dicta molestias, eius repudiandae voluptates,
							provident adipisci vel officiis pariatur, saepe tenetur autem
							similique natus omnis. Libero, fugit veritatis.
						</p>
					</Col>
					<Col md={3} sm={6}>
						<h3>Quick links</h3>
						<ul>
							<li>
								<Link href="/help">
									<a className="text-decoration-none">Get Started</a>
								</Link>
							</li>
							<li>
								<Link href="/contact">
									<a className="text-decoration-none">Contact Us</a>
								</Link>
							</li>
							<li>
								<Link href="/privacy">
									<a className="text-decoration-none">Privacy Policy</a>
								</Link>
							</li>
							<li>
								<Link href="/terms">
									<a className="text-decoration-none">Terms & Conditions</a>
								</Link>
							</li>
						</ul>
					</Col>
					<Col md={3} sm={6}>
						<h3>Get in touch</h3>
						<ul className="text-truncate">
							<li>Phone : +250 781 234 567</li>
							<li>
								Email :{' '}
								<a href="#" className="text-decoration-none">
									sdaams@gmail.com
								</a>
							</li>
							<li>
								Whatsapp :{' '}
								<a href="#" className="text-decoration-none">
									wa.me/sdaams
								</a>
							</li>
							<li>
								Facebook :{' '}
								<a href="#" className="text-decoration-none">
									fb.me/sdaams
								</a>
							</li>
						</ul>
					</Col>
				</Row>
			</Container>
		</>
	)
}

export default Footer