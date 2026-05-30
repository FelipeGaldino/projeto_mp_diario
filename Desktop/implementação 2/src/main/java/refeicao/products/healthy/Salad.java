package refeicao.products.healthy;

import refeicao.products.Food;

public class Salad implements Food {
    @Override
    public String serve() {
        return "Servindo salada \uD83E\uDD57";
    }
}
