import jwt_decode from 'jwt-decode'
import { NextResponse } from 'next/server'

const middleware = (req, ev) => {
	if (req.cookies['payload']) {
		const token = jwt_decode(req.cookies['payload'])
		if (token?.data?.id) return NextResponse.redirect('/dashboard')
		else return NextResponse.next()
	} else return NextResponse.next()
}

export default middleware
