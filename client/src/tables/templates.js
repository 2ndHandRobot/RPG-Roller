
const personalInfo = [
    {label: 'Name',value: ''},
    {label: 'Player',value: ''},
    {label: 'Gender',value: ''},
    {label: 'Period',value: ''},
    {label: 'Region',value: ''},
    {label: 'Homeland',value: ''},
    {label: 'Home',value: ''},
    {label: 'Culture',value: ''},
    {label: 'Religion',value: ''},
    {label: 'Class',value: ''},
    {label: 'Age',value: ''},
    {label: 'Year Born',value: ''},
    {label: 'Son Number',value: ''},
    {label: "Family Trait",value: ''},
    {label: "Father Class",value: ''},
    {label: 'Lord',value: ''}
]

const personality= [
    {
        trait1:{label:"Chaste",isTicked: false},
        trait2:{label:"Lustful",isTicked: false},
        value: 10, 
        
        
    },
    {
        trait1:{label:"Energetic",isTicked: false},
        trait2:{label:"Lazy",isTicked: false},
        value: 10, 
        
    },
    {
        trait1:{label:"Forgiving",isTicked: false},
        trait2:{label:"Vengeful",isTicked: false},
        value: 10, 
        
    },
    {
        trait1:{label:"Generous",isTicked: false},
        trait2:{label:"Selfish",isTicked: false},
        value: 10, 
        
    },
    {
        trait1:{label:"Honest",isTicked: false},
        trait2:{label:"Deceitful",isTicked: false},
        value: 10, 
        
    },
    {
        trait1:{label:"Just",isTicked: false},
        trait2:{label:"Arbitrary",isTicked: false},
        value: 10, 
        
    },
    {
        trait1:{label:"Merciful",isTicked: false},
        trait2:{label:"Cruel",isTicked: false},
        value: 10, 
        
    },
    {
        trait1:{label:"Modest",isTicked: false},
        trait2:{label:"Proud",isTicked: false},
        value: 10, 
        
    },
    {
        trait1:{label:"Spiritual",isTicked: false},
        trait2:{label:"Worldly",isTicked: false},
        value: 10, 
        
    },
    {
        trait1:{label:"Prudent",isTicked: false},
        trait2:{label:"Reckless",isTicked: false},
        value: 10, 
        
    },
    {
        trait1:{label:"Temperate",isTicked: false},
        trait2:{label:"Indulgent",isTicked: false},
        value: 10, 
        
    },
    {
        trait1:{label:"Trusting",isTicked: false},
        trait2:{label:"Suspiscious",isTicked: false},
        value: 10, 
        
    },
    {
        trait1:{label:"Valorous",isTicked: false},
        trait2:{label:"Cowardly",isTicked: false},
        value: 10, 
        
    }
]

const passions =
[
    {
        label: "Loyalty (lord)",
        value: 0, 
        
    },
    {
        label: "Love (family)",
        value: 0, 
        
    },
    {   label: "Hospitality",
        value: 0, 
        
    },
    {
        label: "Honor",
        value: 0, 
        
    }
]

const stats =
[
    {
        label:"SIZ",
        value: 0
    },
    {
        label:"DEX",
        value: 0
    },
    {
        label:"STR",
        value: 0
    },
    {
        label:"CON",
        value: 0
    },
    {
        label:"APP",
        value: 0
    }
]

const health = {
    CHP: 0,
    wounds: [],
    unhealthy: false,
    chirurgeryReceived: false,
}

