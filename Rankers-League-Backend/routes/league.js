import express from "express"
import { correctAns, topPlayers } from "../controllers/league.js";
import { isAuthenticated } from "../Middlewares/auth.js";

const router = express.Router()

//route - //route - /api/v1/league

//league and correct answers updation api
router.put('/correctAns',isAuthenticated,correctAns)

//top 10 players api
router.get('/top',topPlayers)

export default router;