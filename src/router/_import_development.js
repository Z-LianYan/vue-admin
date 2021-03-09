  
// module.exports = file => require('@/views/' + file + '.vue').default // vue-loader at least v13.0.0+

module.exports = file => resolve => require(['@/views/' + file + '.vue'],resolve)//懒加载
