import type { Application } from 'https://deno.land/x/oak@v12.6.1/mod.ts';
import * as router from './router.ts';

async function AuthModule(app: Application): Promise<void> {
	app.use(router.Auth);
}

export * as router from './router.ts';
export default AuthModule;
