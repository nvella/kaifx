# kaifx

**Currently paused due to myself no longer using a KaiOS phone. I might be back :)**

A lightweight, object-oriented user interface framework for developing KaiOS applications, with no dependence on typical desktop/mobile web frameworks like React or Angular. Aims to keep things simple, understandable, and self-documenting. Attempts to focus on abstracting away the idiosyncrasies of the mobile web so you can focus on your app.

## Concepts

### App class

Manages application lifecycle, Pages, input/output, and softkeys

| Method | Description |
| ------ | ----------- |
| `init` | Initialises the application, hooks document events. |
| `setPage` | Clears the screen stack and replaces it with the provided Page |
| `pushPage` | Push a Page onto the stack |
| `replacePage` | Replaces the Page on the top of the stack |
| `popPage` | Pop a Page off the stack |

### Page abstract class

Inherited by other concrete Page classes.

| Method | Description |
| ------ | ----------- |
| `setSoftkeys` | Set the left, centre and right softkeys for this screen. Each softkey can either be an ICommand or an ICommandMenu |

### ListPage class

Stacks elements vertically, allowing selection between them.

### LoaderPage class

Displays a loading indicator

### TabPage class

Presents a tab bar for switching between provided sub-Pages.

### ICommand interface

Describes an object representing a command - a title and a function to call

| Property | Description |
| -------- | ----------- |
| `title`  | The title of the command |
| `fn`     | The function to call on command execution |

### ICommandMenu

Describes an object representing a menu of commands. This would typically be launched through a softkey.

| Property | Description |
| -------- | ----------- |
| `title`  | The title of the menu |
| `commands` | An array of ICommands |
