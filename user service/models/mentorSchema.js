const mongoose = require('mongoose');

const mentorSchema = new mongoose.Schema(
	{
		username: {
			type: String,
			required: true,
		},
		email: {
			type: String,
			required: true,
			unique: true,
		},
        mobile: {
			type: String,
			required: true,
			unique: true,
		},
		password: {
			type: String,
			required: true,
		},
		role: {
			type: String,
			required: true,
			default: "mentor",
		},
		accountVerified: {
			type: Boolean,
			default: false,
		},
		accountBlocked: {
			type: Boolean,
			default: false,
		},
		emailVerified: {
			type: Boolean,
			default: false,
		},
		loginType: {
			type: String,
			// enum: ["local", "google"],
			default: "local",
		},
		otp: {
			type: String,
		},
		otpExpiresAt: {
			type: Date,
			// This index makes the document expire after the given time.
			expires: '2 minutes', // Replace 'x' with the desired expiration time in minutes
		}
	},
	{ timestamps: true }
);
//create a TTL index
mentorSchema.index({ otpExpiresAt: 1 }, { expireAfterSeconds: 0 });

const Mentor = mongoose.model("Mentor", mentorSchema);

module.exports = Mentor;