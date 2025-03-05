async function populateDatabase(models) {
    try {
        // Populate Categories
        const categories = await models.Categories.bulkCreate([
            { name: "African" },
            { name: "American" },
            { name: "Appetizer" },
            { name: "Baked" },
            { name: "Beverage" },
            { name: "Bread" },
            { name: "Breakfast" },
            { name: "Caribbean" },
            { name: "Chinese" },
            { name: "Cold" },
            { name: "Creamy" },
            { name: "Crispy" },
            { name: "Crunchy" },
            { name: "Dairy-Free" },
            { name: "Desert" },
            { name: "Deep Fried" },
            { name: "Dinner" },
            { name: "Dry" },
            { name: "French" },
            { name: "Fried" },
            { name: "Gluten-Free" },
            { name: "Greek" },
            { name: "High Carb" },
            { name: "High Fiber" },
            { name: "High Protein" },
            { name: "Hot" },
            { name: "Indian" },
            { name: "Italian" },
            { name: "Japanese" },
            { name: "Keto" },
            { name: "Korean" },
            { name: "Low Carb" },
            { name: "Low Sugar" },
            { name: "Lunch" },
            { name: "Mediterranean" },
            { name: "Mexican" },
            { name: "Middle Eastern" },
            { name: "Salad" },
            { name: "Salty" },
            { name: "Sauce" },
            { name: "Soup" },
            { name: "Smoked" },
            { name: "Snack" },
            { name: "Spicy" },
            { name: "Sweet" },
            { name: "Thai" },
            { name: "Vegan" },
            { name: "Vegetarian" },
            { name: "Vietnamese" },
            { name: "Quick" }
        ]);

        // Populate Dietary Restrictions 
        await models.DietaryRestrictions.bulkCreate([
            { name: "Gluten-Free" },
            { name: "Vegan" },
            { name: "Vegetarian" },
            { name: "Pescetarian" },
            { name: "Dairy-Free" },
            { name: "Halal" },
            { name: "Kosher" },
            { name: "Raw Food" },
            { name: "Keto" },
            { name: "Paleo" },
            { name: "Low-Carb" }
        ]);

        // Populate Allergies
        await models.Allergies.bulkCreate([
            { name: "Eggs" },
            { name: "Dairy" },
            { name: "Wheat" },
            { name: "Tree Nuts" },
            { name: "Peanuts" },
            { name: "Soy" },
            { name: "Shellfish" },
            { name: "Sesame" },
            { name: "Fish" }
        ]);

        // Populate Questions
        const questions = await models.Questionnaire.bulkCreate([
            { question: "What temperature are looking to consume?" },
            { question: "Dry or Crispy" },
            { question: "Heavy or Light" },
            { question: "Spicy or Sweet" },
            { question: "What cuisine sounds most appealing?" },
            { question: "Sweet, salty or both?" },
            { question: "What time-of-day meal do you want?" },
            { question: "Fried or Baked?" },
            { question: "Quick cook time?" },
            { question: "Soup or Salad?" },
            { question: "Crunchy or Creamy?" },
            { question: "Want something high in Fiber or Protein?" }
        ]);

        // Populate QuestionnaireCategory 
        await models.QuestionnaireCategory.bulkCreate([
            { QuestionnaireId: questions[0].id, CategoryId: categories[9].id },
            { QuestionnaireId: questions[0].id, CategoryId: categories[25].id },
            { QuestionnaireId: questions[1].id, CategoryId: categories[16].id },
            { QuestionnaireId: questions[1].id, CategoryId: categories[11].id },
            { QuestionnaireId: questions[2].id, CategoryId: categories[24].id },
            { QuestionnaireId: questions[2].id, CategoryId: categories[42].id },
            { QuestionnaireId: questions[3].id, CategoryId: categories[43].id },
            { QuestionnaireId: questions[3].id, CategoryId: categories[44].id },
            { QuestionnaireId: questions[4].id, CategoryId: categories[35].id },
            { QuestionnaireId: questions[4].id, CategoryId: categories[45].id },
            { QuestionnaireId: questions[4].id, CategoryId: categories[27].id },
            { QuestionnaireId: questions[4].id, CategoryId: categories[8].id },
            { QuestionnaireId: questions[5].id, CategoryId: categories[44].id },
            { QuestionnaireId: questions[5].id, CategoryId: categories[38].id },
            { QuestionnaireId: questions[6].id, CategoryId: categories[6].id },
            { QuestionnaireId: questions[6].id, CategoryId: categories[16].id },
            { QuestionnaireId: questions[6].id, CategoryId: categories[33].id },
            { QuestionnaireId: questions[6].id, CategoryId: categories[14].id },
            { QuestionnaireId: questions[7].id, CategoryId: categories[19].id },
            { QuestionnaireId: questions[7].id, CategoryId: categories[3].id },
            { QuestionnaireId: questions[8].id, CategoryId: categories[49].id },
            { QuestionnaireId: questions[9].id, CategoryId: categories[37].id },
            { QuestionnaireId: questions[9].id, CategoryId: categories[40].id },
            { QuestionnaireId: questions[10].id, CategoryId: categories[10].id },
            { QuestionnaireId: questions[10].id, CategoryId: categories[12].id },
            { QuestionnaireId: questions[11].id, CategoryId: categories[22].id },
            { QuestionnaireId: questions[11].id, CategoryId: categories[23].id }
        ]);

        console.log('Database populated successfully');
    } catch (error) {
        console.error('Error populating the database:', error);
    }
}

module.exports = populateDatabase