<template>
  <div>
    <v-card
      class="character-sheet"
      flat
    >
      <v-card-title
        class="d-flex justify-space-between primary headerText--text"
      >
        Character Sheet
        <v-btn
          class="headerText--text"
          icon
          to="/character"
        >
          <v-icon>mdi-pencil-outline</v-icon>
        </v-btn>
      </v-card-title>
      <v-card-subtitle
        class="primary headerText--text"
      >
        <strong>Click the edit button to the right to edit your character sheet.</strong>
      </v-card-subtitle>
      <div class="d-flex flex-no-wrap mt-3">
        <v-avatar
          size="200"
          tile
        >
          <v-img
            contain
            :src="character.picture"
          />
        </v-avatar>
        <div>
          <v-card-title
            v-show="character.name"
            class="tertiary--text"
          >
            {{ character.name }}
          </v-card-title>
          <v-card-subtitle
            v-show="character.race"
            class="tertiary--text"
          >
            {{ character.race }}
          </v-card-subtitle>
        </div>
      </div>
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
          class="mb-3"
          flat
        >
          <v-card-title class="primary headerText--text">
            Traits
          </v-card-title>
          <v-card-subtitle class="primary headerText--text">
            <strong>Click a trait to roll it's value.</strong>
          </v-card-subtitle>
          <v-card-text class="traits">
            <v-list>
              <v-list-item @click="activateRollDialog('Strength', character.traits.strength)">
                <v-list-item-title class="d-flex justify-space-between bodyText--text">
                  <div>
                    Strength
                  </div>
                  <div>
                    {{ character.traits.strength }}
                  </div>
                </v-list-item-title>
              </v-list-item>
              <v-list-item @click="activateRollDialog('Dexterity', character.traits.dexterity)">
                <v-list-item-title class="d-flex justify-space-between bodyText--text">
                  <div>
                    Dexterity
                  </div>
                  <div>
                    {{ character.traits.dexterity }}
                  </div>
                </v-list-item-title>
              </v-list-item>
              <v-list-item @click="activateRollDialog('Relations', character.traits.relations)">
                <v-list-item-title class="d-flex justify-space-between bodyText--text">
                  <div>
                    Relations
                  </div>
                  <div>
                    {{ character.traits.relations }}
                  </div>
                </v-list-item-title>
              </v-list-item>
              <v-list-item @click="activateRollDialog('Culture', character.traits.culture)">
                <v-list-item-title class="d-flex justify-space-between bodyText--text">
                  <div>
                    Culture
                  </div>
                  <div>
                    {{ character.traits.culture }}
                  </div>
                </v-list-item-title>
              </v-list-item>
              <v-list-item @click="activateRollDialog('Biology', character.traits.biology)">
                <v-list-item-title class="d-flex justify-space-between bodyText--text">
                  <div>
                    Biology
                  </div>
                  <div>
                    {{ character.traits.biology }}
                  </div>
                </v-list-item-title>
              </v-list-item>
              <v-list-item @click="activateRollDialog('Engineering', character.traits.engineering)">
                <v-list-item-title class="d-flex justify-space-between bodyText--text">
                  <div>
                    Engineering
                  </div>
                  <div>
                    {{ character.traits.engineering }}
                  </div>
                </v-list-item-title>
              </v-list-item>
            </v-list>
          </v-card-text>
        </v-card>
        <v-card
          v-show="character.languages.length"
          flat
        >
          <v-card-title
            class="primary headerText--text"
          >
            Languages
          </v-card-title>
          <v-list-item
            v-for="(language, index) in character.languages"
            :key="'language-' + index"
          >
            <v-list-item-content>
              <v-list-item-title class="bodyText--text">
                {{ language }}
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-card>
      </v-col>
      <v-col
        cols="12"
        lg="9"
        sm="7"
      >
        <v-card
          class="mb-3"
          flat
        >
          <v-card-title
            class="primary headerText--text"
          >
            Volitile
          </v-card-title>
          <v-card-text
            class="headerText--text"
          >
            <v-row
              v-show="character.health"
            >
              <v-col
                lg="6"
                sm="12"
              >
                <v-text-field
                  v-model="character.currentHealth"
                  label="Health"
                  color="bodyText"
                  class="bodyText--text"
                  :suffix="'/' + character.health + 'hp'"
                  @change="updateCurrentHealth()"
                />
              </v-col>
              <v-col
                lg="6"
                sm="12"
              >
                <v-checkbox
                  v-model="character.inspiration"
                  color="bodyText"
                  class="bodyText--text"
                  label="Inspiration"
                  @change="updateInspiration()"
                />
              </v-col>
            </v-row>
            <v-row>
              <v-col
                lg="6"
                sm="12"
              >
                <v-text-field
                  v-model="character.currency.federalDollars"
                  color="bodyText"
                  class="bodyText--text"
                  type="number"
                  suffix="Federal Dollars"
                  @change="updateCurrency()"
                />
              </v-col>
              <v-col
                lg="6"
                sm="12"
              >
                <v-text-field
                  v-model="character.currency.republicCredits"
                  color="bodyText"
                  class="bodyText--text"
                  type="number"
                  suffix="Republic Credits"
                  @change="updateCurrency()"
                />
              </v-col>
              <v-col
                lg="6"
                sm="12"
              >
                <v-text-field
                  v-model="character.currency.imperialAurei"
                  color="bodyText"
                  class="bodyText--text"
                  type="number"
                  suffix="Imperial Aurei"
                  @change="updateCurrency()"
                />
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
        <v-card
          v-show="character.skills.length"
          class="mb-3"
          flat
        >
          <v-card-title
            class="primary headerText--text"
          >
            Skills
          </v-card-title>
          <v-card
            v-for="(skill, index) in character.skills"
            :key="'skill-' + index"
            flat
          >
            <v-card-title class="bodyText--text">
              {{ skill.name }}
            </v-card-title>
            <v-card-subtitle class="text-capitalize bodyText--text">
              {{ skill.trait }}
            </v-card-subtitle>
            <v-card-text class="bodyText--text">
              {{ skill.description }}
            </v-card-text>
          </v-card>
        </v-card>
      </v-col>
    </v-row>
    <v-card
      v-show="character.inventory"
      class="mb-3"
      flat
    >
      <v-card-title
        class="primary headerText--text"
      >
        Inventory
      </v-card-title>
      <v-card-text class="description">
        <v-textarea
          v-model="character.inventory"
          color="bodyText"
          class="bodyText--text"
          @change="updateInventory()"
        />
      </v-card-text>
      <v-card-actions class="justify-end">
        <v-btn
          class="white--text"
          color="secondary"
          @click="updateInventory()"
        >
          Save
        </v-btn>
      </v-card-actions>
      <v-snackbar
        v-model="snackbarSettings.show"
        :color="snackbarSettings.color"
        :timeout="snackbarSettings.timout"
      >
        <div class="headerText--text">
          {{ snackbarSettings.message }}
        </div>
      </v-snackbar>
    </v-card>
    <v-card
      v-show="character.personality"
      class="mb-3"
      flat
    >
      <v-card-title
        class="primary headerText--text"
      >
        Personality
      </v-card-title>
      <v-card-text class="description mt-3 bodyText--text">
        {{ character.personality }}
      </v-card-text>
    </v-card>
    <v-card
      v-show="character.background"
      flat
    >
      <v-card-title
        class="primary headerText--text"
      >
        Background
      </v-card-title>
      <v-card-text class="description mt-3 bodyText--text">
        {{ character.background }}
      </v-card-text>
    </v-card>
    <v-dialog
      v-model="showRollDialog"
      max-width="290"
    >
      <v-card>
        <v-card-title class="primary headerText--text">
          {{ activeTrait.trait }}
        </v-card-title>
        <v-card-text
          class="d-flex justify-space-between"
        >
          <div class="d-flex">
            <v-icon
              v-for="(roll, index) in rolls"
              :key="activeTrait.name + '-roll-' + roll + index"
            >
              mdi-dice-{{ roll }}
            </v-icon>
          </div>
          <v-card-title
            v-show="rollSum != 0"
          >
            {{ rollSum }}
          </v-card-title>
        </v-card-text>
        <v-card-title
          v-if="rerolls.length != 0"
        >
          Reroll
        </v-card-title>
        <v-card-text
          v-if="rerolls.length != 0"
          class="d-flex justify-space-between"
        >
          <div class="d-flex">
            <v-icon
              v-for="(reroll, index) in rerolls"
              :key="activeTrait.name + '-reroll-' + reroll + index"
            >
              mdi-dice-{{ reroll }}
            </v-icon>
          </div>
          <v-card-title>
            {{ rerollSum }}
          </v-card-title>
        </v-card-text>
        <v-card-actions>
          <v-btn
            v-show="rolls.length"
            color="secondary"
            :disabled="rerolls.length != 0"
            @click="rerollLowestRoll()"
          >
            Reroll Lowest
          </v-btn>
          <v-spacer />
          <v-btn
            color="secondary"
            @click="rollTraitCheck()"
          >
            Roll
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script lang="ts">
import {Component, Vue, Watch} from 'vue-property-decorator';
import {Character, Skill} from '../types';
import fb from '../firebaseConfig';

