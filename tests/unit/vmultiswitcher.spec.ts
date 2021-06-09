import { mount } from '@vue/test-utils'
import { expect } from 'chai'
import VMultiSwitcher from '../../src/components/VMultiSwitcher.vue'
import SelectOption from '../../src/models/SelectOption';

describe('VMultiSwitcher', () => {
  const options: Array<SelectOption> = [
    {
      id: '1',
      text: 'Text 1',
      disabled: false
    },
    {
      id: '2',
      text: 'Text 2',
      disabled: true
    },
    {
      id: '3',
      text: 'Text 3',
      disabled: false
    }
  ];
  const component = mount(VMultiSwitcher, {
    propsData: {
      value: '',
      items: options
    }
  });

  it('displays itself', () => {
    expect(component.find('div.btn-group.btn-group-toggle').exists()).to.eq(true);
  });

  it('selects an active item when clicked', async () => {
    const options = component.findAll('.btn').wrappers;
    expect(options.length).to.eq(3);
    options[0].trigger('click');
    await component.vm.$nextTick();
    expect(component.vm.$data.selected).to.eq('1');
  });

  it('doesn\'t select a disabled item when clicked', async () => {
    const options = component.findAll('.btn').wrappers;
    expect(options.length).to.eq(3);
    options[1].trigger('click');
    await component.vm.$nextTick();
    expect(component.vm.$data.selected).to.eq('1');
  });
});
