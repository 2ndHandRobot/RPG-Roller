const squire = {
        name: '',
        age: 15,
        skills:
            [
                {label:"first_aid", value: 0},
                {label:"battle", value: 0},
                {label:"horsemanship", value: 0}
            ]
    }

const personalInfo = [
    {label: 'name',value: ''},
    {label: 'player',value: ''},
    {label: 'homeland',value: ''},
    {label: 'culture',value: ''},
    {label: 'religion',value: ''},
    {label: 'class',value: ''},
    {label: 'home',value: ''},
    {label: 'age',value: ''},
    {label: 'yearBorn',value: ''},
    {label: 'sonNumber',value: ''},
    {label: 'fatherName',value: ''},
    {label: 'fatherClass',value: ''},
    {label: 'lord',value: ''}
]

const personality= [
    {
        trait1:{label:"chaste",isTicked: false},
        trait2:{label:"lustful",isTicked: false},
        value: 10
    },
    {
        trait1:{label:"energetic",isTicked: false},
        trait2:{label:"lazy",isTicked: false},
        value: 10
    },
    {
        trait1:{label:"forgiving",isTicked: false},
        trait2:{label:"vengeful",isTicked: false},
        value: 10
    },
    {
        trait1:{label:"generous",isTicked: false},
        trait2:{label:"selfish",isTicked: false},
        value: 10
    },
    {
        trait1:{label:"honest",isTicked: false},
        trait2:{label:"deceitful",isTicked: false},
        value: 10
    },
    {
        trait1:{label:"merciful",isTicked: false},
        trait2:{label:"cruel",isTicked: false},
        value: 10
    },
    {
        trait1:{label:"modest",isTicked: false},
        trait2:{label:"proud",isTicked: false},
        value: 10
    },
    {
        trait1:{label:"spiritual",isTicked: false},
        trait2:{label:"worldly",isTicked: false},
        value: 10
    },
    {
        trait1:{label:"prudent",isTicked: false},
        trait2:{label:"reckless",isTicked: false},
        value: 10
    },
    {
        trait1:{label:"temperate",isTicked: false},
        trait2:{label:"indulgent",isTicked: false},
        value: 10
    },
    {
        trait1:{label:"trusting",isTicked: false},
        trait2:{label:"suspiscious",isTicked: false},
        value: 10
    },
    {
        trait1:{label:"valorous",isTicked: false},
        trait2:{label:"cowardly",isTicked: false},
        value: 10
    }
]

const passions=
[
    {
        label: "loyalty_lord",
        value: 15
    },
    {
        label: "love_family",
        value: 15
    },
    {   label: "hospitality",
        value: 15
    },
    {
        label: "honor",
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
        {label:"awareness", value: 0},
        {label:"boating", value: 0},
        {label:"chirurgery", value: 0},
        {label:"compose", value: 0},
        {label:"courtesy", value: 0},
        {label:"dancing", value: 0},
        {label:"faerie_lore", value: 0},
        {label:"falconry", value: 0},
        {label:"first_aid", value: 0},
        {label:"flirting", value: 0},
        {label:"folk_lore", value: 0},
        {label:"gaming", value: 0},
        {label:"heraldry", value: 0},
        {label:"hunting", value: 0},
        {label:"industry", value: 0},
        {label:"intrigue", value: 0},
        {label:"orate", value: 0},
        {label:"play ()", value: 0},
        {label:"read ()", value: 0},
        {label:"recognise", value: 0},
        {label:"religion ()", value: 0},
        {label:"romance", value: 0},
        {label:"singing", value: 0},
        {label:"stewardship", value: 0},
        {label:"swimming", value: 0},
        {label:"tourney", value: 0}
    ]

const combatSkills=
    {
        general:
            [
                {label:"battle", value: 0},
                {label:"horsemanship", value: 0}
            ],
        weapons:
            [
                {label:"sword", value: 0},
                {label:"lance", value: 0},
                {label:"spear", value: 0},
                {label:"dagger", value: 0}
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