import { describe, it, expect } from 'vitest'

import { mount } from '@vue/test-utils'
import VueCaly from '../VueCaly.vue'

describe('VueCaly', () => {
  it('renders properly', () => {
    const wrapper = mount(VueCaly, {  })
    expect(wrapper.text()).toContain('Mo')
  })
})
