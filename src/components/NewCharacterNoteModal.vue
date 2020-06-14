<template>
  <v-dialog
    v-model="showNewCharacterModal"
    width="80%"
  >
    <v-card>
      <v-card-title
        class="primary"
      >
        New Character Note
      </v-card-title>
      <v-alert
        v-if="modalError"
        type="error"
        tile
      >
        {{ modalError }}
      </v-alert>
      <v-card-text>
        <v-row>
          <v-col cols="6">
            <v-img
              width="100%"
              contain
              :src="characterNote.picture"
            >
              <div class="d-flex justify-end pa-1">
                <v-btn
                  fab
                  color="secondary"
                >
                  <v-icon>mdi-plus</v-icon>
                </v-btn>
              </div>
            </v-img>
          </v-col>
          <v-col cols="6">
            <v-text-field
              v-model="characterNote.name"
              label="Name"
            />
            <v-textarea
              v-model="characterNote.notes"
              label="Notes"
              rows="10"
            />
            <div class="d-flex flex-wrap">
              Tags:
              <v-chip
                v-for="(tag, index) in characterNote.tags"
                :key="`new-character-tag-${index}`"
                class="mx-3"
                close
                color="secondary"
                @click:close="removeTag(characterNote, index)"
              >
                {{ tag }}
              </v-chip>
            </div>
            <v-text-field
              v-model="newTag"
              hint="Press ENTER to save tag."
              persistent-hint
              filled
              class="primary mt-1"
              placeholder="New tag"
              @keyup.enter="addTag"
            />
          </v-col>
        </v-row>
      </v-card-text>
      <v-card-actions class="justify-end">
        <v-btn
          color="secondary"
          @click="addCharacterNote"
        >
          Save
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import {Component, Vue, Prop} from 'vue-property-decorator';
import {CharacterNote} from '../types';
import fb from '../firebaseConfig';

@Component
export default class NewCharacterNoteModal extends Vue {
  @Prop() showModal!: boolean;
  @Prop() toggleModal!: any;

  characterNote: CharacterNote = {
    name: '',
    picture: '',
    notes: '',
    tags: [],
  };
  newTag = '';
  modalError = '';

  get showNewCharacterModal(): boolean {
    return this.showModal;
  }

  set showNewCharacterModal(show: boolean) {
    this.toggleModal(show);
  }

  get characterNotes() {
    return this.$store.state.characterNotes.characterNotes;
  }

  addTag() {
    if (this.newTag) {
      this.characterNote.tags.push(this.newTag);
      this.newTag = '';
    }
  }

  removeTag(index: number) {
    this.characterNote.tags.splice(index, 1);
  }

  addCharacterNote() {
    if (this.characterNote.name) {
      this.characterNotes.push({
        name: this.characterNote.name,
        picture: this.characterNote.picture,
        notes: this.characterNote.notes,
        tags: this.characterNote.tags,
      });
      fb.characterNotesCollection.doc(this.$store.state.currentUser.uid).set({
        characterNotes: this.characterNotes,
      })
        .catch((error) => {
          console.log(error);
          this.modalError = 'Character note could not be added at this time.\n' +
            'Please contact Dre#3260 on Discord to resolve this issue.';
        });
      this.showNewCharacterModal = false;
    } else {
      this.modalError = 'Please add a name for this character.';
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
