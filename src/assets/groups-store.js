export const GROUPS_STORAGE_KEY = 'steps-academy-groups'

export const stages = {
  primary: { title: 'الصف الابتدائي', image: '/one.jpg' },
  preparatory: { title: 'الصف الإعدادي', image: '/tow.jpg' },
  secondary: { title: 'الصف الثانوي', image: '/thriy.jpg' },
}

function isStoredGroup(value) {
  return value !== null
    && typeof value === 'object'
    && typeof value.id === 'string'
    && typeof value.stage === 'string'
    && typeof value.name === 'string'
    && typeof value.description === 'string'
}

export function loadGroups() {
  try {
    const storedGroups = window.localStorage.getItem(GROUPS_STORAGE_KEY)
    if (!storedGroups) return { groups: [], error: '' }

    const parsedGroups = JSON.parse(storedGroups)
    if (!Array.isArray(parsedGroups) || !parsedGroups.every(isStoredGroup)) {
      throw new Error('تنسيق المجموعات المحفوظة غير صالح.')
    }

    return { groups: parsedGroups, error: '' }
  } catch {
    return { groups: [], error: 'تعذر تحميل المجموعات من هذا المتصفح.' }
  }
}
