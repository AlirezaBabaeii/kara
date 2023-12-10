import db from '$libs/db/mod.ts';
import * as jwt from 'https://deno.land/x/djwt@v3.0.1/mod.ts';
import type { Context } from 'https://deno.land/x/oak@v12.6.1/mod.ts';

async function AuthRefresh(context: Context<{ body: { token: string } }>): Promise<unknown> {
	const req: AuthRefreshRequestBody = await context.request.body({ type: 'json' }).value;

	if ('token' in req && Boolean(req['token']) === false) {
		context.response.status = 401;
		context.response.body = { message: 'Invalid token' };
		return;
	}

	const token = req.token;
	const decoded = jwt.decode(token);
	if (Boolean(decoded) === false) {
		context.response.status = 401;
		context.response.body = { message: 'Invalid token' };
		return;
	}

	const payload = decoded[1];
	const user = db.get(payload);
	if (Boolean(user) === false) {
		context.response.status = 401;
		context.response.body = { message: 'Invalid token' };
		return;
	}

	context.response.status = 200;
	context.response.body = user;
	return;
}

interface AuthRefreshRequestBody {
	token: string;
}

export { AuthRefresh };
