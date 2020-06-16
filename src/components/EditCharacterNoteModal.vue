<template>
  <v-dialog
    v-model="showEditCharacterModal"
    width="80%"
  >
    <v-card>
      <v-card-title
        class="primary headerText--text d-flex justify-space-between"
      >
        Edit Character Note<v-btn
          icon
          @click="showEditCharacterModal = false"
        >
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-card-title>
      <v-card-subtitle
        class="primary headerText--text"
      >
        <strong>Click the plus button</strong> to set a picture from the database.
      </v-card-subtitle>
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
                  @click="showSelectPictureModal = true"
                >
                  <v-icon>mdi-pencil-outline</v-icon>
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
            />
            <div class="d-flex flex-wrap">
              Tags:
              <v-chip
                v-for="(tag, index) in characterNote.tags"
                :key="`new-character-tag-${index}`"
                class="mx-1"
                close
                color="secondary"
                @click:close="removeTag(index)"
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
              @keyup.enter="addTag(newTag)"
            />
          </v-col>
        </v-row>
      </v-card-text>
      <v-card-actions class="justify-space-between">
        <v-btn
          color="error"
          @click="removeCharacterNote"
        >
          Delete
        </v-btn>
        <v-btn
          color="secondary"
          @click="updateCharacterNote"
        >
          Save
        </v-btn>
      </v-card-actions>
    </v-card>
    <select-picture-modal
      :show-modal="showSelectPictureModal"
      :toggle-modal="toggleSelectPictureModal"
      :set-picture="setNotePicture"
    />
  </v-dialog>
</template>

<script lang="ts">
import {Component, Vue, Prop} from 'vue-property-decorator';
import {CharacterNote} from '../types';
import fb from '../firebaseConfig';
import SelectPictureModal from '@/components/SelectPictureModal.vue';

@Component({
  components: {
    SelectPictureModal,
  },
})
export default class EditCharacterNoteModal extends Vue {
  @Prop() characterNote!: CharacterNote;
  @Prop() showModal!: boolean;
  @Prop() toggleModal!: any;
  @Prop() index!: number;

  get showEditCharacterModal(): boolean {
    return this.showModal;
  }
  set showEditCharacterModal(show: boolean) {
    this.toggleModal(show);
  }
  get characterNotes() {
    return this.$store.state.characterNotes.characterNotes;
  }

  newTag = '';
  modalError = '';
  showSelectPictureModal = false;

  toggleSelectPictureModal(show: boolean) {
    if (show != undefined) {
      this.showSelectPictureModal = show;
    } else {
      this.showSelectPictureModal = !this.showSelectPictureModal;
    }
  }

  setNotePicture(picture: string) {
    this.characterNote.picture = picture;
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

  removeCharacterNote() {
    this.characterNotes.splice(this.index, 1);
    fb.characterNotesCollection.doc(this.$store.state.currentUser.uid).update({
      characterNotes: this.characterNotes,
    })
      .then(() => {
        this.showEditCharacterModal = false;
      })
      .catch((error) => {
        console.log(error);
        this.modalError = 'Character note could not be removed at this time.\n' +
          'Please contact Dre#3260 on Discord to resolve this issue.';
      });
  }

  updateCharacterNote() {
    fb.characterNotesCollection.doc(this.$store.state.currentUser.uid).update({
      characterNotes: this.characterNotes,
    })
      .then(() => {
        this.showEditCharacterModal = false;
      })
      .catch((error) => {
        console.log(error);
        this.modalError = 'Character note could not be updated at this time.\n' +
          'Please contact Dre#3260 on Discord to resolve this issue.';
      });
  }
}
</script>

<style lang="scss" scoped>
</style>
