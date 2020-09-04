import { mount } from '@vue/test-utils'
import { expect } from 'chai'
import VSelect from '../../src/components/VSelect.vue'

describe('VSelect', () => {
  const component = mount(VSelect, {
    propsData: {
      value: '',
      options: [
        { id: '1', text: 'option 1' },
        { id: '2', text: 'option 2' },
        { id: '3', text: 'option 3' }
      ]
    }
  });

  it('displays itself', () => {
    expect(component.find('span.v-select').exists()).to.eq(true);
  });

  it('selects a value by clicking the label and choosing an option', async () => {
    const label = component.findAll('input.form-control').wrappers[0];
    label.trigger('click');
    await component.vm.$nextTick();
    component.find('div.v-select__option').trigger('click');
    await component.vm.$nextTick();
    expect(component.emitted('input')?.length).to.eq(1);
  });

  it('displays add options ui if the component is addable', async () => {
    component.setProps({
      value: '',
      options: [
        { id: '1', text: 'option 1' },
        { id: '2', text: 'option 2' },
        { id: '3', text: 'option 3' }
      ],
      addable: true
    });

    const label = component.findAll('input.form-control').wrappers[0];
    label.trigger('click');
    await component.vm.$nextTick();
    component.find('div.v-select__option--add').trigger('click');
    await component.vm.$nextTick();
    expect(component.find('input[placeholder="Inserisci descrizione..."]').exists()).to.eq(true);
  });

  it('displays editable options ui if the option is editable', async () => {
    component.setProps({
      value: '',
      options: [
        { id: '1', text: 'option 1', editable: true },
        { id: '2', text: 'option 2', editable: true },
        { id: '3', text: 'option 3', editable: true }
      ]
    });
    const label = component.findAll('input.form-control').wrappers[0];
    label.trigger('click');
    await component.vm.$nextTick();
    component.find('button').trigger('click');
    await component.vm.$nextTick();
    expect(component.find('input[placeholder="Inserisci descrizione..."]').exists()).to.eq(true);
  });
});
