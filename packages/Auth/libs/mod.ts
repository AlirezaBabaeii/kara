import type { Application } from 'express';
import * as router from './router';

async function AuthModule(app: Application): Promise<void> {
	app.use(router.Auth);
}

export * as router from './router';
export default AuthModule;
