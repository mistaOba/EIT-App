import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { Meteor } from 'meteor/meteor';

/* eslint-disable object-shorthand */

export const Stuff = new Mongo.Collection('Stuff');

// Define Bulk Delete Method
Meteor.methods({
  // eslint-disable-next-line consistent-return
  'eits.bulk_delete'(ids) {
    if (!Meteor.user()) {
      return new Meteor.Error('Not Authorised');
    }
    // eslint-disable-next-line no-undef
    check(ids, Array);
    Stuff.remove({ _id: { $in: ids } });
  },
});

/**
 * Create the schema for Stuff
 */
export const StuffSchema = new SimpleSchema({
  name: {
    label: 'Full Name',
    type: String,
    optional: false,
    max: 30,
    autoform: {
      group: 'Stuff',
      placeholder: 'Firstname Lastname',
    },
  },
  age: {
    label: 'Age',
    type: Number,
    optional: false,
    autoform: {
      group: 'Stuff',
      placeholder: '23',
    },
  },
  country: {
    label: 'Country',
    type: String,
    optional: false,
    autoform: {
      group: 'Stuff',
      placeholder: 'Nigeria',
    },
  },
});

Stuff.attachSchema(StuffSchema);
