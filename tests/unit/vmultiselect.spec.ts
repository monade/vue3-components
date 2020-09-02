import { mount } from '@vue/test-utils'
import { expect } from 'chai'
import VMultiSelect from '@/components/VMultiSelect.vue'

describe('VMultiSelect', () => {
  const component = mount(VMultiSelect, {
    propsData: {
      value: [],
      options: [
        { id: '1', name: 'Option 1', group: 'Group 1' },
        { id: '2', name: 'Option 2', group: 'Group 1' },
        { id: '3', name: 'Option 3', group: 'Group 2' }
      ]
    }
  });

  it('selects many elements and fires an event each time the selected items change', async () => {
    component.find('.multiselect-selection').trigger('click');
    await component.vm.$nextTick();
    const checkboxes = component.findAll('input[type="checkbox"]');
    checkboxes.wrappers[0].trigger('click');
    await component.vm.$nextTick();
    checkboxes.wrappers[1].trigger('click');
    await component.vm.$nextTick();
    expect(component.vm.$data.selected?.length).to.eq(2);
    expect(component.emitted('input')?.length).to.eq(2);
    checkboxes.wrappers[1].trigger('click');
    await component.vm.$nextTick();
    expect(component.vm.$data.selected?.length).to.eq(1);
    expect(component.emitted('input')?.length).to.eq(3);
  });
});
