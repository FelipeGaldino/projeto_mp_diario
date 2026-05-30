package refeicao.products.fastfood;

import refeicao.products.Drink;

public class Soda implements Drink {
    @Override
    public String serve() {
        return "Servindo refrigerante \uD83E\uDD64";
    }
}
