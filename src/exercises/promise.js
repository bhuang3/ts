// fn -> fn(resolve, reject)

var Zromise = function(fn) {
  this.suc = [];
  this.err = [];
  this.status = 'pending';

  this.resolve = (val) => {
    this.suc.push(val);
    this.status = 'fulfilled';
  };

  this.reject = (val) => {
    this.err.push(val);
    this.status = 'rejected';
  };

  fn(this.resolve, this.reject);
};

Zromise.prototype.then = function(s, e) {
  if (this.status === 'fulfilled') {
    s(this.suc.pop());
  } else if (this.status === 'rejected') {
    if (e) {
      e(this.err.pop());
    }
  }
};


