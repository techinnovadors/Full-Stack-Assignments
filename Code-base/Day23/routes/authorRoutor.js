const express = require('express');
const router = express.Router();


const authorController = require("../controllers/author.controller")

router.get('/', authorController.getAuthors)
router.get('/:author_id', authorController.getAuthorbyId)
router.get('/:author_id/getBooks', authorController.getBooksofAuthor);

router.post('/', authorController.addAuthor)

router.put('/updateName', authorController.updateAuthorName);

router.delete('/:author_id', authorController.deleteAuthorbyId)
router.delete('/', authorController.deleteAllAuthors)


module.exports = router;