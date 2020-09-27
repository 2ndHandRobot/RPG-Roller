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
        traits:
            {
                trait1:"chaste",
                trait2:"lustful"
            },
        value: 10,
        paragon: 0
    },
    {
        traits:
            {
                trait1:"energetic",
                trait2:"lazy"
            },
        value: 10,
        paragon: 0
    },
    {
        traits:
            {
                trait1:"forgiving",
                trait2:"vengeful"
            },
        value: 10,
        paragon: 0
    },
    {
        traits:
            {
                trait1:"generous",
                trait2:"selfish"
            },
        value: 10,
        paragon: 0
    },
    {
        traits:
            {
                trait1:"honest",
                trait2:"deceitful"
            },
        value: 10,
        paragon: 0
    },
    {
        traits:
            {
                trait1:"just",
                trait2:"arbitrary"
            },
        value: 10,
        paragon: 0
    },
    {
        traits:
            {
                trait1:"merciful",
                trait2:"cruel"
            },
        value: 10,
        paragon: 0
    },
    {
        traits:
            {
                trait1:"modest",
                trait2:"proud"
            },
        value: 10,
        paragon: 0
    },
    {
        traits:
            {
                trait1:"pious",
                trait2:"worldly"
            },
        value: 10,
        paragon: 0
    },
    {
        traits:
            {
                trait1:"prudent",
                trait2:"reckless"
            },
        value: 10,
        paragon: 0
    },
    {
        traits:
            {
                trait1:"spiritual",
                trait2:"worldly"
            },
        value: 10,
        paragon: 0
    },
    {
        traits:
            {
                trait1:"temperate",
                trait2:"indulgent"
            },
        value: 10,
        paragon: 0
    },
    {
        traits:
            {
                trait1:"trusting",
                trait2:"suspiscious"
            },
        value: 10,
        paragon: 0
    },
    {
        traits:
            {
                trait1:"valorous",
                trait2:"cowardly"
            },
        value: 10,
        paragon: 0
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
    distinctive_features:[],
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