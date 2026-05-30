package refeicao.factory;

import refeicao.TipoRefeicao;

public final class FoodFactoryProvider {

    private FoodFactoryProvider() {
    }

    public static FoodFactory obterFabrica(TipoRefeicao tipo) {
        return switch (tipo) {
            case FAST -> new FastFoodFactory();
            case HEALTHY -> new HealthyFoodFactory();
        };
    }
}
