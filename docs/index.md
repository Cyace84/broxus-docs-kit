## Broxus-docs-kit Documentation

### Overview

The Broxus Docs Kit is a suite of tools built on Vue.js and VitePress, designed to optimize the documentation for the Broxus project. This toolkit includes ready-to-use templates and custom components, ensuring consistency, relevance, and accessibility of documentation based on a user-friendly tech stack.

The toolkit makes it easy to set up a documentation project template based on VitePress. It comes pre-installed with various Vue components frequently used in our documentation.

### Components

1. **WalletControl**: Manages user connection to a wallet. It contains buttons for connecting, disconnecting, and switching the wallet account.
2. **ProviderSelector**: A modal window allowing users to connect to a wallet by choosing from the provided providers (currently available are "Ever" and "Venom").
3. **Toast**: A "toast" component, a small pop-up notification displaying a text message. If the message is long, it automatically collapses with a button to expand the text for easy viewing.
4. **Page**: Displays the content of the API reference loaded from broxus-docs-api.
5. **Layout**: An extension of the standard VitePress template, adding functionality for working with dynamic API-reference. It checks if the current page is an API-ref page and, if so, extracts the relevant content for display. The component also has additional wallet control elements and page structure display functions.
6. Other smaller components, such as an accordion.

Upon initiation, the module offers to set up standard documentation information and choose a template option: full or light.

- **Light Version**: Installs the basic documentation skeleton, with components, styles, and other elements imported from the module.
- **Full Version**: Performs the same functions, but components and styles are installed directly into the documentation directory.

Overall, this module facilitates maintaining a unified documentation style by keeping everything in one place.

### Installation

To install the Broxus Docs Kit via npm, follow these steps:

```bash
npm install broxus-docs-kit
```

### Getting Started

1. After installation, navigate to your project directory:

```bash
cd your-project-directory
```

2. To initiate the module and set up your documentation:

```bash
broxus-docs-kit init
```

3. Follow the on-screen prompts to configure your documentation and choose your desired template (full or light).

4. To run the documentation locally:

```bash
npm run dev
```

This will start a local server, and you can view your documentation in your browser.

### Conclusion

The Broxus Docs Kit provides an efficient way to maintain consistent documentation styles and structures, making it easier for developers and users alike.
