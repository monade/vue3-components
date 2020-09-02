import { mount } from '@vue/test-utils'
import { expect } from 'chai'
import VPaginator from '@/components/VPaginator.vue'

describe('VPaginator', () => {
  const meta = {
    lastPage: 3,
    currentPage: 1,
    totalPages: 4,
    previousPage: 0,
    nextPage: 2
  }

  const paginator = mount(VPaginator, {
    propsData: {
      meta,
      loading: false,
      align: 'center'
    }
  });

  it('emits changed on click', async () => {
    await paginator.vm.$nextTick();

    paginator.find('.page-link').trigger('click');
    await paginator.vm.$nextTick();

    expect(paginator.emitted().change?.length).to.eq(1);
  });
  it('respects align parameter', async () => {
    expect(paginator.find('.justify-content-center').exists()).to.eq(true)

    paginator.setProps({
      meta: {
        lastPage: 3,
        currentPage: 1,
        totalPages: 4,
        previousPage: 0,
        nextPage: 2
      },
      loading: false,
      align: 'right'
    });
    await paginator.vm.$nextTick();
    expect(paginator.find('.justify-content-end').exists()).to.eq(true)

    paginator.setProps({
      meta: {
        lastPage: 3,
        currentPage: 1,
        totalPages: 4,
        previousPage: 0,
        nextPage: 2
      },
      loading: false,
      align: null
    });
    await paginator.vm.$nextTick()
    expect(paginator.find('.justify-content-center').exists()).to.eq(false)
  });
});
