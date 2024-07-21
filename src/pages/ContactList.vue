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
            :loading="loadingData"
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
                class="d-flex justify-center align-center py-8"
                flat
              >
                <v-icon
                  class="pa-3"
                  color="primary"
                  size="35"
                >
                  mdi-information-outline
                </v-icon>
                <div>
                  <v-card-text class="text-h6">
                    {{ contacts.length ? 'No result was found :)': ' No Data' }}
                  </v-card-text>
                </div>
              </v-card>
            </template>
            <template #loading>
              <v-skeleton-loader
                height="300px"
                type="table-row-divider@5"
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
  import { fetchContacts } from '@/api/index'
  import { useToast } from 'vue-toastification'

  const headers = [
    { title: 'First Name', value: 'firstName' },
    { title: 'Last Name', value: 'lastName' },
    { title: 'Email', value: 'email' },
    { title: 'Country', value: 'country' },
  ]

  const contacts = ref<Contact[]>([])
  const toast = useToast()
  const loadingData = ref(false)
  const search = ref<string>('')

  onMounted(async () => {
    loadingData.value = true
    await loadData()
    loadingData.value = false
  })

  const loadData = async () => {
    try {
      contacts.value = await fetchContacts()
    } catch (error) {
      toast.error('Failed to fetch data')
    }
  }

</script>

<style scoped>

</style>
