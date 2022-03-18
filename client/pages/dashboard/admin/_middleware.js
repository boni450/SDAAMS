import jwt_decode from 'jwt-decode'
import { NextResponse } from 'next/server'

const middleware = (req, ev) => {
	if (req.cookies['payload']) {
		const token = jwt_decode(req.cookies['payload'])
		if (token?.data?.role === 'admin') return NextResponse.next()
		else return NextResponse.redirect(process.env.ABSOLUTE_URL + '/dashboard/')
	} else return NextResponse.redirect(process.env.ABSOLUTE_URL + '/dashboard/')
}

export default middleware
