module.exports = {
  stories: ['../src/stories/**/*.stories.js'],
  addons: [
    '@storybook/addon-actions',
    '@storybook/addon-links',
    '@storybook/addon-viewport/register',
    '@storybook/addon-knobs/register',
    '@storybook/addon-a11y/register',
    '@storybook/addon-notes/register',
    '@storybook/addon-backgrounds/register',
    {
      name: '@storybook/addon-storysource',
    },
    '@storybook/addon-info/register',
  ],
}
