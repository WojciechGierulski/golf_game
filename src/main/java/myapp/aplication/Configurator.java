package myapp.aplication;

import java.util.List;
import static spark.Spark.get;
import static spark.Spark.port;
import static spark.Spark.staticFiles;
import static spark.Spark.post;

import myapp.calcs.DataGrinder;
import myapp.calcs.ScoreCalc;
import myapp.database.Driver;
import myapp.database.User;
import spark.template.velocity.VelocityTemplateEngine;
import spark.ModelAndView;
import spark.Request;
import spark.Session;
import java.util.Map;
import java.util.HashMap;
import java.util.ArrayList;
import org.json.simple.JSONObject;

final class Configurator {

    /** constructor. */
    private Configurator() {

    }

    /**
     *
     * @param req request
     * @return session
     */
    private static Session getSession(final Request req) {
        Session session;
        if (req.session(false) == null) {
            session = req.session(true);
        } else {
            session = req.session(false);
        }
        return session;
    }

    /**
     *
     * @param message message string
     * @param req request
     */
    private static void flashMessage(final String message, final Request req) {
        Session session = getSession(req);
        ArrayList<String> messages = new ArrayList<String>();
        messages.add(message);
        if (session.attribute("flashed") == null) {
            session.attribute("flashed", messages);
        } else {
            ArrayList<String> oldMessages =
                    (ArrayList<String>) session.attribute("flashed");
            session.attribute("flashed", oldMessages.addAll(messages));
        }
    }
    /**
     *
     * @param req request
     * @return message from array list
     */
    private static ArrayList<String> getFlashedMessages(final Request req) {
        Session session = getSession(req);
        var messages = session.attribute("flashed");
        session.removeAttribute("flashed");
        ArrayList<String> messages1 = (ArrayList<String>) messages;
        return messages1;
    }


    /**
     *
     * @param path sciezka
     * @param req request
     * @param mysqlpass pass to mysql
     * @return template
     */
    private static String renderTemplate(
            final String path, final Request req, final String mysqlpass) {
        Map<String, Object> model = new HashMap<>();
        if (req.session(false) != null) {
            if (req.session().attribute("user") != null) {
                model.put("user", req.session().attribute("user"));
            }
        }
        List<User> tempList = DataGrinder.sortUserList(
                Driver.getUsers(mysqlpass));
        model.put("scores", tempList);
        model.put("flashed_messages", getFlashedMessages(req));
        return new VelocityTemplateEngine().render(
                new ModelAndView(model, path)
        );
    }

    /**
     * @param passwordMysql password to mysql accout from App
     */
    public static void configurate(final String passwordMysql) {
        final int portnum = 9000;
        port(portnum);
        staticFiles.location("/static");
        Driver.createBase(passwordMysql);
        get("/tests", (req, res) -> {
            return renderTemplate("/templates/tests.html", req, passwordMysql);
        });
        get("/game", (req, res) -> {
            Session session = getSession(req);
            if (session.attribute("user") == null) {
                res.redirect("/login");
                return "";
            } else {
                return renderTemplate("/templates/game.html",
                        req, passwordMysql);
            }
        });
        get("/login", (req, res) -> {
            Session session = getSession(req);
            if (session.attribute("user") == null) {
                return renderTemplate("/templates/login.html",
                        req, passwordMysql);
            } else {
                res.redirect("/game");
                return "";
            }
        });
        get("/create-acc", (req, res) -> {
            Session session = getSession(req);
            if (session.attribute("user") == null) {
                return renderTemplate("/templates/create.html",
                        req, passwordMysql);
            } else {
                res.redirect("/game");
                return "";
            }
        });
        get("/high-scores", (req, res) -> {
            return renderTemplate("/templates/highscores.html",
                    req, passwordMysql);
        });
        get("/log-out", (req, res) -> {
            Session session = getSession(req);
            if (session.attribute("user") != null) {
                session.removeAttribute("user");
                flashMessage("You have been logged out", req);
            }
            res.redirect("/login");
            return "";
        });
        post("/login", (req, res) -> {
            String login = req.queryParams("login");
            String password = req.queryParams("password");
            if (DataGrinder.userIsInBase(login, password,
                    passwordMysql)) {
                Session session = getSession(req);
                session.attribute("user", login);
                flashMessage("Log in successful", req);
                res.redirect("/game");
                return "";
            } else {
                flashMessage("There's no such user", req);
                res.redirect("/login");
                return "";
            }
        });
        post("/create-acc", (req, res) -> {
            String login = req.queryParams("login");
            String password = req.queryParams("password");
            String cPassword = req.queryParams("c_password");
            final int magic5 = 5;
            if (DataGrinder.newUserDataProper(login, password,
                    passwordMysql) && password.equals(cPassword)) {
                Driver.addUser(login, password, passwordMysql);
                Session session = getSession(req);
                session.attribute("user", login);
                flashMessage("Log in successful", req);
                res.redirect("/game");
            } else {
                if (!DataGrinder.loginIsUnique(login, passwordMysql)) {
                    flashMessage("Login is occupied", req);
                    res.redirect("/create-acc");
                } else if (!password.equals(cPassword)) {
                    flashMessage("Passwords don't"
                            + " match each other", req);
                    res.redirect("/create-acc");
                } else if (DataGrinder.dataAreToLong(login, password)) {
                    flashMessage(
                            "Login and password can"
                                    + " be maximum 32 characters long", req);
                    res.redirect("/create-acc");
                } else if (password.length() < magic5) {
                    flashMessage("password must be"
                            + " at least 5 characters long", req);
                    res.redirect("/create-acc");
                } else {
                    flashMessage("incorrect_data", req);
                    res.redirect("/create-acc");
                }
            }
            return "";
        });
        post("/game", (req, res) -> {
            JSONObject json = ScoreCalc.stringToJson(req.body());
            int sec = ScoreCalc.convert(json.get("seconds"));
            int min = ScoreCalc.convert(json.get("minutes"));
            int strikes = ScoreCalc.convert(json.get("strikes"));
            int score = ScoreCalc.calcScore(sec, min, strikes);
            Session session = getSession(req);
            String login = session.attribute("user");
            int lastScore = score;
            int place = 1;
            List<User> lista = DataGrinder.sortUserList(
                    Driver.getUsers(passwordMysql));
            for (int i = 0; i < lista.size(); i++) {
                if (login.equals(lista.get(i).getLogin())) {
                    lastScore = lista.get(i).getScore();
                    place = lista.get(i).getNumber();
                    break;
                }
            }
            if (score > lastScore) {
                Driver.changeUsersScore(passwordMysql,
                        login, score, sec, min, strikes);
            }
            if (score > lastScore) {
                List<User> newList = DataGrinder.sortUserList(
                        Driver.getUsers(passwordMysql));
                for (int i = 0; i < newList.size(); i++) {
                    if (login.equals(newList.get(i).getLogin())) {
                        place = newList.get(i).getNumber();
                        break;
                    }
                }
                String mess = String.format("Good job,"
                        + " you are now at %d place", place);
                flashMessage(mess, req);
            } else {
                String mess2 = String.format("Good score "
                        + "but you are still at place %d", place);
                flashMessage(mess2, req);
            }
            return "";
        });
    }
}
