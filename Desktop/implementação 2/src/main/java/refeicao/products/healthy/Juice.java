package refeicao.products.healthy;

import refeicao.products.Drink;

public class Juice implements Drink {
    @Override
    public String serve() {
        return "Servindo suco natural \uD83E\uDDC3";
    }
}
