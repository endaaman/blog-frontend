import { error } from '@sveltejs/kit'
import { browser } from "$app/environment"


let API_BASE = ''
if (!browser) {
  API_BASE = 'http://' + ( process.env.BACKEND_HOST || 'localhost:3000' )
}

export { API_BASE }
