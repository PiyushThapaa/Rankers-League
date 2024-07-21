import { User } from "../models/user.js";

export const correctAns = async (req,res,next) => {
    try {
        const {correct,subject,quizNum} = req.body;
        //getting user data
        const user = await User.findById(req.user)

        //updating user data conditionally
        user.correct+=correct
        await user.save()
        user.progressNum += correct
        if (user.progressNum<user.progressMaxNum) {
             await user.save()
        } else{
            if (user.progressMaxNum===5) {
                user.progressNum = user.correct - 5
                user.progressMaxNum = 10
                user.league = "bronze"
                await user.save()
            } else if(user.progressMaxNum===10){
                user.progressNum = user.correct - 15
                user.progressMaxNum = 20
                user.league = "gold"
                await user.save()
            }else if(user.progressMaxNum===20){
                user.progressNum = user.correct - 35
                user.progressMaxNum = 40
                user.league = "crystal"
                await user.save()
        } else {
            user.league = "champion"
            await user.save()
        }
    }
    if (subject=="chemistry"){
        if (quizNum==1) {
            user.chemQuiz1 = true
        }
        else if(quizNum==2){
            user.chemQuiz2 = true
        }
        else if(quizNum==3){
            user.chemQuiz3 = true
        }
        else if(quizNum==4){
            user.chemQuiz4 = true
        }
        else if(quizNum==5){
            user.chemQuiz5 = true
        }
    } else if (subject=="physics"){
        if (quizNum==1) {
            user.phyQuiz1 = true
        }
        else if(quizNum==2){
            user.phyQuiz2 = true
        }
        else if(quizNum==3){
            user.phyQuiz3 = true
        }
        else if(quizNum==4){
            user.phyQuiz4 = true
        }
        else if(quizNum==5){
            user.phyQuiz5 = true
        }
    }  else if (subject=="maths"){
        if (quizNum==1) {
            user.mathQuiz1 = true
        }
        else if(quizNum==2){
            user.mathQuiz2 = true
        }
        else if(quizNum==3){
            user.mathQuiz3 = true
        }
        else if(quizNum==4){
            user.mathQuiz4 = true
        }
        else if(quizNum==5){
            user.mathQuiz5 = true
        }
        await user.save()
    } 
    if(user.mathQuiz1==true&&user.mathQuiz2==true&&user.mathQuiz3==true&&user.mathQuiz4==true&&user.mathQuiz5==true){
        user.MathsBunch = true
    } else if(user.phyQuiz1==true&&user.phyQuiz2==true&&user.phyQuiz3==true&&user.phyQuiz4==true&&user.phyQuiz5==true){
        user.PhysicsBunch = true
    } else if(user.chemQuiz1==true&&user.chemQuiz2==true&&user.chemQuiz3==true&&user.chemQuiz4==true&&user.chemQuiz5==true){
        user.ChemistryBunch = true
    }
    await user.save()
        res.status(200).json({
            success:true,
            message: "Profile Updated"
        })
    } catch (error) {
        next(error)
    }
    
}

export const topPlayers = async (req,res,next) => {
    try {
        const topPlayers = await User.find({}).sort({correct:-1,createdAt:-1}).limit(10)
        res.status(200).json({
            success:true,
            topPlayers
        })
    } catch (error) {
        next(error)
    }
}