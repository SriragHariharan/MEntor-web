const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({
  userID: {
    type: String,
    required: true,
    unique: true
  },
  username: {
    type: String,
    required: true
  },
  jobDescription: {
    type: String,
    default: null
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  profilePic: {
    type: Object,
    default: null
  },
  coverPic: {
    type: Object,
    default: null
  },
  bio: {
    type: String,
    default: null
  },
  about: {
    type: String,
    default: null
  },
  githubLink: {
    type: String,
    default: null
  },
  linkedInLink: {
    type: String,
    default: null
  },
  skills: [{
    skill: {
      type: String
    },
    level: {
      type: String,
      enum: ['beginner', 'intermediate', 'advanced', 'pro']
    }
  }],
  education: [{
    institution: {
      type: String
    },
    degree: {
      type: String
    },
    timespan:{
        type: String
    }
  }],
  experience: [{
    company: {
      type: String
    },
    role: {
      type: String
    },
    timespan:{
        type: String
    }
  }],
  interviewsCount: {
    type: Number,
    default: 0
  },
  following: [{
    type: String
  }],
  followers: [{
    type: String
  }],
  careerGuidanceCount: {
    type: Number,
    default: 0
  },
  role: {
    type: String,
    enum: ['mentor', 'mentee']
  }
});

const Profile = mongoose.model('Profile', profileSchema);

module.exports = Profile;