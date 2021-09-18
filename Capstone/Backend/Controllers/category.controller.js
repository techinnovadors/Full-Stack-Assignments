const slugify = require('slugify')

const categoryModel = require('../models/category.model');


const addNewCategory = (req, res) => {

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
            return res.status(201).json({
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


const getCategory = async (req, res) => {

    // categoryModel.find({}).exec((error, category) => {
    //     if (error) {
    //         console.log(error);
    //         return res.status(500).json({
    //             success: false,
    //             message: "DB Error occurred. Contact your administrator",
    //             error: error
    //         });
    //     }

    //     if (category) {
    //         console.log("----------------------");
    //         console.log(category);
    //         const categoryTree = getCategoryTree(category);
    //         console.log(categoryTree);
    //         return res.status(200).json({
    //             categoryTree
    //         })
    //     }
    // });


    try {
        const category = await categoryModel.find({});

        return res.json({
            category
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "DB Error occurred. Contact your administrator",
            error: error
        });
    }
}


///Prakhar's Logic
function createCategories(allCategories, id = null) {



    var categories = allCategories.filter(c => c.parentId == id);

    var arr = [];
    for (let i = 0; i < categories.length; i++) {
        const element = categories[i];
        var t = createCategories(allCategories, element._id);
        arr.push(t);
        return {
            category: element,
            subCategory: arr
        }
    }
}
module.exports = {
    addNewCategory,
    getCategory
}