package myapp.database;

import myapp.calcs.DataGrinder;

import java.sql.SQLException;
import java.sql.DriverManager;
import java.sql.Statement;
import java.sql.Connection;
import java.sql.ResultSet;
import java.util.ArrayList;
import java.util.List;
final public class Driver {

    /** constructor. */
    private Driver() {
    }

    /** */
    private static final String CREATE_TABLE_SQL_USERS =
            "CREATE TABLE IF NOT EXISTS demo.user ("
            + "id INT NOT NULL AUTO_INCREMENT,"
            + "login VARCHAR(32) NOT NULL,"
            + "password VARCHAR(32) NOT NULL,"
            + "PRIMARY KEY (ID))";

    /** */
    private static final String CREATE_TABLE_SQL_SCORES =
            "CREATE TABLE IF NOT EXISTS demo.scores ("
            + "id INT NOT NULL AUTO_INCREMENT,"
            + "score INTEGER,"
            + "time_in_sec INTEGER,"
            + "time_in_min INTEGER,"
            + "strikes INTEGER,"
            + "PRIMARY KEY (ID))";

    /** @param pass pass to mysql */
    public static void createBase(final String pass) {
        try {
            Connection con = DriverManager.getConnection(
                    "jdbc:mysql://localhost:3306/", "root", pass);
            Statement statement = con.createStatement();
            int myResult = statement.executeUpdate(
                    "CREATE DATABASE IF NOT EXISTS demo"); //should get 0
            con.close();
        } catch (SQLException e) {
            System.out.println("Database creation failed");
            e.printStackTrace();
        }
    }

    /**
     * @param login login
     * @param password password
     * @param pass password to mysql
     */
    public static void addUser(final String login,
                               final String password, final String pass) {
        try {

            Connection myConn = DriverManager.getConnection(
                    "jdbc:mysql://localhost:3306/demo", "root", pass);

            Statement myStmt = myConn.createStatement();
            myStmt.executeUpdate(CREATE_TABLE_SQL_USERS);
            myStmt.executeUpdate(CREATE_TABLE_SQL_SCORES);
            String sql1 = "insert into user " + " (login , password ) "
                    + String.format(" values ('%s' , '%s')",
                    login, DataGrinder.getMd5(password));
            myStmt.executeUpdate(sql1);
            String sql2 = "insert into scores "
                    + " (score , time_in_sec , time_in_min , strikes) "
                    + " values ('0' , '0' , '0' , '0')";
            myStmt.executeUpdate(sql2);
            ResultSet myRs = myStmt.executeQuery("select * from user");

        } catch (Exception exc) {
            exc.printStackTrace();
        }
    }

    /**
     * @param mysqlPass password to mysql
     * @return list of users
     */
    public static List<User> getUsers(final String mysqlPass) {
        List<User> userArrayList = new ArrayList<User>();
        try {
            Connection myConn = DriverManager.getConnection(
                    "jdbc:mysql://localhost:3306/demo", "root", mysqlPass);

            Statement myStmt = myConn.createStatement();

            myStmt.executeUpdate(CREATE_TABLE_SQL_SCORES);
            myStmt.executeUpdate(CREATE_TABLE_SQL_USERS);
            ResultSet myRs = myStmt.executeQuery("select * from user");

            List<User> usersList = new ArrayList<User>();

            while (myRs.next()) {
                User a = new User();
                a.setLogin(myRs.getString("login"));
                a.setPassword(myRs.getString("password"));
                a.setId(myRs.getInt("id"));
                usersList.add(a);
            }

            ResultSet myRs2 = myStmt.executeQuery("select * from scores");

            while (myRs2.next()) {
                int currentId = myRs2.getInt("id");
                for (int i = 0; i < usersList.size(); i++) {
                    if (usersList.get(i).getId() == currentId) {
                        usersList.get(i).setScore(
                                myRs2.getInt("score"));
                        usersList.get(i).setStrikes(
                                myRs2.getInt("strikes"));
                        usersList.get(i).setTimeInMin(
                                myRs2.getInt("time_in_min"));
                        usersList.get(i).setTimeInSec(
                                myRs2.getInt("time_in_sec"));
                    }
                }
            }

            userArrayList = usersList;
        } catch (Exception exc) {
            exc.printStackTrace();
        }
        return userArrayList;
    }

