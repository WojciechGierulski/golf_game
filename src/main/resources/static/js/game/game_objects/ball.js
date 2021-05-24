

export default class Ball
{
    constructor(x=100, y=300)
    {
        this.x = x;
        this.y = y;
        this.vel_x = 0;
        this.vel_y = 0;
        this.RADIUS = 7;
        this.in_contact = false;
    }

    move()
    {
        if (this.vel_y < -10)
        {
            this.vel_y = -10;
        }
        this.x += Math.round(this.vel_x);
        this.y += this.vel_y;
        this.x = Math.round(this.x);
        this.y = Math.round(this.y);
    }

    draw(ctx)
    {

        // Radii of the white glow.
        var innerRadius = 3;
        var outerRadius = 35;
        // Radius of the entire circle.
        var x = Math.round(this.x);
        var y = Math.round(this.y);
        var gradient = ctx.createRadialGradient(x, y, innerRadius, x, y, outerRadius);
        gradient.addColorStop(0, 'white');
        gradient.addColorStop(1, 'black');
        ctx.arc(x, y, this.RADIUS, 0, 2 * Math.PI);
        ctx.fillStyle = gradient;
        ctx.fill();

    }
}