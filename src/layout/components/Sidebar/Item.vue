<script>
import { Divider } from 'element-ui';
import store from '@/store'
export default {
  name: "MenuItem",
  functional: true,
  props: {
    icon: {
      type: String,
      default: ""
    },
    title: {
      type: String,
      default: ""
    }
  },
  render(h, context) {
    const { icon, title } = context.props;
    const vnodes = [];

    if (icon) {
      const { opened }=store.state.app.sidebar
      vnodes.push(<i class={icon} style={opened? '':'margin:0 12px 0 18px'}></i>);
    }

    if (title) {
      vnodes.push(<span slot="title">{title}</span>);
    }
    
    return vnodes;
  }
};
</script>
