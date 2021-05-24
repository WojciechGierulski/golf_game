


export default class Timer
{
    constructor()
    {
        this.seconds = 0;
        this.minutes = 0;
        this.id = null;
    }

    pad(val) { return val > 9 ? val : "0" + val; }

    time()
    {
        this.seconds += 1;
        if (this.seconds == 60)
        {
            this.seconds = 0;
            this.minutes += 1;
        }
    }

    stop()
    {
        clearInterval(this.id);
    }

    start()
    {
        this.id = setInterval(this.time.bind(this), 1000);
    }

    get_seconds()
    {
        if (this.seconds < 10)
        {
            return "0" + this.seconds.toString();
        }
        else
        {
            return this.seconds.toString();
        }
    }

    get_minutes()
    {
        if (this.minutes < 10)
        {
            return "0" + this.minutes.toString();
        }
        else
        {
            return this.minutes.toString();
        }
    }
}