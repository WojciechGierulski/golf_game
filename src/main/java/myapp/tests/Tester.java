
package myapp.tests;

import myapp.calcs.DataGrinder;
import myapp.database.Driver;
import myapp.database.User;
import org.junit.Test;
import java.util.List;
import static org.junit.Assert.assertEquals;

public class Tester {

    /**
     * test1.
     */
    @Test
    public void testDeletingUser() {
        Driver.addUser("test_login", "test_password", "student");
        Driver.deleteUser("test_login");
        boolean result = DataGrinder.userIsInBase("test_login",
                "test_password", "student");
        assertEquals(false, result);
    }

    /**
     * test2.
     */
    @Test
    public void testUserInBaseFunc() {
        Driver.addUser("test_login", "test_password", "student");
        boolean result = DataGrinder.userIsInBase("test_login",
                "test_password", "student");

        Driver.deleteUser("test_login");

        assertEquals(true, result);
    }

    /**
     * test3.
     */
    @Test
    public void testAddingUser() {
        Driver.addUser("test_login", "test_password", "student");
        boolean result = false;
        List<User> usersList = Driver.getUsers("student");
        for (int i = 0; i < usersList.size(); i++) {
            if (usersList.get(i).getLogin().equals("test_login")) {
                result = true;
            }
        }

        Driver.deleteUser("test_login");

        assertEquals(true, result);

    }
    /**
     * test4.
     */
    @Test
    public void testPasswordsAreTheSameTrue() {
        String pass1 = "jeden";
        String pass2 = "jeden";
        String converted1ToMD5 = DataGrinder.getMd5(pass1);
        boolean result = DataGrinder.passwordsAreSameMD5(
                converted1ToMD5, pass2);
        assertEquals(true, result);
    }
    /**
     * test5.
     */
    @Test
    public void testPasswordsAreTheSameFalse() {
        String pass1 = "jeden";
        String pass2 = "dwa";
        String converted1ToMD5 = DataGrinder.getMd5(pass1);
        boolean result = DataGrinder.passwordsAreSameMD5(
                converted1ToMD5, pass2);
        assertEquals(false, result);
    }
    /**
     * test6.
     */
    @Test
    public void testIsEmptyStr() {
        String str = "";
        boolean result = DataGrinder.isEmptyStr(str);
        assertEquals(true, result);
    }
    /**
     * test7.
     */
    @Test
    public void testSetScore() {
        final int magic1 = 10;
        final int magic2 = 20;
        final int magic3 = 30;
        Driver.addUser("test_login", "test_password", "student");
        Driver.changeUsersScore("student", "test_login",
                magic1, magic2, magic2, magic3);
        List<User> usersList = Driver.getUsers("student");
        int result = 0;
        for (int i = 0; i < usersList.size(); i++) {
            if (usersList.get(i).getLogin().equals("test_login")) {
                result = usersList.get(i).getScore();
            }
        }
        Driver.deleteUser("test_login");
        assertEquals(magic1, result);

    }
    /**
     * test8.
     */
    @Test
    public void testSetStrikes() {
        final int magic1 = 10;
        final int magic2 = 20;
        final int magic3 = 30;
        Driver.addUser("test_login", "test_password", "student");
        Driver.changeUsersScore("student", "test_login",
                magic1, magic2, magic2, magic3);
        List<User> usersList = Driver.getUsers("student");
        int result = 0;
        for (int i = 0; i < usersList.size(); i++) {
            if (usersList.get(i).getLogin().equals("test_login")) {
                result = usersList.get(i).getStrikes();
            }
        }
        Driver.deleteUser("test_login");
        assertEquals(magic3, result);

    }
    /**
     * test9.
     */
    @Test
    public void testDataAreToLongFalse() {
        boolean result = DataGrinder.dataAreToLong("12345678", "12345678");
        assertEquals(false, result);
    }
    /**
     * test10.
     */
    @Test
    public void testFataAreToLongTrue() {
        boolean result = DataGrinder.dataAreToLong(
                "01234567890123456789012345678912345",
                "01234567890123456789012345678912345");
        assertEquals(true, result);
    }
}
