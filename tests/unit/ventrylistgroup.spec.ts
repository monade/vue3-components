import { mount } from '@vue/test-utils'
import { expect } from 'chai'
import VEntryListGroup from '../../src/components/VEntryListGroup.vue'

describe('VEntryListGroup', () => {
  const component = mount(VEntryListGroup, {
    propsData: {
      items: [
        {
          id: '1',
          title: 'Elementi',
          entries: [
            { id: '1', name: 'test' },
            { id: '2', name: 'test 2' }
          ]
        }
      ],
      selectable: true
    }
  });

  it('shows itself', () => {
    expect(component.find('div.entry-list-group').exists()).to.eq(true);
  });
});
