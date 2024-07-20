<template>
  <v-container fluid>
    <v-card class="px-8 pb-8" title="Contacts List">
      <v-row>
        <v-col>
          <v-text-field
            v-model="search"
            density="compact"
            hide-details
            label="Search"
            max-width="300"
            prepend-inner-icon="mdi-magnify"
            variant="outlined"
          />
        </v-col>
        <v-spacer />
        <v-col class="d-flex align-center justify-end">
          <v-btn :to="{name: 'add-contact-view'}">
            Add New Contact
          </v-btn>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-data-table
            class="elevation-1"
            :headers="headers"
            hide-default-footer
            item-key="email"
            :items="contacts"
            :search="search"
          >
            <template #item="props">
              <tr>
                <td class="text-left">
                  {{ props.item.firstName }}
                </td>
                <td class="text-left">
                  {{ props.item.lastName }}
                </td>
                <td class="text-left">
                  {{ props.item.email }}
                </td>
                <td class="text-left">
                  {{ props.item.country }}
                </td>
              </tr>
            </template>
            <template #no-data>
              <v-card
                class="d-flex align-center py-8"
                flat
                tile
              >
                <v-icon
                  class="pa-3"
                  color="primary"
                  size="35"
                >
                  mdi-information-outline
                </v-icon>
                <div class="ma-3">
                  <v-card-text class="text-h6 text-left primary--text pa-0">
                    No Data
                  </v-card-text>
                </div>
              </v-card>
            </template>
            <template #loading>
              <v-skeleton-loader
                height="400px"
                type="table-row-divider@9"
              />
            </template>
          </v-data-table>
        </v-col>
      </v-row>
    </v-card>

  </v-container>

</template>

<script setup lang="ts">
  import { onMounted, ref } from 'vue'
  import { Contact } from '@/types/index'
  import { fetchData } from '@/api/index'

  const headers = [
    { title: 'First Name', value: 'firstName' },
    { title: 'Last Name', value: 'lastName' },
    { title: 'Email', value: 'email' },
    { title: 'Country', value: 'country' },
  ]

  const contacts = ref<Contact[]>([])

  const search = ref<string>('')

  onMounted(async () => {
    await fetchData()
  })

</script>

<style scoped>

</style>