const skills =
    [
        {label:"Awareness", value: 0},
        {label:"Boating", value: 0},
        {label:"Chirurgery", value: 0},
        {label:"Compose", value: 0},
        {label:"Courtesy", value: 0},
        {label:"Dancing", value: 0},
        {label:"Faerie Lore", value: 0},
        {label:"Falconry", value: 0},
        {label:"First Aid", value: 0},
        {label:"Flirting", value: 0},
        {label:"Folk Lore", value: 0},
        {label:"Gaming", value: 0},
        {label:"Heraldry", value: 0},
        {label:"Hunting", value: 0},
        {label:"Industry", value: 0},
        {label:"Intrigue", value: 0},
        {label:"Orate", value: 0},
        {label:"Play ()", value: 0},
        {label:"Read ()", value: 0},
        {label:"Recognise", value: 0},
        {label:"Religion ()", value: 0},
        {label:"Romance", value: 0},
        {label:"Singing", value: 0},
        {label:"Stewardship", value: 0},
        {label:"Swimming", value: 0},
        {label:"Tourney", value: 0}
]

const skillsAnarchy =
    [
        {label:"Awareness", value: 6},
        {label:"Boating", value: 1},
        {label:"Chirurgery", value: 1},
        {label:"Courtesy", value: 3},
        {label:"Dancing", value: 2},
        {label:"Faerie Lore", value: 1},
        {label:"Falconry", value: 3},
        {label:"First Aid", value: 10},
        {label:"Flirting", value: 4},
        {label:"Folk Lore", value: 2},
        {label:"Gaming", value: 3},
        {label:"Hunting", value: 2},
        {label:"Intrigue", value: 5},
        {label:"Orate", value: 3},
        {label:"Play ()", value: 3},
        {label:"Recognise", value: 5},
        {label:"Religion ()", value: 2},
        {label:"Singing", value: 2},
        {label:"Stewardship", value: 2},
        {label:"Swimming", value: 2}
]

const combatSkills =
    {
        general:
            [
                {label:"Battle", value: 0},
                {label:"Horsemanship", value: 0}
            ],
        weapons:
            [
                {label:"Sword", value: 0},
                {label:"Lance", value: 0},
                {label:"Spear", value: 0},
                {label:"Dagger", value: 0}
            ]
}

const family = [
    {
        index: 0,
        who: {label: "Father", value: ''},
        male: true
    },
    {
        index: 1,
        who: {label: "Mother", value: ''},
        male: false
    }
]

const squire = {
    who: [
            {label:'Name', value: ''}
        ],
    about: [
            {label:'Born', value: 0},
            {label:'Age', value: 15},
            {label:'Glory', value: 0}
        ],
    status: [
            {label: "male", value: true},
            {label: "deceased", value: true},
            {label: "retired", value: true}
        ],
    skills:
        [
            {label:"First Aid", value: 0},
            {label:"Battle", value: 0},
            {label:"Horsemanship", value: 0}
        ],
    reputation:[]
}

const horse = {
    desc: [
        {label: "name", value: ""},
        {label: "type", value: ""},
        {label: "breed", value: ""}
    ],
    stats: [
        {label: "SIZ", value: 0},
        {label: "CON", value: 0},
        {label: "DEX", value: 0},
        {label: "HP", value: 0},
        {label: "attack", value: 0},
        {label: "damage", value: 0},
        {label: "armour", value: 0}
    ]
}

const knight = {
    personalInfo: personalInfo,
    personalityTraits: personality,
    passions:passions,
    statistics: stats,
    distinctiveFeatures:[],
    equipment: [],
    skills: skills,
    combatSkills: combatSkills,
    glory: 0,
    reserves: {},
    
}
    
const knightAnarchy = {
    personalInfo: personalInfo,
    personalityTraits: personality,
    passions:passions,
    statistics: stats,
    distinctiveFeatures:[],
    equipment: [],
    horses: horse,
    skills: skillsAnarchy,
    combatSkills: combatSkills,
    family: family,
    squires: squire
}

const character = {
    personalInfo:personalInfo,
    personalityTraits:personality,
    passions:passions,
    statistics: stats,
    distinctiveFeatures:[],
    health: health,
    equipment: [],
    horses: horse,
    skills: skillsAnarchy,
    combatSkills: combatSkills,
    family: family,
    squires: squire
}
const templates = {
    knight:knight,
    knightAnarchy:knightAnarchy,
    family:family,
    squire:squire,
    horse:horse,
    character:character
}

export default templates;
