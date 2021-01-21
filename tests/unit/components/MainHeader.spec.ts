import { mount } from '@vue/test-utils';
import MainHeader from '@/components/MainHeader.vue';

describe('MainHeader.vue', () => {
  it('renders main header with content provided in slot', () => {
    const wrapper = mount(MainHeader, {
      slots: {
        default: 'Main Content'
      }
    });
    expect(wrapper.find('.container').text()).toContain('Main Content');
  });
});
