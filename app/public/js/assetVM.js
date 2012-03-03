var Asset = function(options, container) {
  options = options || {};

  this.container = container || {};
  this.id = ko.observable(options._id)
  this.square = ko.observable(options.square);
  this.path = ko.observable(options.path)

  // console.log(this.square())
  // console.log(this.path())

  this.blank = ko.dependentObservable(function() {
    var self = this;
    var x = self.path().split('.');
    x = x.pop().toLowerCase();
    //console.log(x)
    if(x == "psd" || x == "tif") {
      return ""
    } else {
      //console.log(x)
      return "_blank";
    }
  },this)

}

Asset.prototype.delete_file = function() {
  var self = this;
  console.log(this.container.id());
  console.log(this.id());

  $.ajax({
    url:"/contests/remove/"+self.container.id()+'/'+self.id(),
    type: 'delete',
    success:function(data) {
      self.container.assets.remove(self);
    }
  })
};
