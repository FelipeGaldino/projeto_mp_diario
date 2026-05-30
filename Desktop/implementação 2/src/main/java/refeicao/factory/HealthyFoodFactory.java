package refeicao.factory;

import refeicao.TipoRefeicao;
import refeicao.products.Drink;
import refeicao.products.Food;
import refeicao.products.healthy.Juice;
import refeicao.products.healthy.Salad;

public class HealthyFoodFactory implements FoodFactory {
    @Override
    public TipoRefeicao getTipoRefeicao() {
        return TipoRefeicao.HEALTHY;
    }

    @Override
    public Food createFood() {
        return new Salad();
    }

    @Override
    public Drink createDrink() {
        return new Juice();
    }
}