    /**
     * @param login users login
     * @param password users passwoer
     * @param newPassword users new password
     * @param mysqlpass password to mysql
     */
    public static void changeUsersPassword(
            final String login, final String password,
            final String newPassword, final String mysqlpass) {
        try {
            Connection myConn = DriverManager.getConnection(
                    "jdbc:mysql://localhost:3306/demo", "root", mysqlpass);

            Statement myStmt = myConn.createStatement();
            myStmt.executeUpdate(CREATE_TABLE_SQL_USERS);
            myStmt.executeUpdate(CREATE_TABLE_SQL_SCORES);
            String sql = "update user" + String.format(
                    "set password = '%s'", newPassword)
                    + String.format("where login='%s'", login);

            myStmt.executeUpdate(sql);

        } catch (Exception exc) {
            exc.printStackTrace();
        }
    }

    /**
     * @param login users login
     */
    public static void deleteUser(final String login) {
        try {
            Connection myConn = DriverManager.getConnection(
                    "jdbc:mysql://localhost:3306/demo", "root", "student");

            Statement myStmt = myConn.createStatement();
            myStmt.executeUpdate(CREATE_TABLE_SQL_USERS);
            myStmt.executeUpdate(CREATE_TABLE_SQL_SCORES);

            ResultSet myRs2 = myStmt.executeQuery("select * from user");
            int searchedId = -1;
            while (myRs2.next()) {
                String currentLogin = myRs2.getString("login");
                if (currentLogin.equals(login)) {
                    searchedId = myRs2.getInt("id");
                }
            }

            if (searchedId != -1) {
                String sql1 = String.format(
                        "delete from user where id='%s'", searchedId);
                myStmt.executeUpdate(sql1);
                String sql2 = String.format(
                        "delete from scores where id='%s'", searchedId);
                myStmt.executeUpdate(sql2);
            }
            ResultSet myRs = myStmt.executeQuery("select * from user");

        } catch (Exception exc) {
            exc.printStackTrace();
        }
    }

    /**
     * @param passmysqlpass password to mysql
     * @param login users login
     * @param newScore users score
     * @param timeInsec users time in sec
     * @param timeInmin users time in min
     * @param strikes users strikes
     */
    public static void changeUsersScore(
            final String passmysqlpass, final String login,
            final int newScore, final int timeInsec,
            final int timeInmin, final int strikes) {
        try {
            String score = newScore + "";
            Connection myConn = DriverManager.getConnection(
                    "jdbc:mysql://localhost:3306/demo",
                    "root", passmysqlpass);

            Statement myStmt = myConn.createStatement();
            myStmt.executeUpdate(CREATE_TABLE_SQL_USERS);
            myStmt.executeUpdate(CREATE_TABLE_SQL_SCORES);

            ResultSet myRs2 = myStmt.executeQuery("select * from user");
            int searchedId = -1;
            while (myRs2.next()) {
                String currentLogin = myRs2.getString("login");
                if (currentLogin.equals(login)) {
                    searchedId = myRs2.getInt("id");
                }
            }
            String sql = "update scores"
                    + String.format(" set score ='%s'", score)
                    + String.format(" where id='%s'", searchedId);
            myStmt.executeUpdate(sql);
            String sql2 = "update scores"
                    + String.format(" set strikes ='%s'", strikes)
                    + String.format(" where id='%s'", searchedId);
            myStmt.executeUpdate(sql2);
            String sql3 = "update scores"
                    + String.format(" set time_in_sec ='%s'", timeInsec)
                    + String.format(" where id='%s'", searchedId);
            myStmt.executeUpdate(sql3);
            String sql4 = "update scores"
                    + String.format(" set time_in_min ='%s'", timeInmin)
                    + String.format(" where id='%s'", searchedId);
            myStmt.executeUpdate(sql4);
        } catch (Exception exc) {
            exc.printStackTrace();
        }
    }

    /**
     * @param passmysql password to mysql
     */
    public static void clearBase(final String passmysql) {
        try {
            Connection myConn = DriverManager.getConnection(
                    "jdbc:mysql://localhost:3306/demo", "root", passmysql);

            Statement myStmt = myConn.createStatement();
            myStmt.executeUpdate(CREATE_TABLE_SQL_USERS);
            myStmt.executeUpdate(CREATE_TABLE_SQL_SCORES);
            myStmt.executeUpdate("TRUNCATE user");
            myStmt.executeUpdate("TRUNCATE scores");

        } catch (Exception exc) {
            exc.printStackTrace();
        }
    }
}
