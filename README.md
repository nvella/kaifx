# kaifx

**Work in progress**

A lightweight, object-oriented user interface framework for developing KaiOS applications, with no dependence on typical desktop/mobile web frameworks like React or Angular. Aims to keep things simple, understandable, and self-documenting. Attempts to focus on abstracting away the idiosyncrasies of the mobile web so you can focus on your app.

## Concepts

### App class

Manages application lifecycle, Screens, input/output, and softkeys

| Method | Description |
| ------ | ----------- |
| `init` | Initialises the application, hooks document events. |
| `setScreen` | Clears the screen stack and replaces it with the provided Screen |
| `pushScreen` | Push a Screen onto the stack |
| `replaceScreen` | Replaces the Screen on the top of the stack |
| `popScreen` | Pop a Screen off the stack |

### Screen abstract class

Inherited by other concrete Screen classes.

| Method | Description |
| ------ | ----------- |
| `setSoftkeys` | Set the left, centre and right softkeys for this screen. Each softkey can either be an ICommand or an ICommandMenu |

### StackScreen class

Stacks elements vertically, allowing selection between them.

### LoaderScreen class

Displays a loading indicator

### TabScreen class

Presents a tab bar for switching between provided sub-Screens.

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
