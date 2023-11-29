import { RequestHandler, Router } from 'express'

const route = Router({ caseSensitive: false })

const forward: RequestHandler = function (_req, _res, next): void {
	return next()
}

const Auth = route.all('/auth', forward)
const AuthLogoutGet = Auth.get('/', forward)
const AuthLoginPost = Auth.post('/login', forward)
const AuthRegisterPost = Auth.post('/register', forward)
const AuthExpirementGet = Auth.get('/expirement', forward)
const AuthOTPVerificationGet = Auth.get('/otp', forward)
const ACL = Auth.all('/acl', forward)
const ACLRequestGet = ACL.get('/:resource/:action', forward)
const ACLAttributeGet = ACL.get('/:resource', forward)

export {
	ACL,
	ACLAttributeGet,
	ACLRequestGet,
	Auth,
	AuthExpirementGet,
	AuthLoginPost,
	AuthLogoutGet,
	AuthOTPVerificationGet,
	AuthRegisterPost
}
