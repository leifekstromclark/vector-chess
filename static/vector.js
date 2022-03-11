class Vector {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.norm = -1;
    }
    get_norm() {
        if (this.norm == -1) {
            this.norm = (this.x ** 2 + this.y ** 2) ** 0.5;
        }
        return this.norm;
    }
    get_normal() {
        return new Vector(-this.y, this.x);
    }
    multiply(other) {
        return new Vector(this.x * other, this.y * other);
    }
    add(other) {
        return new Vector(this.x + other.x, this.y + other.y);
    }
    normalize() {
        return this.multiply(1 / this.get_norm());
    }
}