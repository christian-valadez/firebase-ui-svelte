import type { SvelteComponentTyped } from 'svelte'

export interface AuthProps {
  providers?: ('facebook' | 'github' | 'google' | 'twitter')[]
  view?: 'sign_in' | 'sign_up' | 'magic_link' | 'forgotten_password'
  classes?: string
  style?: string
  socialLayout?: 'vertical' | 'horizontal'
  socialColors?: boolean
  socialButtonSize?: 'medium' | 'large'
}

export default class Auth extends SvelteComponentTyped<AuthProps> {}
