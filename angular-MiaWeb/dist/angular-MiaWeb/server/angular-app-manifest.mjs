
export default {
  bootstrap: () => import('./main.server.mjs').then(m => m.default),
  inlineCriticalCss: true,
  baseHref: '/MiaWeb/',
  locale: undefined,
  routes: [
  {
    "renderMode": 2,
    "redirectTo": "/MiaWeb/welcome",
    "route": "/MiaWeb"
  },
  {
    "renderMode": 2,
    "route": "/MiaWeb/welcome"
  },
  {
    "renderMode": 2,
    "route": "/MiaWeb/home"
  },
  {
    "renderMode": 2,
    "route": "/MiaWeb/aboutMe"
  },
  {
    "renderMode": 2,
    "route": "/MiaWeb/anmeldung"
  },
  {
    "renderMode": 2,
    "route": "/MiaWeb/archiv"
  }
],
  entryPointToBrowserMapping: undefined,
  assets: {
    'index.csr.html': {size: 672, hash: 'f46a4daeb19cf4a52c5bacc0c75816b1e0aa8f72de38fd252f98d2d447426bd6', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 958, hash: 'cab183354e31f176b671e1a732b25be1702cf3c54626eb5e230be130f13c05fb', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'archiv/index.html': {size: 35924, hash: 'f0f81861d785d715db9ddbad0874f819a019c9029d157732686a2962c93aa67a', text: () => import('./assets-chunks/archiv_index_html.mjs').then(m => m.default)},
    'welcome/index.html': {size: 4456, hash: 'a405b90b3122aac9403553cd21788e704c5edf5be6e905a47b7ab1aaec857a13', text: () => import('./assets-chunks/welcome_index_html.mjs').then(m => m.default)},
    'aboutMe/index.html': {size: 1470, hash: '918bf1ec3785ebe539ff3f19b69640f33ab81a92e4df50cb45040315807006a0', text: () => import('./assets-chunks/aboutMe_index_html.mjs').then(m => m.default)},
    'home/index.html': {size: 1458, hash: '26721b6bd9d9ff8176f8c07def3368b119eaa4c4e85d86f348790914b3adf787', text: () => import('./assets-chunks/home_index_html.mjs').then(m => m.default)},
    'styles-FD44SHTR.css': {size: 108, hash: 'ak4UMOhv7Ws', text: () => import('./assets-chunks/styles-FD44SHTR_css.mjs').then(m => m.default)}
  },
};
