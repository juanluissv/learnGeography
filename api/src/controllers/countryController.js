const { Country, Activity } = require('../db.js');
const axios = require('axios');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;


// GET -  API/COUNTRIES
const getCountries = async(req, res) => {

    if (req.query.search) {        
        const countries = await Country.findAll({
            where: {
                name: {
                    [Op.iLike]: `%${req.query.search}%`
                }
            }           
        })
        console.log(countries)
        if (countries.length == 0) {
            res.status(404).json({error: "Country Not Found... Try with a different Name"})
        } else {
            res.json(countries);
        }

    } else {
        const countries = await Country.findAll({
            include: Activity,
            order: [              
                ['name', 'ASC'],
            ]
        });
        if (!countries) {
            res.status(404).json({error: "Not Found"})
        }

        if (countries.length > 0 ) {
            res.json(countries);
        } else {
            const url = 'https://restcountries.eu/rest/v2/all'
            try{
                const { data } = await axios.get(url);
                for (let i = 0; i < data.length; i++) {
                let mycountry = {
                    id: data[i].alpha3Code,      
                    name: data[i].name,      
                    flag: data[i].flag || 'Not Found',      
                    continent: data[i].region || 'Not Found',      
                    capital: data[i].capital || 'Not Found',      
                    subregion: data[i].subregion || 'Not Found',      
                    area: data[i].area || 'Not Found',      
                    population: data[i].population || 0     
                }
                const countryCreated = await Country.create(mycountry)
                }
            } catch (error) {
                console.log(error);
                res.status(404).json(error)
            }
            const countries = await Country.findAll({});
            res.json(countries);
        }
    }
}


// GET -  API/COUNTRIES/ID
const getCountryById = async (req, res) => {
    const { id } = req.params;

    const country = await Country.findByPk(id, {
        include: Activity
      });
    
    if(!country) {
        return res.status(404).json({error: "Not Found"})
    }

    res.json(country);
}

// POST -  API/COUNTRIES/ACTIVITY
const postActivity = async (req, res) => {

   const { myCountries } = req.body;

    let myactivity = {
        name: req.body.name,
        difficulty: req.body.difficulty,
        duration: req.body.duration,
        season: req.body.season                  
    }
    const activityCreated = await Activity.create(myactivity)

    myCountries.forEach(async (name_id) => {
        const country = await Country.findOne({where:{id:name_id}}); 
        await country.addActivity(activityCreated)
    })
}

const getActivities = async(req, res) => {
    const activities = await Activity.findAll({});
//    console.log(activities)
    res.json(activities);

}








module.exports = {
     getCountries,
     getCountryById,
     postActivity,
     getActivities,
     
}
