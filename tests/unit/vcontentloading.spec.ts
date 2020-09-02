import { mount } from '@vue/test-utils'
import { expect } from 'chai'
import VContentLoading from '@/components/VContentLoading.vue'

describe('VContentLoading', () => {
  const component = mount(VContentLoading, {
    propsData: {
      notchSize: '3x'
    }
  });

  it('displays itself', async () => {
    expect(component.find('.overlay').exists()).to.eq(true);
  });
});
