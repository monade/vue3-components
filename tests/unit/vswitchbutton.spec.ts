import { mount } from '@vue/test-utils'
import { expect } from 'chai'
import VSwitchButton from '@/components/VSwitchButton.vue'

describe('VSwitchButton', () => {
  const component = mount(VSwitchButton, {
    propsData: {
      value: false
    }
  });

  it('displays itself', () => {
    expect(component.find('span.v-switch-button-wrapper').exists()).to.eq(true);
  });

  it('emits an input event once it gets clicked', async () => {
    component.find('span.v-switch-button-wrapper').trigger('click');
    await component.vm.$nextTick();
    expect(component.emitted('input')?.length).to.eq(1);
  });
});
