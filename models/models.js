const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema ({
    email: {type: String, unique: true, required: true},
    password: String,
    userName: String,
    loggedIn: Boolean,
    privilege: String
})

const DiceSetSchema = new mongoose.Schema ({
    isOwner: {
        type: String,
        required: true
    },
    diceSets: [[Number]]
})

const LabelNumberPairSchema = new mongoose.Schema ({
    label: { type: String, default: '' },
    value: { type: Number, min: [0, 'cannot be negative'], default: 0 },
    isTicked: { type: Boolean, default: false }
})

const LabelStringPairSchema = new mongoose.Schema ({
    label: { type: String, default: '' },
    value: { type: String, default: '' },
    isTicked: { type: Boolean, default: false }
})

const PersonalityTraitPairSchema = new mongoose.Schema ({
    trait1: { 
        label: String, 
        isTicked: {
            type: Boolean,
            default: false
        }
    },
    trait2: {
        label: String,
        isTicked: {
            type: Boolean,
            default: false
        }
    },
    value: {
        type: Number,
        default: 10
    },
})

const SquireSchema = new mongoose.Schema ({
    name: {
        type: String,
        default: ''
    },
    age: {
        type: Number,
        default: 15
    },
    skills:[LabelNumberPairSchema]
})
const CharacterSchema = new mongoose.Schema ({
    playerInfo: {
        isOwner: {
            type: String,
            required:true,
            default: ''
        },
        canEdit: [String],
        canRead: [String]
    },
    personalInfo: [LabelStringPairSchema],
    personalityTraits: [PersonalityTraitPairSchema],
    passions: [LabelNumberPairSchema],
    statistics: [LabelNumberPairSchema],
    distinctiveFeatures: [String],
    skills: [LabelNumberPairSchema],
    combatSkills: {
        general: [LabelNumberPairSchema],
        weapons: [LabelNumberPairSchema]
    },
    equipment: [String],
    squire: SquireSchema
});

const BugReportSchema = new mongoose.Schema ({
    reportedBy: String,
    problem: String,
    description: String,
    response: String,
    resolved: Boolean
})


// Mongoose Models

const Knights = mongoose.model("Knight", CharacterSchema);
const Users = mongoose.model("User", UserSchema);
const DiceSets = mongoose.model("DiceSet", DiceSetSchema);
const BugReport = mongoose.model("BugReport", BugReportSchema);

module.exports = { Knights: Knights, Users: Users, DiceSets: DiceSets, BugReport: BugReport }

// console.log(module.filename);
// console.log(module.id);
// console.log(module.exports);