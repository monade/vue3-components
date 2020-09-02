import { mount } from '@vue/test-utils'
import { expect } from 'chai'
import VNumberPicker from '@/components/VNumberPicker.vue'

describe('VNumberPicker', () => {
  const component = mount(VNumberPicker, {
    propsData: {
      value: 0
    }
  });

  it('displays itself', () => {
    expect(component.find('span.v-number-picker').exists()).to.eq(true);
  });

  it('adds 1 step to the number when up is clicked', async () => {
    const button = component.findAll('.v-number-picker__button').wrappers;
    button[0].trigger('click');
    await component.vm.$nextTick();
    expect(component.vm.$data.number).to.eq(1);
  });

  it('subtracts 1 step to the number when down is clicked', async () => {
    const button = component.findAll('.v-number-picker__button').wrappers;
    button[1].trigger('click');
    await component.vm.$nextTick();
    expect(component.vm.$data.number).to.eq(0);
  });
});
