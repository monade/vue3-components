import { mount } from '@vue/test-utils'
import { expect } from 'chai'
import VEntryList from '@/components/VEntryList.vue'

describe('VEntryList', () => {
  const component = mount(VEntryList, {
    propsData: {
      items: [
        { id: '1', name: 'test' },
        { id: '2', name: 'test 2' }
      ]
    }
  });

  it('displays itself', async () => {
    expect(component.find('.entry-list').exists()).to.eq(true)
  });
});
