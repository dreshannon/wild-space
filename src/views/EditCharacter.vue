<template>
  <v-form>
    <v-row>
      <v-col cols="12">
        <v-card>
          <v-card-title class="white--text d-flex justify-space-between">
            Edit Character
            <v-btn
              color="#53208a"
              class="white--text"
              @click="save()"
            >
              Save
            </v-btn>
          </v-card-title>
          <v-card-subtitle class="white--text">
            Click save at the top or bottom of this page to save your changes and return to the home screen.
          </v-card-subtitle>
        </v-card>
      </v-col>
    </v-row>
    <v-row>
      <v-col
        cols="12"
      >
        <v-img
          height="200px"
          width="100%"
          contain
          :src="character.picture"
        >
          <div class="d-flex justify-end">
            <v-btn
              color="#53208a"
              icon
              @click="showCharacterPictureModal = true"
            >
              <v-icon>mdi-upload</v-icon>
            </v-btn>
          </div>
        </v-img>
      </v-col>
      <v-col
        cols="4"
      >
        <v-text-field
          v-model="character.race"
          label="Race"
          @change="saveCharacter()"
        />
      </v-col>
      <v-col
        cols="8"
      >
        <v-text-field
          v-model="character.name"
          label="Name"
          @change="saveCharacter()"
        />
      </v-col>
    </v-row>
    <v-row>
      <v-col
        cols="2"
      >
        <v-text-field
          v-model="character.traits.strength"
          label="Strength"
          @change="saveCharacter()"
        />
        <v-text-field
          v-model="character.traits.dexterity"
          label="Dexterity"
          @change="saveCharacter()"
        />
        <v-text-field
          v-model="character.traits.relations"
          label="Relations"
          @change="saveCharacter()"
        />
        <v-text-field
          v-model="character.traits.culture"
          label="Culture"
          @change="saveCharacter()"
        />
        <v-text-field
          v-model="character.traits.biology"
          label="Biology"
          @change="saveCharacter()"
        />
        <v-text-field
          v-model="character.traits.engineering"
          label="Engineering"
          @change="saveCharacter()"
        />
      </v-col>
      <v-col
        cols="10"
      >
        <v-text-field
          v-model="character.health"
          label="Health"
          @change="saveCharacter()"
        />
        <v-card flat>
          <v-card-title class="white--text">
            <h2>Skills</h2>
          </v-card-title>
          <v-list-item
            v-for="(skill, index) in character.skills"
            :key="'skill-' + index"
          >
            <v-list-item-content>
              <v-list-item-title class="d-flex justify-space-between">
                {{ skill.name }}
                <v-btn
                  icon
                  @click="removeSkill(index)"
                >
                  <v-icon>mdi-close</v-icon>
                </v-btn>
              </v-list-item-title>
              <v-list-item-subtitle class="text-left">
                {{ skill.description }}
              </v-list-item-subtitle>
              <v-list-item-subtitle class="text-left">
                {{ skill.trait }}
              </v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
          <v-list-item three-line>
            <v-list-item-content>
              <v-list-item-title>
                <v-text-field
                  v-model="newSkill.name"
                  label="Name"
                  @keyup.enter="addSkill()"
                />
              </v-list-item-title>
              <v-list-item-subtitle>
                <v-text-field
                  v-model="newSkill.description"
                  label="Description"
                  @keyup.enter="addSkill()"
                />
              </v-list-item-subtitle>
              <v-list-item-subtitle>
                <v-select
                  v-model="newSkill.trait"
                  :items="Object.keys(character.traits)"
                  label="Trait"
                />
              </v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>

          <v-card-actions>
            <v-btn
              color="#53208a"
              class="white--text"
              @click="addSkill()"
            >
              Add
            </v-btn>
          </v-card-actions>
        </v-card>
        <v-card flat>
          <v-card-title class="white--text">
            <h2>Languages</h2>
          </v-card-title>
          <v-list-item
            v-for="(language, index) in character.languages"
            :key="'language-' + index"
          >
            <v-list-item-content>
              <v-list-item-title class="d-flex justify-space-between">
                {{ language }}
                <v-btn
                  icon
                  @click="removeLanguage(index)"
                >
                  <v-icon>mdi-close</v-icon>
                </v-btn>
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title>
                <v-text-field
                  v-model="newLanguage"
                  label="Language"
                  @keyup.enter="addLanguage()"
                />
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>

          <v-card-actions>
            <v-btn
              color="#53208a"
              class="white--text"
              @click="addLanguage()"
            >
              Add
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-card>
          <v-card-title class="white--text">
            Inventory
          </v-card-title>
          <v-card-text>
            <v-textarea
              v-model="character.inventory"
              @change="saveCharacter()"
            />
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-card>
          <v-card-title class="white--text">
            Personality
          </v-card-title>
          <v-card-text>
            <v-textarea
              v-model="character.personality"
              @change="saveCharacter()"
            />
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-card>
          <v-card-title class="white--text">
            Background
          </v-card-title>
          <v-card-text>
            <v-textarea
              v-model="character.background"
              @change="saveCharacter()"
            />
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <v-row>
      <v-col
        cols="2"
        offset="10"
        class="text-right"
      >
        <v-btn
          color="#53208a"
          class="white--text"
          @click="save()"
        >
          Save
        </v-btn>
      </v-col>
    </v-row>
    <v-dialog
      v-model="showCharacterPictureModal"
      width="500"
    >
      <v-card
        :loading="uploadingPicture"
      >
        <v-card-title class="white--text">
          Character Picture
        </v-card-title>
        <v-alert
          v-if="pictureUploadErrorMsg"
          type="error"
          tile
        >
          {{ pictureUploadErrorMsg }}
        </v-alert>
        <v-card-text>
          <v-file-input
            accept="image/*"
            label="Image"
            show-size
            @change="previewPicture($event)"
          />
          <v-img
            v-if="picture"
            :src="picture"
          />
        </v-card-text>
        <v-card-actions class="justify-end">
          <v-btn
            color="#53208a"
            class="white--text"
            @click="uploadPicture"
          >
            Upload
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-form>
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';
import {Character, Skill} from '../types';
import firebase from 'firebase';
import fb from '../firebaseConfig';

