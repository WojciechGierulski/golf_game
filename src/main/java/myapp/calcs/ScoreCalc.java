package myapp.calcs;

import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;


final public class ScoreCalc {
    //ScoreCalc class

    private ScoreCalc() {
        //constructor
    }
    /**
     *calculate score.
     * @param data data
     * @return returned
     */
    public static JSONObject stringToJson(final String data)
            throws ParseException {
        final JSONParser parser = new JSONParser();
        JSONObject json = (JSONObject) parser.parse(data);
        return json;
    }
    /**
     *calculate score.
     * @param seconds  seconds
     * @param minutes minutes
     * @param strikes strikes
     * @return returned
     */
    public static int calcScore(final int seconds, final int minutes,
                                final int strikes) {
        // calculating score
        final int max = 1000;
        final int multiplystrikes = 10;
        final int mintosec = 60;
        final int totalSeconds = seconds + minutes * mintosec;
        return Math.max(max - totalSeconds - multiplystrikes * strikes, 0);
    }

    /**
     *converter int to str.
     * @param obj object
     * @return returned
     */
    public static int convert(final Object obj) {
        String str = (String) obj;
        return Integer.parseInt(str);
    }

}
