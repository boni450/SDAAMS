import DefaultLayout from '@/layouts/default'
import Sidebar from '@/components/admin/sidebar'
import { Container, Row, Col } from 'react-bootstrap'

const AdminLayout = ({ children, title }) => {
	return (
		<DefaultLayout title={title}>
			<Container>
				<Row className="justify-content-center">
					<Col md={10}>{children}</Col>
					<Col md={2}>
						<Sidebar />
					</Col>
				</Row>
			</Container>
		</DefaultLayout>
	)
}

export default AdminLayout
