<script>
  import Button from './Button.svelte'
  import Text from './Text.svelte'
  import {
    GoogleAuthProvider,
    getAuth,
    signInWithRedirect,
    FacebookAuthProvider,
    TwitterAuthProvider,
    GithubAuthProvider
  } from 'firebase/auth'

  export let providers
  export let socialLayout
  export let socialButtonSize
  export let socialColors
  export let view

  let loading = false,
    error = ''

  const buttonStyles = {
    google: {
      'background-color': '#ce4430',
      color: 'white',
      provider: new GoogleAuthProvider()
    },
    facebook: {
      'background-color': '#4267B2',
      color: 'white',
      provider: new FacebookAuthProvider()
    },
    twitter: {
      'background-color': '#1DA1F2',
      provider: new TwitterAuthProvider()
    },
    github: {
      'background-color': '#333',
      color: 'white',
      provider: new GithubAuthProvider()
    }
  }

  $: hasProviders = providers && providers.length > 0

  async function handleProviderSignIn(provider) {
    loading = true

    await signInWithRedirect(getAuth(), buttonStyles[provider].provider)

    loading = false
  }
</script>

{#if hasProviders}
  <span class="heading">{view == 'sign_up' ? 'Sign up' : 'Sign in'} with</span>

  <div class="providers" class:horizontal={socialLayout == 'horizontal'}>
    {#each providers as provider}
      <Button
        block
        shadow
        icon={provider}
        size={socialButtonSize}
        style={socialColors ? buttonStyles[provider] : {}}
        on:click={() => handleProviderSignIn(provider)}
      >
        {#if socialLayout == 'vertical'}{view == 'sign_up' ? 'Sign up' : 'Sign in'} with {provider}{/if}
      </Button>
    {/each}
  </div>
  <div role="separator" class="divider">
    <span>or continue with</span>
  </div>
{/if}

{#if error}
  <Text type="danger">{error}</Text>
{/if}

<style>
  .providers {
    display: flex;
    flex-direction: column;
    gap: 5px;
  }

  .providers.horizontal {
    flex-direction: row;
  }

  .divider {
    color: rgb(187, 187, 187);
    margin: 1rem 0;
    width: 100%;
    display: flex;
    align-items: center;
    white-space: nowrap;
    font-size: 0.9rem;
  }

  .divider span {
    margin: 1rem;
  }

  .divider::before,
  .divider::after {
    border-bottom-style: solid;
    border-bottom-width: 1px;
    top: 50%;
    content: '';
    position: relative;
    display: inline-block;
    width: 50%;
  }

  .heading {
    font-weight: 500;
    font-size: 0.875rem;
    line-height: 1.25rem;
    margin: 0 0 0.5rem 0;
  }
</style>
