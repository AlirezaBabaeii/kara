import { Schema, SchemaTypes } from 'mongoose'

const PersonSchema = new Schema({
	firstname: { required: true, type: SchemaTypes.String },
	lastname: { required: true, type: SchemaTypes.String },
	joined_at: { required: true, default: Date.now, type: SchemaTypes.Date }
})

const AuthLogSchema = new Schema({
	person: { type: SchemaTypes.ObjectId },
	when: { type: SchemaTypes.Date, default: Date.now },
	status: {
		type: SchemaTypes.String,
		default: 'unstatus',
		match: /(logged_in)|(logged_out)|(verificated_expirment)|(verificated_otp)|(waited_otp_verification)/
	}
})

export { PersonSchema, AuthLogSchema }
