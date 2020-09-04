import { mount } from '@vue/test-utils'
import { expect } from 'chai'
import VListGroup from '../../src/components/VListGroup.vue'

describe('VListGroup', () => {
  const component = mount(VListGroup, {
    propsData: {
      items: [
        {
          item1: 'test 1'
        },
        {
          item2: 'test 2'
        }
      ]
    }
  })

  it('displays itself', () => {
    expect(component.find('.list-group.list-group-flush').exists()).to.eq(true);
  });

  it('selects an item when clicked and component is marked selectable', async () => {
    component.setProps({
      items: [
        {
          item1: 'test 1'
        },
        {
          item2: 'test 2'
        }
      ],
      selectable: true
    });
    await component.vm.$nextTick();
    component.find('li.list-group-item').trigger('click');
    await component.vm.$nextTick();
    expect(component.emitted('selected')?.length).to.eq(1);
  })

  it('shows badges when it is marked as ordered', async () => {
    component.setProps({
      items: [
        {
          item1: 'test 1'
        },
        {
          item2: 'test 2'
        }
      ],
      ordered: true
    });
    await component.vm.$nextTick();
    expect(component.find('span.badge').exists()).to.eq(true);
  });
});
