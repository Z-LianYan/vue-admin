// module.exports = file => () => import('@/views/' + file + '.vue')
module.exports = file => resolve => require(['@/views/' + file + '.vue'],resolve)//懒加载