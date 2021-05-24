package myapp.aplication;

final class App {

    /** constructor. */
    private App() {
    }
    /**
     *
     * @param args main func
     */
    public static void main(final String[] args) {
        final String passwordMysql;
        int sum = 0;
        for (int i = 0; i < args.length; i++) {
            sum += 1;
        }
        if (sum != 0) {
            passwordMysql = args[0];
        } else {
            passwordMysql = "student";
        }
        Configurator.configurate(passwordMysql);
    }
}
