<template>
  <div>
    <v-row>
      <v-col cols="2">
        <p class="text-left">
          Race: {{ character.race }}
        </p>
      </v-col>
      <v-col cols="10">
        <p class="text-left">
          Name: {{ character.name }}
        </p>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="2">
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
      <v-col cols="10">
        <p class="d-flex">
          Health:
          <v-text-field
            v-model="character.currentHealth"
            :suffix="'/' + character.health + 'hp'"
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
      <v-card-text class="text-left">
        {{ character.personality }}
      </v-card-text>
    </v-card>
    <v-card flat>
      <v-card-title>Background</v-card-title>
      <v-card-text class="text-left">
        {{ character.background }}
      </v-card-text>
    </v-card>
  </div>
</template>

<script lang="ts">
import {Component, Vue, Prop} from 'vue-property-decorator';
import {Character} from '../types';

@Component
export default class CharacterSheet extends Vue {
  @Prop() character!: Character;
}
</script>

<style lang="scss" scoped>
</style>
