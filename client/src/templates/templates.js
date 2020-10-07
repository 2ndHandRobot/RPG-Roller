const squire = {
        name: '',
        age: 15,
        skills:
            [
                {label:"First Aid", value: 0},
                {label:"Battle", value: 0},
                {label:"Horsemanship", value: 0}
            ]
    }

const personalInfo = [
    {label: 'Name',value: ''},
    {label: 'Player',value: ''},
    {label: 'Homeland',value: ''},
    {label: 'Culture',value: ''},
    {label: 'Religion',value: ''},
    {label: 'Class',value: ''},
    {label: 'Home',value: ''},
    {label: 'Age',value: ''},
    {label: 'Year Born',value: ''},
    {label: 'Son Number',value: ''},
    {label: "Father's Name",value: ''},
    {label: "Father's Class",value: ''},
    {label: 'Lord',value: ''}
]

const personality= [
    {
        trait1:{label:"Chaste",isTicked: false},
        trait2:{label:"Lustful",isTicked: false},
        value: 10
    },
    {
        trait1:{label:"Energetic",isTicked: false},
        trait2:{label:"Lazy",isTicked: false},
        value: 10
    },
    {
        trait1:{label:"Forgiving",isTicked: false},
        trait2:{label:"Vengeful",isTicked: false},
        value: 10
    },
    {
        trait1:{label:"Generous",isTicked: false},
        trait2:{label:"Selfish",isTicked: false},
        value: 10
    },
    {
        trait1:{label:"Honest",isTicked: false},
        trait2:{label:"Deceitful",isTicked: false},
        value: 10
    },
    {
        trait1:{label:"Merciful",isTicked: false},
        trait2:{label:"Cruel",isTicked: false},
        value: 10
    },
    {
        trait1:{label:"Modest",isTicked: false},
        trait2:{label:"Proud",isTicked: false},
        value: 10
    },
    {
        trait1:{label:"Spiritual",isTicked: false},
        trait2:{label:"Worldly",isTicked: false},
        value: 10
    },
    {
        trait1:{label:"Prudent",isTicked: false},
        trait2:{label:"Reckless",isTicked: false},
        value: 10
    },
    {
        trait1:{label:"Temperate",isTicked: false},
        trait2:{label:"Indulgent",isTicked: false},
        value: 10
    },
    {
        trait1:{label:"Trusting",isTicked: false},
        trait2:{label:"Suspiscious",isTicked: false},
        value: 10
    },
    {
        trait1:{label:"Valorous",isTicked: false},
        trait2:{label:"Cowardly",isTicked: false},
        value: 10
    }
]

const passions=
[
    {
        label: "Loyalty (lord)",
        value: 15
    },
    {
        label: "Love (family)",
        value: 15
    },
    {   label: "Hospitality",
        value: 15
    },
    {
        label: "Honor",
        value: 15
    }
]


const stats=
[
    {
        label:"SIZ",
        value: 5
    },
    {
        label:"DEX",
        value: 5
    },
    {
        label:"STR",
        value: 5
    },
    {
        label:"CON",
        value: 5
    },
    {
        label:"APP",
        value: 5
    }
]

const skills=
    [
        {label:"Awareness", value: 0},
        {label:"Boating", value: 0},
        {label:"Chirurgery", value: 0},
        {label:"Compose", value: 0},
        {label:"Courtesy", value: 0},
        {label:"Dancing", value: 0},
        {label:"Faerie_lore", value: 0},
        {label:"Falconry", value: 0},
        {label:"First_aid", value: 0},
        {label:"Flirting", value: 0},
        {label:"Folk_lore", value: 0},
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

const combatSkills=
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


const knight= {
    personalInfo: personalInfo,
    personalityTraits: personality,
    passions:passions,
    statistics: stats,
    distinctiveFeatures:[],
    equipment: [],
    skills: skills,
    combat_skills: combatSkills,
    squire: squire
}
    
const templates = {
    personalInfo:personalInfo,
    personality:personality,
    passions:passions,
    stats:stats,
    skills:skills,
    combatSkills:combatSkills,
    knight:knight,
    squire:squire
}

module.exports = templates;

// console.log("m.f: ",module.filename);
// console.log("m.i: ",module.id);
// console.log("m.e: ",module.exports);