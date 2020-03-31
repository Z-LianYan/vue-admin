import Vue from 'vue'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'


// import zhLocale from 'ElementUI-ui/lib/locale/lang/zh-CN'
// set ElementUIUI lang to EN
// Vue.use(ElementUIUI, { zhLocale })
// 如果想要中文版 ElementUI-ui，按如下方式声明
// Vue.use(ElementUIUI)

import pagination from "@/components/pagination"
Vue.component("mine-pagination",pagination);


Vue.use(ElementUI.Backtop)
Vue.use(ElementUI.Divider)
Vue.use(ElementUI.Popover)
Vue.use(ElementUI.Scrollbar)
Vue.use(ElementUI.TabPane)
Vue.use(ElementUI.Badge)
Vue.use(ElementUI.Tree)
Vue.use(ElementUI.Collapse)
Vue.use(ElementUI.CollapseItem)
Vue.use(ElementUI.Dialog)
Vue.use(ElementUI.Drawer)
Vue.use(ElementUI.Progress)

Vue.use(ElementUI.Menu)
Vue.use(ElementUI.MenuItem)
Vue.use(ElementUI.Submenu)

Vue.use(ElementUI.Breadcrumb)
Vue.use(ElementUI.BreadcrumbItem)

Vue.use(ElementUI.Dropdown)
Vue.use(ElementUI.DropdownMenu)
Vue.use(ElementUI.DropdownItem)
Vue.use(ElementUI.Tooltip)
Vue.use(ElementUI.ColorPicker)
Vue.use(ElementUI.Card)
Vue.use(ElementUI.Pagination)

Vue.use(ElementUI.Input);
Vue.use(ElementUI.InputNumber);
Vue.use(ElementUI.Radio);
Vue.use(ElementUI.RadioGroup);
Vue.use(ElementUI.RadioButton);
Vue.use(ElementUI.Checkbox);
Vue.use(ElementUI.CheckboxButton);
Vue.use(ElementUI.CheckboxGroup);
Vue.use(ElementUI.Switch);
Vue.use(ElementUI.Select);
Vue.use(ElementUI.Option);
Vue.use(ElementUI.OptionGroup);
Vue.use(ElementUI.Button);
Vue.use(ElementUI.ButtonGroup);
Vue.use(ElementUI.Upload);
Vue.use(ElementUI.TimeSelect);

Vue.use(ElementUI.DatePicker);
Vue.use(ElementUI.Form);
Vue.use(ElementUI.FormItem);
Vue.use(ElementUI.Tabs);
Vue.use(ElementUI.Image);


Vue.use(ElementUI.Container);
Vue.use(ElementUI.Header);
Vue.use(ElementUI.Aside);
Vue.use(ElementUI.Main);
Vue.use(ElementUI.Footer);
Vue.use(ElementUI.Row)
Vue.use(ElementUI.Col)
Vue.use(ElementUI.Tag)
Vue.use(ElementUI.Timeline);
Vue.use(ElementUI.TimelineItem);

Vue.use(ElementUI.TableColumn)
Vue.use(ElementUI.Table)
Vue.use(ElementUI.Loading.directive);
Vue.use(ElementUI.PageHeader);
Vue.use(ElementUI.Cascader);
Vue.use(ElementUI.Scrollbar);



Vue.prototype.$confirm = ElementUI.MessageBox.confirm;
Vue.prototype.$message = ElementUI.Message;
