import { shallowMount } from '@vue/test-utils';
import Loading from '@/components/Loading.vue';

describe('Loading.vue', () => {
  it('renders loader with class loading', () => {
    const wrapper = shallowMount(Loading);
    const loader = wrapper.findAll('.loading');
    expect(loader).toHaveLength(1);
  });
});
