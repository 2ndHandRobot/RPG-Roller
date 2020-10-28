// const mongoose = require('mongoose');

// const UserSchema = new mongoose.Schema ({
//     email: {type: String, unique: true, required: true},
//     password: String,
//     userName: String,
//     loggedIn: Boolean,
//     privilege: String
// })

// const DiceSetSchema = new mongoose.Schema ({
//     isOwner: {
//         type: String,
//         required: true
//     },
//     diceSets: [[Number]]
// })

// const LabelNumberPairSchema = new mongoose.Schema ({
//     index: Number,
//     label: { type: String, default: '' },
//     value: { type: Number, min: [0, 'cannot be negative'], default: 0 },
//     isTicked: { type: Boolean, default: false }
// })

// const LabelStringPairSchema = new mongoose.Schema ({
//     index: Number,
//     label: { type: String, default: '' },
//     value: { type: String, default: '' }
// })

// const LabelBoolPairSchema = new mongoose.Schema ({
//     index: Number,
//     label: String,
//     value: Boolean
// })

// const PersonalityTraitPairSchema = new mongoose.Schema ({
//     index: Number,
//     trait1: { 
//         label: String, 
//         isTicked: {
//             type: Boolean,
//             default: false
//         }
//     },
//     trait2: {
//         label: String,
//         isTicked: {
//             type: Boolean,
//             default: false
//         }
//     },
//     value: {
//         type: Number,
//         default: 10
//     },
// })


// const AuxSchema = new mongoose.Schema({
//     index: Number,
//     auxId: String,
//     auxType: String
// })
// const HorseSchema = new mongoose.Schema({
//     index: Number,
//     owner: String,
//     who: [LabelStringPairSchema],
//     about: [LabelStringPairSchema],
//     stats: [LabelNumberPairSchema]
// })

// const FamilyMemberSchema = new mongoose.Schema({
//     owner: String,
//     who: [LabelStringPairSchema],
//     about: [
//         {male: {
//             type: Boolean,
//             default: true
//         }},
//         {age: Number},
//         {glory: Number},
//         {deceased: Boolean}
//     ],
//     armour: [LabelNumberPairSchema],
//     equipment: [String],
//     reputation: [String]
// })

// const FollowerSchema = new mongoose.Schema ({
//     index: Number,
//     owner: String,
//     who: [LabelStringPairSchema],
//     about: [LabelNumberPairSchema],
//     status: [LabelBoolPairSchema],
//     skills:[LabelNumberPairSchema],
//     armour:[LabelNumberPairSchema],
// })
// const CharacterSchema = new mongoose.Schema ({
//     index: Number,
//     playerInfo: {
//         isOwner: {
//             type: String,
//             required:true,
//             default: ''
//         },
//         canEdit: [String],
//         canRead: [String]
//     },
//     personalInfo: [LabelStringPairSchema],
//     personalityTraits: [PersonalityTraitPairSchema],
//     directedTraits: [LabelNumberPairSchema],
//     passions: [LabelNumberPairSchema],
//     statistics: [LabelNumberPairSchema],
//     distinctiveFeatures: [String],
//     description: [String],
//     skills: [LabelNumberPairSchema],
//     combatSkills: {
//         general: [LabelNumberPairSchema],
//         weapons: [LabelNumberPairSchema]
//     },
//     armour: [LabelNumberPairSchema],
//     equipment: [String],
//     horses: [{type: AuxSchema, default: ()=>{auxType: "horse"}}],
//     familyMembers: [{type: AuxSchema, default: ()=>{auxType: "familyMember"}}],
//     followers: [{type: AuxSchema, default: ()=>{auxType: "follower"}}],
//     history: [LabelNumberPairSchema]
// });

// const BugReportSchema = new mongoose.Schema ({
//     reportedBy: String,
//     problem: String,
//     description: String,
//     response: String,
//     resolved: Boolean
// })

// module.exports = {
//     LabelNumberPairSchema: LabelNumberPairSchema,
//     LabelStringPairSchema: LabelStringPairSchema,
//     LabelBoolPairSchema: LabelBoolPairSchema,
//     PersonalityTraitPairSchema: PersonalityTraitPairSchema,
//     AuxSchema: AuxSchema,
//     CharacterSchema: CharacterSchema, 
//     FamilyMembersSchema: FamilyMemberSchema, 
//     FollowersSchema: FollowerSchema, 
//     HorsesSchema: HorseSchema, 
//     UserSchema: UserSchema, 
//     DiceSetsSchema: DiceSetSchema, 
//     BugReportsSchema: BugReportSchema
// }
