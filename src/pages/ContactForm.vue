<template>
  <v-container fluid>
    <v-row align="center" justify="center">
      <v-col cols="12" lg="5" md="8">
        <v-card
          class="px-8 pb-8"
          :disabled="isLoading"
          max-width="100%"
          :title="`${isEditMode ? 'Edit' : 'New'} Contact`"
        >
          <template v-if="fatchingData">
            <v-skeleton-loader type="heading" />
            <v-skeleton-loader type="heading" />
            <v-skeleton-loader type="heading" />
            <v-skeleton-loader type="heading" />
            <v-skeleton-loader type="actions" />
          </template>
          <template v-else>
            <v-form ref="formRef" @submit.prevent="submitForm">
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
                <v-btn
                  color="primary"
                  :disabled="isLoading"
                  :loading="isLoading"
                  type="submit"
                >
                  {{ isEditMode ? "Update Contact" : "Add Contact" }}
                </v-btn>
                <v-btn
                  v-if="isEditMode"
                  class="ml-2"
                  color="red"
                  :disabled="isLoading"
                  :loading="isLoading"
                  @click="deleteContact()"
                >
                  Delete Contact
                </v-btn>
              </div>
            </v-form>
          </template>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts" setup>
  import { computed, onMounted, ref } from 'vue'
  import { useRoute, useRouter } from 'vue-router'
  import CountryList from 'country-list'
  import { Contact } from '@/types/index'
  import { useToast } from 'vue-toastification'
  import {
    addNewContact,
    deleteContactById,
    getContactById,
    updateContact,
  } from '@/api/index'
  import { VForm } from 'vuetify/components'

  const route = useRoute()
  const router = useRouter()
  const toast = useToast()
  const countries = CountryList.getNames()

  const contact = ref<Contact>({
    firstName: '',
    lastName: '',
    email: '',
    country: '',
  })

  const isEditMode = computed(() => !!route.params.id)
  const isLoading = ref(false)
  const fatchingData = ref(false)

  const emailRule = (value: string) => {
    return /.+@.+\..+/.test(value) || 'Invalid email'
  }

  const requiredRule = (value: string) => {
    return !!value || 'Required.'
  }

  const formRef = ref<VForm | null>(null)

  onMounted(() => {
    if (isEditMode.value) {
      fetchContact(route.params.id as string)
    }
  })

  const fetchContact = async (id: string) => {
    fatchingData.value = true
    try {
      contact.value = await getContactById(id)
    } catch (error) {
      router.push('/contact-list')
      toast.error('Failed to fetch contact.')
    }
    fatchingData.value = false
  }

  const submitForm = async () => {
    if (formRef.value) {
      isLoading.value = true
      await formRef.value.validate()
      const isValid = formRef.value.isValid
      if (isValid) {
        try {
          if (isEditMode.value) {
            await updateContactData()
          } else {
            await addContact()
          }
        } catch (error) {
          toast.error('An error occurred')
        }
      } else {
        toast.error('Form is not valid!')
      }
      isLoading.value = false
    }
  }

  const addContact = async () => {
    await addNewContact(contact.value)
    toast.success('Contact added successfully')
    router.push('/contact-list')
  }

  const updateContactData = async () => {
    await updateContact(route.params.id as string, contact.value)
    toast.success('Contact updated successfully')
    router.push('/contact-list')
  }

  const deleteContact = async () => {
    isLoading.value = true
    try {
      await deleteContactById(route.params.id as string)
      toast.success('Contact deleted successfully')
      router.push('/contact-list')
    } catch (error) {
      toast.error('Failed to delete contact')
    }
    isLoading.value = false
  }
</script>
