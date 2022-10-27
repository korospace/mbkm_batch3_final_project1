const authentication = require("../middlewares/authentication");
const authorization = require("../middlewares/authorization");
const { body,query } = require('express-validator');
const express = require("express");
const router = express.Router();

const ReflectionsController = require("../controllers/reflections");
const UsersController = require("../controllers/users");

router.get('/', (req,res) => {
    res.status(200).json({message:"final project 1 tim 3"})
});

// User - Register
router.post(
    '/api/v1/users/register',
    body('email')
        .notEmpty().withMessage("email is required")
        .isEmail().withMessage("email is not valid")
        .custom(async function (value) {
            let isExist = await UsersController.findUserByEmail(value);

            if (isExist) {
                return Promise.reject('email already in use');
            }
        }),
    body('password')
        .notEmpty().withMessage("password is required"),
    UsersController.userRegister
);

// User - Login
router.post(
    '/api/v1/users/login',
    body('email')
        .notEmpty().withMessage("email is required"),
    body('password')
        .notEmpty().withMessage("password is required"),
    UsersController.userLogin
);

router.use(authentication);

// Reflections - Get All 
router.get('/api/v1/reflections', ReflectionsController.getReflections);

// Reflections - Create 
router.post(
    '/api/v1/reflections',
    body('success')
        .notEmpty().withMessage("success is required"),
    body('low_point')
        .notEmpty().withMessage("low_point is required"),
    body('take_away')
        .notEmpty().withMessage("take_away is required"),
     ReflectionsController.createReflections
);

router.use('/api/v1/reflections/:id',authorization);

// Reflections - Update 
router.put(
    '/api/v1/reflections/:id',
    body('success')
        .notEmpty().withMessage("success is required"),
    body('low_point')
        .notEmpty().withMessage("low_point is required"),
    body('take_away')
        .notEmpty().withMessage("take_away is required"),
     ReflectionsController.updateReflections
);

// Reflections - Delete
router.delete('/api/v1/reflections/:id',ReflectionsController.deleteReflections);

module.exports = router;