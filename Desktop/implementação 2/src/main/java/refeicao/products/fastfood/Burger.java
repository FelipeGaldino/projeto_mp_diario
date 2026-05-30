package refeicao.products.fastfood;

import refeicao.products.Food;

public class Burger implements Food {
    @Override
    public String serve() {
        return "Servindo hamb\u00FArguer \uD83C\uDF54";
    }
}
