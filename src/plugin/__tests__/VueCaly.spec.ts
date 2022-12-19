import { describe, it, expect } from 'vitest'

import { mount } from '@vue/test-utils'
import VueCaly from '../VueCaly.vue'

describe('VueCaly', () => {
  it('renders properly', () => {
    const wrapper = mount(VueCaly, { props: { msg: 'Hello Vitest' } })
    expect(wrapper.text()).toContain('Hello Vitest')
  })
})
