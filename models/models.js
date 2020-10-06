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
    personalInfo: [{label: String, value: String}],
    personalityTraits: [{
        traits: 
            {
                trait1: String,
                trait2: String
            },
        value: {
            type: Number,
            default: 0
        },
        paragon: Number
    }],
    passions: [{ 
        label: 
            {
                type: String,
                default: ''
            },
        value:       
            {
                type: Number,
                min: [0, 'cannot be negative'],
                default: 0
            }
}],
    statistics: [{ 
        label: 
            {
                type: String,
                default: ''
            },
        value:       
            {
                type: Number,
                min: [0, 'cannot be negative'],
                default: 0
            }
}],
    distinctiveFeatures: [String],
    skills: [{ 
        label: 
            {
                type: String,
                default: ''
            },
        value:       
            {
                type: Number,
                min: [0, 'cannot be negative'],
                default: 0
            }
}],
    combatSkills:
        {
            general: [{
                label: 
                    {
                        type: String,
                        default: ''
                    },
                value:       
                    {
                        type: Number,
                        min: [0, 'cannot be negative'],
                        default: 0
                    }
        }],
            weapons: [{ 
                label: 
                    {
                        type: String,
                        default: ''
                    },
                value:       
                    {
                        type: Number,
                        min: [0, 'cannot be negative'],
                        default: 0
                    }
        }]
    },
    squire: {
        name: 
            {
                type: String,
                default: ''
            },
        age: {
            type: Number,
            default: 15
        },
        skills:[{ 
            label: 
                {
                    type: String,
                    default: ''
                },
            value:       
                {
                    type: Number,
                    min: [0, 'cannot be negative'],
                    default: 0
                }
    }]
    },
    equipment: [String]
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