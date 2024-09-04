const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
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
		password: {
			type: String,
			required: true,
		},
		role: {
			type: String,
			default: "mentee",
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
			enum: ["local", "google"],
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

// Create TTL index
userSchema.index({ otpExpiresAt: 1 }, { expireAfterSeconds: 0 });

const User = mongoose.model("User", userSchema);

module.exports = User;
