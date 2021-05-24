package myapp.database;

public class User {
    /** login. */
    private String login;
    /** password in md5. */
    private String password;
    /** score. */
    private int score = 0;
    /** time in sec. */
    private int timeInSec = 0;
    /** time in min. */
    private int timeInMin = 0;
    /** strikes. */
    private int strikes = 0;
    /** number. */
    private int number = 0;
    /**  id. */
    private int id;

    /** @param a login */
    public void setLogin(final String a) {
        login = a;
    }

    /** @param a number */
    public void setNumber(final int a) {
        number = a;
    }

    /** @param a id */
    public void setId(final int a) {
        id = a;
    }

    /** @param a password */
    public void setPassword(final String a) {
        password = a;
    }

    /** @param a time */
    public void setTimeInSec(final int a) {
        timeInSec = a;
    }
    /** @param a time */
    public void setTimeInMin(final int a) {
        timeInMin = a;
    }
    /** @param a strikes */
    public void setStrikes(final int a) {
        strikes = a;
    }
    /** @return returned */
    public String getPassword() {
        return password;
    }
    /** @return returned */
    public String getLogin() {
        return login;
    }
    /** @param scr score */
    public void setScore(final int scr) {
        score = scr;
    }
    /** @return returned */
    public int getScore() {
        return score;
    }
    /** @return returned */
    public int getTimeInSec() {
        return timeInSec;
    }
    /** @return returned */
    public String getTimeInSecStr() {
        String strTime = "";
        final int magicTen = 10;
        if (timeInSec < magicTen) {
            strTime = "0" + timeInSec;
            return strTime;
        } else {
            strTime = "" + timeInSec;
            return strTime;
        }
    }
    /** @return returned */
    public int getTimeInMin() {
        return timeInMin;
    }
    /** @return returned */
    public int getStrikes() {
        return strikes;
    }
    /** @return returned */
    public int getNumber() {
        return number;
    }
    /** @return returned */
    public int getId() {
        return id;
    }
}
