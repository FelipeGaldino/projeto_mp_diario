package refeicao.factory;

import refeicao.TipoRefeicao;
import refeicao.products.Drink;
import refeicao.products.Food;
import refeicao.products.fastfood.Burger;
import refeicao.products.fastfood.Soda;

public class FastFoodFactory implements FoodFactory {
    @Override
    public TipoRefeicao getTipoRefeicao() {
        return TipoRefeicao.FAST;
    }

    @Override
    public Food createFood() {
        return new Burger();
    }

    @Override
    public Drink createDrink() {
        return new Soda();
    }
}
