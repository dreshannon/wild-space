<template>
  <v-card flat>
    <v-card-title
      class="primary d-flex justify-space-between"
    >
      Characters
      <v-btn
        class="headerText--text"
        color="secondary"
        icon
        @click="showNewCharacterNoteModal = true"
      >
        <v-icon>mdi-plus</v-icon>
      </v-btn>
    </v-card-title>
    <v-card-subtitle
      class="secondary headerText--text pb-0"
    >
      To add a character, <strong>click the plus on the right</strong>.
      To view/edit information on a character, <strong>click the corresponding card.</strong>
    </v-card-subtitle>
    <v-card-subtitle
      class="primary headerText--text d-flex align-center pt-0"
    >
      Sort by tag:
      <v-select
        v-model="sortBy"
        :items="tags"
        class="ml-3"
      />
    </v-card-subtitle>
    <v-card-text
      class="background d-flex flex-wrap justify-center justify-lg-start"
    >
      <div
        v-for="(note, index) in characterNotes"
        :key="`character-note-${index}`"
      >
        <v-card
          v-if="noteIncludesTag(note)"
          class="primary d-flex flex-column justify-space-between ma-3"
          @click="setNoteToEdit(note, index)"
        >
          <v-img
            class="primary align-end"
            width="200"
            height="300"
            cover
            :src="note.picture"
          />
          <v-card-title class="headerText--text">
            {{ note.name }}
          </v-card-title>
        </v-card>
      </div>
    </v-card-text>
    <new-character-note-modal
      :show-modal="showNewCharacterNoteModal"
      :toggle-modal="toggleNewCharacterNoteModal"
    />
    <edit-character-note-modal
      v-if="noteToEdit"
      :show-modal="showEditCharacterNoteModal"
      :character-note="noteToEdit"
      :toggle-modal="toggleEditCharacterNoteModal"
      :index="noteToEditIndex"
    />
  </v-card>
</template>

<script lang="ts">
import {Component, Vue, Watch} from 'vue-property-decorator';
import {CharacterNote} from '../types';
import NewCharacterNoteModal from '@/components/NewCharacterNoteModal.vue';
import EditCharacterNoteModal from '@/components/EditCharacterNoteModal.vue';

@Component({
  components: {
    NewCharacterNoteModal,
    EditCharacterNoteModal,
  },
})
export default class CharacterNotes extends Vue {
  get characterNotes() {
    return this.$store.state.characterNotes.characterNotes;
  }

  get tags() {
    return this.$store.getters.tags;
  }

  showNewCharacterNoteModal = false;
  showEditCharacterNoteModal = false;
  noteToEdit: CharacterNote | null = null;
  noteToEditIndex: number | null = null;
  sortBy = 'All';

  @Watch('showEditCharacternoteModal')
  resetNoteToEdit(show: boolean) {
    if (!show) {
      this.noteToEdit = null;
      this.noteToEditIndex = null;
    }
  }

  toggleNewCharacterNoteModal(show?: boolean) {
    if (show != undefined) {
      this.showNewCharacterNoteModal = show;
    } else {
      this.showNewCharacterNoteModal = !this.showNewCharacterNoteModal;
    }
  }

  toggleEditCharacterNoteModal(show?: boolean) {
    if (show != undefined) {
      this.showEditCharacterNoteModal = show;
    } else {
      this.showEditCharacterNoteModal = !this.showEditCharacterNoteModal;
    }
  }

  setNoteToEdit(note: CharacterNote, index: number) {
    this.noteToEdit = note;
    this.showEditCharacterNoteModal = true;
    this.noteToEditIndex = index;
  }

  noteIncludesTag(note: CharacterNote) {
    if (this.sortBy == 'All') {
      return true;
    } else {
      return note.tags.includes(this.sortBy);
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
