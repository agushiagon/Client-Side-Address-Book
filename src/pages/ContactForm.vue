<template>
  <v-container fluid>
    <v-card class="px-8 pb-8" :title="`${isEditMode ? 'Edit':'New'} Contact`">
      <v-form @submit.prevent="submitForm">
        <v-text-field
          v-model="contact.firstName"
          class="mb-2"
          label="First Name"
          :rules="[requiredRule]"
        />
        <v-text-field
          v-model="contact.lastName"
          class="mb-2"
          label="Last Name"
          :rules="[requiredRule]"
        />
        <v-text-field
          v-model="contact.email"
          class="mb-2"
          label="Email"
          :rules="[requiredRule, emailRule]"
          type="text"
        />
        <v-select
          v-model="contact.country"
          class="mb-2"
          clearable
          :items="countries"
          label="Country"
          :rules="[requiredRule]"
        />
        <div class="d-flex justify-end">
          <v-btn color="primary" type="submit">
            {{ isEditMode ? 'Update Contact' : 'Add Contact' }}
          </v-btn>
        </div>

      </v-form>
    </v-card></v-container>
</template>

  <script lang="ts" setup>
  import { computed, onMounted, ref } from 'vue'
  import { useRoute, useRouter } from 'vue-router'
  import CountryList from 'country-list'

  interface Contact {
    firstName: string;
    lastName: string;
    email: string;
    country: string;
  }

  const route = useRoute()
  const router = useRouter()
  const countries = CountryList.getNames()

  const contact = ref<Contact>({
    firstName: '',
    lastName: '',
    email: '',
    country: '',
  })

  const isEditMode = computed(() => !!route.params.id)

  const emailRule = (value: string) => {
    return /.+@.+\..+/.test(value) || 'Invalid email'
  }

  const requiredRule = (value: string) => {
    return !!value || 'Required.'
  }

  onMounted(() => {
    if (isEditMode.value) {
      fetchContact(route.params.id as string)
    }
  })

  const fetchContact = async (id: string) => {
    console.log(id)
  }

  const submitForm = () => {
    if (isEditMode.value) {
      updateContact()
    } else {
      addContact()
    }
  }

  const addContact = async () => {
    console.log('add')
    router.push('/home')
  }

  const updateContact = async () => {
    console.log('update')
    router.push('/home')
  }
  </script>
