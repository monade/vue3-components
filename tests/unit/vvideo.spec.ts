import { shallowMount } from '@vue/test-utils'
import { expect } from 'chai'
import VVideo from '../../src/components/VVideo.vue'

describe('VVideo', () => {
  it('prints the sources I passed', async () => {
    const component = shallowMount(VVideo, {
      propsData: {
        sources: ['http://techslides.com/demos/sample-videos/small.mp4']
      }
    });

    const video = component.vm.$refs.video as HTMLVideoElement;
    const sources = video.querySelectorAll('source');
    let notFound = false
    sources.forEach((source, idx) => {
      notFound = notFound || source.src !== component.props().sources[idx]
    })
    expect(notFound).to.eq(false);
    expect(sources.length === component.props().sources.length);
  });
});
