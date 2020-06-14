<template>
  <v-dialog
    v-model="showSelectPictureModal"
    width="80%"
  >
    <v-card>
      <v-card-title class="primary headerText--text">
        Select Picture
      </v-card-title>
      <v-card-text
        v-if="pictures.length"
        class="d-flex flex-wrap justify-center"
      >
        <v-card
          v-for="(picture, index) in pictures"
          :key="`image-${index}`"
          class="primary ma-3"
          @click="selectPicture(picture)"
        >
          <v-img
            contain
            width="200"
            height="300"
            :src="picture"
          >
            <div
              v-if="selectedPicture == picture"
              class="primary d-flex justify-end"
            >
              <v-icon>mdi-check-bold</v-icon>
            </div>
          </v-img>
        </v-card>
      </v-card-text>
      <v-card-actions class="justify-space-between">
        <v-btn
          color="error"
          @click="showSelectPictureModal = false"
        >
          Cancel
        </v-btn>
        <v-btn
          color="secondary"
          @click="saveSelection"
        >
          Confirm
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import {Component, Vue, Prop, Watch} from 'vue-property-decorator';
import fb from '../firebaseConfig';

@Component
export default class SelectPictureModal extends Vue {
  @Prop() showModal!: boolean;
  @Prop() toggleModal!: any;
  @Prop() setPicture!: any;

  pictures: string[] = [];
  selectedPicture = '';

  get showSelectPictureModal() {
    return this.showModal;
  }

  set showSelectPictureModal(val: boolean) {
    this.toggleModal(val);
  }

  @Watch('showModal')
  getPictures() {
    if (this.showModal) {
      this.pictures = [];
      fb.storageNotePicturesRef.listAll()
        .then((res) => {
          res.items.forEach((imageRef) => {
            this.getImageUrl(imageRef);
          });
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }

  getImageUrl(imageRef: any) {
    imageRef.getDownloadURL()
      .then((url: string) => {
        this.pictures.push(url);
      });
  }

  selectPicture(picture: string) {
    this.selectedPicture = picture;
  }

  saveSelection() {
    this.setPicture(this.selectedPicture);
    this.showSelectPictureModal = false;
  }
}
</script>

<style lang="scss" scoped>
</style>
