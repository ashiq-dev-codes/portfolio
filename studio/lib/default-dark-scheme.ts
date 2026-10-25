// Studio remembers the Appearance choice (avatar menu → System / Light / Dark) under this key and
// falls back to the system setting when nothing is saved. Saving "dark" before Studio starts makes
// dark the default, while any choice she makes later is kept. If Sanity ever renames the key, this
// does nothing and Studio simply follows the system setting.
const colorSchemeKey = 'sanityStudio:ui:colorScheme'

export function setDarkSchemeAsDefault() {
  // The CLI also loads the config in Node, where there is no browser storage.
  if (typeof window === 'undefined') return
  try {
    if (!window.localStorage.getItem(colorSchemeKey)) {
      window.localStorage.setItem(colorSchemeKey, 'dark')
    }
  } catch {
    // Storage can be blocked (e.g. private browsing); Studio then follows the system setting.
  }
}
