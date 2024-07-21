import { expect, test } from '@playwright/test'

test.describe('Contact form', () => {
  test('Check if add contact from renders correctly', async ({ page }) => {
    await page.goto('http://localhost:3000/add-contact', { waitUntil: 'networkidle' })

    await expect(page.locator('text=New Contact')).toBeVisible()
    await expect(page.getByRole('button', { name: 'Add Contact' })).toBeVisible()
  })

  test('Check if edit contact from renders correctly', async ({ page }) => {
    await page.route('http://localhost:3001/users/1', async route => {
      return route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          firstName: 'Agon',
          lastName: 'Agushi',
          email: 'agon@agushi.test',
          country: 'Albania',
        }),
      })
    })
    await page.goto('http://localhost:3000/edit-contact/1', { waitUntil: 'networkidle' })

    await expect(page.getByRole('button', { name: 'Update Contact' })).toBeVisible()
    await expect(page.getByRole('button', { name: 'Delete Contact' })).toBeVisible()
  })

  test('Validates form fields', async ({ page }) => {
    await page.goto('http://localhost:3000/add-contact', { waitUntil: 'networkidle' })

    await page.getByLabel('First Name').fill('')
    await page.getByLabel('Last Name').fill('')
    await page.getByLabel('Email').fill('invalid-email')
    await page.click('button:has-text("Add Contact")')

    await expect(page.locator('text=Required.')).toHaveCount(3)
    await expect(page.locator('text=Invalid email')).toBeVisible()
  })

  test('Shows skeleton loaders when fetching data', async ({ page }) => {
    await page.route('http://localhost:3001/users/1', async route => {
      await expect(page.locator('.v-skeleton-loader')).toHaveCount(5)

      return route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          id: '883c',
          firstName: 'Agon',
          lastName: 'Agushi',
          email: 'agon@agushi.test',
          country: 'Albania',
        }),
      })
    })
    await page.goto('http://localhost:3000/edit-contact/1', { waitUntil: 'networkidle' })
  })

  test('Handles delete action', async ({ page }) => {
    await page.route('http://localhost:3001/users/1', async route => {
      return route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          id: '883c',
          firstName: 'Agon',
          lastName: 'Agushi',
          email: 'agon@agushi.test',
          country: 'Albania',
        }),
      })
    })
    await page.goto('http://localhost:3000/edit-contact/1', { waitUntil: 'networkidle' })
    await page.click('button:has-text("Delete Contact")')

    await page.route('http://localhost:3001/users/1', async route => {
      return route.fulfill({
        status: 200,
        contentType: 'application/json',
      })
    })
    await expect(page.locator('text=Contact deleted successfully')).toBeVisible()
  })

  test('Submits the edit form and shows success message', async ({ page }) => {
    await page.route('http://localhost:3001/users/1', async route => {
      return route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          id: '883c',
          firstName: 'Agon',
          lastName: 'Agushi',
          email: 'agon@agushi.test',
          country: 'Albania',
        }),
      })
    })
    await page.goto('http://localhost:3000/edit-contact/1', { waitUntil: 'networkidle' })

    await page.getByLabel('First Name').fill('AgonTest')
    await page.click('button:has-text("Update Contact")')

    await page.route('http://localhost:3001/users/1', async route => {
      return route.fulfill({
        status: 200,
        contentType: 'application/json',
      })
    })

    await expect(page.locator('text=Contact updated successfully')).toBeVisible()
  })
  test('Submits the add new contact form and shows success message', async ({ page }) => {
    await page.goto('http://localhost:3000/add-contact')
    await page.getByLabel('First Name').fill('Agon')
    await page.getByLabel('Last Name').fill('Agushi')
    await page.getByLabel('Email').fill('Agon@test.com')
    await page.locator('i').nth(1).click()
    await page.getByText('Albania').click()

    await page.click('button:has-text("Add Contact")')

    await page.route('http://localhost:3001/users/', async route => {
      return route.fulfill({
        status: 200,
        contentType: 'application/json',
      })
    })

    await expect(page.locator('text=Contact added successfully')).toBeVisible()
  })
})
