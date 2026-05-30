package refeicao;

import refeicao.factory.FoodFactory;
import refeicao.factory.FoodFactoryProvider;

public class Main {
    public static void main(String[] args) {
        try {
            TipoRefeicao tipo = resolverTipo(args);
            FoodFactory factory = FoodFactoryProvider.obterFabrica(tipo);

            Meal meal = new Meal(factory);
            meal.serveMeal();
        } catch (IllegalArgumentException e) {
            System.err.println("Erro: " + e.getMessage());
            System.err.println("Uso: java refeicao.Main [fast|healthy]");
            System.exit(1);
        }
    }

    private static TipoRefeicao resolverTipo(String[] args) {
        if (args.length > 0) {
            return TipoRefeicao.from(args[0]);
        }

        return TipoRefeicao.FAST;
    }
}
