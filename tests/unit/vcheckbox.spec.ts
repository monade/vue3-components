import { mount } from '@vue/test-utils'
import { expect } from 'chai'
import VCheckbox from '../../src/components/VCheckbox.vue'

describe('VCheckbox', () => {
  const component = mount(VCheckbox, {
    propsData: {
      value: false,
      label: 'testo',
      disabled: false
    }
  });

  it('should render a checkbox', async () => {
    expect(component.find('label').text()).to.eq('testo');
  });
  it('should emit an event when clicked', async () => {
    component.find('input').trigger('click');
    await component.vm.$nextTick();
    expect(component.emitted('input')?.length).to.eq(1);
  });
  it('should emit no events when clicked while disabled', async () => {
    component.setProps({
      value: false,
      label: 'testo',
      disabled: true
    });
    await component.vm.$nextTick();
    component.find('input').trigger('click');
    await component.vm.$nextTick();
    expect(component.emitted('input')?.length).to.eq(1);
  });
});
