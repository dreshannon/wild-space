<template>
  <div>
    <v-card flat>
      <v-card-title class="d-flex justify-space-between">
        {{ character.name }}
        <router-link to="/character">
          <v-icon>mdi-pencil-outline</v-icon>
        </router-link>
      </v-card-title>
      <v-card-subtitle class="text-left">
        {{ character.race }}
      </v-card-subtitle>
    </v-card>
    <v-row>
      <v-col
        cols="12"
        lg="3"
        sm="5"
      >
        <v-card flat>
          <v-card-title>Strength</v-card-title>
          <v-card-text class="text-left">
            {{ character.traits.strength }}
          </v-card-text>
        </v-card>
        <v-card flat>
          <v-card-title>Dexterity</v-card-title>
          <v-card-text>{{ character.traits.dexterity }}</v-card-text>
        </v-card>
        <v-card flat>
          <v-card-title>Relations</v-card-title>
          <v-card-text>{{ character.traits.relations }}</v-card-text>
        </v-card>
        <v-card flat>
          <v-card-title>Culture</v-card-title>
          <v-card-text>{{ character.traits.culture }}</v-card-text>
        </v-card>
        <v-card flat>
          <v-card-title>Biology</v-card-title>
          <v-card-text>{{ character.traits.biology }}</v-card-text>
        </v-card>
        <v-card flat>
          <v-card-title>Engineering</v-card-title>
          <v-card-text>{{ character.traits.engineering }}</v-card-text>
        </v-card>
      </v-col>
      <v-col
        cols="12"
        lg="9"
        sm="7"
      >
        <p class="d-flex">
          Health:
          <v-text-field
            v-model="character.currentHealth"
            :suffix="'/' + character.health + 'hp'"
            @change="setCharacterCurrentHealth()"
          />
        </p>
        <v-card flat>
          <v-card-title>Skills</v-card-title>
          <v-list-item
            v-for="(skill, index) in character.skills"
            :key="'skill-' + index"
            class="character-sheet-skill"
            @click="setActiveSkillAndShowRollMenu(skill)"
          >
            <v-list-item-content>
              <v-list-item-title class="text-left">
                {{ skill.name }}
              </v-list-item-title>
              <v-list-item-subtitle class="text-left text-capitalize">
                {{ skill.trait }}
              </v-list-item-subtitle>
              <v-list-item-subtitle class="text-left">
                {{ skill.description }}
              </v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-card>
        <v-card flat>
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
    <v-card flat>
      <v-card-title>Personality</v-card-title>
      <v-card-text class="text-left description">
        {{ character.personality }}
      </v-card-text>
    </v-card>
    <v-card flat>
      <v-card-title>Background</v-card-title>
      <v-card-text class="text-left description">
        {{ character.background }}
      </v-card-text>
    </v-card>
    <v-bottom-sheet v-model="showRollDialog">
      <v-sheet class="pa-5">
        <v-row>
          <v-col cols="6">
            <v-card
              flat
            >
              <v-card-title>{{ activeSkill.name }}</v-card-title>
              <v-card-subtitle class="text-left text-capitalize">
                {{ activeSkill.trait }}
              </v-card-subtitle>
              <v-card-text class="text-left">
                {{ activeSkill.description }}
              </v-card-text>
            </v-card>
          </v-col>
          <v-col cols="6">
            <div>
              <v-btn
                block
                @click="rollSkillCheck(activeSkill)"
              >
                Roll
              </v-btn>
              <v-icon
                v-for="(roll, index) in rolls"
                :key="activeSkill.name + '-roll-' + roll + index"
              >
                mdi-dice-{{ roll }}
              </v-icon>
            </div>
          </v-col>
        </v-row>
      </v-sheet>
    </v-bottom-sheet>
  </div>
</template>

<script lang="ts">
import {Component, Vue, Prop} from 'vue-property-decorator';
import {Character, Skill} from '../types';
import CookieService from '../services/cookie-service';

@Component
export default class CharacterSheet extends Vue {
  @Prop() character!: Character;
  activeSkill: Skill = {
    name: '',
    description: '',
    trait: '',
  };
  showRollDialog = false;
  rolls: number[] = [];

  setCharacterCurrentHealth() {
    this.$store.commit('setCharacterCurrentHealth', this.character.currentHealth);
    CookieService.setCharacterCookie(this.character);
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
}
</script>

<style lang="scss" scoped>
.character-sheet-skill {
  &:hover {
    background: #eaeaea;
    cursor: pointer;
    transition: ease .3s all;
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
