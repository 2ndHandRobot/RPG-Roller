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
    index: Number,
    label: { type: String, default: '' },
    value: { type: Number, default: 0 },
    isTicked: { type: Boolean, default: false }
})

const LabelStringPairSchema = new mongoose.Schema ({
    index: Number,
    label: { type: String, default: '' },
    value: { type: String, default: '' }
})

const LabelBoolPairSchema = new mongoose.Schema ({
    index: Number,
    label: String,
    value: Boolean
})

const WoundSchema = new mongoose.Schema ({
    index: Number,
    hitpoints: Number,
    firstAid: { type: Boolean, default: false },
    lethal: { type: Boolean, default: false },
    major: { type: Boolean, default: false },
    mortal: { type: Boolean, default: false },
})

const PersonalityTraitPairSchema = new mongoose.Schema ({
    index: Number,
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


const AuxSchema = new mongoose.Schema({
    index: Number,
    auxId: String,
    auxType: String
})
const AnimalSchema = new mongoose.Schema({
    index: Number,
    owner: String,
    who: [LabelStringPairSchema],
    about: [LabelStringPairSchema],
    stats: [LabelNumberPairSchema]
})

const FamilyMemberSchema = new mongoose.Schema({
    owner: String,
    who: [LabelStringPairSchema],
    about: [LabelNumberPairSchema],
    status: [LabelBoolPairSchema],
    aux_armour: [LabelNumberPairSchema],
    aux_equipment: [String],
    aux_reputation: [String],
})

const FollowerSchema = new mongoose.Schema ({
    index: Number,
    owner: String,
    who: [LabelStringPairSchema],
    about: [LabelNumberPairSchema],
    status: [LabelBoolPairSchema],
    skills:[LabelNumberPairSchema],
    armour:[LabelNumberPairSchema],
    aux_reputation: [String],
    aux_equipment: [String]
})
const CharacterSchema = new mongoose.Schema ({
    index: Number,
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
    glory: Number,
    personalityTraits: [PersonalityTraitPairSchema],
    directedTraits: [LabelNumberPairSchema],
    passions: [LabelNumberPairSchema],
    statistics: [LabelNumberPairSchema],
    health: {
        chirurgeryNeeded: Boolean,
        wounds: [WoundSchema]
    },
    distinctiveFeatures: [String],
    description: [String],
    skills: [LabelNumberPairSchema],
    combatSkills: {
        general: [LabelNumberPairSchema],
        weapons: [LabelNumberPairSchema]
    },
    armour: [LabelNumberPairSchema],
    equipment: [String],
    animals: [{type: AuxSchema, default: ()=>{auxType: "animal"}}],
    familyMembers: [{type: AuxSchema, default: ()=>{auxType: "familyMember"}}],
    followers: [{type: AuxSchema, default: ()=>{auxType: "follower"}}],
    history: [LabelNumberPairSchema],
    reserves: Object
});

const BugReportSchema = new mongoose.Schema ({
    reportedBy: String,
    problem: String,
    description: String,
    response: String,
    resolved: Boolean
})


// Mongoose Models

const Characters = mongoose.model("Character", CharacterSchema);
const Users = mongoose.model("User", UserSchema);
const DiceSets = mongoose.model("DiceSet", DiceSetSchema);
const BugReports = mongoose.model("BugReport", BugReportSchema);
const FamilyMembers = mongoose.model("FamilyMember", FamilyMemberSchema);
const Followers = mongoose.model("Follower", FollowerSchema);
const Animals = mongoose.model("Animal", AnimalSchema);
const Wounds = mongoose.model("Wound", WoundSchema);


module.exports = { 
        Characters: Characters, 
        FamilyMembers: FamilyMembers, 
        Followers: Followers, 
        Animals: Animals, 
        Users: Users, 
        DiceSets: DiceSets, 
        BugReports: BugReports 
    }
