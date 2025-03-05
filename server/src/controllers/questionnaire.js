const { models } = require('../database');

const questionnaireController = {
    getQuestionsById: async () => {
        const questions = []
        const ids = []
        
        // 4 random, non-repeating numbers 
        do {
            let num = Math.floor(Math.random() * 12)
            let check = ids.includes(num)
            if(!check)
                ids.push(num)
        } while(ids.length < 4)

        // Get corresponding questions & answers
        for(i=0; i<4; i++){
            questions[i] = await models.QuestionnaireCategory.find({ QuestionnaireId: ids[i] })
        }
    
        return questions
    }
}

module.exports = questionnaireController;