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
          <v-card-text>{{ character.traits.strength }}</v-card-text>
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
          >
            <v-list-item-content>
              <v-list-item-title class="text-left">
                {{ skill.name }}
              </v-list-item-title>
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
  </div>
</template>

<script lang="ts">
import {Component, Vue, Prop} from 'vue-property-decorator';
import {Character} from '../types';
import CookieService from '../services/cookie-service';

@Component
export default class CharacterSheet extends Vue {
  @Prop() character!: Character;

  setCharacterCurrentHealth() {
    this.$store.commit('setCharacterCurrentHealth', this.character.currentHealth);
    CookieService.setCharacterCookie(this.character);
  }
}
</script>

<style lang="scss" scoped>
</style>
