import { App } from 'vue'
import 'element-plus/lib/theme-chalk/base.css'
import {
  ElButton,
  ElCheckbox,
  ElForm,
  ElFormItem,
  ElInput,
  ElLink,
  ElRadio,
  ElTabPane,
  ElTabs,
  ElContainer,
  ElHeader,
  ElMain,
  ElAside,
  ElMenu,
  ElSubmenu,
  ElMenuItem,
  ElMenuItemGroup,
  ElDropdown,
  ElDropdownMenu,
  ElDropdownItem,
  ElIcon,
  ElAvatar,
  ElRow,
  ElCarousel,
  ElCarouselItem,
  ElPopover,
  ElCol,
  ElBacktop,
  ElTooltip,
  ElDrawer,
  ElRadioGroup,
  ElUpload,
  ElDatePicker,
  ElCard,
  ElTag,
  ElSelect,
  ElOption,
  ElPopconfirm,
  ElCollapseTransition,
  ElTable,
  ElTableColumn,
  ElDialog,
  ElCascader,
  ElSwitch
} from 'element-plus'

const components = [
  ElButton,
  ElForm,
  ElFormItem,
  ElInput,
  ElRadio,
  ElTabs,
  ElTabPane,
  ElCheckbox,
  ElLink,
  ElContainer,
  ElHeader,
  ElMain,
  ElAside,
  ElMenu,
  ElSubmenu,
  ElMenuItem,
  ElMenuItemGroup,
  ElDropdown,
  ElDropdownMenu,
  ElDropdownItem,
  ElIcon,
  ElAvatar,
  ElRow,
  ElCarousel,
  ElCarouselItem,
  ElPopover,
  ElCol,
  ElBacktop,
  ElTooltip,
  ElDrawer,
  ElRadioGroup,
  ElUpload,
  ElDatePicker,
  ElCard,
  ElTag,
  ElSelect,
  ElOption,
  ElPopconfirm,
  ElCollapseTransition,
  ElTable,
  ElTableColumn,
  ElDialog,
  ElCascader,
  ElSwitch
]

export default function (app: App): void {
  for (const component of components) {
    app.component(component.name, component)
  }
}
