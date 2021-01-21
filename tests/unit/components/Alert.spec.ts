import { mount } from '@vue/test-utils';
import Alert from '@/components/Alert.vue';

describe('Alert.vue', () => {
  it('displays alert success', () => {
    const wrapper = mount(Alert, {
      props: {
        kind: 'success',
        message: 'Test message'
      }
    });
    const spanIcon = wrapper.find('[data-test="icon"]');
    expect(wrapper.classes()).toContain('border-green-500');
    expect(spanIcon.classes()).toContain('bg-green-500');
    expect(wrapper.find('[data-test="title"]').text()).toBe('Success');
    expect(wrapper.find('[data-test="msg"]').text()).toBe('Test message');
  });

  it('displays alert warning', () => {
    const wrapper = mount(Alert, {
      props: {
        kind: 'warning',
        message: 'Test message'
      }
    });
    const spanIcon = wrapper.find('[data-test="icon"]');
    expect(wrapper.classes()).toContain('border-yellow-500');
    expect(spanIcon.classes()).toContain('bg-yellow-500');
    expect(wrapper.find('[data-test="title"]').text()).toBe('Warning');
    expect(wrapper.find('[data-test="msg"]').text()).toBe('Test message');
  });

  it('displays alert error', () => {
    const wrapper = mount(Alert, {
      props: {
        kind: 'error',
        message: 'Test message'
      }
    });
    const spanIcon = wrapper.find('[data-test="icon"]');
    expect(wrapper.classes()).toContain('border-red-500');
    expect(spanIcon.classes()).toContain('bg-red-500');
    expect(wrapper.find('[data-test="title"]').text()).toBe('Error');
    expect(wrapper.find('[data-test="msg"]').text()).toBe('Test message');
  });

  it('displays alert info', () => {
    const wrapper = mount(Alert, {
      props: {
        kind: 'info',
        message: 'Test message'
      }
    });
    const spanIcon = wrapper.find('[data-test="icon"]');
    expect(wrapper.classes()).toContain('border-blue-500');
    expect(spanIcon.classes()).toContain('bg-blue-500');
    expect(wrapper.find('[data-test="title"]').text()).toBe('Info');
    expect(wrapper.find('[data-test="msg"]').text()).toBe('Test message');
  });

  it('displays alert with custom title when prop "title" is received', () => {
    const wrapper = mount(Alert, {
      props: {
        kind: 'info',
        message: 'Test message',
        title: 'Custom title'
      }
    });
    expect(wrapper.find('[data-test="title"]').text()).toBe('Custom title');
    expect(wrapper.find('[data-test="msg"]').text()).toBe('Test message');
  });

  it('displays alert without icon when prop "icon" is false', () => {
    const wrapper = mount(Alert, {
      props: {
        kind: 'info',
        message: 'Test message',
        title: 'Custom title',
        icon: false
      }
    });
    expect(wrapper.find('[data-test="icon"]').exists()).toBe(false);
    expect(wrapper.find('[data-test="title"]').text()).toBe('Custom title');
    expect(wrapper.find('[data-test="msg"]').text()).toBe('Test message');
  });

  it('displays alert with border gray when prop "bordered" is true', () => {
    const wrapper = mount(Alert, {
      props: {
        kind: 'info',
        message: 'Test message',
        title: 'Custom title',
        bordered: true
      }
    });
    expect(wrapper.classes()).toContain('alert');
  });

  it('displays alert with icon aligned to top when prop "bordered" is "top"', () => {
    const wrapper = mount(Alert, {
      props: {
        kind: 'info',
        message: 'Test message',
        iconAlign: 'top'
      }
    });
    expect(wrapper.classes()).not.toContain('items-center');
  });
  it('displays alert with icon aligned to center when prop "bordered" is "center" or not informed (default value)', () => {
    const wrapper = mount(Alert, {
      props: {
        kind: 'info',
        message: 'Test message',
        iconAlign: 'center'
      }
    });
    const wrapper2 = mount(Alert, {
      props: {
        kind: 'info',
        message: 'Test message'
      }
    });
    expect(wrapper.classes()).toContain('items-center');
    expect(wrapper2.classes()).toContain('items-center');
  });
});
