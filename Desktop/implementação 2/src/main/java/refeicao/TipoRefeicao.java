package refeicao;

public enum TipoRefeicao {
    FAST("fast", "Fast Food"),
    HEALTHY("healthy", "Alimentação Saudável");

    private final String codigo;
    private final String nome;

    TipoRefeicao(String codigo, String nome) {
        this.codigo = codigo;
        this.nome = nome;
    }

    public String getCodigo() {
        return codigo;
    }

    public String getNome() {
        return nome;
    }

    public static TipoRefeicao from(String valor) {
        if (valor == null || valor.isBlank()) {
            throw new IllegalArgumentException("Tipo de refeição não informado.");
        }

        for (TipoRefeicao tipo : values()) {
            if (tipo.codigo.equalsIgnoreCase(valor.trim())) {
                return tipo;
            }
        }

        throw new IllegalArgumentException(
                "Tipo inválido: '" + valor + "'. Use: fast ou healthy."
        );
    }
}
