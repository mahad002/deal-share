import {model, Schema, models} from 'mongoose';

const uri = process.env.MONGODB_URI;

const UserSchema = new Schema({
    name: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    passwordHash: {type: String, required: true},
    isAdmin: {type: Boolean, default: false},
    }, {
    timestamps: true,
    });
    UserSchema.methods.isCorrectPassword = function(password) {
        return bcrypt.compareSync(password, this.passwordHash);
    }
    UserSchema.pre('save', async function (next) {
        if (this.isModified('password')) {
            this.passwordHash = await bcrypt.hash(this.passwordHash, 10);
        }
        next();
    }
);
UserSchema.statics.getUsers = async function () {
    return await this.find({});
}
export const User = models.User || model('User', UserSchema);
