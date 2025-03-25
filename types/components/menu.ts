export interface IMenu {
  name: string
  value: string
  url: string
}

type IFooterSubMenu = {
  name: string
  url: string
}

export interface IFooterMenu {
  title: string
  slug: string
  children: IFooterSubMenu[]
}
