package myapp.calcs;

import myapp.database.Driver;
import myapp.database.User;

import java.util.ArrayList;
import java.util.List;
import java.math.BigInteger;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;

final public class DataGrinder {
    /** constructor. */
    private DataGrinder() {

    }

    /**
     * @param a checked str
     * @return boolean
     */
    public static boolean isEmptyStr(final String a) {
        String b = "";
        return a.equals(b);
    }

    /**
     *
     * @param login login
     * @param password password
     * @param mysqlpass password to mysql account
     * @return boolean
     */
    public static boolean userIsInBase(
            final String login, final String password, final String mysqlpass) {
        List<User> currentUsers = Driver.getUsers(mysqlpass);
        for (int i = 0; i < currentUsers.size(); i++) {

            if (currentUsers.get(i).getLogin().equals(login)
                    && passwordsAreSameMD5(
                            currentUsers.get(i).getPassword(), password)) {
                return true;
            }
        }
        return false;
    }

    /**
     * @param login login
     * @param password password
     * @param mysqlpass password to mysql account
     * @return boolean
     */
    public static boolean newUserDataProper(
            final String login, final String password, final String mysqlpass) {
        final int magic5 = 5;
        if (isEmptyStr(login) || isEmptyStr(password)
                || !loginIsUnique(login, mysqlpass)
                || dataAreToLong(login, password)
                || (password.length() < magic5)) {
            return false;
        }
        return true;
    }

    /**
     * @param login login
     * @param mysqlpass password to mysql
     * @return boolean
     */
    public static boolean loginIsUnique(
            final String login, final String mysqlpass) {
        List<User> currentUsers = Driver.getUsers(mysqlpass);
        for (int i = 0; i < currentUsers.size(); i++) {
            if (currentUsers.get(i).getLogin().equals(login)) {
                return false;
            }
        }
        return true;
    }

    /**
     * @param login login
     * @param password password
     * @return boolean
     */
    public static boolean dataAreToLong(
            final String login, final String password) {
        final int magic32 = 32;
        if ((login.length() > magic32) || (password.length() > magic32)) {
            return true;
        }
        return false;
    }

    /**
     * @param userList list of users
     * @return sorted list
     */
    public static List<User> sortUserList(final List<User> userList) {
        int arrays = userList.size();
        List<User> uT = userList;
        List<User> sortedTable = new ArrayList<User>();
        if (uT.size() == 0) {
            sortedTable = uT;
        } else {
            for (int i = 0; i < arrays; i++) {
                User term = uT.get(0);

                int arrays2 = uT.size();
                int elementToDel = 0;

                for (int j = 0; j < arrays2; j++) {
                    if (term.getScore() < uT.get(j).getScore()) {
                        term = uT.get(j);
                        elementToDel = j;
                    }
                }
                sortedTable.add(term);
                List<User> newUT = new ArrayList<User>();
                for (int k = 0; k < uT.size(); k++) {
                    if (k != elementToDel) {
                        newUT.add(uT.get(k));
                    }
                }
                uT = newUT;

            }
        }
        for (int i = 0; i < sortedTable.size(); i++) {
            sortedTable.get(i).setNumber(i + 1);
        }

        return sortedTable;
    }

    /**
     * @param input password to convert
     * @return converted password
     */
    public static String getMd5(final String input) {
        try {
            MessageDigest md = MessageDigest.getInstance("MD5");
            byte[] messageDigest = md.digest(input.getBytes());
            BigInteger no = new BigInteger(1, messageDigest);
            final int magic16 = 16;
            final int magic32 = 32;
            String hashtext = no.toString(magic16);
            while (hashtext.length() < magic32) {
                hashtext = "0" + hashtext;
            }
            return hashtext;
        } catch (NoSuchAlgorithmException e) {
            throw new RuntimeException(e);
        }
    }

    /**
     * @param afterMD5 hasło skonwertowane na md5
     * @param passwordGet hasło nie skonwertowane na md5
     * @return boolean
     */
    public static Boolean passwordsAreSameMD5(
            final String afterMD5, final String passwordGet) {
        String hashed1 = getMd5(passwordGet);
        if (hashed1.equals(afterMD5)) {
            return true;
        }
        return false;
    }
}
