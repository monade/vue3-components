import { mount } from '@vue/test-utils'
import { expect } from 'chai'
import VInlineEditor from '@/components/VInlineEditor.vue'

describe('VInlineEditor', () => {
  const component = mount(VInlineEditor, {
    propsData: {
      value: 'Test',
      placeholder: 'Component Label',
      maxLength: 3,
      uppercase: false
    }
  });

  it('display the data initially', () => {
    expect(component.find('p.white-space-pre').exists()).to.eq(true);
  });

  it('turns into an input when clicked', async () => {
    component.find('p').trigger('click');
    await component.vm.$nextTick();
    expect(component.find('input').exists()).to.eq(true);
  });

  it('fires a change event when input is blurred and data was changed', async () => {
    component.setData({
      data: 'changed'
    });
    await component.vm.$nextTick();
    component.find('input').trigger('blur');
    await component.vm.$nextTick();
    expect(component.emitted('change')?.length).to.eq(1);
  });
});
