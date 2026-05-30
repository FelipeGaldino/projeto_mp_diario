package refeicao.factory;

import refeicao.TipoRefeicao;
import refeicao.products.Drink;
import refeicao.products.Food;

public interface FoodFactory {
    TipoRefeicao getTipoRefeicao();

    Food createFood();

    Drink createDrink();
}
