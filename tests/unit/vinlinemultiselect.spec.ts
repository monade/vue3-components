import { mount } from '@vue/test-utils'
import { expect } from 'chai'
import VInlineMultiSelect from '@/components/VInlineMultiSelect.vue'

describe('VInlineMultiSelect', () => {
  const component = mount(VInlineMultiSelect, {
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
    expect(component.emitted('change')?.length).to.eq(2);
    checkboxes.wrappers[1].trigger('click');
    await component.vm.$nextTick();
    expect(component.emitted('change')?.length).to.eq(3);
  });
});
