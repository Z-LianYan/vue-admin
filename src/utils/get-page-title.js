import defaultSettings from '@/utils/settings'

const title = defaultSettings.title || 'Vue Admin (author zly)'

export default function getPageTitle(pageTitle) {
  if (pageTitle) {
    return `${pageTitle} - ${title}`
  }
  return `${title}`
}
