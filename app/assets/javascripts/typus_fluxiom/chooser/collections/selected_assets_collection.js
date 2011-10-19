Fluxiom.Collections.SelectedAssets = Backbone.Collection.extend({
  
  model: Fluxiom.Models.Asset,
  
  toggleSelected: function(model, selected){
    if (selected == true)
      this.add(model);      
    else
      this.remove(model);
  },
  
  add: function(asset){  
    var isDupe = this.any(function(model){ 
      return model.get('id') === asset.get('id');
    });
    if (isDupe) return;
    Backbone.Collection.prototype.add.call(this, asset);
  }

});