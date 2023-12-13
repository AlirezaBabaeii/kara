/* import db from '$libs/db/mod.ts'; */
import * as jwt from 'https://deno.land/x/djwt@v3.0.1/mod.ts';
import type { Context } from 'https://deno.land/x/oak@v12.6.1/mod.ts';
import { Status } from 'https://deno.land/x/oak@v12.6.1/mod.ts';

async function AuthRefresh($: Context): Promise<unknown> {
	const req: AuthRefreshRequestBody = await $.request.body({ type: 'json' }).value;

	$.response.status = Status.Unauthorized;
	$.response.body = { message: 'Invalid token' };

	if ('token' in req && Boolean(req['token']) === false) return;

	const token = req.token;
	const decoded = jwt.decode(token);
	if (Boolean(decoded) === false) return;

	const payload = <string>decoded[1];
	const user = db.get(payload);
	if (Boolean(user) === false) return;

	$.response.status = Status.OK;
	$.response.body = { user };
	return;
}

interface AuthRefreshRequestBody {
	token: string;
}

export { AuthRefresh };
