import AdminLayout from '@/layouts/admin'
import { Card, Row, Col } from 'react-bootstrap'

const AdminArea = () => {
	return (
		<AdminLayout title="Admin Area - SDAAMS">
			<h2>Admin Area</h2>
			<Row className="justify-content-center">
				<Col md={3}>
					<Card bg="light" className="shadow-sm">
						<Card.Body>
							<h1>120</h1>
							Registered users
						</Card.Body>
					</Card>
				</Col>
				<Col md={3}>
					<Card bg="light" className="shadow-sm">
						<Card.Body>
							<h1>400</h1>
							Appointments
						</Card.Body>
					</Card>
				</Col>
				<Col md={3}>
					<Card bg="light" className="shadow-sm">
						<Card.Body>
							<h1>231</h1>
							Bookings
						</Card.Body>
					</Card>
				</Col>
				<Col md={3}>
					<Card bg="light" className="shadow-sm">
						<Card.Body>
							<h1>12,900</h1>
							Comments
						</Card.Body>
					</Card>
				</Col>
			</Row>
		</AdminLayout>
	)
}

export default AdminArea
