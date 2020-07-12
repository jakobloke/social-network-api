const moment = require('moment');
const { Schema, model, Types } = require('mongoose');

const UserSchema = new Schema({
    username: {
        type: String,
        unique: true,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: [/^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/, 'Please enter a valid email address']
    },
    thoughts: [{
        type: Schema.Types.ObjectId,
        ref: 'Thought'
    }],
    friends: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }]
}, {
    toJSON: {
        virtuals: true
    },
    id: false
});

UserSchema.virtual('friendCount').get(function() {
    return this.friends.length;
});

UserSchema.virtual('thoughtCount').get(function() {
    return this.thoughts.reduce((total, thought) => total + thought.reactions.length + 1, 0);
});

const User = model('User', UserSchema);

module.exports = User;