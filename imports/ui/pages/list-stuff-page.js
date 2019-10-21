import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import { Stuff } from '../../api/stuff/stuff.js';

Template.List_Stuff_Page.helpers({

  /**
   * @returns {*} All of the Stuff documents.
   */
  stuffList() {
    return Stuff.find();
  },
});

Template.List_Stuff_Page.onCreated(function bodyOnCreated() {
  this.checkedEITs = new ReactiveVar([]);
});

Template.List_Stuff_Page.events({
  'click #deleteButton': function (event) {
    Stuff.remove(this._id);
  },

'change .eitCheck': function (event, instance) {
  event.preventDefault();

  if (event.target.checked) {
    const oldEitIds = instance.checkedEITs.get();
    instance.checkedEITs.set([...oldEitIds, this._id]);
  } else {
    const oldEitIds = instance.checkedEITs.get();
    instance.checkedEITs.set(oldEitIds.filter(each => each !== this._id));
  }
  // console.log(instance.checkedEITs.get());
},

'click #deleteSelectedButton': function (event, instance) {
  event.preventDefault();
  // Stuff.remove({ _id: { $in: instance.checkedEITs.get() } }); didn't work cos of some authentication ish
  Meteor.call('eits.bulk_delete', instance.checkedEITs.get());
},

});
