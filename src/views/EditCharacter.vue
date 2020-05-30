<template>
  <v-form>
    <v-row>
      <v-col
        cols="2"
        offset="10"
        class="text-right"
      >
        <v-btn @click="save()">
          Save
        </v-btn>
      </v-col>
    </v-row>
    <v-row>
      <v-col
        cols="4"
      >
        <v-text-field
          v-model="character.race"
          label="Race"
          @change="setCharacterRace()"
        />
      </v-col>
      <v-col
        cols="8"
      >
        <v-text-field
          v-model="character.name"
          label="Name"
          @change="setCharacterName()"
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
          @change="setCharacterTraits()"
        />
        <v-text-field
          v-model="character.traits.dexterity"
          label="Dexterity"
          @change="setCharacterTraits()"
        />
        <v-text-field
          v-model="character.traits.relations"
          label="Relations"
          @change="setCharacterTraits()"
        />
        <v-text-field
          v-model="character.traits.culture"
          label="Culture"
          @change="setCharacterTraits()"
        />
        <v-text-field
          v-model="character.traits.biology"
          label="Biology"
          @change="setCharacterTraits()"
        />
        <v-text-field
          v-model="character.traits.engineering"
          label="Engineering"
          @change="setCharacterTraits()"
        />
      </v-col>
      <v-col
        cols="10"
      >
        <v-text-field
          v-model="character.health"
          label="Health"
          @change="setCharacterHealth()"
        />
        <h2
          class="text-left"
        >
          Skills
        </h2>
        <v-card>
          <v-list-item
            v-for="(skill, index) in character.skills"
            :key="'skill-' + index"
          >
            <v-list-item-content>
              <v-list-item-title class="d-flex justify-space-between">
                {{ skill.name }}
                <v-btn
                  icon
                  @click="removeSkillFromCharacter(index)"
                >
                  <v-icon>mdi-close</v-icon>
                </v-btn>
              </v-list-item-title>
              <v-list-item-subtitle>{{ skill.description }}</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title>
                <v-text-field
                  v-model="newSkill.name"
                  label="Name"
                  @keyup.enter="addSkillToCharacter()"
                />
              </v-list-item-title>
              <v-list-item-subtitle>
                <v-text-field
                  v-model="newSkill.description"
                  label="Description"
                  @keyup.enter="addSkillToCharacter()"
                />
              </v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>

          <v-card-actions>
            <v-btn @click="addSkillToCharacter()">
              Add
            </v-btn>
          </v-card-actions>
        </v-card>
        <h2
          class="text-left"
        >
          Languages
        </h2>
        <v-card>
          <v-list-item
            v-for="(language, index) in character.languages"
            :key="'language-' + index"
          >
            <v-list-item-content>
              <v-list-item-title class="d-flex justify-space-between">
                {{ language }}
                <v-btn
                  icon
                  @click="removeLanguageFromCharacter(index)"
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
                  @keyup.enter="addLanguageToCharacter()"
                />
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>

          <v-card-actions>
            <v-btn @click="addLanguageToCharacter()">
              Add
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-textarea
          v-model="character.personality"
          label="Personality"
          @change="setCharacterPersonality()"
        />
        <v-textarea
          v-model="character.background"
          label="Background"
          @change="setCharacterBackground()"
        />
      </v-col>
    </v-row>
    <v-row>
      <v-col
        cols="2"
        offset="10"
        class="text-right"
      >
        <v-btn @click="save()">
          Save
        </v-btn>
      </v-col>
    </v-row>
  </v-form>
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';
import {Character, Skill} from '../types';
import CookieService from '../services/cookie-service';

@Component
export default class EditCharacter extends Vue {
  character: Character | undefined = undefined;
  newSkill: Skill = {
    name: '',
    description: '',
  };
  newLanguage = '';

  created() {
    this.character = this.$store.state.character;
  }

  addSkillToCharacter() {
    if (this.character && this.newSkill.name) {
      this.character.skills.push({
        name: this.newSkill.name,
        description: this.newSkill.description,
      });
      this.setCharacterSkills();
      this.newSkill.name = '';
      this.newSkill.description = '';
    }
  }
  removeSkillFromCharacter(index: number) {
    if (this.character) {
      this.character.skills.splice(index, 1);
    }
  }

  addLanguageToCharacter() {
    if (this.character && this.newLanguage) {
      this.character.languages.push(this.newLanguage);
      this.setCharacterLanguages();
      this.newLanguage = '';
    }
  }

  removeLanguageFromCharacter(index: number) {
    if (this.character) {
      this.character.languages.splice(index, 1);
      this.setCharacterLanguages();
    }
  }

  setCharacterRace() {
    if (this.character) {
      this.$store.commit('setCharacterRace', this.character.race);
    }
  }

  setCharacterName() {
    if (this.character) {
      this.$store.commit('setCharacterName', this.character.name);
    }
  }

  setCharacterTraits() {
    if (this.character) {
      this.$store.commit('setCharacterTraits', this.character.traits);
    }
  }

  setCharacterHealth() {
    if (this.character) {
      this.$store.commit('setCharacterHealth', this.character.health);
      if (this.character.currentHealth === 0) {
        this.$store.commit('setCharacterCurrentHealth', this.character.health);
      }
    }
  }

  setCharacterSkills() {
    if (this.character) {
      this.$store.commit('setCharacterSkills', this.character.skills);
    }
  }

  setCharacterLanguages() {
    if (this.character) {
      this.$store.commit('setCharacterLanguages', this.character.languages);
    }
  }

  setCharacterPersonality() {
    if (this.character) {
      this.$store.commit('setCharacterPersonality', this.character.personality);
    }
  }

  setCharacterBackground() {
    if (this.character) {
      this.$store.commit('setCharacterBackground', this.character.background);
    }
  }

  save() {
    if (this.character) {
      CookieService.setCharacterCookie(this.character);
      this.$router.push('/');
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
