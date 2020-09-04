import { mount } from '@vue/test-utils'
import { expect } from 'chai'
import VEntrySearch from '../../src/components/VEntrySearch.vue'

describe('VEntrySearch', () => {
  const component = mount(VEntrySearch, {
    propsData: {
      load: async function() {
        Promise.resolve([
          {
            id: '1',
            name: 'test 1'
          },
          {
            id: '2',
            name: 'test 2'
          }
        ])
      }
    }
  });

  it('displays itself', () => {
    expect(component.find('.entry-search').exists()).to.eq(true);
  });

  it('searches for a term when the input is long enough', async () => {
    component.setData({
      term: 'AAA'
    });
    await component.vm.$nextTick();
    await (component.vm as any).search();
    await component.vm.$nextTick();
    expect(component.emitted('searched')?.length).to.eq(1);
  });
});
