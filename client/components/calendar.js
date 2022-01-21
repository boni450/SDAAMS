import { useState } from 'react'
import { format } from 'date-fns'
import { Table } from 'react-bootstrap'
import styles from '@/styles/shared.module.css'

const Calendar = () => {
	const today = new Date()
	let grid = { id: 0, day: 0 }
	const monthWeeks = [0, 1, 2, 3, 4]
	const weekDays = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat']

	const [events, setEvents] = useState([])
	const [currentEvent, setCurrentEvent] = useState({})
	const [month, setMonth] = useState({
		today,
		firstDay: new Date(today.getFullYear(), today.getMonth(), 1),
		lastDay: new Date(today.getFullYear(), today.getMonth() + 1, 0),
	})
	const [showModal, setShowModal] = useState(false)
	const [showAddModal, setShowAddModal] = useState(false)

	const getDayEvents = (day = 0) => {
		let a, b, c, d
		a = b = c = d = new Date() // FIX ME
		a = new Date(c.setDate(day))
		b = new Date(d.setDate(day - 1))
		return events.filter(
			(event) => new Date(event.start) < a && b < new Date(event.end)
		)
	}

	return (
		<Table bordered responsive className="text-center">
			<thead>
				<tr>
					{weekDays.map((day, id) => (
						<th key={id}>{day}</th>
					))}
				</tr>
			</thead>
			<tbody>
				{monthWeeks.map((week, index) => (
					<tr key={index}>
						{weekDays.map((day, id) => {
							if (grid.day || month.firstDay.getDate() == grid.id) grid.day++
							grid.id++
							if (grid.day > month.lastDay.getDate()) grid.day = 0
							return (
								<td
									key={id}
									className={styles.box + ' ' + (!grid.day && 'bg-light')}
								>
									{grid.day != 0 && (
										<span
											className={
												grid.day == new Date().getDate()
													? 'text-primary fw-bold'
													: ''
											}
										>
											{grid.day}
										</span>
									)}
									{getDayEvents(grid.day).map((event, count) => {
										count < 3 ? (
											<button
												key={event.id}
												className={'btn btn-sm btn-' + event.color}
												onClick={() => {
													setCurrentEvent(
														events.find((item) => event.id == item.id)
													)
													setShowModal(!showModal)
												}}
											>
												{event.name}
											</button>
										) : (
											<button
												key={grid.day}
												className="btn btn-sm btn-secondary"
											>
												more +
											</button>
										)
									})}
								</td>
							)
						})}
					</tr>
				))}
			</tbody>
		</Table>
	)
}

export default Calendar
