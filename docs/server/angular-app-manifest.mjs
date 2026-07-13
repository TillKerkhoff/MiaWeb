
export default {
  bootstrap: () => import('./main.server.mjs').then(m => m.default),
  inlineCriticalCss: true,
  baseHref: '/',
  locale: undefined,
  routes: [
  {
    "renderMode": 2,
    "redirectTo": "/welcome",
    "route": "/"
  },
  {
    "renderMode": 2,
    "route": "/welcome"
  },
  {
    "renderMode": 2,
    "route": "/home"
  },
  {
    "renderMode": 2,
    "route": "/aboutMe"
  },
  {
    "renderMode": 2,
    "route": "/anmeldung"
  },
  {
    "renderMode": 2,
    "route": "/archiv"
  }
],
  entryPointToBrowserMapping: undefined,
  assets: {
    'index.csr.html': {size: 665, hash: '2d67acb3961ecb1ec7454828238ffcce1fd5efa4ec2dfacc47641b6f54e96030', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 951, hash: 'e9f342ba5302974fdc19f8413d4a8bd7fe57d374c3efb191191f4b82b1aa47a4', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'archiv/index.html': {size: 35917, hash: 'c55cda0285cea7a6c182afec7c8c08e430d9e7549056a00846ca8e819e456f60', text: () => import('./assets-chunks/archiv_index_html.mjs').then(m => m.default)},
    'home/index.html': {size: 1451, hash: '7dfb776eaf7cbabacaad1f103ee55641887c8233842ed282c4feafd145a434fb', text: () => import('./assets-chunks/home_index_html.mjs').then(m => m.default)},
    'welcome/index.html': {size: 4421, hash: 'c57cba202cad6bbffdf567b53be8da7786ad370bc70a65ebd2b8ebe70a4fad6e', text: () => import('./assets-chunks/welcome_index_html.mjs').then(m => m.default)},
    'aboutMe/index.html': {size: 1463, hash: '8fac88d6a342590e0ea6b83a2321f023f6b68186143464b7066c1f098aa4e829', text: () => import('./assets-chunks/aboutMe_index_html.mjs').then(m => m.default)},
    'styles-FD44SHTR.css': {size: 108, hash: 'ak4UMOhv7Ws', text: () => import('./assets-chunks/styles-FD44SHTR_css.mjs').then(m => m.default)}
  },
};
