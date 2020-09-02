import { mount } from '@vue/test-utils'
import { expect } from 'chai'
import VCheckButton from '@/components/VCheckButton.vue'

describe('VCheckButton', () => {
  const component = mount(VCheckButton, {
    propsData: {
      value: false
    }
  });

  it('displays itself', () => {
    expect(component.find('span.v-check-button-wrapper').exists()).to.eq(true);
  });

  it('toggles value if clicked', async () => {
    component.find('span.v-check-button-wrapper').trigger('click');
    await component.vm.$nextTick();
    expect(component.emitted('input')?.length).to.eq(1);
  });
});
