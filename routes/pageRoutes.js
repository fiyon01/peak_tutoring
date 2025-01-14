const express = require("express")
const pageController = require("../controllers/pageController.js")

const router = express.Router();

router.get("/",pageController.renderHome)
router.get("/about",pageController.renderAbout)
router.get("/contact",pageController.renderContact)
router.get("/materials",pageController.renderMaterials)
router.get("/quizes",pageController.renderQuizes)
router.get("/checkout",pageController.renderCheckout)

module.exports = router