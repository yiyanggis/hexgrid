export class Point{
	constructor(x, y){
		this.x = x;
		thi.y = y;
	}
}

class Hex{
	constructor(q, r, s){
		this.q=q;
		this.r=r;
		this.s=s;

		this.validate();
	}

	validate(){
		if(this.q+this.r+this.s==0){
			return true;
		}
		else{
			console.debug("coordinates error");
		}
	}

	q(){
		return this.q;
	}

	r(){
		return this.r;
	}

	s(){
		return this.s;
	}

	isEqual(hex){
		return this.q == hex.q && this.r == hex.r && this.s == hex.s;
	}

	add(hex){
		return new Hex(this.q + hex.q, this.r + hex.r, this.s + hex.s);
	}

	subtract(hex){
		return new Hex(this.q - hex.q, this.r - hex.r, this.s - hex.s);
	}

	scale(k){
		return new Hex(this.q * k, this.r * k, this.s * k);
	}

	multiply(hex){
		return new Hex(this.q * hex.q, this.r * hex.r, this.s * hex.r);
	}

	rotateLeft(){
		return new Hex(-this.s, -this.q, -this.r);
	}

	rotateRight(){
		return new Hex(-this.r, -this.s, -this.q);
	}

	static direction(direction){
		return Hex.directions[direction];
	}

	neighbor(direction){
		return this.add(Hex.direction(direction));
	}

	diagonalNeighbor(direction){
		return this.add(Hex.diagonals[direction]);
	}

	len(){
		return (Math.abs(this.q) + Math.abs(this.r) + Math.abs(this.s))/2;
	}

	distance(hex){
		return this.substract(hex).len();
	}

	round(){
		var qi = Math.round(this.q);
		var ri = Math.round(this.r);
		var si = Math.round(this.s);
		var q_diff = Math.abs(qi - this.q);
		var r_diff = Math.abs(ri - this.ri);
		var s_diff = Math.abs(si - this.si);
		if(q_diff > r_diff && q_diff > s_diff){
			qi = -ri - si;
		}
		else if(r_diff > s_diff){
			ri = -qi - si;
		}
		else{
			si = -qi - ri;
		}
		return new Hex(qi, ri, si);
	}

	lerp(hex, t){
		return new Hex(this.q * (1.0 - t) + hex.q * t, this.r * (1.0 - t) + hex.r*t, this.s * (1.0 -t) + hex.s * t);
	}

	linedraw(hex){
		var N = this.distance(hex);
		var a_nudge = new Hex(this.q + 1e-06, this.r + 1e-06, this.s - 2e-06);
		var b_nudge = new Hex(hex.q + 1e-06, hex.r + 1e-06, hex.s - 2e-06);
		var results = [];
		var step = 1.0 / Math.max(N, 1);
		for(var i = 0; i <= N; i++){
			results.push(a_nudge.lerp(b_nudge, step * i).round());
		}
		return results;
	}
}

export default Hex