@Component
export default class CharacterSheet extends Vue {
  get character(): Character {
    return this.$store.state.character;
  }

  get rollSum(): number {
    if (this.rolls.length) {
      const reducer = (acc: number, curr: number) => acc + curr;
      return this.rolls.reduce(reducer);
    }
    return 0;
  }
  get rerollSum(): number {
    if (this.rerolls.length) {
      return this.rerolls.reduce((acc: number, curr: number) => {
        return acc + curr;
      });
    }
    return 0;
  }

  showRollDialog = false;
  rolls: number[] = [];
  rerolls: number[] = [];
  activeTrait = {
    trait: '',
    value: 0,
  };
  snackbarSettings = {
    show: false,
    timeout: 2000,
    message: '',
    color: 'primary',
  };

  @Watch('showRollDialog')
  resetRollsVars() {
    if (!this.showRollDialog) {
      this.rolls = [];
      this.rerolls = [];
      this.activeTrait.trait = '';
      this.activeTrait.value = 0;
    }
  }

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
    this.rerolls = [];

    for (let i = 0; i < this.activeTrait.value; i++) {
      this.rolls.push(Math.floor(Math.random() * 6) + 1);
    }
  }

  numberofRolls(skill: Skill): number {
    return this.character.traits[skill.trait];
  }

  rerollLowestRoll() {
    if (this.rolls.length) {
      const rerolls = [...this.rolls];
      const reroll = Math.floor(Math.random() * 6) + 1;
      const minimum = rerolls.reduce((acc, curr) => {
        if (acc > curr) {
          return curr;
        }
        return acc;
      });
      rerolls.splice(this.rolls.indexOf(minimum), 1, reroll);
      this.rerolls = rerolls;
    }
  }

  updateCurrentHealth() {
    fb.charactersCollection.doc(this.$store.state.currentUser.uid).update({
      currentHealth: this.character.currentHealth,
    });
  }

  updateInspiration() {
    fb.charactersCollection.doc(this.$store.state.currentUser.uid).update({
      inspiration: this.character.inspiration,
    });
  }

  updateCurrency() {
    fb.charactersCollection.doc(this.$store.state.currentUser.uid).update({
      currency: {
        imperialAurei: this.character.currency.imperialAurei,
        federalDollars: this.character.currency.federalDollars,
        republicCredits: this.character.currency.republicCredits,
      },
    });
  }

  updateInventory() {
    fb.charactersCollection.doc(this.$store.state.currentUser.uid).update({
      inventory: this.character.inventory,
    })
      .then(() => {
        this.snackbarSettings.message = 'Inventory saved.';
        this.snackbarSettings.color = 'primary';
        this.snackbarSettings.show = true;
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

.traits {
  .v-list-item:hover {
    background: #eaeaea;
    cursor: pointer;
    transition: ease .3s all;
  }

  .v-list-item__title {
    font-size: 1.25rem !important;
  }
}
</style>
