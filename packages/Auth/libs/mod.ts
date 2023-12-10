import type { Application } from 'npm:@types/express';
import * as router from './router.ts';

async function AuthModule(app: Application): Promise<void> {
	app.use(router.Auth);
}

export * as router from './router.ts';
export default AuthModule;
