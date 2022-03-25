import { useState } from 'react'
import { useQuery, useMutation } from '@apollo/client'
import { GET_COMMENTS } from '@/lib/graphql/queries'
import { ADD_COMMENT } from '@/lib/graphql/mutations'
import { Button, Form } from 'react-bootstrap'
import styles from '@/styles/shared.module.css'

const Comment = ({ state, appointment }) => {
	const [message, setMessage] = useState('')

	const { data, refetch } = useQuery(GET_COMMENTS, {
		variables: {
			id: Number.parseInt(appointment?.id),
			orderCol: 'id',
			orderBy: 'DESC',
		},
	})
	const [attemptSavingComment, { error }] = useMutation(ADD_COMMENT, {
		errorPolicy: 'all',
		onCompleted: (data) => {
			if (data?.addComment) refetch()
		},
	})

	const handleSubmit = (event) => {
		event.preventDefault()
		attemptSavingComment({
			variables: {
				message,
				userId: Number.parseInt(state?.user?.id),
				appointmentId: Number.parseInt(appointment?.id),
			},
		})
		setMessage('')
	}

	return (
		<>
			<div className={'bg-light my-2 px-3 py-2 rounded ' + styles.commentList}>
				<h5>{data?.comments.length} Comments</h5>
				{data?.comments.map((item, id) => (
					<div key={id}>
						<span className="d-inline fw-bold">
							{item?.user.firstName} {item?.user.lastName} &rarr;{' '}
						</span>
						{item?.message}
					</div>
				))}
			</div>
			{state?.user?.id && (
				<Form onSubmit={handleSubmit}>
					<Form.Control
						rows={3}
						as="textarea"
						value={message}
						required={true}
						className="mb-2"
						placeholder="Leave a comment . . ."
						onChange={(el) => setMessage(el.target.value)}
					/>
					<Button variant="primary" type="submit">
						Submit
					</Button>
				</Form>
			)}
		</>
	)
}

export default Comment
