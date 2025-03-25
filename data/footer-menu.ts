import { useI18n } from 'vue-i18n'

import type { IFooterMenu } from '~/types/components/menu'

export const footerMenu = (): IFooterMenu[] => {
  const { t } = useI18n()

  return [
    {
      title: t('menu.about_tmc'),
      slug: 'about-tmc',
      children: [
        {
          name: t('submenu.about.about_us'),
          url: '/about-us',
        },
        {
          name: t('submenu.about.office_of_the_rector'),
          url: '/about-us/rector',
        },
        {
          name: t('submenu.about.management_and_staff'),
          url: '/about-us/management',
        },
        {
          name: t('submenu.about.mission_and_value'),
          url: '/about-us/missions-and-values',
        },
        {
          name: t('submenu.about.campus_and_facilities'),
          url: '/about-us/campus-and-facilities',
        },
        {
          name: t('submenu.about.license_and_legal'),
          url: '/about-us/license-and-legal',
        },
        {
          name: t('submenu.about.anti_corruption'),
          url: '/about-us/anti-corruption',
        },
        {
          name: t('submenu.about.careers'),
          url: '/about-us/careers',
        },
      ],
    },

    {
      title: t('menu.admissions'),
      slug: 'admissions',
      children: [
        {
          name: t('submenu.admissions.apply'),
          url: '/apply',
        },
        {
          name: t('submenu.admissions.admission_this_year'),
          url: '/admission',
        },
        {
          name: t('submenu.admissions.financial_aid'),
          url: '/apply/scholarship',
        },
      ],
    },

    {
      title: t('menu.programs'),
      slug: 'programs',
      children: [],
    },

    {
      title: t('menu.life_at_tmc'),
      slug: 'life-at-tmc',
      children: [
        {
          name: t('submenu.life_at_tmc.news'),
          url: '/life-at-tmc/news',
        },
        {
          name: t('submenu.life_at_tmc.events'),
          url: '/life-at-tmc/events',
        },
        {
          name: t('submenu.life_at_tmc.student_stories'),
          url: '/life-at-tmc/student-stories',
        },
        {
          name: t('submenu.life_at_tmc.career_center'),
          url: '/life-at-tmc/career-center',
        },
      ],
    },
  ]
}
