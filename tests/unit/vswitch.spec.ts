import { mount } from '@vue/test-utils'
import { expect } from 'chai'
import VSwitch from '../../src/components/VSwitch.vue'

describe('VSwitch', () => {
  const component = mount(VSwitch, {
    propsData: {
      value: false,
      disabled: false
    }
  });

  it('emits input when clicked', async () => {
    component.find('div.toggle').trigger('click');
    await component.vm.$nextTick();
    expect(component.vm.$data.checked).to.eq(true);
    expect(component.emitted('input')?.length).to.eq(1);
    expect(component.emitted('input')?.[0]?.[0]).to.eq(true);
  })

  it('does nothing if it is disabled', async () => {
    component.setProps({
      value: false,
      disabled: true
    });
    await component.vm.$nextTick();
    component.setData({ checked: false });
    await component.vm.$nextTick();
    component.find('div.toggle').trigger('click');
    await component.vm.$nextTick();
    expect(component.vm.$data.checked).to.eq(false);
    expect(component.emitted('input')?.length).to.eq(1);
  })
});
