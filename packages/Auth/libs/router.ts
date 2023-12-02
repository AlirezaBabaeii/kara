import { Router, type RequestHandler } from 'express';

const route = Router({ caseSensitive: false });

const forward: RequestHandler = function forward(_req, _res, next): void {
	return next();
};

const notImplemented: RequestHandler = function unimplmented(_req, res) {
	res.status(500).send({ message: 'This service is not implemented yet.' }).end();
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
