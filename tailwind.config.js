/**
 * colors可以作用在任何颜色上
 * 可以通过@apply应用很多class来设定一套规范颜色
 */
module.exports = {
  theme: {
    extend: {
      colors: {
        'primary-blue': '#1890ff',
        'link-normal': 'rgb(30, 50, 200)',
        'high-light': '#ea4335',
        'page-black': '#202124',
        primary: {
          actice: 'rgb(102, 0, 153)',
          normal: 'rgb(26, 13, 171)',
          hover: 'rgb(26, 13, 171)'
        },
        gray: {
          label: '#3c4043'
        },
        desc: {
          normal: '#4D5156',
          address: 'rgb(95, 99, 104)',
          content: 'rgb(77, 81, 86)',
          900: '#202124',
          red: '#ea4335'
        }
      },
      textOpacity: {
        60: '0.6',
        65: '0.65',
        70: '0.7'
      },
      fontSize: {
        14: '14px',
        16: '16px',
        20: '20px'
      },
      height: {
        base: '64px',
        search: '50px',
        120: '120px',
        140: '140px',
        logo: '180px'
      },
      width: {
        logo: '500px',
        search: '584px'
      },
      minWidth: {
        'panel-l': '260px',
        'title': '180px',
        '1/4': '25%',
        '1/2': '50%',
        '3/4': '75%',
        'full': '100%',
      },
      maxWidth: {
        logo: '500px',
        search: '584px',
        'search-box': '688px',
        'search-box__focus': '719px',
        'search-content': '652px'
      },
      margin: {
        search: '32px'
      },
      padding: {
        search: '32px'
      },
      boxShadow: {
        search: '0 1px 6px rgba(32,33,36,.28)',
        suggestion: '0 6px 6px rgba(32,33,36,.28)'
      },
      borderRadius: {
        search: '22px'
      }
    },
    fill: (theme) => ({
      gray: '#4D5156',
      yellow: 'rgb(246, 187, 66)',
      'page-icon': 'rgb(30, 50, 200)',
      disabled: '#acacad'
    }),
    borderColor: (theme) => ({
      'search-normal': '#DFE1E5',
      'search-suggestion': 'rgba(223,225,229,0)'
    })
  },
  variants: {
    extend: {
      fill: ['dark'],
      textColor: ['active', 'visited']
    }
  },
  purge: ['./src/**/*.tsx'],
  plugins: [],
  darkMode: 'class'
};
