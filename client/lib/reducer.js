export const user = (state, action) => {
	switch (action.type) {
		case 'AUTHENTICATE':
			return { ...state, user: action.payload }
		default:
			return state
	}
}
