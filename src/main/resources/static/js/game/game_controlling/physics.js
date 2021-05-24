
export default class Physics
{

    static normal_vector_line(boundary)
    {
        var eq = Physics.line_equatation_vector(boundary);
        return eq.slice(0, 2);
    }

    static line_equatation_vector(boundary)
    {
        var x1 = boundary[0][0];
        var y1 = boundary[0][1];
        var x2 = boundary[1][0];
        var y2 = boundary[1][1];
        var A = y1 - y2;
        var B = x2 - x1;
        var C = (x1 - x2) * y1 + (y2 - y1) * x1;
        return [A, B, C];
    }

    static normalize_vector(vectorr)
    {
        var vector = [];
        var sum = 0;
        for (var number of vectorr)
        {
            sum += number * number;
        }
        sum = Math.pow(sum, 1/vectorr.length);
        for (var number of vectorr)
        {
            vector.push(number / sum); 
        }
        return vector;
    }

    static dot_product(v1, v2)
    {
        if (v1.length == v2.length)
        {
            var sum = 0;
            for (var i=0; i<v1.length; i++)
            {
                sum += v1[i] * v2[i];
            }
            return sum;
        }
        return null;

    }

    static point_to_point_distance(p1, p2)
    {
        var x1 = p1[0];
        var x2 = p2[0];
        var y1 = p1[1];
        var y2 = p2[1];
        return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2-y1, 2));
    }

    static get_vector_after_collision(ball, normal_vector)
    {
        // here normal vector must be normalized
        var vel_vector = [ball.vel_x, ball.vel_y];
        var coefficient = this.dot_product(vel_vector, normal_vector);
        var new_vel_x = vel_vector[0] - (2 * coefficient * normal_vector[0]);
        var new_vel_y = vel_vector[1] - (2 * coefficient * normal_vector[1]);
        new_vel_y *= 0.6;
        if (Math.abs(new_vel_y) > 0.1)
        {
            new_vel_x *= 0.7;
        }
        else
        {
            new_vel_x *= 1;
        }
        return [new_vel_x, new_vel_y];
    }

    static gravity(ball)
    {
        if(!ball.in_contact)
            ball.vel_y -= 0.2;
    }
    

    static move_ball_back(d, ball)
    // invoked on collision
    {
        var angle = Math.atan2(ball.vel_y, ball.vel_x);
        var x_offset = Math.cos(angle) * (ball.RADIUS - d);
        var y_offset = Math.sin(angle) * (ball.RADIUS - d);
        ball.x -= x_offset;
        ball.y = Math.round(ball.y - (y_offset + 1*Math.sign(y_offset)));

    }

    static detect_collision_with_line(boundary, ball)
    {
        var result = [false,  boundary];
            var distance = Physics.distance_point_to_segment(boundary, ball);
            if (distance < ball.RADIUS)
            {
                result = [true, boundary, distance];
                Physics.move_ball_back(distance, ball);
        }
        return result;
    }

    static change_ball_vel_vector_after_collision(boundary, ball)
    {
        var normal_vector = Physics.normal_vector_line(boundary);
        normal_vector = Physics.normalize_vector(normal_vector);
        var new_vel_vector = Physics.get_vector_after_collision(ball, normal_vector);
        ball.vel_x = new_vel_vector[0];
        ball.vel_y = new_vel_vector[1];
    }

    static distance_point_to_segment(boundary, ball)
    {
        var x1 = boundary[0][0];
        var y1 = boundary[0][1];
        var x2 = boundary[1][0];
        var y2 = boundary[1][1];
        var x = ball.x;
        var y = ball.y;

        var index = ((x2 - x1) * (x - x1) + (y2 - y1) * (y - y1)) / (Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));

        if (index <= 0)
        {
            return Physics.point_to_point_distance(boundary[0], [x, y]);
        }
        else if (index >= 1)
        {
            return Physics.point_to_point_distance(boundary[1], [x, y]);
        }
        else
        {
            var line_vector = Physics.line_equatation_vector(boundary);
            return Math.abs(line_vector[0] * x + line_vector[1] * y + line_vector[2])/Math.sqrt(line_vector[1] * line_vector[1] + line_vector[0] * line_vector[0]);
        }
    }

    static calculate_power(ball, cursor)
    {
        var x1 = ball.x;
        var y1 = ball.y;
        var x2 = cursor[0];
        var y2 = cursor[1];
        var distance = Physics.point_to_point_distance([x1, y1], [x2, y2]);
        if (distance > 100)
        {
            distance = 100;
        }
        var angle = Math.atan2(y2 - y1, x2 - x1);
        console.log([Math.cos(angle) * distance * -0.1, Math.sin(angle) * distance * -0.1]);
        var vel_x = Math.cos(angle) * distance * -0.1
        if (vel_x < 0 && vel_x > -1)
        {
            vel_x = -1
        }
        if (vel_x > 0 && vel_x < 1)
        {
            vel_x = 1;
        }
        return [vel_x, Math.sin(angle) * distance * -0.13];
    }
}

