const express = require("express");
const router = express.Router({mergeParams: true});
const wrapAsync = require("../utils/wrapAsync.js");


const Review = require("../Models/review.js");

const {isLoggedIn, validateReview, isreviewAuthor} = require("../middleware.js");

const reviewController = require("../controllers/reviews.js");


//Reviews 
//Post Review route
router.post("/",isLoggedIn, validateReview, wrapAsync(reviewController.newReview));

//Delete Review Route
router.delete("/:reviewId", isLoggedIn,isreviewAuthor, wrapAsync(reviewController.destroyReview));

module.exports = router;