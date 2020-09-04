import { mount } from '@vue/test-utils'
import { expect } from 'chai'
import VEntryList from '../../src/components/VEntryList.vue'

describe('VEntryList', () => {
  const component = mount(VEntryList, {
    propsData: {
      items: [
        { id: '1', name: 'test' },
        { id: '2', name: 'test 2' }
      ],
      selectable: true
    }
  });

  it('displays itself', async () => {
    expect(component.find('.entry-list').exists()).to.eq(true)
  });
  it('fires event if an item gets selected', async () => {
    const lis = component.findAll('li').wrappers;
    lis[0].trigger('click');
    await component.vm.$nextTick();
    expect(component.emitted('selected')?.length).to.eq(1);
  });
});