@Component
export default class EditCharacter extends Vue {
  get character(): Character {
    return this.$store.state.character;
  }

  newSkill: Skill = {
    name: '',
    description: '',
    trait: '',
  };
  newLanguage = '';
  showCharacterPictureModal = false;
  picture: any = null;
  pictureFile: File | null = null;
  uploadingPicture = false;
  pictureUploadErrorMsg = '';

  previewPicture(file: any) {
    console.log(file);
    const reader = new FileReader();

    reader.onload = (e) => {
      if (e && e.target) {
        this.picture = e.target.result;
      }
    };
    reader.readAsDataURL(file);
    this.pictureFile = file;
  }

  uploadPicture() {
    if (this.pictureFile) {
      this.uploadingPicture = true;
      const pictureRef = fb.storageRef.child(`character/${this.pictureFile.name}`).put(this.pictureFile);
      pictureRef.on('state_changed', (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log(`Upload is ${progress}% done`);
        switch (snapshot.state) {
        case firebase.storage.TaskState.PAUSED:
          console.log('Upload is paused');
          break;
        case firebase.storage.TaskState.RUNNING:
          console.log('Upload is running');
          break;
        }
      }, (error) => {
        console.log(error);
        this.uploadingPicture = false;
        this.pictureUploadErrorMsg = error.message;
      }, () => {
        this.uploadingPicture = false;
        pictureRef.snapshot.ref.getDownloadURL().then((downloadURL) => {
          console.log('File available at', downloadURL);
          this.character.picture = downloadURL;
          this.updatePicture();
          this.showCharacterPictureModal = false;
        });
      });
    }
  }

  addSkill() {
    if (this.character && this.newSkill.name) {
      this.character.skills.push({
        name: this.newSkill.name,
        description: this.newSkill.description,
        trait: this.newSkill.trait,
      });
      this.saveCharacter();
      this.newSkill.name = '';
      this.newSkill.description = '';
      this.newSkill.trait = '';
    }
  }

  removeSkill(index: number) {
    this.character.skills.splice(index, 1);
    this.saveCharacter();
  }

  addLanguage() {
    if (this.newLanguage) {
      this.character.languages.push(this.newLanguage);
      this.saveCharacter();
      this.newLanguage = '';
    }
  }

  removeLanguage(index: number) {
    this.character.languages.splice(index, 1);
    this.saveCharacter();
  }

  updatePicture() {
    fb.charactersCollection.doc(this.$store.state.currentUser.uid).update({
      picture: this.character.picture,
    });
  }

  saveCharacter() {
    fb.charactersCollection.doc(this.$store.state.currentUser.uid).set({
      name: this.character.name,
      race: this.character.race,
      traits: {
        strength: this.character.traits.strength,
        dexterity: this.character.traits.dexterity,
        relations: this.character.traits.relations,
        culture: this.character.traits.culture,
        biology: this.character.traits.biology,
        engineering: this.character.traits.engineering,
      },
      skills: this.character.skills,
      health: this.character.health,
      currentHealth: this.character.currentHealth,
      languages: this.character.languages,
      inventory: this.character.inventory,
      background: this.character.background,
      personality: this.character.personality,
      picture: this.character.picture,
      currency: this.character.currency,
      inspiration: this.character.inspiration,
    });
  }

  save() {
    this.saveCharacter();
    this.$router.push('/');
  }
}
</script>

<style lang="scss" scoped>
.v-form {
  background-color: #fefffe;
}

.v-card__title,
.v-card__subtitle {
  background-color: #210e39;
}

</style>
