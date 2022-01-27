import { Placeholder } from 'react-bootstrap'

const Loader = ({ size = 5 }) => {
	return (
		<div className="my-5">
			{[...Array(size)].map((item, id) => (
				<Placeholder animation={id % 3 == 0 ? 'glow' : 'wave'} key={id} as="p">
					<Placeholder xs={12 - (id % 3)} />
				</Placeholder>
			))}
		</div>
	)
}

export default Loader
