import { mount } from '@vue/test-utils'
import { expect } from 'chai'
import VColorPicker from '@/components/VColorPicker.vue'

describe('VColorPicker', () => {
  const component = mount(VColorPicker, {
    propsData: {
      colors: ['#ffffff', '#000000', '#ff0000', '#00ff00', '#0000ff'],
      color: '#ffffff'
    }
  });

  it('shows the main component', async () => {
    expect(component.find('.color-indicator').exists()).to.eq(true);
  });

  it('shows the picker when clicked', async () => {
    component.find('.clickable').trigger('click');
    await component.vm.$nextTick();
    expect(component.find('.show').exists()).to.eq(true);
  });

  it('emits an event when a color is picked', async () => {
    component.find('.color-picker-indicator').trigger('click');
    await component.vm.$nextTick();
    expect(component.emitted('change')?.length).to.eq(1);
  });
});
