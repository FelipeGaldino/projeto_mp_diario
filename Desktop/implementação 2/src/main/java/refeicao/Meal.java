package refeicao;

import refeicao.factory.FoodFactory;
import refeicao.products.Drink;
import refeicao.products.Food;

public class Meal {
    private final TipoRefeicao tipoRefeicao;
    private final Food food;
    private final Drink drink;

    public Meal(FoodFactory factory) {
        tipoRefeicao = factory.getTipoRefeicao();
        food = factory.createFood();
        drink = factory.createDrink();
    }

    public void serveMeal() {
        System.out.println("Refeição: " + tipoRefeicao.getNome());
        System.out.println(food.serve());
        System.out.println(drink.serve());
    }
}
