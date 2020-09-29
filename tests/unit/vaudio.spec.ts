import { mount } from '@vue/test-utils'
import { expect } from 'chai'
import VAudio from '../../src/components/VAudio.vue'
import VAudioElementWrapper from '../../src/components/VAudioElementWrapper.vue'

describe('VAudio', () => {
  it('has broken state if no sources is passed', () => {
    const component = mount(VAudio, {
      propsData: {
        sources: []
      }
    });
    const playerButton = component.find('.btn-player');
    expect(playerButton.exists()).to.eq(true);
    expect(playerButton.attributes().disabled).to.eq('disabled');
  });
  // it('breaks if a non existant source is passed', async () => {
  //   const component = mount(VAudio, {
  //     propsData: {
  //       sources: ['http://idontexists.com/whoknowswhat.mp4']
  //     }
  //   });
  //   const playerButton = component.find('.btn-player');
  //   const audioWrapper = component.findComponent(VAudioElementWrapper);
  //   expect(audioWrapper.exists()).to.eq(true);
  //   await playerButton.trigger('click');
  //   expect(audioWrapper.emitted().error?.length).to.eq(1);
  // });
});
