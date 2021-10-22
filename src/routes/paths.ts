// ----------------------------------------------------------------------

function path(root: string, sublink: string) {
  return `${root}${sublink}`;
}

const ROOTS_DASHBOARD = '/';

// ----------------------------------------------------------------------

export const PATH_DASHBOARD = {
  root: path(ROOTS_DASHBOARD, '/fund/list'),
  fund: {
    root: path(ROOTS_DASHBOARD, '/fund'),
    list: path(ROOTS_DASHBOARD, '/fund/list'),
    showById: path(ROOTS_DASHBOARD, '/fund/:id/show'),
    newFund: path(ROOTS_DASHBOARD, '/fund/new')
  }
};
