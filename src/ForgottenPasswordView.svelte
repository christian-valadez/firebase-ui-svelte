<script>
  import LinkButton from './LinkButton.svelte'
  import Text from './Text.svelte'
  import Button from './Button.svelte'
  import Input from './Input.svelte'
  import { getAuth, sendPasswordResetEmail } from 'firebase/auth'

  export let setView

  let error = '',
    message = '',
    loading = false,
    email = ''

  async function submit() {
    error = ''
    message = ''
    loading = true

    try {
      await sendPasswordResetEmail(getAuth(), email)
    } catch (e) {
      error = e.message
    }

    if (!error) {
      message = 'Check your email for the password reset link'
    }

    loading = false
  }
</script>

<form on:submit|preventDefault={submit}>
  <Input
    name="email"
    type="email"
    label="Email address"
    placeholder="Your email address"
    icon="mail"
    bind:value={email}
  />
  <Button block primary size="large" {loading} icon="inbox">Send reset password instructions</Button
  >

  <LinkButton on:click={() => setView('sign_in')}>Go back to sign in</LinkButton>

  {#if message}
    <Text>{message}</Text>
  {/if}

  {#if error}
    <Text type="danger">{error}</Text>
  {/if}
</form>
