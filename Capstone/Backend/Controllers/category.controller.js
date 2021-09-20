const slugify = require('slugify')
const {
    nanoid
} = require('nanoid')

const categoryModel = require('../models/category.model');


const addNewCategory = (req, res) => {

    let slug = slugify(req.body.name, {
        lower: true
    }) + '-' + nanoid(8);

    const categoryInput = {
        name: req.body.name,
        slug: slug
    };

    categoryInput.createdBy = req.user.id;
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

    try {
        const category = await categoryModel.find({}, '_id name slug parentId type');
        const resp = generateCategoryData(category);
        return res.json({
            "data": resp
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: `DB Error occurred. 
            Contact your administrator`,
            error: error
        });
    }
}


///Prakhar's Logic

function createCategories(allCategories, id = null) {



    console.log("----", id);
    var categories = allCategories.filter(c => c.parentId == id);
    console.log(categories);
    let arr = [];
    for (let i = 0; i < categories.length; i++) {
        const element = categories[i];
        console.log(i, element.name);
        var t = createCategories(allCategories, element._id);
        arr.push(t);
        CategoryJSON.push({
            category: element,
            subCategory: arr
        })
    }
    return CategoryJSON;
}


///vj

const generateCategoryData = (allCategories, parentId = null) => {
    const CategoryJSON = [];
    let _parentId;
    if (parentId != null) _parentId = parentId;
    let categories = allCategories.filter((cat) => cat.parentId == _parentId);

    for (let i = 0; i < categories.length; i++) {
        const element = categories[i];
        let categoryObj = {
            element,
            "subCategory": generateCategoryData(allCategories, element._id)
        }
        CategoryJSON.push(categoryObj);
    }
    return CategoryJSON;
}


module.exports = {
    addNewCategory,
    getCategory
}