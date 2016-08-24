import Ember from 'ember';

const { RSVP, inject } = Ember;

export default Ember.Route.extend({
  flashMessages: inject.service(),

  model() {
    return RSVP.hash({
      rooms: this.store.findAll('room'),
      newRoom: {name: '', errors: []}
    });
  },

  actions: {
    createRoom() {
      let data = this.get('currentModel.newRoom');
      let room = this.store.createRecord('room', {name: data.name});

      // Clear any existing error messages
      this.set('currentModel.newRoom.errors', []);

      room
        .save()
        .then(() => {
          this.get('flashMessages').success(`Created room: ${data.name}`);
          this.set('currentModel.newRoom.name', '');
        })
        .catch((err) => {
          // Remove the ember-data record from the store
          this.store.unloadRecord(room);

          this.set('currentModel.newRoom.errors', (err.errors || []).mapBy('detail'));
          this.get('flashMessages').danger(`Problem creating room: ${data.name}`);
        });
    },
    removeRoom(room) {
      if (window.confirm('Are you sure?')) {
        room.destroyRecord().then(() => {
          this.get('flashMessages').success(`Deleted room: ${room.get('name')}`);
        })
        .catch(() => {
          this.get('flashMessages').danger(`Problem deleting room: ${room.get('name')}`);
        });
      }
    }
  }
});
