import type { Context, Middleware, Next } from 'https://deno.land/x/oak@v12.6.1/mod.ts';
import { Router, Status } from 'https://deno.land/x/oak@v12.6.1/mod.ts';

const route = new Router({ sensitive: true });

const forward: Middleware = function forward(_: Context, next: Next): Promise<unknown> {
	return next();
};

const notImplemented: Middleware = function unimplmented($: Context) {
	$.response.body = { message: 'This Route Not Implemented Yet!' };
	$.response.status = Status.NotImplemented;
	$.response.type = 'application/json';
	$.response.headers.set('Content-Type', 'application/json');
	return $;
};

// Auth
const Auth = route.all('/auth', forward);

// Authentication
const AuthLogin = Auth.post('/login', forward);
const AuthRegister = Auth.post('/register', forward);
const AuthRefresh = Auth.post('/refresh', forward);
const AuthLogout = Auth.delete('/', forward);
const AuthLogoutGet = Auth.get('/logout', forward);
const AuthChangePassword = Auth.put('/password', forward);
const AuthVerifyEmail = Auth.get('/verify-email', forward);

// OAuth
const OAuth = Auth.all('/oauth', forward);
const OAuthGitHub = OAuth.post('/github', notImplemented);
const OAuthGoogle = OAuth.post('/google', forward);
const OAuthLinkedIn = OAuth.post('/linkedin', forward);

// Athorization
const ACL = Auth.all('/acl', forward);
const ACLResources = ACL.get('/resources', forward);
const ACLResourceExist = ACL.get('/:resource', forward);
const ACLRequestValidation = ACL.get('/:resource/:action', forward);

// Rest
Auth.all('/*', notImplemented);

export {
	ACL,
	ACLRequestValidation,
	ACLResourceExist,
	ACLResources,
	Auth,
	AuthChangePassword,
	AuthLogin,
	AuthLogout,
	AuthLogoutGet,
	AuthRefresh,
	AuthRegister,
	AuthVerifyEmail,
	OAuth,
	OAuthGitHub,
	OAuthGoogle,
	OAuthLinkedIn,
};
