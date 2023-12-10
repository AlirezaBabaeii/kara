import { Schema, SchemaTypes, type CallbackError } from 'npm:mongoose';
import * as crypto from 'node:crypto';

const CRYPTO_ITERATIONS = 10000;
const CRYPTO_KEY_LENGTH = 64;
const CRYPTO_METHOD = 'sha512';

const ModificationSchema = new Schema(
	{ time: { required: true, type: SchemaTypes.Date, default: Date.now } },
	{ timestamps: true },
);

const PersonSchema = new Schema(
	{
		firstname: { required: true, type: SchemaTypes.String },
		lastname: { required: true, type: SchemaTypes.String },
		created_at: { required: true, default: Date.now, type: SchemaTypes.Date },
		modifications: {
			type: SchemaTypes.Array,
			of: ModificationSchema,
			required: true,
			default: [{ time: Date.now }],
		},
	},
	{
		timestamps: true,
	},
);

const UserSchema = new Schema({
	email: {
		required: false,
		unique: true,
		type: SchemaTypes.String,
	},
	phone: {
		required: false,
		unique: true,
		type: SchemaTypes.String,
	},
	password: { type: SchemaTypes.String },
});

const AuthLogSchema = new Schema({
	person: { type: SchemaTypes.ObjectId },
	when: { type: SchemaTypes.Date, default: Date.now },
	status: {
		type: SchemaTypes.String,
		default: 'unstatus',
		enum: [
			'logged_in',
			'logged_out',
			'verificated_expirment',
			'verficated_otp',
			'waited_otp_verification',
		],
		match: /(logged_in)|(logged_out)|(verificated_expirment)|(verificated_otp)|(waited_otp_verification)/,
	},
});

UserSchema.pre('save', async function preSave(next) {
	const user = this;
	if (!user.isModified('password')) return next();

	try {
		const salt = crypto.randomBytes(16).toString('hex');
		const hash = crypto
			.pbkdf2Sync(user.password!, salt, CRYPTO_ITERATIONS, CRYPTO_KEY_LENGTH, CRYPTO_METHOD)
			.toString('hex');
		user.password = salt.concat(hash);
		next();
	} catch (error: unknown) {
		return next(<CallbackError>error);
	}
});

UserSchema.methods['comparePassword'] = async function comparePassword(data: string) {
	const $saved_hashed_password = <string>this['password'];
	const salt = $saved_hashed_password.substring(0, 32);
	const hash = $saved_hashed_password.substring(32);
	const derivedKey = crypto
		.pbkdf2Sync(data, salt, CRYPTO_ITERATIONS, CRYPTO_KEY_LENGTH, CRYPTO_METHOD)
		.toString('hex');
	return hash === derivedKey;
};

export { AuthLogSchema, PersonSchema };
