// 编写好规则
export const rules = {
  name: [
    {
      required: true,
      message: '请输入您的用户名',
      trigger: 'blur'
    },
    {
      pattern: /^[a-zA-Z0-9]{5,10}$/,
      message: '用户名格式错误',
      trigger: 'blur'
    }
  ],
  password: [
    {
      required: true,
      message: '请输入您的密码',
      trigger: 'blur'
    },
    {
      pattern: /^[a-z0-9]{3,}$/,
      message: '密码格式错误',
      trigger: 'blur'
    }
  ],
  email: [
    {
      required: true,
      message: '请输入您的邮箱',
      trigger: 'blur'
    },
    {
      pattern: /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/,
      message: '邮箱格式错误',
      trigger: 'blur'
    }
  ]
}
