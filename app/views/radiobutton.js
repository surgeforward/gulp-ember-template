App.RadioButton = Ember.View.extend({
  tagName: "input",
  type: "radio",
  attributeBindings: [ "name", "value", "type", "checked:checked:", "callback" ],
  // classNames: ['btn', 'btn-default'],
  // classNameBindings: ['checked:active'],
  template: Ember.Handlebars.compile("{{view.value}}"),
  click: function () {
    this.set("selection", this.get("value"));
  },
  checked: function () {
    var isChecked = this.get("value") === this.get("selection");
    if (isChecked) {
      var callback = this.get('callback');
      if (callback) {
        this.get('controller').send(callback);
      }
    }
    return isChecked;
  }.property('selection')
});