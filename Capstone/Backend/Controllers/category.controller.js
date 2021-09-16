const categoryModel = require('../models/category.model');

const slugify = require('slugify')

addNewCategory = (req, res) => { 

    const categoryInput = {
        name: req.body.name,
        slug: slugify(req.body.name, {
            lower: true
        })
    };

    console.log(categoryInput);

    if (req.body.parentId) {
        categoryInput.parentId = req.body.parentId;
    }

    const _category = new categoryModel(categoryInput);
    _category.save((error, category) => {

        if (error) {
            console.log(error);
            return res.status(500).json({
                success: false,
                message: "DB Error occurred. Contact your administrator"
            });
        }

        if (category) {
            return res.json({
                success: true,
                message: "Category Saved successfully",
                data: category
            })
        }
    })
}


/**
 * easy
 * Get the list
 *   cate [{ed }, {md}, {samsun}, .....]
 * 
 * 
 * intermediate
 * Get the category tree...
 * 
 *   Electronic Devices 
 *      - Mobile Device
 *          - Samsung
 *          - iPhone
 *          - One Plus
 *      - TVs
 *          - Sony
 *          - TCL
 *          - blah blah blah
 *  [{
 *  name : ed ...
 *  subcategorie : {
 *          {name : mobile device.... , 
 *           subcategorie :{
 *                  {name : samsung, ...} , 
 *                  {name : one plus}
 *              }
 *          },
 *           {name : tvs.... , 
 *           subcategorie :{
 *                  {name : sony, ...} , 
 *                  {name : tcl}
 *              }
 *          } 
 *     }
 * },
 * {
 *      name : Fashions, 
 *      
 * }]
 * 
*/


getCategory = (req, res) => {}


module.exports = {
    addNewCategory,
    getCategory
}