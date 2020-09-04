import { mount } from '@vue/test-utils'
import { expect } from 'chai'
import VDatePickerModal from '../../src/components/VDatePickerModal.vue'

describe('VDatePickerModal', () => {
  const component = mount(VDatePickerModal, {
    propsData: {
      title: 'Test data',
      dateLabel: 'Data',
      timeLabel: 'Ora'
    }
  });

  it('is hidden when just created', () => {
    expect(component.find('.modal.fade.show').exists()).to.eq(false);
  });

  it('shows the date picker when show is called', async () => {
    (component.vm as any).show();
    await component.vm.$nextTick();
    expect(component.find('.modal.fade.show').exists()).to.eq(true);
  });

  it('returns the date and the modal will close', async () => {
    component.find('button[type="submit"]').trigger('click');
    await component.vm.$nextTick();
    expect(component.emitted('confirmed')?.length).to.eq(1);
    expect(component.find('.modal.fade.show').exists()).to.eq(false);
  });

  it('fires an event if cancel is hit', async () => {
    (component.vm as any).show();
    await component.vm.$nextTick();
    component.find('button[type="button"]').trigger('click');
    await component.vm.$nextTick();
    expect(component.emitted('canceled')?.length).to.eq(1);
    expect(component.find('.modal.fade.show').exists()).to.eq(false);
  });
});
