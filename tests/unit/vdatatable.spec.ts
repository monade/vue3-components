import { mount } from '@vue/test-utils'
import { expect } from 'chai'
import VDataTable from '../../src/components/VDataTable.vue'

describe('VDataTable', () => {
  const component = mount(VDataTable, {
    propsData: {
      columns: [{
        sortable: false,
        name: 'test',
        label: 'Test'
      }],
      values: [{ test: '1' }, { test: '2' }],
      sortable: false,
      loading: false
    }
  });

  it('displays a table', async() => {
    expect(component.find('table.table').exists()).to.eq(true);
    expect(component.find('table.table tr th').text()).to.eq('Test');
    expect(component.find('table.table tr td').text()).to.eq('1');
  });

  it('emits an event if a cell is clicked on', async () => {
    component.find('table.table tr td').trigger('click');
    await component.vm.$nextTick();
    expect(component.emitted('selected')?.length).to.eq(1);
  });

  it('sorts for a column when a header cell is clicked, given it is labeled as sortable', async () => {
    component.setProps({
      columns: [{
        sortable: true,
        name: 'test',
        label: 'Test'
      }],
      values: [{ test: '2' }, { test: '1' }],
      sortable: true,
      loading: false
    });
    await component.vm.$nextTick();
    component.find('table.table tr th a').trigger('click');
    await component.vm.$nextTick();
    expect(component.emitted('sorted')?.length).to.eq(1);
  });
});
