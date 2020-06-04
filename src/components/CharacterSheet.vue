<template>
  <div>
    <v-card flat>
      <v-card-title class="d-flex justify-space-between">
        Character Sheet
        <router-link to="/character">
          <v-icon>mdi-pencil-outline</v-icon>
        </router-link>
      </v-card-title>
      <v-card-subtitle>
        <strong>Click the edit button to the right to edit your character sheet.</strong>
      </v-card-subtitle>
      <v-card-title v-show="character.name">
        {{ character.name }}
      </v-card-title>
      <v-card-subtitle
        v-show="character.race"
        class="text-left"
      >
        {{ character.race }}
      </v-card-subtitle>
    </v-card>
    <v-row>
      <v-col
        v-show="character.traits.strength || character.traits.dexterity || character.traits.relations ||
          character.traits.culture || character.traits.biology || character.traits.engineering"
        cols="12"
        lg="3"
        sm="5"
      >
        <v-card
          class="character-sheet-trait"
          flat
          @click="activateRollDialog('Strength', character.traits.strength)"
        >
          <v-card-title>Strength</v-card-title>
          <v-card-text class="text-left">
            {{ character.traits.strength }}
          </v-card-text>
        </v-card>
        <v-card
          class="character-sheet-trait"
          flat
          @click="activateRollDialog('Dexterity', character.traits.dexterity)"
        >
          <v-card-title>Dexterity</v-card-title>
          <v-card-text class="text-left">
            {{ character.traits.dexterity }}
          </v-card-text>
        </v-card>
        <v-card
          class="character-sheet-trait"
          flat
          @click="activateRollDialog('Relations', character.traits.relations)"
        >
          <v-card-title>Relations</v-card-title>
          <v-card-text class="text-left">
            {{ character.traits.relations }}
          </v-card-text>
        </v-card>
        <v-card
          class="character-sheet-trait"
          flat
          @click="activateRollDialog('Culture', character.traits.culture)"
        >
          <v-card-title>Culture</v-card-title>
          <v-card-text class="text-left">
            {{ character.traits.culture }}
          </v-card-text>
        </v-card>
        <v-card
          class="character-sheet-trait"
          flat
          @click="activateRollDialog('Biology', character.traits.biology)"
        >
          <v-card-title>Biology</v-card-title>
          <v-card-text class="text-left">
            {{ character.traits.biology }}
          </v-card-text>
        </v-card>
        <v-card
          class="character-sheet-trait"
          flat
          @click="activateRollDialog('Engineering', character.traits.engineering)"
        >
          <v-card-title>Engineering</v-card-title>
          <v-card-text class="text-left">
            {{ character.traits.engineering }}
          </v-card-text>
        </v-card>
      </v-col>
      <v-col
        cols="12"
        lg="9"
        sm="7"
      >
        <v-row>
          <v-col
            lg="6"
            sm="12"
          >
            <v-text-field
              v-model="character.currentHealth"
              label="Health"
              :suffix="'/' + character.health + 'hp'"
              @change="saveCharacter()"
            />
          </v-col>
          <v-col
            lg="6"
            sm="12"
          >
            <v-checkbox
              v-model="character.inspiration"
              label="Inspiration"
              @change="saveCharacter()"
            />
          </v-col>
        </v-row>
        <v-text-field
          v-model="character.currency"
          label="Currency"
          suffix="credits"
          @change="saveCharacter()"
        />
        <v-card
          v-show="character.skills.length"
          flat
        >
          <v-card-title>Skills</v-card-title>
          <v-card
            v-for="(skill, index) in character.skills"
            :key="'skill-' + index"
            flat
          >
            <v-card-title>
              {{ skill.name }}
            </v-card-title>
            <v-card-subtitle class="text-left">
              {{ skill.trait }}
            </v-card-subtitle>
            <v-card-text class="text-left">
              {{ skill.description }}
            </v-card-text>
          </v-card>
        </v-card>
        <v-card
          v-show="character.languages.length"
          flat
        >
          <v-card-title>Languages</v-card-title>
          <v-list-item
            v-for="(language, index) in character.languages"
            :key="'language-' + index"
          >
            <v-list-item-content>
              <v-list-item-title class="text-left">
                {{ language }}
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-card>
      </v-col>
    </v-row>
    <v-card
      v-show="character.inventory"
      flat
    >
      <v-card-title>Inventory</v-card-title>
      <v-card-text class="text-left description">
        {{ character.inventory }}
      </v-card-text>
    </v-card>
    <v-card
      v-show="character.personality"
      flat
    >
      <v-card-title>Personality</v-card-title>
      <v-card-text class="text-left description">
        {{ character.personality }}
      </v-card-text>
    </v-card>
    <v-card
      v-show="character.background"
      flat
    >
      <v-card-title>Background</v-card-title>
      <v-card-text class="text-left description">
        {{ character.background }}
      </v-card-text>
    </v-card>
    <v-dialog
      v-model="showRollDialog"
      max-width="290"
    >
      <v-card>
        <v-card-title>{{ activeTrait.trait }}</v-card-title>
        <v-card-text>
          <v-icon
            v-for="(roll, index) in rolls"
            :key="activeTrait.name + '-roll-' + roll + index"
          >
            mdi-dice-{{ roll }}
          </v-icon>
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn @click="rollTraitCheck()">
            Roll
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';
import {Character, Skill} from '../types';
import fb from '../firebaseConfig';

@Component
export default class CharacterSheet extends Vue {
  get character(): Character {
    return this.$store.state.character;
  }

  activeSkill: Skill = {
    name: '',
    description: '',
    trait: '',
  };
  showRollDialog = false;
  rolls: number[] = [];
  activeTrait = {
    trait: '',
    value: 0,
  };

  activateRollDialog(trait: string, value: number) {
    this.activeTrait = {
      trait,
      value,
    };
    this.rolls = [];

    this.showRollDialog = true;
  }

  rollTraitCheck() {
    this.rolls = [];

    for (let i = 0; i < this.activeTrait.value; i++) {
      this.rolls.push(Math.floor(Math.random() * 6) + 1);
    }
  }

  setActiveSkillAndShowRollMenu(skill: Skill) {
    this.rolls = [];
    this.activeSkill = skill;
    this.showRollDialog = true;
  }

  numberofRolls(skill: Skill): number {
    return this.character.traits[skill.trait];
  }

  rollSkillCheck(skill: Skill) {
    this.rolls = [];

    for (let i = 0; i < this.numberofRolls(skill); i++) {
      this.rolls.push(Math.floor(Math.random() * 6) + 1);
    }
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
}
</script>

<style lang="scss" scoped>
.character-sheet-trait {
  &:hover {
    background: #eaeaea;
    cursor: pointer;
    transition: ease .3s all;
  }

  .v-card__text {
    font-size: 2em;
  }
}

.mdi-dice-1,
.mdi-dice-2,
.mdi-dice-3,
.mdi-dice-4,
.mdi-dice-5,
.mdi-dice-6 {
  font-size: 3em;
}
</style>
