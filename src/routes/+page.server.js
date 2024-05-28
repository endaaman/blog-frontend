import { UPSTREAM_HOST } from '$env/static/private'

export const load = ({ url }) => {
  console.log(UPSTREAM_HOST)
}
