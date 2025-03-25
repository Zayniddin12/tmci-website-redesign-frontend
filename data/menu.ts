import { useI18n } from 'vue-i18n'

import type { IMenu } from '~/types/components/menu'

export const childAboutMenu = () => {
  const { t } = useI18n()

  return {
    title: t('menu.about_tmc'),
    value: 'about_tmc',
    submenu: [
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
  }
}

export const childProgramsMenu = () => {
  const { t } = useI18n()

  return {
    title: t('menu.programs'),
    value: 'programs',
    submenu: [],
  }
}

export const childAdmissionsMenu = () => {
  const { t } = useI18n()

  return {
    title: t('menu.admissions'),
    value: 'admissions',
    submenu: [
      {
        name: t('submenu.admissions.apply'),
        url: '/apply',
      },
      {
        name: t('referral_rewards'),
        url: '/admission/referral-rewards',
      },
      {
        name: t('submenu.admissions.financial_aid'),
        url: '/admission/financial-aid',
      },
    ],
  }
}

export const childLifeMenu = () => {
  const { t } = useI18n()

  return {
    title: t('menu.life_at_tmc'),
    value: 'life_at_tmc',
    submenu: [
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
  }
}
