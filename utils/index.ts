import type { IStructureNode } from '~/types/common'

const timeouts: Record<string, any> = {}
const cTimeout = (key = 'key') => {
  if (timeouts[key]) {
    clearTimeout(timeouts[key])
    timeouts[key] = undefined
  }
}

export const debounce = (key = 'key', fn = () => {}, timeout = 500) => {
  const sTimeout = (key: string, fn: any, timeout: number) => {
    cTimeout(key)
    timeouts[key] = setTimeout(() => {
      try {
        fn()
      } catch (e) {}
      timeouts[key] = undefined
    }, timeout)
  }
  return sTimeout(key, fn, timeout)
}

const validPhones = [
  '90',
  '91',
  '33',
  '50',
  '93',
  '94',
  '88',
  '95',
  '97',
  '98',
  '99',
  '77',
  '20',
]

export const isValidPhone = (val: string) => {
  const phone = val.replace(/[\s)(-]/g, '')
  return phone.length === 9 && validPhones.includes(phone.substring(0, 2))
}

export function formatNumberSpace(number: number, fix = 0) {
  return Intl.NumberFormat('uz-UZ', {
    minimumFractionDigits: fix,
  })
    .format(number)
    .replace(/,/g, ' ')
}

export function formatZero(number: number) {
  return number < 10 ? `0${number}` : number
}

export const share = (network: string, title: string) => {
  if (process.client) {
    switch (network) {
      case 'telegram':
        window.open(
          `https://t.me/share/url?url=${window.location.href}&text=${title}`,
          '_blank'
        )
        break
      case 'linkedin':
        window.open(
          `https://www.linkedin.com/shareArticle?mini=true&url=${window.location.href}&title=${title}&summary=&source=${document.domain}`,
          '_blank'
        )
        break

      case 'facebook':
        window.open(
          `https://www.facebook.com/sharer/sharer.php?t=${title}\n${window.location.href}`,
          '_blank'
        )
        break
    }
  }
}

export function formatPhoneNumber(number: string) {
  const format = number
    ?.replace(/\D/g, '')
    .match(/(\d{0,3})(\d{0,2})(\d{0,3})(\d{0,2})(\d{0,2})/)
  return `+${format && format[1] ? format[1] : ''}
          ${format && format[2] ? format[2] : ''}
          ${format && format[3] ? format[3] : ''}
          ${format && format[4] ? format[4] : ''}
          ${format && format[5] ? format[5] : ''}`
}

export function convertToEmbed(url: string) {
  // Match the video ID from the URL using a regular expression
  const regex =
    /^(?:(?:https?:)?\/\/)?(?:www\.)?(?:youtu\.be\/|(?:youtube(?:-nocookie)?\.com\/(?:.*(?:\/|v=))|(?:youtube.googleapis.com\/v\/)))([^&?\s]{11})/i
  let match
  if (url?.length) {
    match = url.match(regex)
  }
  // @ts-ignore
  if (match?.length) {
    return match[1]
  }
}

export const changeJsonToFormData = (data: any) => {
  const form_data = new FormData()

  for (const key in data) {
    form_data.append(key, data[key])
  }

  return form_data
}

export const errorHandler = (error: {
  _data: {
    error: {
      field: string
      message: string
    }
  }[]
}) => {
  if (error?._data?.length) {
    return error?._data[0]?.error?.message
  } else {
    return null
  }
}

export const richTextPurify = (str: string, count = 120) => {
  const text = str?.replace(/<\/?[^>]+(>|$)|&[^\s]*;/gi, '')
  if (count === 0) {
    return text
  }
  return text?.substring(0, count)
}

export const validatePhoneNumber = (value: string) => {
  const regex =
    /^\+998([- ])?(90|91|93|94|95|98|99|33|97|71|77|78|70|20|88|55|50)([- ])?(\d{3})([- ])?(\d{2})([- ])?(\d{2})$/

  return regex.test(value)
}

export const removeEmptySpaces = (value: string) => {
  return value.replace(/\s/g, '')
}

export function dtmScore() {
  return {
    mask: ['D', 'D#', 'D#.#', 'D#.##', 'D##', 'D##.#', 'D##.##'],
    tokens: {
      D: {
        pattern: /[1-9]/,
      },
    },
  }
}

/**
 * Determine the mobile operating system.
 * This function returns one of 'iOS', 'Android', 'Windows Phone', or 'unknown'.
 *
 * @returns {String}
 */
export function getMobileOperatingSystem() {
  if (process.client) {
    const userAgent = navigator.userAgent || navigator.vendor || window.opera

    if (/windows phone/i.test(userAgent)) {
      return 'Windows Phone'
    }

    if (/android/i.test(userAgent)) {
      return 'Android'
    }

    if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
      return 'iOS'
    }
  }

  return 'unknown'
}

export function purifyDOMContent(htmlContent: string) {
  const tempElement = document.createElement('div')

  tempElement.innerHTML = htmlContent
  return tempElement.textContent || tempElement.innerText
}

export function downloadFile(url: string, fileName: string) {
  return new Promise((resolve, reject) => {
    fetch(url, {
      method: 'GET',
    })
      .then((result) => {
        return result.blob()
      })
      .then((res) => {
        const url = window.URL.createObjectURL(new Blob([res]))
        const link = document.createElement('a')
        console.log(fileName)
        link.href = url
        link.setAttribute('download', fileName)
        link.click()
        link.remove()
        resolve(res)
      })
      .catch((err) => {
        reject(err)
      })
  })
}

export function convertBytes(bytes: number) {
  const units = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']

  let unitIndex = 0
  while (bytes >= 1024 && unitIndex < units.length - 1) {
    bytes /= 1024
    unitIndex++
  }

  const unit = units[unitIndex]
  return bytes?.toFixed(2) + ' ' + unit
}

export function formatDate(dateStr) {
  const [day, month, year] = dateStr.split('.')
  return `${year}-${month}-${day}`
}

export const categorizeAndFlattenNodes = (
  nodes: IStructureNode[],
  level = 0
): IStructureNode[] => {
  let flattenedNodes: IStructureNode[] = []

  nodes.forEach((node) => {
    // Categorize node based on level
    if (level === 0) {
      node.type = 'head'
    } else if (level === 1) {
      node.type = 'subhead'
    } else if (level === 2) {
      node.type = 'subtree'
    } else if (level === 3) {
      node.type = 'subchild'
    } else {
      node.type = 'child'
    }

    flattenedNodes.push(node)

    if (node.subunits && node.subunits.length > 0) {
      flattenedNodes = flattenedNodes.concat(
        categorizeAndFlattenNodes(node.subunits, level + 1)
      )
    }
  })

  return flattenedNodes
}

export function formatDateToFullDate(dateString: string): string {
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}
