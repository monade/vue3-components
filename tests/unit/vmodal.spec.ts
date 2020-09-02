import { mount } from '@vue/test-utils'
import { expect } from 'chai'
import VModal from '@/components/VModal.vue'

describe('VModal', () => {
  it('displays a modal which is initially not shown', () => {
    const component = mount(VModal);
    expect(component.find('.modal-wrapper').exists()).to.eq(true);
    expect(component.find('.modal.fade.show').exists()).to.eq(false);
  });
  it('calling show will display the modal, calling hide will close it', async () => {
    const component = mount(VModal);
    (component.vm as any).show();
    await component.vm.$nextTick();
    expect(component.find('.modal.fade.show').exists()).to.eq(true);
    expect(component.emitted('shown')?.length).to.eq(1);
    (component.vm as any).hide();
    await component.vm.$nextTick();
    expect(component.find('.modal.fade.show').exists()).to.eq(false);
    expect(component.emitted('hidden')?.length).to.eq(1);
  });
  it('can receive classes and size and it should display them', async () => {
    const component = mount(VModal, {
      propsData: {
        contentClasses: 'vcontent',
        headerClasses: 'vheader',
        bodyClasses: 'vbody',
        footerClasses: 'vfooter',
        size: 'lg'
      },
      slots: {
        default: '<div></div>',
        header: '<div></div>',
        footer: '<div></div>'
      }
    });
    (component.vm as any).show();
    await component.vm.$nextTick();
    expect(component.findAll('.vcontent').length).to.eq(1);
    expect(component.findAll('.vheader').length).to.eq(1);
    expect(component.findAll('.vbody').length).to.eq(1);
    expect(component.findAll('.vfooter').length).to.eq(1);
    expect(component.findAll('.modal-lg').length).to.eq(1);
  });
});
