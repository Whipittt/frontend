import { RecipeCardLg } from "@/components/recipeCard";
import HomeSectionLayout from "./homeSectionLayout";

export default function RecommendationSection() {
  return (
    <HomeSectionLayout header="Discover Local Favorites">
      {Array.from({ length: 8 }).map((_, index) => (
        <RecipeCardLg
          recipe={{
            id: "ca34bde5-1276-46db-868e-1f2e07534cf0",
            title: "Jollof Rice",
            description:
              "A vibrant West African rice dish cooked in a rich tomato-pepper sauce with warm spices. Smoky, slightly spicy, and perfect for parties.",
            instructions:
              "1. Rinse 2 cups long-grain parboiled rice under running water until it runs clear; drain and set aside. 2. Blend 4 ripe tomatoes, 2 red bell peppers, 1 large onion, and 1–2 Scotch bonnet peppers into a smooth puree. 3. Heat 1/3 cup vegetable oil in a heavy pot over medium heat. Add 2 tbsp tomato paste and fry for 2–3 minutes, stirring, until it darkens slightly. 4. Pour in the blended pepper mix; cook, stirring often, until reduced and the oil separates on the surface (10–15 minutes). 5. Season with 1 tsp curry powder, 1 tsp dried thyme, 1–2 crumbled seasoning cubes, 1 bay leaf (optional), and salt to taste; stir well. 6. Add 2 cups chicken or beef stock; bring to a boil and taste for salt. 7. Stir in the rinsed rice so it’s evenly coated. Reduce heat to low. Cover the top of the pot with foil or parchment, then the lid (to trap steam). 8. Steam gently for 25–35 minutes, stirring once halfway. If the rice looks dry before it’s cooked, sprinkle in a little hot water/stock and continue steaming. 9. When grains are tender and separate, turn off heat and fluff. For party-style smoky flavor, allow a light bottom crust to form without burning. 10. Serve hot with fried plantains, grilled chicken, or coleslaw.",
            category: {
              id: "10bce067-4f93-44d1-8fc8-c85fe0968e3e",
              name: "Vegan",
            },
            categories: [
              {
                id: "10bce067-4f93-44d1-8fc8-c85fe0968e3e",
                name: "Vegan",
              },
            ],
            ingredients: [
              {
                id: "9acf6aa0-168d-469d-97a6-d16a780880bb",
                name: "Bay Leaf",
              },
              {
                id: "fe5672d9-5c57-4ed3-8bc7-e07887bceda8",
                name: "Chicken Stock",
              },
              {
                id: "fa857a3d-d23a-4212-a434-0689c3e1f9a4",
                name: "Curry Powder",
              },
              {
                id: "c5111c92-d10e-49d5-8afe-05d964112f3a",
                name: "Onions",
              },
              {
                id: "a11510e5-d91e-4ed1-9b36-bafaa1f33dfc",
                name: "Red Bell Peppers",
              },
              {
                id: "208b3cfe-f94b-40d1-a266-7030ff6bfe88",
                name: "Red Peppers",
              },
              {
                id: "f28fcab9-f24e-4b48-a504-34ec2e39b3e6",
                name: "Rice",
              },
              {
                id: "8eacf655-46d8-4fc3-8338-2877535e7bd2",
                name: "Scotch Bonnet",
              },
              {
                id: "3ef9f2dd-2ac9-441b-b93b-f36c6f3151cc",
                name: "Seasoning Cubes",
              },
              {
                id: "1d47764e-8018-4de9-a600-4199f44dc470",
                name: "Thyme",
              },
              {
                id: "b9a02847-0303-42db-91ac-7a26939f1524",
                name: "Tomato Paste",
              },
              {
                id: "f7701023-61b7-4d92-a052-db299d635bac",
                name: "Tomatoes",
              },
              {
                id: "8150cc85-859d-469b-97a5-2dbc437b6d58",
                name: "Vegetable Oil",
              },
            ],
            types: ["Breakfast", "Lunch", "Dinner"],
            cuisines: ["Igbo", "Hausa", "Yoruba"],
            time_minutes: 75,
            display_image:
              "https://zenaskitchen.com/wp-content/uploads/2025/02/one-pot-jollof-rice-and-chicken.jpg",
            instruction_json: null,
            rating: 5,
            favourited: false,
            favourites_count: 0,
          }}
        />
      ))}
    </HomeSectionLayout>
  );
}
