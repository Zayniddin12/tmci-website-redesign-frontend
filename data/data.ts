import { useI18n } from 'vue-i18n'

export const news = [
  {
    title: 'Tashkent branch',
    description:
      'There’s never a dull moment in the bustling capital of Spain. Get a feel for what student life is like at our fast-paced Madrid campus.',
  },
  {
    title: 'Fergana branch',
    description:
      'In Fergana, you’ll be enchanted by its winding cobblestone streets, breathtaking medieval castle, and grandiose historical sites. Dive in!',
  },
  {
    title: 'Tashkent branch',
    description:
      'There’s never a dull moment in the bustling capital of Spain. Get a feel for what student life is like at our fast-paced Madrid campus.',
  },
  {
    title: 'Fergana branch',
    description:
      'In Fergana, you’ll be enchanted by its winding cobblestone streets, breathtaking medieval castle, and grandiose historical sites. Dive in!',
  },
  {
    title: 'Tashkent branch',
    description:
      'There’s never a dull moment in the bustling capital of Spain. Get a feel for what student life is like at our fast-paced Madrid campus.',
  },
  {
    title: 'Fergana branch',
    description:
      'In Fergana, you’ll be enchanted by its winding cobblestone streets, breathtaking medieval castle, and grandiose historical sites. Dive in!',
  },
  {
    title: 'Fergana branch',
    description:
      'In Fergana, you’ll be enchanted by its winding cobblestone streets, breathtaking medieval castle, and grandiose historical sites. Dive in!',
  },
  {
    title: 'Tashkent branch',
    description:
      'There’s never a dull moment in the bustling capital of Spain. Get a feel for what student life is like at our fast-paced Madrid campus.',
  },
  {
    title: 'Fergana branch',
    description:
      'In Fergana, you’ll be enchanted by its winding cobblestone streets, breathtaking medieval castle, and grandiose historical sites. Dive in!',
  },
]

export const routes = [
  {
    path: '/about-us',
    name: 'Who we are?',
  },
  {
    path: '/about-us/leadership',
    name: 'Leadership',
  },
  {
    path: '/about-us/university',
    name: 'TMII University',
  },
  {
    path: '/about-us/why-choose',
    name: 'Why choose TMII University',
  },
  {
    path: '/about-us/international-cooperation',
    name: 'International cooperation',
  },
  {
    path: '/about-us/vacancies',
    name: 'Vacancies',
  },
]

export const licenses = [
  {
    image: 'https://picsum.photos/200/300',
    title: 'Quality Assurance of Education',
    subtitle:
      'TMC Institute in Tashkent is fully licensed by the State Inspection for Quality Assurance of Education under the Cabinet of Ministers of Uzbekistan Republic.',
    file: 'https://picsum.photos/200/300',
  },
  {
    image: 'https://picsum.photos/200/300',
    title: 'Quality Assurance of Education',
    subtitle:
      'TMC Institute in Tashkent is fully licensed by the State Inspection for Quality Assurance of Education under the Cabinet of Ministers of Uzbekistan Republic.',
    file: 'https://picsum.photos/200/300',
  },
]

// treeData.js

export const treeData = [
  {
    label: 'University Supervisory Board',
    children: [
      {
        label: 'Rector',
        children: [
          {
            label: 'First Vice-Rector for Academic Affairs',
            children: [
              {
                label: 'Academic Administration',
                children: [
                  { label: 'Academic Affairs Department' },
                  { label: 'Admission Department' },
                ],
              },
              {
                label: 'Deaneries',
              },
            ],
          },
          {
            label: 'Vice-Rector for Youth and Spiritual Education Affairs',
            children: [
              {
                label: 'Department of Spirituality Principle and Enlightenment',
              },
              { label: 'Student Lodging' },
              { label: 'Department of Student Affairs' },
              { label: 'Career Center' },
              { label: 'Psychologist' },
            ],
          },
          {
            label: 'Vice-Rector for Innovation and Research',
            children: [
              {
                label:
                  'Department of Strategy, Research and Development Cooperation',
              },
              { label: 'Department of Industrial Cooperation' },
              {
                label:
                  'Department of Strategic Development, Innovation and Research',
              },
              { label: 'Information and Resource Center' },
            ],
          },
          {
            label: 'Vice-Rector for Finance and Economics',
            children: [
              {
                label:
                  'Department of Financial Management and Contract Operations',
              },
              { label: 'Accounting Department' },
              { label: 'Procurement and Supply Department' },
            ],
          },
        ],
      },
      {
        label: 'Honorary President',
        children: [
          { label: "Rector's Counsel" },
          { label: "Rector's Assistant" },
          {
            label: 'Analytical Control and Monitoring Department',
            children: [
              { label: 'Department of Quality Assurance and Accreditation' },
              { label: 'Media Relations Department' },
              { label: 'Multimedia Center' },
              { label: 'Department of International Cooperation' },
            ],
          },
        ],
      },
    ],
  },
]
