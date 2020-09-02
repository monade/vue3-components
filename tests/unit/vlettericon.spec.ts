import { mount } from '@vue/test-utils'
import { expect } from 'chai'
import VLetterIcon from '@/components/VLetterIcon.vue'

describe('VLetterIcon', () => {
  const component = mount(VLetterIcon, {
    propsData: {
      color: 'A'
    }
  });

  it('displays itself', () => {
    expect(component.find('span.v-letter-icon').exists()).to.eq(true);
  });
});
