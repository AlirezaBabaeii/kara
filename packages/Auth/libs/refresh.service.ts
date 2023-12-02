// @ts-ignore only-next-line #{ is injectable with `w/launcher` }
import db from '$libs/db';
import type { Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';

function AuthRefresh(req: AuthRefreshRequest, res: Response) {
	if ('token' in req.body && !req.body.token) {
		return res.status(401).json({ message: 'Invalid token' });
	}

	const decoded = jwt.decode(req.body.token, { complete: true });
	if (!decoded) {
		return res.status(401).json({ message: 'Invalid token' });
	}

	const user = db.get(decoded.payload);
	if (!user) {
		return res.status(401).json({ message: 'Invalid token' });
	}

	return res.status(200).json(user);
}

declare module 'http' {
	interface IncomingHttpHeaders extends AuthIncomingHttpHeaders {}
}

interface AuthIncomingHttpHeaders {
	'w-auth-token': string;
}

interface AuthRefreshRequestBody {
	token: string;
}

interface AuthRefreshRequestParam {}

type AuthRefreshRequest = Request<AuthRefreshRequestParam, {}, AuthRefreshRequestBody>;

export { AuthRefresh };
