<template>
  <v-card>
    <v-card-title class="headline pb-0">
      <v-col class="text-left pb-0">
        <p>User list</p>
      </v-col>
      <v-col class="text-right mb-4 pb-0">
        <v-dialog
          v-model="dialog"
          persistent
          max-width="600px"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              v-bind="attrs"
              v-on="on"
            >
              <v-icon>
                {{ icons.mdiPlus }}
              </v-icon>
            </v-btn>
          </template>
          <v-card>
            <v-card-title>
              <span class="text-h5">User Profile</span>
            </v-card-title>
            <v-card-text>
              <v-container>
                <v-form
                  ref="form"
                  v-model="models.valid"
                  lazy-validation
                >
                  <v-row>
                    <v-col
                      cols="12"
                    >
                      <v-text-field
                        label="Name*"
                        v-model="models.name"
                        :rules="models.nameRules"
                      ></v-text-field>
                    </v-col>
                    <v-col
                      cols="12"
                    >
                      <v-text-field
                        label="Job title*"
                        v-model="models.jobTitle"
                        :rules="models.jobTitleRules"
                      ></v-text-field>
                    </v-col>
                    <v-col
                      cols="12"
                    >
                      <v-text-field
                        label="Avatar url"
                        hint="example of persistent helper text"
                        v-model="models.avatar"
                        :rules="models.avatarRules"
                      ></v-text-field>
                    </v-col>
                  </v-row>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn @click="dialog = false">
                      close
                    </v-btn>
                    <v-btn
                      class="mr-4"
                      @click="save"
                    >
                      save
                    </v-btn>
                  </v-card-actions>
                </v-form>
              </v-container>
              <small>*indicates required field</small>
            </v-card-text>
          </v-card>
        </v-dialog>
      </v-col>
    </v-card-title>
    <v-card-text>
      <v-dialog
        v-model="dialogLength"
        width="300"
      >
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            v-bind="attrs"
            v-on="on"
          >
            show the number of items
          </v-btn>
        </template>
        <v-card>
          <v-card-title>
            Number of items
          </v-card-title>
          <v-card-text>
            Quantity: {{ items.length }}
          </v-card-text>

          <v-divider></v-divider>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              text
              @click="dialogLength = false"
            >
              Ok
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <v-list three-line>
        <template v-if="items.length">
          <template v-for="(item, index) in items">
            <v-divider
              v-if="index !== 0 && index !== items.length"
              :key="index"
              inset
            ></v-divider>
            <v-list-item
              :key="item.name + index"
            >
              <v-list-item-group>
                <v-img class="rounded-circle mr-6" width="50" :src="item.avatar.length ? item.avatar : imgPlaceholder"></v-img>
              </v-list-item-group>

              <v-list-item-content>
                <v-list-item-title v-html="item.name"></v-list-item-title>
                <v-list-item-subtitle v-html="item.jobTitle"></v-list-item-subtitle>
              </v-list-item-content>

              <v-list-item-group>
                <v-btn @click="deleteItem(index)">
                  <v-icon>
                    {{ icons.mdiDelete }}
                  </v-icon>
                </v-btn>
              </v-list-item-group>
            </v-list-item>
          </template>
        </template>
        <template v-else>
          <v-col class="text-center">
            <p>The list is empty. Add a user.</p>
          </v-col>
        </template>
      </v-list>
    </v-card-text>
    <confirm ref="confirmRef" />
  </v-card>
</template>

<script>
import {
    mdiDelete,
    mdiPlus
} from '@mdi/js';
import confirm from './confirm.vue';

const urlReg = /^(http[s]*:\/\/)([a-z\-_0-9/.]+)\.([a-z.]{2,3})\/([a-z0-9\-_/._~:?#[\]@!$&'()*+,;=%]*)([a-z0-9]+\.)(jpg|jpeg|png)/i;
export default {
    name: 'users',
    components: { confirm },
    data: () => ({
        dialogLength: false,
        dialog: false,
        icons: {
            mdiDelete,
            mdiPlus
        },
        imgPlaceholder: 'https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png',
        models: {
            valid: true,
            name: '',
            nameRules: [
                (v) => !!v || 'Name is required'
            ],
            jobTitle: '',
            jobTitleRules: [
                (v) => !!v || 'Job title title is required'
            ],
            avatar: '',
            avatarRules: [
                (v) => ((v && v.length > 0 && !urlReg.test(v)) ? 'Avatar url must be valid' : true)
            ]
        }
    }),
    computed: {
        items() { return this.$store.getters.getItems; }
    },
    methods: {
        deleteItem(index) {
            this.$refs.confirmRef.open('Delete', 'Are you sure?', { color: 'red' }).then((res) => {
                if (res) this.$store.commit('store/DELETE_ITEM', index);
            });
        },
        save() {
            const valid = this.$refs.form.validate();
            if (valid) {
                this.$store.commit('store/ADD_ITEM', JSON.parse(JSON.stringify(this.models)));
                this.$refs.form.reset();
                this.dialog = false;
            }
        }
    }
};
</script>

<style scoped>

</style>
