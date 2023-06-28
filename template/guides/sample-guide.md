---
outline: deep
---

# Guide Page Template

Welcome to this guide page template. Use it as a starting point to create your own documentation pages.

## How to use a Vue Component in your Markdown files with VitePress

VitePress allows you to use Vue components directly in your markdown files. Let's look at an example of how to do this with a `PackDataSample` component.

### Step 1: Create the Component

First, create your Vue component. For instance, we'll have a `PackDataSample` component located at `@components/demos/PackDataSample.vue`.

### Step 2: Register the Component

Then, register your component globally in the VitePress theme. You can do this in the `.vitepress/theme/index.js` file:

```javascript
import BroxusTheme from 'broxus-docs-kit/theme/broxusTheme';
import PackDataSample from '@components/demos/PackDataSample.vue';

export default {
  ...BroxusTheme,
  enhanceApp({ app }) {
    app.component('PackDataSample', PackDataSample);
  },
};
```

In the code snippet above, `enhanceApp` is a hook that allows you to interact with the Vue instance that VitePress uses. We're registering the `PackDataSample` component so it can be used anywhere in our markdown files.

### Step 3: Use the Component

Finally, use your Vue component in any markdown file like this:

````markdown
### Step 3: Use the Component

Finally, use your Vue component in any markdown file like this:

```markdown
<PackDataSample />
```

<PackDataSample />
````

<PackDataSample />

Now, whenever you build your VitePress site, your Vue component will render wherever you've used its tag in your markdown files.

---

This guide should help you understand how to use Vue components in your markdown files when working with VitePress. Feel free to replace the `PackDataSample` component with any component you wish to use in your documentation.
