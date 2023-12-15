import type { Application } from 'https://deno.land/x/oak@v12.6.1/mod.ts';
import * as router from './router.ts';

function AuthModule(app: Application): Promise<void> {
	app.use(router.AuthLogin.routes(), router.AuthLogin.allowedMethods() /*  , AuthLoginImpl */);
	return Promise.resolve();
}

export * as router from './router.ts';
export default AuthModule;
