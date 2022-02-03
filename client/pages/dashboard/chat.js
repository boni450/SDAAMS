import ChatBox from '@/components/chat'
import DefaultLayout from '@/layouts/default'
import { Container, Row, Col } from 'react-bootstrap'
import { useQuery } from '@apollo/client'
// import { GET_CHATS } from '@/lib/graphql/queries'
import Loader from '@/components/loader'

const Chat = () => {
	// const { loading, data } = useQuery(GET_CHATS)

	// if (loading)
	// 	return (
	// 		<DefaultLayout title="Chat - SDAAMS">
	// 			<Container>
	// 				<Loader size={5} />
	// 			</Container>
	// 		</DefaultLayout>
	// 	)
	// if (data)
	return (
		<DefaultLayout title="Chat - SDAAMS">
			<Container>
				<Row className="justify-content-center">
					<Col md={9}>
						{/*<ChatBox data={data?.chats} />*/}
						<ChatBox />
					</Col>
				</Row>
			</Container>
		</DefaultLayout>
	)
}

export default Chat
