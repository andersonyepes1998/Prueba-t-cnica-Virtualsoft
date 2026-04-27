import { mount } from '@vue/test-utils'
import LoginPage from '@/views/LoginPage.vue'
import { describe, expect, test } from 'vitest'

describe('LoginPage.vue', () => {
  test('renders login page', () => {
    const wrapper = mount(LoginPage)
    expect(wrapper.text()).toMatch('Ready to create an app?')
  })
})
